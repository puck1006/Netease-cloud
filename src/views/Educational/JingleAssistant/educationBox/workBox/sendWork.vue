<template>
  <div class="Educational-noticeManage-sendNotice height100">
    <div class="success bg-white height100" v-if="isSuccess">
      <img src="@/assets/images/icon/success-icon.png" alt />
      <span class="color-333 mt20 mb20">
        {{
        $t("Educational.JingleAssistant.educationWork.child2.ac")
        }}
      </span>
      <span class="cur-pointer color-blue" @click="contiue">
        {{
        $t("Educational.JingleAssistant.educationWork.child2.ad")
        }}
      </span>
    </div>

    <div class="content-box bg-white flex1 pl12 pr12" v-else>
      <div class="top-btn" v-if="hourStatus !== '0'">
        <el-button
          size="small"
          @click="clear"
        >{{ $t("Educational.JingleAssistant.educationWork.child2.ae") }}</el-button>
        <el-button
          type="primary"
          size="small"
          @click="send"
        >{{ $t("Educational.JingleAssistant.educationWork.child2.af") }}</el-button>
      </div>
      <div class="swiperDiv">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(onehour, index) in hourList" :key="index">
            <div class="one-swiper cur-pointer" @click="clickSwiper(onehour, index)">
              <div class="status ml10">
                <div
                  class="circle mr8"
                  :class="{
                    'bg-red': onehour.hour_ischecking == 1,
                    'bg-blue': onehour.hour_ischecking == 2,
                    'bg-8A9': onehour.hour_ischecking == 0
                  }"
                ></div>
                <span class="fs12 color-243">
                  {{
                  onehour.hour_ischeckingname
                  }}
                </span>
              </div>
              <div class="lesson fs14 flex" :class="{ activeswiper: onehour.active }">
                <span>{{ onehour.hour_name }}</span>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <i v-show="hourList.length > 0" class="el-icon-arrow-left"></i>
        <i v-show="hourList.length > 0" class="el-icon-arrow-right"></i>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="ml12"
        v-if="hourStatus !== '0'"
      >
        <div class="title-tip">
          <span class="color-333 mr20">
            {{
            $t("Educational.JingleAssistant.educationWork.child2.ag")
            }}
          </span>
        </div>

        <div class="title-tip">
          <span class="color-red">*</span>
          <span class="color-333 mr20">
            {{
            $t("Educational.JingleAssistant.educationWork.child2.ah")
            }}
          </span>
          <span class="color-4C5 mr20">
            {{ $t("Educational.JingleAssistant.educationWork.child2.ai") }}
            {{ savePersonList.length }}/{{ personList.length }}
          </span>

          <span class="color-blue cur-pointer add-child" @click="addChild">
            <i class="icon-tianjia"></i>
          </span>
          <span @click="addChild" class="color-blue cur-pointer">
            {{
            $t("Educational.JingleAssistant.educationWork.child2.aj")
            }}
          </span>
        </div>
        <div class="receive-person">
          <div class="one-person" v-for="(person, index) in savePersonList" :key="index">
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
          <span class="color-333 mr20">
            {{
            $t("Educational.JingleAssistant.educationWork.child2.ak")
            }}
          </span>
        </div>
        <el-form-item prop="homework_title">
          <div class="flex">
            <el-input
              clearable
              v-model="ruleForm.homework_title"
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
          <span class="color-333 mr20">
            {{
            $t("Educational.JingleAssistant.educationWork.child2.am")
            }}
          </span>
        </div>
        <el-form-item prop="homework_content">
          <VueNeditorWrap
            ref="ueditor"
            v-model.trim="ruleForm.homework_content"
            :destroy="false"
            :config="config"
            @ready="loadUeditor"
          ></VueNeditorWrap>
        </el-form-item>
      </el-form>
      <div class="success bg-white height100" v-else>
        <blank :blankCont="$t('Educational.JingleAssistant.educationWork.child2.as')"></blank>
        <!-- <span class="color-333 mt20 mb20">
          {{
          $t("Educational.JingleAssistant.educationWork.child2.as")
          }}
        </span> -->
      </div>
    </div>
    <!-- 查看作业完成状态 -->
    <div class="small-dialog">
      <el-dialog
        :title="$t('Educational.JingleAssistant.educationWork.child2.aj')"
        :visible.sync="addVisible"
        width="700px"
        class="addchild"
        :before-close="handleClose"
      >
        <div class="dialog-content">
          <div class="title flex-al mb20">
            <span class="fs18 color-333 mr20">{{ className }}</span>
            <span class="fs12 color-aaa">
              ({{ $t("Educational.JingleAssistant.educationWork.child2.an")
              }}{{ delPersonList.length
              }}{{
              $t("Educational.JingleAssistant.educationWork.child2.ao")
              }})
            </span>
          </div>
          <div class="child" style="min-height: 250px;">
            <el-checkbox-group v-model="selectChlid">
              <el-checkbox :label="person" v-for="(person, index) in delPersonList" :key="index">
                <div class="flex-al">
                  <img v-if="person.student_img" :src="person.student_img" />
                  <img
                    v-else-if="
                      person.student_img ||
                        person.student_sex == $t('Common.man')
                    "
                    src="@/assets/images/default-new-men.png"
                  />
                  <img
                    v-else-if="
                      person.student_img ||
                        person.student_sex == $t('Common.woman')
                    "
                    src="@/assets/images/default-img-women.png"
                  />
                  <span class="ml10 mr10">{{ person.student_cnname }}</span>
                  <i v-if="person.student_sex == $t('Common.woman')" class="icon-girl"></i>
                  <i v-else class="icon-boy"></i>
                </div>
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="confirmChild">
            {{
            $t("Common.btn_sure")
            }}
          </el-button>
          <el-button size="mini" @click="addVisible = false">
            {{
            $t("Common.btn_cancel")
            }}
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import eduHttp from "../../../Educational.js";
import VueNeditorWrap from "vue-neditor-wrap";
import "swiper/dist/css/swiper.css";
import blank from "@/components/common/Blank/blank.vue";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "Educational-noticeManage-sendNotice",
  components: { VueNeditorWrap, swiper, swiperSlide, blank },
  data() {
    return {
      isSuccess: false,
      addVisible: false, // 弹窗 -- 加孩子
      hourStatus: "",
      hourId: "",
      hourList: [],
      swiperOption: {
        navigation: {
          nextEl: ".el-icon-arrow-right",
          prevEl: ".el-icon-arrow-left"
        },
        slidesPerView: 11,
        // slidesPerGroup: 6,
        initialSlide: 0
      },
      className: "",
      selectChlid: [],
      personList: [],
      savePersonList: [],
      delPersonList: [],
      ruleForm: {
        homework_title: "",
        homework_content: ""
      },
      rules: {
        homework_title: [
          {
            required: true,
            message: this.$t(
              "Educational.JingleAssistant.educationWork.child2.ap"
            ),
            trigger: "blur"
          }
        ],
        homework_content: [
          {
            required: true,
            message: this.$t(
              "Educational.JingleAssistant.educationWork.child2.aq"
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
    this.timetableOneApi();
  },
  watch: {},
  computed: {},
  methods: {
    // 获取课时
    timetableOneApi() {
      eduHttp
        .timetableOneApi({
          class_id: this.$route.query.class_id
        })
        .then(res => {
          if (res.data.error == 0) {
            this.hourList = res.data.result.list.classhourlist;
            console.log(this.hourList);
            this.clickSwiper(this.hourList[0], 0);
          } else {
            this.hourList = [];
          }
        });
    },
    //  获取接收人
    ChoiceSelecterStudent() {
      eduHttp
        .ChoiceSelecterStudent({
          class_id: this.$route.query.class_id
        })
        .then(res => {
          if (res.data.error == 0) {
            this.className = res.data.result.class_cnname;
            this.personList = res.data.result.data;
            this.savePersonList = JSON.parse(JSON.stringify(this.personList));
            console.log(res);
          } else {
            this.personList = [];
          }
        });
    },
    //添加学生
    addChild() {
      this.selectChlid = [];
      this.addVisible = true;
    },
    close(p, i) {
      this.savePersonList.splice(i, 1);
      this.delPersonList.push(p);
      console.log(this.savePersonList);
      console.log(this.delPersonList);
    },
    clear() {
      this.savePersonList = JSON.parse(JSON.stringify(this.personList));
      this.delPersonList = [];
      this.ruleForm = {
        homework_title: "",
        homework_content: ""
      };
    },
    send() {
      let perArr = [];
      this.savePersonList.map(v => {
        perArr.push({
          class_id: this.$route.query.class_id,
          student_id: v.student_id,
          hour_id: this.hourId
        });
      });
      let canSubmit = this.$Tool.isNull("ruleForm", this);
      if (canSubmit) {
        eduHttp
          .submitHomeworkAction({
            homework_title: this.ruleForm.homework_title,
            homework_content: this.ruleForm.homework_content,
            list: JSON.stringify(perArr)
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
    clickSwiper(hour, index) {
      this.hourList.map(v => {
        this.$set(v, "active", false);
      });
      console.log(hour, index);
      hour.active = true;
      this.hourId = hour.hour_id;
      this.hourStatus = hour.hour_ischecking;
    },
    confirmChild() {
      console.log(this.selectChlid);
      this.savePersonList = this.savePersonList.concat(this.selectChlid);
      this.delPersonList = this.selectChlid
        .concat(this.delPersonList)
        .filter(
          v =>
            !new Set(this.delPersonList).has(v) ||
            !new Set(this.selectChlid).has(v)
        );
      this.addVisible = false;
    },
    // 富文本编辑器
    loadUeditor(p) {
      console.log(p);
    },
    handleClose(done) {
      done();
    }
  },
  mounted() {}
};
</script>

<style lang="less">
.Educational-noticeManage-sendNotice {
  .child {
    img {
      width: 26px;
      height: 26px;
    }
    .el-checkbox-group {
      display: flex;
      flex-wrap: wrap;
      .el-checkbox {
        margin: 0 30px 20px 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
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
      .add-child {
        padding: 4px 5px;
        margin-right: 10px;
        border: 1px solid #ddd;
        width: 40px;
        background: rgba(251, 251, 251, 1);
        border-radius: 4px;
      }
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
    .swiperDiv {
      position: relative;
      .el-icon-arrow-left {
        color: #7d7d7d;
        font-size: 35px;
        z-index: 3;
        cursor: pointer;
        position: absolute;
        bottom: 30px;
        left: -5px;
        outline: none;
      }
      .el-icon-arrow-right {
        color: #7d7d7d;
        font-size: 35px;
        z-index: 3;
        cursor: pointer;
        position: absolute;
        bottom: 30px;
        right: 0px;
        outline: none;
      }
      .swiper-button-prev,
      .swiper-button-next {
        background-image: none;
      }
      .one-swiper {
        .status {
          .circle {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            display: inline-block;
          }
        }
        .lesson {
          align-items: center;
          justify-content: center;
          margin: 10px;
          height: 54px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
          border-radius: 8px;
        }
        .activeswiper {
          background: linear-gradient(
            225deg,
            rgba(0, 210, 255, 1) 0%,
            rgba(0, 166, 255, 1) 100%
          );
          box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
          color: #ffffff;
        }
      }
      .swiper-container {
        width: calc(100% - 60px);
      }
    }
  }
}
</style>
