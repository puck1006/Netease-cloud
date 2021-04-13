<template>
  <div class="mySettings-myInfo height100 mySettings-box height100">
    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">
          {{$t(
          'mySettings.page_myinfo_title'
          )}}
        </span>
      </div>
      <!-- <div class="cr-head-right fs14">
        <el-button type="primary" size="mini" class="fs14">
          {{$t(
          'Common.btn_save'
          )}}
        </el-button>
      </div>-->
    </div>
    <div class="content-box bg-white flex1 mt8 pAll12">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18 fwBold">{{$t('mySettings.page_accoutInfo_title')}}</span>
      </div>
      <div class="teacher_info fs14">
        <div class="flex-al">
          <div class="bb_ddd pt20 pb12" style="width: 30%; margin-right: 200px;">
            <span
              class="color-aaa mr30 dsplay"
              style="width:80px"
            >{{$t('mySettings.page_info.account')}}</span>
            <span class="color-333">{{accountInfo.staffer_branch}}</span>
          </div>
          <div class="bb_ddd pt20 pb12" style="width: 30%">
            <span
              class="color-aaa mr30 dsplay"
              style="width:80px"
            >{{$t('mySettings.page_info.password')}}</span>
            <span class="color-333">{{accountInfo.staffer_pass}}</span>
            <span
              class="color-blue mr20 cur-pointer"
              @click="changePass"
              style="float: right;"
            >{{$t('mySettings.page_info.changepassword')}}</span>
          </div>
        </div>
        <div class="flex-al">
          <div class="bb_ddd pt20 pb12" style="width: 30%; margin-right: 200px;">
            <span
              class="color-aaa mr30 dsplay"
              style="width:80px"
            >{{$t('mySettings.page_info.number')}}</span>
            <span class="color-333">{{accountInfo.staffer_mobile}}</span>
          </div>
          <div class="bb_ddd pt20 pb12" style="width: 30%">
            <span
              class="color-aaa mr30 dsplay"
              style="width:80px"
            >{{$t('mySettings.page_info.email')}}</span>
            <span class="color-333">{{accountInfo.staffer_email}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改密码 -->
    <div class="small-dialog" v-if="changePassword">
      <el-dialog
        :title="$t('mySettings.password_dialog.titie')"
        :visible.sync="changePassword"
        width="500px"
        :before-close="handleClose"
      >
        <div class="dialog-content">
          <el-form
            label-width="100px"
            :model="passwordForm"
            ref="passwordForm"
            :rules="passwordRules"
          >
            <el-form-item
              prop="staffer_pass1"
              :label="$t('mySettings.password_dialog.newpass')"
              label-width="120px"
            >
              <div style="width: 300px;">
                <el-input
                  type="text"
                  :placeholder="$t('mySettings.password_dialog.newpass_ph')"
                  clearable
                  v-model="passwordForm.staffer_pass1"
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item
              prop="staffer_pass2"
              :label="$t('mySettings.password_dialog.confirmpass')"
              label-width="120px"
            >
              <div style="width: 300px;">
                <el-input
                  type="text"
                  :placeholder="$t('mySettings.password_dialog.confirmpass_ph')"
                  clearable
                  v-model="passwordForm.staffer_pass2"
                ></el-input>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            size="mini"
            @click="handConfirmPass()"
          >{{$t('mySettings.password_dialog.confirm')}}</el-button>
          <el-button
            size="mini"
            @click="changePassword=false"
          >{{$t('mySettings.password_dialog.cancel')}}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import acountHttp from "./mySettings";
export default {
  name: "mySettings-myInfo",
  components: {},
  data() {
    return {
      accountInfo: {},
      changePassword: false,
      //表单--修改密码
      passwordForm: {
        staffer_pass1: "", //修改密码1
        staffer_pass2: "" //修改密码2
      },
      passwordRules: {
        staffer_pass1: [
          {
            required: true,
            message: this.$t("mySettings.password_dialog.newpass_ph"),
            trigger: "blur"
          }
        ],
        staffer_pass2: [
          {
            required: true,
            message: this.$t("mySettings.password_dialog.confirmpass_ph"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {},
  computed: {},
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      acountHttp.User({}).then(res => {
        if (res.data.error == 0) {
          this.accountInfo = res.data.result.data[0];
          console.log(this.accountInfo);
        } else {
          this.accountInfo = {};
        }
      });
    },
    changePass() {
      this.resetForm("passwordForm");
      this.changePassword = !this.changePassword;
    },
    handConfirmPass() {
      this.updatePassAction();
    },
    //修改密码
    updatePassAction() {
      this.$refs["passwordForm"].validate(valid => {
        if (valid) {
          acountHttp
            .updatePassAction({
              staffer_pass1: this.passwordForm.staffer_pass1,
              staffer_pass2: this.passwordForm.staffer_pass2
            })
            .then(res => {
              if (res.data.error == 0) {
                this.$message({ message: res.data.errortip, type: "success" });
                this.getUser();
                this.changePassword = !this.changePassword;
              } else {
                this.$message.error(res.data.errortip);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose(done) {
      done();
    },
    // 重置表单
    resetForm(form) {
      // 数据清空
      //表单--离职
      this.passwordForm = {
        staffer_pass1: "",
        staffer_pass2: ""
      };

      if (this.$refs[form]) {
        this.$refs[form].resetFields();
      }
    }
  },
  mounted() {}
};
</script>

<style lang="less">
@import "./mySettings";
.mySettings-myInfo {
}
</style>
