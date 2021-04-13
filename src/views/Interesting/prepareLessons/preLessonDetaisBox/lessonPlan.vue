<template>
  <div class="Interesting-prepareLessons-lessonPlan height100">
    <!-- 页面右边按钮***start -->
    <div class="right-btn fs14">
      <el-button
        @click="previewComments"
        type="warning"
        size="mini"
        class="fs14"
      >
        {{ $t("Common.preview") }}
      </el-button>
      <!-- <el-button type="primary" size="mini" class="fs14">
        {{$t(
        'Common.print'
        )}}
      </el-button> -->
      <i class="btn-close icon-gb ml10" @click="handBack()"></i>
    </div>
    <div class="content-box bg-white flex">
      <div class="left-content">
        <div class="fs16 color-243 tc">{{ lessPlanDetail.teachplan_name }}</div>
        <div class="color-243 mt16 flex-all">
          <span class="fs14">
            {{ $t("Common.page[0]") }}{{ currentIndex + 1
            }}{{ $t("Common.page[1]") }}
          </span>
          <span class="tr color-orange">
            <i
              v-if="lessPlanDetail.is_collect"
              @click="handCollect()"
              class="icon-collected cur-pointer"
            ></i>
            <i
              v-else
              @click="handCollect()"
              class="icon-uncollect cur-pointer"
            ></i>
            <span class="fs14 ml4">
              {{ $t("Common.collect_text") }}
            </span>
          </span>
        </div>
        <img
          class="mt16 mb16"
          style="width: 100%"
          :src="lessPlanDetail.teachpics_url"
          @click="viewImg(lessPlanDetail.teachpics_url)"
          alt
        />
        <div class="btn-container">
          <!-- <el-button type="success" size="small">上传我的教学视频</el-button> -->
          <el-button type="primary" size="small" @click="handlePersonalized"
            >上传我的个性化教案</el-button
          >
          <!-- <el-button type="primary" size="small">保存</el-button> -->
        </div>
        <div class="flex-al mb12">
          <span class="left-line-orange mr10"></span>
          <span class="color-243 fs18">
            {{ $t("Interesting.preLessonDetais.small_title4") }}
          </span>
        </div>
        <div
          class="message-item"
          v-html="lessPlanDetail.teachplan_postil"
        ></div>
        <div class="flex-al mb12">
          <span class="left-line-orange mr10"></span>
          <span class="color-243 fs18">
            {{ $t("Interesting.preLessonDetais.small_title1") }}
          </span>
        </div>
        <div class="message-item">{{ lessPlanDetail.prepare_postil }}</div>
        <div class="flex-al mb12">
          <span class="left-line-orange mr10"></span>
          <span class="color-243 fs18">
            {{ $t("Interesting.preLessonDetais.small_title9") }}
          </span>
        </div>
        <div
          class="message-item"
          v-html="lessPlanDetail.teachplan_matters"
        ></div>
      </div>
      <ul
        class="right-directory"
        ref="left_menu_height"
        :style="{ 'min-height': left_menu_height + 'px' }"
      >
        <li
          v-for="(item, index) in lessonPlanList"
          :key="index"
          class="flex-all fs14"
          @click="handClickPage(item, index)"
        >
          <span
            class="cur-pointer"
            :class="{ 'color-orange': index == currentIndex }"
          >
            {{ $t("Common.page[0]") }}{{ item.teachpics_sort
            }}{{ $t("Common.page[1]") }}
            <span
              v-if="item.prepare_isemphasis == '1'"
              class="status status1 ml10"
              >{{ item.prepare_isemphasis_name }}</span
            >
            <span
              v-if="item.prepare_isnokeep == '1'"
              class="status status2 ml10"
              >{{ item.prepare_isnokeep_name }}</span
            >
          </span>
          <div class="btns">
            <!-- 是否不讲的情况 -->
            <template v-if="item.prepare_isnokeep == '0'">
              <span
                v-if="item.prepare_isemphasis == '0'"
                class="color-orange cur-pointer"
                @click.stop.prevent="markCancelDifficult(item, 'mark')"
              >
                {{ $t("Interesting.preLessonDetais.btn_text3") }}
              </span>
              <span
                v-else
                class="color-orange cur-pointer"
                @click.stop.prevent="markCancelDifficult(item, 'cancel')"
              >
                {{ $t("Interesting.preLessonDetais.btn_text4") }}
              </span>
            </template>
            <template v-else>
              <span class="color-B8C cur-pointer">
                {{ $t("Interesting.preLessonDetais.btn_text3") }}
              </span>
            </template>
            <!-- 是否标记重难点的情况 -->
            <template v-if="item.prepare_isemphasis == '0'">
              <span
                v-if="item.prepare_isnokeep == '0'"
                @click.stop.prevent="markCancelNoSpeak(item, 'mark')"
                class="ml24 color-blue cur-pointer"
              >
                {{ $t("Interesting.preLessonDetais.btn_text5") }}
              </span>
              <span
                v-else
                class="ml24 color-blue cur-pointer"
                @click.stop.prevent="markCancelNoSpeak(item, 'cancel')"
              >
                {{ $t("Interesting.preLessonDetais.btn_text6") }}
              </span>
            </template>
            <template v-else>
              <span class="ml24 color-B8C cur-pointer">
                {{ $t("Interesting.preLessonDetais.btn_text5") }}
              </span>
            </template>
          </div>
        </li>
      </ul>
    </div>

    <el-dialog
      title="上传我的教学作品"
      :visible.sync="dialogVisible"
      width="700px"
    >
      <el-form label-width="170px" ref="formData" :model="formData">
        <el-form-item
          label="教案名称："
          prop="Lesson_cnname"
          :rules="[{ required: true, message: '请输入教案名称' }]"
        >
          <el-input
            placeholder="请输入教案名称"
            style="width: 360px"
            v-model="formData.Lesson_cnname"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="上传个性化教案视频："
          prop="tempworks_videourl"
          :rules="[{ required: true, message: '请选择视频' }]"
        >
          <el-upload
            accept=".mp3, .mp4, .wma, .avi, .rm, .rmvb, .flv, .mpg, .mov, .mkv"
            ref="uploadRef"
            class="upload-demo"
            :limit="1"
            drag
            :on-remove="handleRemove"
            :action="`${$urls.easxApiUrl}/PersonalCenter/Picture`"
            name="ossfile"
            :show-file-list="true"
            :data="Uploadimg"
            :on-success="handleAvatarSuccess"
          >
            <video
              width="100%"
              v-if="formData.tempworks_videourl"
              controls
              :src="formData.tempworks_videourl"
            ></video>
            <template v-else>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>上传视频</em>
              </div>
            </template>
          </el-upload>
          <input
            type="text"
            v-show="false"
            v-model="formData.tempworks_videourl"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="handConfirm"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import progressTableCont from "@/components/tables/progressTableCont.vue";
import popTips from "@/components/common/popTips/popTips.vue";
import httpApi from "../../Interesting";
export default {
  name: "Interesting-prepareLessons-lessonPlan",
  components: {
    progressTableCont,
    popTips,
  },
  data() {
    let item1 = {
      img: require("../../../../assets/images/info-img.png"),
      page: "一",
    };
    return {
      classname: "",
      Uploadimg: {
        ossfile: "",
        company_id: this.$userDetails.companyId,
      },
      formData: {
        Lesson_cnname: "",
        tempworks_videourl: "",
        tempworks_videoname: "",
      },
      dialogVisible: false,
      left_menu_height: 0,
      currentIndex: 0, //当前页数索引
      teachpics_sort: "1", //第几页
      teachpics_id: "", //图片id
      lessPlanDetail: {}, //每一页的教案
      prepare_isemphasis: 0, //是否重点标记 0普通 1重点
      prepare_isnokeep: 0, //是否不讲标记 0讲 1不讲
      lessonPlanList: [], //教案目录列表
    };
  },
  watch: {},
  computed: {},
  created() {
    console.log(this.$userDetails.companyId,'this.$userDetails.companyId');
    this.class_id = this.$route.query.class_id;
    this.course_branch = this.$route.query.course_branch;
    this.hour_lessontimes = this.$route.query.hour_lessontimes;
    this.teachplan_id = this.$Tool.getStorage("teachplan_id")
      ? this.$Tool.getStorage("teachplan_id")
      : "";
    this.PersonLessonPlan(); //备课->个性化教案 -- wgh
  },
  methods: {
    handleRemove() {
      this.formData.tempworks_videourl = "";
    },
    getLessonPlan() {
      httpApi
        .getLessonPlan({
          class_id: this.class_id,
          course_branch: this.course_branch,
          hour_lessontimes: this.hour_lessontimes,
          // teachplan_class: "1",
          // teachplan_class: teachplan_class //教案模式 0-文件模式(视频模式) 1-图片模式(教案模式)
        })
        .then((res) => {
          this.classname = res.data.result.list.classname;
        });
    },
    AddTeachplanAction() {
      httpApi
        .AddTeachplanAction({
          tempworks_name: this.formData.Lesson_cnname,
          tempworks_videourl: this.formData.tempworks_videourl,
          tempworks_videoname: this.formData.tempworks_videoname,
          teachplan_id: this.lessPlanDetail.teachplan_id,
          class_id: this.$route.query.class_id,
          course_branch: this.$route.query.course_branch,
          hour_lessontimes: this.$route.query.hour_lessontimes,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.$message({
              type: "success",
              message: res.data.errortip,
            });
            this.dialogVisible = false;
            this.PersonLessonPlan(); //备课->个性化教案 -- wgh
          } else {
            this.$message({
              type: "error",
              message: res.data.errortip,
            });
          }
        });
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      this.formData.tempworks_videourl = res.result.picture_imgurl;
      this.formData.tempworks_videoname = file.name;
    },
    handConfirm() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.AddTeachplanAction();
        } else {
          return false;
        }
      });
    },
    handlePersonalized() {
      this.dialogVisible = true;
    },
    //备课->个性化教案 -- wgh
    PersonLessonPlan() {
      httpApi
        .PersonLessonPlan({
          class_id: this.class_id,
          course_branch: this.course_branch,
          hour_lessontimes: this.hour_lessontimes,
          teachplan_id: this.teachplan_id,
          teachpics_sort: this.teachpics_sort,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.lessonPlanList = res.data.result.list.teachpics;
          } else {
            this.lessonPlanList = [];
          }
          // if (this.lessonPlanList.length > 0) {
          // } else {
          //   this.lessPlanDetail = {};
          // }
            this.lessPlanDetail = res.data.result.list.teachplan;

        });
    },
    //备课->添加/取消收藏 -- wgh
    AddCancelCollectAction(collect_status) {
      httpApi
        .AddCancelCollectAction({
          class_id: this.class_id,
          course_branch: this.course_branch,
          hour_lessontimes: this.hour_lessontimes,
          teachplan_id: this.teachplan_id,
          collect_status: collect_status, //是否收藏 0取消收藏 1添加收藏
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            this.lessPlanDetail.is_collect = !this.lessPlanDetail.is_collect;
            this.PersonLessonPlan(); //备课->个性化教案 -- wgh
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    //备课->添加备课标记 -- wgh
    PrepareMarkAction() {
      httpApi
        .PrepareMarkAction({
          class_id: this.class_id,
          course_branch: this.course_branch,
          hour_lessontimes: this.hour_lessontimes,
          teachplan_id: this.teachplan_id,
          teachpics_id: this.teachpics_id, //图片id
          prepare_isemphasis: this.prepare_isemphasis, //是否重点标记 0普通 1重点
          prepare_isnokeep: this.prepare_isnokeep, //是否不讲标记 0讲 1不讲
        })
        .then((res) => {
          if (res.data.error == 0) {
            console.log(222222);
            this.$message({ message: res.data.errortip, type: "success" });
            this.PersonLessonPlan(); //备课->个性化教案 -- wgh
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    // 是否收藏
    handCollect() {
      let code = "";
      //是否收藏 0取消收藏 1添加收藏
      if (this.lessPlanDetail.is_collect) {
        code = "0";
      } else {
        code = "1";
      }
      this.AddCancelCollectAction(code); //备课->添加/取消收藏 -- wgh
    },
    //标记或取消重难点
    markCancelDifficult(item, type) {
      //是否重点标记 0普通 1重点
      this.teachpics_id = item.teachpics_id;
      this.prepare_isnokeep = item.prepare_isnokeep;
      if (type == "mark") {
        // 标记重难点
        this.prepare_isemphasis = 1;
      } else {
        // 取消重难点
        this.prepare_isemphasis = 0;
      }
      console.log(11111);
      this.PrepareMarkAction(); //备课->添加备课标记 -- wgh
    },
    //标记或取消不讲
    markCancelNoSpeak(item, type) {
      //是否不讲标记 0讲 1不讲
      this.teachpics_id = item.teachpics_id;
      this.prepare_isemphasis = item.prepare_isemphasis;
      if (type == "mark") {
        // 标记不讲
        this.prepare_isnokeep = 1;
      } else {
        // 取消不讲
        this.prepare_isnokeep = 0;
      }
      this.PrepareMarkAction(); //备课->添加备课标记 -- wgh
    },
    // 切换页数
    handClickPage(item, index) {
      this.teachpics_sort = item.teachpics_sort;
      this.currentIndex = index;
      this.PersonLessonPlan(); //备课->个性化教案 -- wgh
    },
    // 预览教案
    previewComments() {
      let teachplan_id = this.teachplan_id;
      this.$router.push(
        `/Interesting/prepareLessons/previewCont?teachplan_id=${teachplan_id}&type=1`
      );
    },
    // 查看图片
    viewImg(imgurl) {
      window.open(imgurl);
    },
    // 返回关闭
    handBack() {
      this.$router.go(-1);
    },
    // 重置表单
    resetForm(form) {
      this.$refs[form].resetFields();
    },
    handleClose(done) {
      done();
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs["left_menu_height"]) {
        this.left_menu_height = this.$Tool.getTableHeight(
          this.$refs.left_menu_height.getBoundingClientRect().top
        );
      }
    });
  },
};
</script>

<style lang="less">
.Interesting-prepareLessons-lessonPlan {
  .btn-container {
    margin-bottom: 30px;
    text-align: right;
  }
  .el-dialog__footer {
    background: rgba(246, 249, 252, 1);
    border-top: 1px solid #dddddd;
    padding-bottom: 10px;
  }
  .el-dialog__title {
    color: #24356a;
    font-size: 16px;
  }

  .el-dialog__header {
    border-bottom: 1px solid #dddddd;
    padding-top: 10px;
  }
}
</style>
