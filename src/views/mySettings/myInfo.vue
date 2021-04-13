<template>
  <div class="mySettings-myInfo height100 mySettings-box height100">
    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">{{$t('mySettings.page_myinfo_title')}}</span>
      </div>

      <div class="cr-head-right fs14">
        <el-button type="primary" size="mini" class="fs14" @click="save">{{$t('Common.btn_save')}}</el-button>
      </div>
    </div>
    <div class="content-box bg-white flex1 mt8 pAll12">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fwBold fs18">
          {{$t(
          'mySettings.page_common_title'
          )}}
        </span>
      </div>
      <div class="headphoto mt20 mb30">
        <span>{{$t('mySettings.head_photo')}}</span>
        <div class="right flex" style="align-items: flex-end;">
          <el-upload
            class="userInfo_img"
            name="ossfile"
            :show-file-list="false"
            :action="`${$urls.easxApiUrl}/PersonalCenter/Picture`"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :data="Uploadimg"
          >
            <img v-if="userInfo_imgurl" :src="userInfo_imgurl" width="100%" height="100%" />
            <i class="mh-img el-icon-picture-outline"></i>
            <div class="el-upload__text fs12 color-aaa">
              {{$t('mySettings.img_text[0]')}}
              <span
                class="color-blue"
              >{{$t('mySettings.img_text[1]')}}</span>
            </div>
          </el-upload>
          <div class="tip color-8A9 fs12 mt12 ml30">
            <span>{{$t('mySettings.img_text[2]')}}</span>
          </div>
        </div>
      </div>
      <div class="teacher_info fs14">
        <div class="flex-al">
          <div class="bb_ddd pt20 pb12" style="width: 30%; margin-right: 200px;">
            <span
              class="color-aaa mr30 dsplay"
              style="width:80px"
            >{{$t('mySettings.page_info.teacher_cname')}}</span>
            <span class="color-333">{{accountInfo.staffer_cnname}}</span>
          </div>
          <div class="bb_ddd pt20 pb12" style="width: 30%">
            <span
              class="color-aaa mr30 dsplay"
              style="width:80px"
            >{{$t('mySettings.page_info.teacher_ename')}}</span>
            <span class="color-333">{{accountInfo.staffer_enname}}</span>
          </div>
        </div>
        <div class="flex-al">
          <div class="bb_ddd pt20 pb12" style="width: 30%; margin-right: 200px;">
            <span
              class="color-aaa mr30 dsplay"
              style="width:80px"
            >{{$t('mySettings.page_info.gender')}}</span>
            <el-radio-group v-model="accountInfo.staffer_sex">
              <el-radio :label="$t('Common.man')" disabled>{{$t('mySettings.page_info.man')}}</el-radio>
              <el-radio :label="$t('Common.woman')" disabled>{{$t('mySettings.page_info.women')}}</el-radio>
            </el-radio-group>
          </div>
          <div class="bb_ddd pt20 pb12" style="width: 30%">
            <span
              class="color-aaa mr30 dsplay"
              style="width:80px"
            >{{$t('mySettings.page_info.date')}}</span>
            <span class="color-333">{{accountInfo.info_birthday}}</span>
          </div>
        </div>
      </div>
      <div class="ct-head-left flex-al mt30">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fwBold fs18">{{$t('mySettings.page_staff_title')}}</span>
      </div>
      <div class="teacher_info fs14">
        <div class="flex-al">
          <div class="bb_ddd pt20 pb12" style="width: 30%; margin-right: 200px;">
            <span
              class="color-aaa mr30 dsplay"
              style="width:80px"
            >{{$t('mySettings.page_info.staff_name')}}</span>
            <span class="color-333">{{accountInfo.post_name}}</span>
          </div>
          <div class="bb_ddd pt20 pb12" style="width: 30%">
            <span
              class="color-aaa mr30 dsplay"
              style="width:80px"
            >{{$t('mySettings.page_info.job')}}</span>
            <span class="color-333">{{accountInfo.postrole_name}}</span>
          </div>
        </div>
        <!-- <div class="flex-al">
          <div class="bb_ddd pt20 pb12" style="width: 30%; margin-right: 200px;">
            <span
              class="color-aaa mr30 dsplay"
              style="width:80px"
            >{{$t('mySettings.page_info.staff_leavel')}}</span>
            <span class="color-333">{{accountInfo.postlevel_cnname}}</span>
          </div>
        </div> -->
      </div>
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
      // 图片上传
      userInfo_imgurl: "", //用户头像
      Uploadimg: {
        ossfile: "",
        company_id: this.$userDetails.companyId
      }
    };
  },
  watch: {},
  computed: {},
  created() {
    this.getStafferInfo();
  },
  methods: {
    // 获取个人信息
    getStafferInfo() {
      acountHttp.getStafferInfo({}).then(res => {
        if (res.data.error == 0) {
          this.accountInfo = res.data.result;
          this.userInfo_imgurl = res.data.result.staffer_img;
          this.$Tool.setStorage("UserInfo", res.data.result); //用户信息
          this.$store.dispatch("setUserInfo", res.data.result);
        } else {
          this.accountInfo = {};
        }
      });
    },
    //保存
    save() {
      acountHttp
        .updateStafferInfoAction({ staffer_img: this.userInfo_imgurl })
        .then(res => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            this.getStafferInfo();
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },

    handleAvatarSuccess(res) {
      if (res.error == "0") {
        this.userInfo_imgurl = res.result.picture_imgurl;
        console.log(this.userInfo_imgurl);
      }
    },
    beforeAvatarUpload(file) {
      console.log(file, "这是图片数据");
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      const isImg = isJPG || isPNG || isGIF;
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG && !isGIF) {
        this.$message.error("上传头像图片只能是 JPG/PNG/GIF 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }

      return isImg && isLt2M;
    }
  },
  mounted() {}
};
</script>

<style lang="less">
@import "./mySettings";
.mySettings-myInfo {
  .userInfo_img {
    width: 220px;
    height: 220px;
    background: rgba(249, 252, 255, 1);
    margin-top: 10px;
    border-radius: 4px;

    .el-upload__text {
      width: 200px;
      text-align: center;
      color: #d5d5d5;
      margin-top: 10px;
    }
    .el-upload {
      width: 100%;
      height: 100%;
      // outline: 2px dashed #dadde9;
      position: relative;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .mh-img {
      font-size: 60px;
      margin-top: 25%;
      display: inline-block;
    }
    .mh-img:before {
      color: #dcdfe6;
    }
  }
}
</style>
