<template>
  <div class="Educational-noticeManage-sendNotice height100">
    <div class="success bg-white height100" v-if="isSuccess">
      <img src="@/assets/images/icon/success-icon.png" alt="" />
      <span class="color-333 mt20 mb20">{{
        $t("Educational.JingleAssistant.educationWork.child4.ac")
      }}</span>
      <span class="cur-pointer color-blue" @click="contiue">{{
        $t("Educational.JingleAssistant.educationWork.child2.ad")
      }}</span>
    </div>

    <div class="content-box bg-white flex1 pl12 pr12" v-else>
      <div class="top-btn">
        <el-button size="small" @click="clear">
          {{ $t("Educational.JingleAssistant.educationWork.child2.ae") }}
        </el-button>
        <el-button type="primary" size="small" @click="send">
          {{ $t("Educational.JingleAssistant.educationWork.child2.af") }}
        </el-button>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="ml12">
        <div class="title-tip">
          <span class="color-red">*</span>
          <span class="color-333 mr20">{{
            $t("Educational.JingleAssistant.educationWork.child2.ah")
          }}</span>
          <span class="color-4C5"
            >{{ $t("Educational.JingleAssistant.educationWork.child2.ai") }}
            {{ newPersonList.length }}/{{ personList.length }}</span
          >
        </div>
        <div class="receive-person">
          <div
            class="one-person"
            v-for="(person, index) in newPersonList"
            :key="index"
          >
            <img v-if="person.student_img" :src="person.student_img" />
            <img
              v-else-if="
                person.student_img || person.student_sex == $t('Common.man')
              "
              src="@/assets/images/default-new-men.png"
            />
            <img
              v-else-if="
                person.student_img || person.student_sex == $t('Common.woman')
              "
              src="@/assets/images/default-img-women.png"
            />
            <span class="ml10 mr10">{{ person.student_cnname }}</span>
            <i
              class="el-icon-circle-close color-red fs18 cur-pointer"
              @click="close(person, index)"
            ></i>
          </div>
        </div>
        <div class="title-tip">
          <span class="color-red">*</span>
          <span class="color-333 mr20">{{
            $t("Educational.JingleAssistant.educationWork.child2.ak")
          }}</span>
        </div>
        <el-form-item prop="message_title">
          <div class="flex">
            <el-input
              clearable
              v-model="ruleForm.message_title"
              autosize
              :placeholder="
                $t('Educational.JingleAssistant.educationWork.child2.al')
              "
              style="width:320px;"
            ></el-input>
          </div>
        </el-form-item>
        <div class="title-tip">
          <span class="color-red">*</span>
          <span class="color-333 mr20">{{
            $t("Educational.JingleAssistant.educationWork.child2.am")
          }}</span>
        </div>
        <el-form-item prop="message_content">
          <VueNeditorWrap
            ref="ueditor"
            v-model.trim="ruleForm.message_content"
            :destroy="false"
            :config="config"
            @ready="loadUeditor"
          ></VueNeditorWrap>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import eduHttp from "../../../Educational.js";
import VueNeditorWrap from "vue-neditor-wrap";

export default {
  name: "Educational-noticeManage-sendNotice",
  components: { VueNeditorWrap },
  data() {
    return {
      isSuccess: false,
      personList: [],
      newPersonList: [],
      ruleForm: {
        message_title: "",
        message_content: ""
      },
      rules: {
        message_title: [
          {
            required: true,
            message: this.$t(
              "Educational.JingleAssistant.educationWork.child4.ad"
            ),
            trigger: "blur"
          }
        ],
        message_content: [
          {
            required: true,
            message: this.$t(
              "Educational.JingleAssistant.educationWork.child4.ae"
            ),
            trigger: "blur"
          }
        ]
      },
      //编辑器
      config: {
        UEDITOR_HOME_URL: "/NEditor/",
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: "100%",
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: ""
      }
    };
  },
  created() {
    this.ChoiceSelecterStudent();
  },
  watch: {},
  computed: {},
  methods: {
    //  获取接收人
    ChoiceSelecterStudent() {
      eduHttp
        .ChoiceSelecterStudent({
          class_id: this.$route.query.class_id
        })
        .then(res => {
          if (res.data.error == 0) {
            this.personList = res.data.result.data;
            this.newPersonList = JSON.parse(JSON.stringify(this.personList));
            console.log(res);
          } else {
            this.personList = [];
          }
        });
    },
    close(p, i) {
      this.newPersonList.splice(i, 1);
    },
    clear() {
      this.newPersonList = JSON.parse(JSON.stringify(this.personList));
      this.ruleForm = {
        message_title: "",
        message_content: ""
      };
    },
    send() {
      let perArr = [];
      this.newPersonList.map(v => {
        perArr.push({
          class_id: this.$route.query.class_id,
          student_id: v.student_id
        });
      });
      let canSubmit = this.$Tool.isNull("ruleForm", this);
      if (canSubmit) {
        eduHttp
          .SendMessageAction({
            message_title: this.ruleForm.message_title,
            message_content: this.ruleForm.message_content,
            student: JSON.stringify(perArr)
          })
          .then(res => {
            if (res.data.error == 0) {
              this.$message({ message: res.data.errortip, type: "success" });
              this.isSuccess = true;
              this.clear();
            } else {
              this.$message.error(res.data.errortip);
            }
          });
      }
    },
    contiue() {
      this.isSuccess = false;
    },
    // 富文本编辑器
    loadUeditor(p) {
      console.log(p);
    }
  },
  mounted() {}
};
</script>

<style lang="less">
.Educational-noticeManage-sendNotice {
  .success {
    padding-top: 15vh;
    img {
      width: 64px;
      height: 64px;
    }
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content-box {
    position: relative;
    .top-btn {
      position: absolute;
      top: -50px;
      right: 10px;
    }
    .title-tip {
      font-size: 14px;
      margin: 10px 0;
    }
    .receive-person {
      display: flex;
      flex-wrap: wrap;
      .one-person {
        img {
          width: 26px;
          height: 26px;
        }
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #24356a;
        padding: 2px 8px;
        margin: 0 5px;
        border-radius: 4px;
        border: 1px solid rgba(221, 221, 221, 1);
      }
    }
  }
}
</style>
