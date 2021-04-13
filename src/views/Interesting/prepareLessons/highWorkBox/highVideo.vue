<template>
  <div class="highWork-container">
    <!-- 左边标题 -->
    <div
      class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7"
    >
      <div class="ct-head-left flex-al ml20">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18"> {{ hour_name }} </span>
      </div>
      <div class="cr-head-right">
        <i class="btn-close icon-gb ml10 cur-pointer" @click="handBack()"></i>
      </div>
    </div>
    <div
      class="Interesting-highWork Interesting-hight Work-highVideo height100"
    >
      <div
        ref="content_box_height"
        :style="{ height: content_box_height + 'px' }"
        class="content-box flex bg-white"
      >
        <div class="left-work">
          <div class="flex-al mb12 top-wrapper">
            <div class="left">
              <span class="left-line-orange mr10"></span>
              <span class="color-243 fs18">
                {{ currentIndexStatus == 1 ? "教学教案" : "教学视频" }}
              </span>
            </div>
            <div class="right">
              <span
                class="mr10 fs14"
                @click="handClckTabs(1, 0)"
                v-if="currentIndexStatus == 1"
                >切换视频<i
                  class="icon icon_1 ml10"
                  style="transform: translateY(2px)"
                ></i
              ></span>
              <span
                class="mr10 fs14"
                @click="handClckTabs(1, 1)"
                v-if="currentIndexStatus == 0"
                >切换教案<i
                  class="icon icon_1 ml10"
                  style="transform: translateY(2px)"
                ></i
              ></span>
            </div>
          </div>
          <div v-if="videoList.perfectOne" class="current-video">
            <div class="video-box">
              <!--是否图片模式 -->
              <div v-if="currentIndexStatus == 1" class="PPT-box mt16">
                <Lessonplan
                  :courseMenuList="courseMenuList"
                  :LessonPlanInfoOneData="courseMenuList[LessonImgIndex]"
                  :LessonImgIndex="LessonImgIndex"
                  @prev="prev"
                  @next="next"
                  @handCourseMenu="handCourseMenu"
                ></Lessonplan>
              </div>
              <div v-if="isShowvideoBox">
                <div
                  v-if="isShowvideoBox && currentIndexStatus === 0"
                  class="video-box"
                  id="player-box"
                  ref="player-box"
                ></div>
              </div>
              <blank
                v-if="courseMenuList.length == 0 && currentIndexStatus == 1"
                :blankCont="tips"
              ></blank>
            </div>
            <div
              class="bottom flex-all fs12 color-8A9"
              v-if="isShowvideoBox && currentIndexStatus === 0"
            >
              <div class="flex-al-ce">
                {{ $t("Interesting.preLessonDetais.bottomText[0]") }}
                <!-- <img src="../../../assets/images/default-new-men.png" alt="" /> -->
                {{ videoList.perfectOne.tempworks_author }}
                <span class="ml6">{{
                  videoList.perfectOne.tempworks_createtime
                }}</span>
              </div>
              <div class="right">
                <span class="mr16">
                  {{ $t("Interesting.preLessonDetais.bottomText[1]") }}
                  {{ videoList.perfectOne.watch_num }}
                </span>
                <span
                  class="color-red cur-pointer"
                  @click="handVate(videoList.perfectOne, 0, 'one')"
                >
                  <i
                    v-if="videoList.perfectOne.is_praise"
                    class="icon-dz mr4"
                  ></i>
                  <i v-else class="icon-wdz mr4"></i>
                  {{ $t("Interesting.preLessonDetais.bottomText[2]")
                  }}{{ videoList.perfectOne.praise_num }}
                </span>
              </div>
            </div>
          </div>
          <!-- <div
          v-if="
            videoList.perfectOne && videoList.perfectOne.tempworks_details != ''
          "
          class="teacher-poster mt16"
        >
          <div class="flex-al mb16">
            <span class="left-line-orange mr10"></span>
            <span class="color-243 fs18">
              {{ $t("Interesting.preLessonDetais.small_title4") }}
            </span>
          </div>
          <div class="comment overflow_scroll fs14">
            {{ videoList.perfectOne.tempworks_details }}
          </div>
        </div> -->
          <div
            v-if="
              videoList &&
              videoList.perfectOne &&
              videoList.perfectOne.tempworks_matters != ''
            "
            class="flex-al mt16 mb16"
          >
            <span class="left-line-orange mr10"></span>
            <span class="color-243 fs18">
              {{ $t("Interesting.preLessonDetais.small_title9") }}
            </span>
          </div>
          <div
            v-if="
              videoList &&
              videoList.perfectOne &&
              videoList.perfectOne.tempworks_matters != ''
            "
            class="message-item fs14 pb16"
            style="border-bottom: 1px solid #ddd"
            v-html="videoList.perfectOne.tempworks_matters"
          ></div>

          <div
            v-if="
              videoList &&
              videoList.perfectOne &&
              videoList.perfectOne.tempworks_postil != ''
            "
            class="flex-al mt16 mb16"
          >
            <span class="left-line-orange mr10"></span>
            <span class="color-243 fs18">
              {{ $t("Interesting.preLessonDetais.small_title4") }}
            </span>
          </div>
          <div
            v-if="
              videoList &&
              videoList.perfectOne &&
              videoList.perfectOne.tempworks_postil != ''
            "
            class="comment comment1 pb16"
            style="border-bottom: 1px solid #ddd"
            v-html="videoList.perfectOne.tempworks_postil"
          ></div>

          <div class="flex-all mt16 mb16">
            <span class="flex-al">
              <span class="left-line-orange mr10"></span>
              <span class="color-243 fs18"> 老师批注 </span>
            </span>
          </div>
          <div
            class="person-form mb20"
            v-if="
              videoList &&
              videoList.perfectOne &&
              videoList.perfectOne.prepare_postil
            "
          >
            <el-input
              type="textarea"
              :rows="5"
              disabled
              :placeholder="$t('Interesting.preLessonDetais.placeholder1')"
              maxlength="500"
              v-model="videoList.perfectOne.prepare_postil"
            ></el-input>
            <!-- <span class="xianzhi fs14 color-8A9">{{ remnant }}/500</span> -->
          </div>
        </div>
        <div class="right-work overflow_scroll">
          <div class="flex-sb">
            <div class="flex-al mb12">
              <span class="left-line-orange mr10"></span>
              <span class="color-243 fs18">
                {{ currentIndexStatus == 0 ? "教学教案" : "教学视频" }}
              </span>
            </div>
          </div>
          <!--是否图片模式 -->
          <div v-if="currentIndexStatus == 0" class="PPT-box mt16">
            <Lessonplan
              :courseMenuList="courseMenuList"
              :LessonPlanInfoOneData="courseMenuList[LessonImgIndex]"
              :LessonImgIndex="LessonImgIndex"
              @prev="prev"
              @next="next"
              @handCourseMenu="handCourseMenu"
            ></Lessonplan>
          </div>
          <div v-else>
            <div class="video-box" id="player-box" ref="player-box"></div>
          </div>
          <blank
            v-if="courseMenuList.length == 0 && currentIndexStatus == 0"
            :blankCont="tips"
          ></blank>
        </div>
      </div>
      <!-- 展开课件目录弹框 -->
      <div class="small-dialog popTips" v-if="showCourseMenu">
        <el-dialog
          title="详情"
          :visible.sync="showCourseMenu"
          width="1240px"
          class="showCourseMenu"
          :before-close="handleClose"
          :modal-append-to-body="false"
        >
          <div class="dialog-content">
            <ul class="menu-list">
              <li
                @click="selectCourseMenu(item, index)"
                v-for="(item, index) in courseMenuList"
                :key="index"
                class="fs14 color-4C5 tc"
              >
                <img :src="item.teachpics_url" alt />
                <p class="mb8 mt8">
                  {{ $t("Common.page[0]") }}{{ item.teachpics_sort
                  }}{{ $t("Common.page[1]") }}
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
  </div>
</template>

<script>
// import popTips from "@/components/common/popTips/popTips.vue";
import Lessonplan from "@/components/LessonPlan/Lessonplan.vue";
import blank from "@/components/common/Blank/blank.vue";
import workOne from "@/components/highWork/workOne.vue"; //优质作品
import httpApi from "../../Interesting";
export default {
  name: "Interesting-hightWork-highVideo",
  components: {
    // popTips,
    workOne,
    blank,
    Lessonplan,
  },
  data() {
    return {
      typeStatus: "",
      showCourseMenu: false,
      courseMenuList: [
        {
          teachplan_name: "WK1 Lesson 1（中师上）",
          teachpics_id: "135",
          teachpics_url:
            "http://oss.kidcastle.cn/EAS/jiaoan/WK1/Lesson1/down/WK1Lesson1_4.Png",
          teachpics_sort: "4",
        },
        {
          teachplan_name: "WK1 Lesson 1（中师上）",
          teachpics_id: "136",
          teachpics_url:
            "http://oss.kidcastle.cn/EAS/jiaoan/WK1/Lesson1/down/WK1Lesson1_5.Png",
          teachpics_sort: "5",
        },
        {
          teachplan_name: "WK1 Lesson 1（中师上）",
          teachpics_id: "137",
          teachpics_url:
            "http://oss.kidcastle.cn/EAS/jiaoan/WK1/Lesson1/down/WK1Lesson1_6.Png",
          teachpics_sort: "6",
        },
      ], //展开课件目录列表
      lessonPlanList: {},
      LessonImgIndex: 0, //当前显示的教案--图片
      content_box_height: 0,
      currentIndexStatus: 0,
      currentIndex: 0, //当前播放的视频
      Uploadimg: {
        ossfile: "",
        company_id: this.$userDetails.companyId,
      },
      hour_name: "", //课时名称
      isShowvideoBox: false, //是否显示视频
      // 上传的教学视频信息
      tempworksInfo: {
        tempworks_name: "", //视频名称
        tempworks_author: "", //视频作者
        tempworks_coverimg: "", //教案封面
        tempworks_videourl: "", //视频url
      },
      // 分页
      paging: {
        curPage: 1,
        pageSize: 30,
        pageTotal: 0,
      },
      playNum: 0,
      player: {}, //播放参数
      videoList: {}, //优秀视频
      tips: "暂时没有教学教案哦~",
    };
  },
  watch: {},
  computed: {},
  created() {
    this.classcode_branch = this.$route.query.classcode_branch;
    this.course_branch = this.$route.query.course_branch;
    this.teachhour_branch = this.$route.query.teachhour_branch;
    this.teachplan_id = this.$route.query.teachplan_id;
    this.getExcellentPostilVideo(); //备课->获取优秀批注/视频 -- wgh
  },
  methods: {
    // 展开的课件目录点击
    selectCourseMenu(item, index) {
      this.LessonImgIndex = index;
      this.lessonPlanList.teachpics_url = item.teachpics_url;
      this.showCourseMenu = false;
    },
    // 切换模式
    handClckTabs(item, index) {
      this.currentIndexStatus = index;
      this.LessonPlanIndex = 0;
      this.LessonImgIndex = 0;
      this.getExcellentPostilVideo(); //备课->获取教案信息 -- wgh
    },
    //展开课件目录弹框
    handCourseMenu() {
      this.typeStatus = "more";
      this.getExcellentPostilVideo(); //备课->课件模式->展开课件目录 -- wgh
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
    //备课->获取优秀批注/视频 -- wgh
    getExcellentPostilVideo() {
      httpApi
        .getExcellentPostilVideo({
          is_count: "1", //是否需要总数，可以不传
          p: this.paging.curPage,
          num: this.paging.pageSize,
          // course_branch: this.course_branch,
          teachhour_branch: this.teachhour_branch,
          tempworks_id: this.$route.query.tempworks_id,
          code: "3", // 1点赞数 2观看数 3最新
        })
        .then((res) => {
          this.hour_name = res.data.result.list.hour_name.hour_name;
          if (res.data.error == 0) {
            this.videoList = res.data.result.list;
            this.videoList.perfectOne = res.data.result.list.list;
            this.isShowvideoBox = true;
            this.$nextTick(() => {
              this.newAliplayerUIsOver();
              // if (this.currentIndexStatus == 1) {
              //   this.player = null;
              //   console.log("currentIndexStatus=========11111111111");
              //   console.log(this.player);
              // } else {
              //   console.log("currentIndexStatus=========22222222222222触发");
              //   this.newAliplayerUIsOver();
              // }
            });
            this.courseMenuList = res.data.result.list.list.img_list;
          } else {
            this.courseMenuList = [];
            this.videoList = {
              perfectOne: {},
              perfect: [],
            };
          }
          if (this.typeStatus == "more") {
            this.showCourseMenu = true;
          } else {
            this.lessonPlanList = this.courseMenuList[0]
              ? this.courseMenuList[0]
              : [];
          }
        });
    },
    //备课->添加/取消点赞 -- wgh
    AddCancelPraiseAction(tempworks_id, code, index, type) {
      httpApi
        .AddCancelPraiseAction({
          tempworks_id: tempworks_id, //视频点赞/取消点赞时需传
          temppostil_id: "", //批注点赞/取消点赞时需传
          code: code, //是否点赞 0取消点赞 1点赞
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            if (type == "one") {
              // 单个视频
              this.videoList.perfectOne.is_praise = !this.videoList.perfectOne
                .is_praise;
            } else {
              this.videoList.perfect[index].is_praise = !this.videoList.perfect[
                index
              ].is_praise;
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
          course_branch: this.course_branch,
          classcode_branch: this.classcode_branch, //班别编号
          teachhour_branch: this.teachhour_branch, //课时编号
          tempworks_name: this.tempworksInfo.tempworks_name,
          tempworks_author: this.tempworksInfo.tempworks_author,
          tempworks_coverimg: this.tempworksInfo.tempworks_coverimg,
          tempworks_videourl: this.tempworksInfo.tempworks_videourl,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            this.getExcellentPostilVideo(); //备课->获取优秀批注/视频 -- wgh
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    //备课->添加视频观看记录 -- wgh
    AddCancelWatchAction() {
      httpApi
        .AddCancelWatchAction({
          course_branch: this.course_branch,
          classcode_branch: this.classcode_branch, //班别编号
          // teachhour_branch: this.teachhour_branch, //课时编号
          tempworks_id: this.videoList.perfectOne.tempworks_id,
        })
        .then((res) => {
          if (res.data.error == 0) {
            // this.$message({ message: res.data.errortip, type: "success" });
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
        this.tempworksInfo.tempworks_videourl = res.result.file_url;
        let name = this.tempworksInfo.tempworks_videourl;
        let pos = name.lastIndexOf("/"); //'/所在的最后位置'
        let str = name.substr(pos + 1); //截取文件名称字符串
        this.tempworksInfo.tempworks_name = str;
        this.tempworksInfo.tempworks_author = this.$Tool.getStorage("UserInfo")
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
      if (item.is_praise) {
        code = "0";
      } else {
        code = "1";
      }
      this.AddCancelPraiseAction(item.tempworks_id, code, index, type);
    },
    // 切换当前播放的视频
    changeVideoPlay(slide, index) {
      this.currentIndex = index;
      console.log(1111);
      this.videoList.perfectOne = slide;
      this.playNum == 0;
      this.isShowvideoBox = false;
      // let dom=document.getElementById('player-box');
      // console.log(dom.getElementsByTagName('video'))
      // dom.getElementsByTagName('video').src=this.videoList.perfectOne.tempworks_videourl;
      this.$nextTick(() => {
        this.isShowvideoBox = true;
        this.$nextTick(() => {
          this.newAliplayerUIsOver(); //视频初始化
        });
      });
    },
    // 视频播放器设置--start
    // 可以拖动的视频播放器配置
    newAliplayerUIsOver() {
      let _this = this;
      // eslint-disable-next-line no-undef
      this.player = new Aliplayer(
        {
          id: "player-box",
          source: this.videoList.perfectOne.tempworks_videourl,
          width: "100%",
          // height: "600px",
          autoplay: false,
          isLive: false,
          rePlay: false,
          playsinline: true,
          preload: true,
          controlBarVisibility: "hover",
          useH5Prism: true,
          cover: this.videoList.perfectOne.tempworks_coverimg,
          skinLayout: [
            {
              name: "bigPlayButton",
              align: "blabs",
              x: 30,
              y: 80,
            },
            {
              name: "H5Loading",
              align: "cc",
            },
            {
              name: "errorDisplay",
              align: "tlabs",
              x: 0,
              y: 0,
            },
            {
              name: "infoDisplay",
            },
            {
              name: "tooltip",
              align: "blabs",
              x: 0,
              y: 56,
            },
            {
              name: "thumbnail",
            },
            {
              name: "controlBar",
              align: "blabs",
              x: 0,
              y: 0,
              children: [
                {
                  name: "progress",
                  align: "blabs",
                  x: 0,
                  y: 44,
                },
                {
                  name: "playButton",
                  align: "tl",
                  x: 15,
                  y: 12,
                },
                {
                  name: "timeDisplay",
                  align: "tl",
                  x: 10,
                  y: 7,
                },
                {
                  name: "fullScreenButton",
                  align: "tr",
                  x: 10,
                  y: 12,
                },
                {
                  name: "setting",
                  align: "tr",
                  x: 15,
                  y: 12,
                },
                {
                  name: "volume",
                  align: "tr",
                  x: 5,
                  y: 10,
                },
              ],
            },
          ],
        },
        function (player) {
          console.log(player, "The player is created");
        }
      );
      this.player.on("pause", function () {});
      this.player.on("ended", function () {
        if (_this.playNum == 0) {
          _this.AddCancelWatchAction();
          _this.playNum++;
        }
      });
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
      if (this.$refs["content_box_height"]) {
        this.content_box_height = this.$Tool.getTableHeight(
          this.$refs.content_box_height.getBoundingClientRect().top
        );
      }
    });
  },
};
</script>

<style lang="less">
@import "../../Interesting.less";
.highWork-container {
  .topContainer {
    background-color: #fff;
  }
}
.Interesting-hight.Work-highVideo {
  .menu-list {
    display: flex;
    flex-wrap: wrap;
    max-height: 600px;
    overflow-y: auto;
    li {
      width: 217px;
      margin: 8px;
      padding: 8px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 16px 0px rgba(27, 30, 73, 0.15);
      img {
        width: 100%;
      }
    }
  }
  .top-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon {
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      display: inline-block;
    }
    .icon_1 {
      display: inline-block;
      width: 20px;
      height: 17px;
      background-image: url(../../../../assets/images/sliderNav/nav_1_icon.png);
    }
    .left {
      display: flex;
      align-items: center;
    }
    .right {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
}
.Interesting-hightWork-highVideo {
}
</style>
