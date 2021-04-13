<template>
  <div class="Interesting-hight Work-highLesson height100">
    <!-- 左边标题 -->
    <div class="left-lessonName">{{hour_name}}</div>
    <!-- 页面右边按钮***start -->
    <div class="right-btn fs14 flex-all">
      <div class="btn-upload">
        <el-upload
          class="userInfo_img"
          name="ossfile"
          :show-file-list="false"
          :action="`${$urls.easxApiUrl}/Courseware/File`"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :data="Uploadimg"
        ></el-upload>
        <el-button type="primary" size="mini" class="fs14">
          {{$t(
          'Interesting.preLessonDetais.btn_text7'
          )}}
        </el-button>
      </div>
      <i class="btn-close icon-gb ml10 cur-pointer" @click="handBack()"></i>
    </div>
    <div
      ref="content_box_height"
      :style="{ height: content_box_height + 'px' }"
      class="content-box flex bg-white"
    >
      <div class="left-work">
        <div class="flex-al mb12">
          <span class="left-line-orange mr10"></span>
          <span class="color-243 fs18">
            {{$t(
            'Interesting.preLessonDetais.highVideo_stitle1'
            )}}
          </span>
        </div>
        <div class="current-lessonPlan">
          <Lessonplan
            :courseMenuList="courseMenuList"
            :LessonPlanInfoOneData="lessonPlanList"
            :LessonImgIndex="LessonImgIndex"
            @prev="prev"
            @next="next"
            @handCourseMenu="handCourseMenu"
          ></Lessonplan>
        </div>
        <div
          v-if="videoList.perfectOne &&videoList.perfectOne.tempvideo_details!=''"
          class="teacher-poster mt16"
        >
          <div class="flex-al mb16">
            <span class="left-line-orange mr10"></span>
            <span class="color-243 fs18">
              {{$t(
              'Interesting.preLessonDetais.small_title4'
              )}}
            </span>
          </div>
          <div class="comment overflow_scroll fs14">{{videoList.perfectOne.tempvideo_details}}</div>
        </div>
      </div>
      <div class="right-work overflow_scroll">
        <div class="flex-sb">
          <div class="flex-al mb12">
            <span class="left-line-orange mr10"></span>
            <span class="color-243 fs18">
              {{$t(
              'Interesting.preLessonDetais.highVideo_stitle2'
              )}}
            </span>
          </div>
          <router-link
            :to="{ path: `/Interesting/prepareLessons/allWork?teachplan_id=${teachplan_id}&classcode_branch=${classcode_branch}&teachhour_branch=${teachhour_branch}` }"
            class="color-blue fs14 cur-pointer"
          >
            {{$t(
            'Interesting.preLessonDetais.see_more'
            )}}
            <i
              class="el-icon-caret-right"
            ></i>
          </router-link>
        </div>
        <div v-if="videoList.perfect &&videoList.perfect.length>0" class="all-video">
          <template v-for="(item,index) in videoList.perfect">
            <workOne
              :key="index"
              :workInfo="item"
              :currentIndex="index"
              @viewVideo="changeVideoPlay"
              @handVate="handVate"
            ></workOne>
          </template>
        </div>
        <blank v-else :blankCont="tips"></blank>
      </div>
    </div>
    <!-- 展开课件目录弹框 -->
    <div class="small-dialog popTips" v-if="showCourseMenu">
      <el-dialog
        :title="lessonPlanList.teachplan_name"
        :visible.sync="showCourseMenu"
        width="1200px"
        class="showCourseMenu"
        :before-close="handleClose"
        :modal-append-to-body="false"
      >
        <div class="dialog-content">
          <ul class="menu-list">
            <li
              @click="selectCourseMenu(item,index)"
              v-for="(item,index) in courseMenuList"
              :key="index"
              class="fs14 color-4C5 tc"
            >
              <img :src="item.teachpics_url" alt />
              <p class="mb8 mt8">
                {{$t(
                'Common.page[0]'
                )}}{{ item.teachpics_sort }}{{$t(
                'Common.page[1]'
                )}}
              </p>
            </li>
          </ul>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini">确定</el-button>
          <el-button size="mini">取消</el-button>
        </span>-->
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Lessonplan from "@/components/LessonPlan/Lessonplan.vue";
import popTips from "@/components/common/popTips/popTips.vue";
import blank from "@/components/common/Blank/blank.vue";
import workOne from "@/components/highWork/workOne.vue"; //优质作品
import httpApi from "../../Interesting";
export default {
  name: "Interesting-hightWork-highLesson",
  components: {
    popTips,
    workOne,
    Lessonplan,
    blank
  },
  data() {
    return {
      content_box_height: 0,
      currentIndex: 0, //当前播放的视频
      Uploadimg: {
        ossfile: "",
        company_id: this.$userDetails.companyId
      },
      hour_name: "", //课时名称
      // 上传的教学视频信息
      tempvideoInfo: {
        tempvideo_name: "", //视频名称
        tempvideo_author: "", //视频作者
        tempvideo_coverimg: "", //教案封面
        tempvideo_videourl: "" //视频url
      },
      //优秀教案
      lessonPlanList: {},
      LessonImgIndex: 0, //当前显示的教案--图片
      showCourseMenu: false, //展开课件目录弹框
      courseMenuList: [
        {
          teachplan_name: "WK1 Lesson 1（中师上）",
          teachpics_id: "135",
          teachpics_url:
            "http://oss.kidcastle.cn/EAS/jiaoan/WK1/Lesson1/down/WK1Lesson1_4.Png",
          teachpics_sort: "4"
        },
        {
          teachplan_name: "WK1 Lesson 1（中师上）",
          teachpics_id: "136",
          teachpics_url:
            "http://oss.kidcastle.cn/EAS/jiaoan/WK1/Lesson1/down/WK1Lesson1_5.Png",
          teachpics_sort: "5"
        },
        {
          teachplan_name: "WK1 Lesson 1（中师上）",
          teachpics_id: "137",
          teachpics_url:
            "http://oss.kidcastle.cn/EAS/jiaoan/WK1/Lesson1/down/WK1Lesson1_6.Png",
          teachpics_sort: "6"
        }
      ], //展开课件目录列表
      // 分页
      paging: {
        curPage: 1,
        pageSize: 30,
        pageTotal: 0
      },
      videoList: {}, //优秀视频
      tips: "暂时没有其他优秀教学视频哦"
    };
  },
  watch: {},
  computed: {},
  created() {
    this.classcode_branch = this.$route.query.classcode_branch;
    this.teachhour_branch = this.$route.query.teachhour_branch;
    this.teachplan_id = this.$route.query.teachplan_id;
    this.getExcellentPostilVideo(); //备课->获取优秀批注/视频 -- wgh
  },
  methods: {
    //备课->获取优秀批注/视频 -- wgh
    getExcellentPostilVideo() {
      httpApi
        .getExcellentPostilVideo({
          is_count: "1", //是否需要总数，可以不传
          p: this.paging.curPage,
          num: this.paging.pageSize,
          teachhour_branch: this.teachhour_branch,
          code: "3" // 1点赞数 2观看数 3最新
        })
        .then(res => {
          this.hour_name = res.data.result.list.hour_name.hour_name;
          if (res.data.error == 0) {
            this.videoList = res.data.result.list;
          } else {
            this.videoList = {
              perfectOne: {},
              perfect: []
            };
          }
          this.getTeachpics("one"); //备课->课件模式->展开课件目录 -- wgh
        });
    },
    //备课->课件模式->展开课件目录 -- wgh
    getTeachpics(type) {
      httpApi
        .getTeachpics({
          teachplan_id: this.teachplan_id
        })
        .then(res => {
          if (res.data.error == 0) {
            this.courseMenuList = res.data.result.list;
          } else {
            this.courseMenuList = [];
          }
          if (type == "more") {
            this.showCourseMenu = true;
          } else {
            this.lessonPlanList = this.courseMenuList[0]
              ? this.courseMenuList[0]
              : [];
          }
        });
    },
    //备课->添加/取消点赞 -- wgh
    AddCancelPraiseAction(tempvideo_id, code, index, type) {
      httpApi
        .AddCancelPraiseAction({
          tempvideo_id: tempvideo_id, //视频点赞/取消点赞时需传
          temppostil_id: "", //批注点赞/取消点赞时需传
          code: code //是否点赞 0取消点赞 1点赞
        })
        .then(res => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            if (type == "one") {
              // 单个视频
              this.videoList.perfectOne.is_zan = !this.videoList.perfectOne
                .is_zan;
            } else {
              this.videoList.perfect[index].is_zan = !this.videoList.perfect[
                index
              ].is_zan;
            }
            this.getExcellentPostilVideo(); //备课->获取优秀批注/视频 -- wgh
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    //备课->上传个人教学视频 -- wgh
    UploadVideoAction() {
      httpApi
        .UploadVideoAction({
          classcode_branch: this.classcode_branch, //班别编号
          teachhour_branch: this.teachhour_branch, //课时编号
          tempvideo_name: this.tempvideoInfo.tempvideo_name,
          tempvideo_author: this.tempvideoInfo.tempvideo_author,
          tempvideo_coverimg: this.tempvideoInfo.tempvideo_coverimg,
          tempvideo_videourl: this.tempvideoInfo.tempvideo_videourl
        })
        .then(res => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            this.getExcellentPostilVideo(); //备课->获取优秀批注/视频 -- wgh
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    // 视频上传
    handleAvatarSuccess(res, file) {
      if (res.error == "0") {
        console.log(res.result, file);
        this.tempvideoInfo.tempvideo_videourl = res.result.file_url;
        let name = this.tempvideoInfo.tempvideo_videourl;
        let pos = name.lastIndexOf("/"); //'/所在的最后位置'
        let str = name.substr(pos + 1); //截取文件名称字符串
        this.tempvideoInfo.tempvideo_name = str;
        this.tempvideoInfo.tempvideo_author = this.$Tool.getStorage("UserInfo")
          ? this.$Tool.getStorage("UserInfo").staffer_cnname
          : "";
        this.UploadVideoAction(); //备课->上传个人教学视频 -- wgh
      }
    },
    // 视频上传前格式校验
    beforeAvatarUpload(file) {
      console.log(file, "这是视频数据");
      const isAvi = file.type === "video/avi";
      const isMpg = file.type === "video/mpg";
      const isMpeg = file.type === "video/mpeg";
      const isMp4 = file.type === "video/mp4";
      const isVideo = isAvi || isMpg || isMpeg || isMp4;
      if (!isVideo) {
        this.$message.error("上传头像图片只能是 AVI/MPG/MPEG/MP4 格式!");
      }
      return isVideo;
    },
    // 是否点赞
    handVate(item, index, type) {
      let code = "";
      //是否点赞 0取消点赞 1点赞
      if (item.is_zan) {
        code = "0";
      } else {
        code = "1";
      }
      this.AddCancelPraiseAction(item.tempvideo_id, code, index, type);
    },
    // 切换当前播放的视频
    changeVideoPlay(slide, index) {
      this.currentIndex = index;
      console.log(1111);
      this.$router.push(
        `/Interesting/prepareLessons/highWork?teachplan_id=${this.teachplan_id}&classcode_branch=${this.classcode_branch}&teachhour_branch=${this.teachhour_branch}`
      );
    },
    // 上一张图片
    prev() {
      if (this.LessonImgIndex > 0) {
        this.LessonImgIndex = this.LessonImgIndex - 1;
        this.lessonPlanList = this.courseMenuList[this.LessonImgIndex];
      }
    },
    // 下一张图片
    next() {
      if (this.LessonImgIndex < parseInt(this.courseMenuList.length) - 1) {
        this.LessonImgIndex = this.LessonImgIndex + 1;
        this.lessonPlanList = this.courseMenuList[this.LessonImgIndex];
      }
    },
    //展开课件目录弹框
    handCourseMenu() {
      this.getTeachpics("more"); //备课->课件模式->展开课件目录 -- wgh
    },
    // 展开的课件目录点击
    selectCourseMenu(item, index) {
      this.LessonImgIndex = index;
      this.lessonPlanList.teachpics_url = item.teachpics_url;
      this.showCourseMenu = false;
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
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs["content_box_height"]) {
        this.content_box_height = this.$Tool.getTableHeight(
          this.$refs.content_box_height.getBoundingClientRect().top
        );
      }
    });
  }
};
</script>

<style lang="less">
@import "../../Interesting.less";
.Interesting-hightWork-highLesson {
}
</style>
