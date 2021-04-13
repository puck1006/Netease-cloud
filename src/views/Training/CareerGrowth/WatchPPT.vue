<template>
  <div
    class="CareerGrowth-index CareerGrowth-viewCourses CareerGrowth-watchVideo CareerGrowth-watchPPT height100"
  >
    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">{{$t('Training.Watch.info[0]')}}</span>
      </div>
      <div class="cr-head-right">
        <span>
          {{$t('Training.Watch.info[1]')}}
          <span
            style="color:#00A6FF"
          >{{$t('Training.Watch.info[0]')}}</span>
        </span>
      </div>
    </div>
    <div class="body-container">
      <div class="left-container" :class="{'hideLeftDom':!isshowRight}" ref="leftDom">
        <div class="title-big">
          <span class="title-info">{{videoInfo.course_name}}</span>
        </div>
        <div class="video-container">
          <div class="flex flex-sb">
            <div class="description-container">
              <span class="description">{{videoInfo.trainhour_name}}</span>
            </div>
            <div class="description-container" style="margin-right:33px" v-if="!isshowRight">
              <el-button size="mini" @click="handleLast">{{$t('Training.Watch.info[4]')}}</el-button>
              <el-button
                size="mini"
                @click="handleNext"
                type="primary"
              >{{$t('Training.Watch.info[5]')}}</el-button>
            </div>
          </div>
          <div class="prism-player" id="player-con" v-if="isshowplayer"></div>
          <div class="PPT-box mt16" v-if="isshowplayer">
            <img
              class="left-img"
              :src="courseMenuList[LessonImgIndex]?courseMenuList[LessonImgIndex].pptpage_imgurl:''"
              alt
            />
            <div v-if="courseMenuList.length>0" class="ppt-bottom-menu flex-all">
              <div class="left">
                <span class="page-num">{{LessonImgIndex+1}} / {{courseMenuList.length}}</span>
                <!-- <img
                  @click="handCourseMenu()"
                  src="../../../assets/images/Interesting/icon-full-menu.png"
                  alt
                />-->
              </div>
              <div class="right">
                <span
                  class="right-icon icon-ppt-prev"
                  :class="{'icon-ppt-prev-d':LessonImgIndex==0}"
                  @click="prev"
                ></span>
                <span
                  class="right-icon icon-ppt-next ml12"
                  :class="{'icon-ppt-next-d':LessonImgIndex == courseMenuList.length-1}"
                  @click="next"
                ></span>
              </div>
            </div>
          </div>
        </div>
        <div class="arror-right" @click="handleHideRight">
          <i class="el-icon-arrow-right" v-if="isshowRight"></i>
          <i class="el-icon-arrow-left" v-if="!isshowRight"></i>
        </div>
      </div>
      <div class="right-container" ref="rightDom" v-if="isshowRight">
        <infoCard
          style="width:95%;margin-left:10px;"
          :title="item.chapter_name"
          :isshowRight="true"
          v-for="(item, index) in chapter"
          :key="index"
        >
          <div class="good-course">
            <div class="course-container" v-for="(item2, index2) in item.trainhour" :key="index2">
              <div
                @click="handleWatchAudio(item2,item)"
                class="course-item"
                v-if="item2.trainhour_class == 1"
              >
                <div>
                  <i class="my-circle" v-if="item2.learning_status == 0"></i>
                  <i class="icon-finish" v-if="item2.learning_status == 2"></i>
                  <i class="icon-jxz1" v-if="item2.learning_status == 1"></i>
                  <span>课时{{index2+1}} {{item2.trainhour_name}}</span>
                </div>
                <div>
                  <!-- <span class="time">01:11</span> -->
                </div>
              </div>
              <div
                @click="handleWathVideo(item2,item)"
                class="course-item"
                v-if="item2.trainhour_class == 0"
              >
                <div>
                  <i class="my-circle" v-if="item2.learning_status == 0"></i>
                  <i class="icon-finish" v-if="item2.learning_status == 2"></i>
                  <i class="icon-jxz1" v-if="item2.learning_status == 1"></i>
                  <span>课时{{index2+1}} {{item2.trainhour_name}}</span>
                </div>
                <div></div>
              </div>
              <div
                @click="handleWatchPPT(item2,item)"
                class="course-item"
                v-if="item2.trainhour_class == 2"
              >
                <div>
                  <i class="my-circle" v-if="item2.learning_status == 0"></i>
                  <i class="icon-finish" v-if="item2.learning_status == 2"></i>
                  <i class="icon-jxz1" v-if="item2.learning_status == 1"></i>
                  <span>课时{{index2+1}} {{item2.trainhour_name}}</span>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </infoCard>
      </div>
    </div>
    <div class="bg-white node-container">
      <div class="node-title">
        <div class="flex" style="cursor: pointer;" @click="handleViewAll">
          <div>{{$t('Training.Watch.info[2]')}}</div>
          <div class="el-icon-caret-right right-arrow"></div>
        </div>
        <div class="mr20">
          <el-button
            type="primary"
            @click="handleSave"
            v-if="isshowSave"
            size="small"
          >{{$t('Training.Watch.save')}}</el-button>
          <el-button
            type="warning"
            @click="handleEdit"
            v-else
            size="small"
          >{{$t('Training.Watch.edit')}}</el-button>
        </div>
      </div>
      <div>
        <el-input
          type="textarea"
          :placeholder="$t('Training.Watch.info[3]')"
          style="width:98%;"
          :rows="10"
          v-model="inputData"
          class="elinput"
          :disabled="isdisabled"
        ></el-input>
      </div>
    </div>
    <!-- 展开课件目录弹框 -->
    <div class="small-dialog popTips" v-if="showCourseMenu">
      <el-dialog
        title="查看图片"
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
import myCard from "@/components/Training/progressCard.vue";
import infoCard from "@/components/Training/infoCard.vue";
import httpApi from "./CareerGrowth";

export default {
  inject: ["reload"],
  data() {
    return {
      LessonImgIndex: 0, //当前显示的教案--图片
      showCourseMenu: false, //展开课件目录弹框
      inputData: "",
      isshowRight: true,
      course_id: "",
      trainhour_id: "",
      chapter_id: "",
      videoInfo: {},
      chapter: [],
      player: {},
      isshowplayer: true,
      isshowImg: false,
      courseMenuList: [],
      learning_id: "",
      isshowSave: true,
      isdisabled: false,
      noted: true,
      videoInfo: {},
    };
  },
  components: {
    myCard,
    infoCard,
  },
  created() {
    this.course_id = this.$route.query.course_id;
    this.trainhour_id = this.$route.query.trainhour_id;
    this.chapter_id = this.$route.query.chapter_id;
    console.log(this.course_id, this.trainhour_id);
    this.WatchVideo();
    this.AddWatchVideoInfoAction();
  },
  methods: {
    handleViewAll() {
      this.$Tool.setStorage("sliderActiveIndex", "3");
      this.$Tool.setStorage("navActiveIndex", "5");
      window.location = "/myCenter/myNote";
    },
    handleReset() {
      this.reload();
    },
    handleSave() {
      let that = this;
      if (this.inputData == "") {
        this.$message({
          message: "笔记不能为空",
          type: "error",
        });
        return false;
      }
      this.isshowSave = !this.isshowSave;
      this.isdisabled = true;

      if (this.noted) {
        httpApi
          .PersonNoteAction({
            course_id: this.course_id,
            chapter_id: this.chapter_id,
            trainhour_id: this.trainhour_id,
            learning_note: this.inputData,
          })
          .then((res) => {
            if (res.data.error == 0) {
              this.$message({
                message: res.data.errortip,
                type: "success",
              });

              this.noted = false;
            } else {
              this.$message({
                message: res.data.errortip,
                type: "error",
              });
            }
          });
      } else {
        httpApi
          .PersonNoteAction({
            course_id: this.course_id,
            chapter_id: this.chapter_id,
            trainhour_id: this.trainhour_id,
            learning_note: this.inputData,
            learning_id: this.learning_id,
          })
          .then((res) => {
            if (res.data.error == 0) {
              this.$message({
                message: res.data.errortip,
                type: "success",
              });
              this.noted = false;
            } else {
              this.$message({
                message: res.data.errortip,
                type: "error",
              });
            }
          });
      }

      if (this.videoInfo.learning_iswatch == 1) {
        httpApi
          .WatchVideoCompleteAction({
            learning_id: that.learning_id,
            learning_status: 2,
          })
          .then((res) => {
            if (res.data.error == 0) {
              that.WatchVideo();
              that.isshowplayer = false;
              that.$nextTick(() => {
                that.isshowplayer = true;
              });
              that.$message({
                message: res.data.errortip,
                type: "success",
              });
            } else {
              that.$message({
                message: res.data.errortip,
                type: "error",
              });
            }
          });
      }
    },
    handleEdit() {
      this.isshowSave = !this.isshowSave;
      this.isdisabled = false;
    },
    //展开课件目录弹框
    handCourseMenu() {},

    handleLast() {
      this.chapter.forEach((item, index) => {
        item.trainhour.forEach((item2, index2) => {
          if (item2.trainhour_id == this.videoInfo.trainhour_id) {
            if (index2 - 1 < 0) {
              this.$message({
                message: "没有上一节了",
                type: "error",
              });
              return false;
            }
            let value = item.trainhour[index2 - 1];
            if (value.trainhour_class == 0) {
              this.handleWathVideo(value, item);
            } else if (value.trainhour_class == 1) {
              this.handleWatchAudio(value, item);
            } else if (value.trainhour_class == 2) {
              this.handleWatchPPT(value, item);
            }
            console.log(item.trainhour[index2 - 1]);
          }
        });
      });
    },
    handleNext() {
      this.chapter.forEach((item, index) => {
        item.trainhour.forEach((item2, index2) => {
          if (item2.trainhour_id == this.videoInfo.trainhour_id) {
            if (index2 + 1 > item.trainhour.length - 1) {
              this.$message({
                message: "没有下一节了",
                type: "error",
              });
              return false;
            }
            let value = item.trainhour[index2 + 1];
            if (value.trainhour_class == 0) {
              this.handleWathVideo(value, item);
            } else if (value.trainhour_class == 1) {
              this.handleWatchAudio(value, item);
            } else if (value.trainhour_class == 2) {
              this.handleWatchPPT(value, item);
            }
            console.log(item.trainhour[index2 + 1]);
          }
        });
      });
    },
    // 上一张图片
    prev() {
      if (this.LessonImgIndex > 0) {
        this.LessonImgIndex = this.LessonImgIndex - 1;
      }
    },
    // 下一张图片
    next() {
      if (this.LessonImgIndex < this.courseMenuList.length - 1) {
        this.LessonImgIndex = this.LessonImgIndex + 1;
      }
      if (
        this.LessonImgIndex == this.courseMenuList.length - 1 &&
        this.videoInfo.learning_iswatch != 1
      ) {
        httpApi
          .WatchVideoCompleteAction({
            learning_id: this.learning_id,
            learning_status: this.noted ? 1 : 2,
            learning_iswatch: 1,
          })
          .then((res) => {
            this.WatchVideo();
            if (res.data.error == 0) {
              this.$message({
                message: res.data.errortip,
                type: "success",
              });
            } else {
              this.$message({
                message: res.data.errortip,
                type: "error",
              });
            }
          });
      }
    },
    AddWatchVideoInfoAction() {
      httpApi
        .AddWatchVideoInfoAction({
          course_id: this.course_id,
          chapter_id: this.chapter_id,
          trainhour_id: this.trainhour_id,
        })
        .then((res) => {
          this.learning_id = res.data.result.learning_id;
        });
    },
    WatchVideo() {
      httpApi
        .WatchVideo({
          trainhour_id: this.trainhour_id,
          course_id: this.course_id,
        })
        .then((res) => {
          this.chapter = res.data.result.list.chapter;
          this.courseMenuList = res.data.result.list.list.trainhour_img[0];
          this.videoInfo = res.data.result.list.list;
          this.inputData = res.data.result.list.list.learning_note;
        });
    },
    handlecourse1() {
      this.$message({
        message: "上阶段考核合格才可继续学习哦～",
        type: "warning",
      });
    },
    handleHideRight() {
      this.isshowRight = !this.isshowRight;
    },
    handleWathVideo(item, val) {
      if (!item.learning_status) {
        this.handlecourse1();
        return false;
      }
      val.trainhour.forEach((info, index) => {
        if (info.trainhour_id == item.trainhour_id) {
          console.log(index - 1);
          if (
            item.learning_status == 0 &&
            index - 1 > 0 &&
            val.trainhour[index - 1].learning_status != 2
          ) {
            this.handlecourse1();
            return false;
          } else {
            this.course_id = this.$route.query.course_id;
            this.trainhour_id = item.trainhour_id;
            this.chapter_id = val.chapter_id;
            this.$router.push({
              path: `/Training/WatchVideo?course_id=${this.course_id}&trainhour_id=${this.trainhour_id}&chapter_id=${this.chapter_id}`,
            });
          }
        }
      });
    },
    handleWatchPPT(item, val) {
      if (!item.learning_status) {
        this.handlecourse1();
        return false;
      }
      val.trainhour.forEach((info, index) => {
        if (info.trainhour_id == item.trainhour_id) {
          console.log(index - 1);
          if (
            item.learning_status == 0 &&
            index - 1 > 0 &&
            val.trainhour[index - 1].learning_status != 2
          ) {
            // console.log(item.learning_status,index-1,val.trainhour[index - 1].learning_status)
            this.handlecourse1();
            return false;
          } else {
            console.log(item, val, this.$route.query.course_id);
            this.course_id = this.$route.query.course_id;
            this.trainhour_id = item.trainhour_id;
            this.chapter_id = val.chapter_id;
            this.$router.push({
              path: `/Training/WatchPPT?course_id=${this.course_id}&trainhour_id=${this.trainhour_id}&chapter_id=${this.chapter_id}`,
            });
            this.handleReset();
          }
        }
      });
    },
    handleWatchAudio(item, val) {
      if (!item.learning_status) {
        this.handlecourse1();
        return false;
      }
      val.trainhour.forEach((info, index) => {
        if (info.trainhour_id == item.trainhour_id) {
          console.log(index - 1);
          if (
            item.learning_status == 0 &&
            index - 1 > 0 &&
            val.trainhour[index - 1].learning_status != 2
          ) {
            this.handlecourse1();
            return false;
          } else {
            this.course_id = this.$route.query.course_id;
            this.trainhour_id = item.trainhour_id;
            this.chapter_id = val.chapter_id;
            console.log(item, val);
            this.$router.push({
              path: `/Training/WatchAudio?course_id=${this.course_id}&trainhour_id=${this.trainhour_id}&chapter_id=${this.chapter_id}`,
            });
          }
        }
      });
    },
    newAliplayerUIsOver() {
      let player = new Aliplayer(
        {
          id: "player-con",
          source: "//player.alicdn.com/video/aliyunmedia.mp4",
          width: "98%",
          height: "600px",
          autoplay: true,
          isLive: false,
          rePlay: false,
          playsinline: true,
          preload: true,
          controlBarVisibility: "hover",
          useH5Prism: true,
          components: [
            {
              name: "PlaylistComponent",
              type: AliPlayerComponent.PlaylistComponent,
              args: [
                [
                  {
                    name: "阿里云播放器介绍",
                    source: "//player.alicdn.com/video/editor.mp4",
                  },
                  {
                    name: "趣拍演示视频",
                    source: "//player.alicdn.com/resource/player/qupai.mp4",
                  },
                  {
                    name: "云栖大会",
                    source: "http://player.pier39.cn/video/yunxi.mp4",
                  },
                  {
                    name: "4K 阿里视频云介绍",
                    source: "https://player.alicdn.com/video/apsaravideo4k.mp4",
                  },
                ],
              ],
            },
          ],
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
          console.log("The player is created");
        }
      );
    },
    newAliplayerIsbegin() {
      var player = new Aliplayer(
        {
          id: "player-con",
          source: this.videoInfo.trainhour_fileurl,
          width: "98%",
          height: "55vh",
          autoplay: false,
          // cover: this.videoInfo.trainhour_coverimg,
          isLive: false,
          rePlay: false,
          playsinline: true,
          preload: true,
          controlBarVisibility: "hover",
          useH5Prism: true,
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
                  name: "volume",
                  align: "tr",
                  x: 5,
                  y: 10,
                },
              ],
            },
          ],
        },
        function (player) {}
      );
    },
  },
  mounted() {
    console.log(document.getElementsByClassName("list"), "listst");
    console.log(document.querySelector(".list"));
  },
};
</script>
<style lang="less">
@import "../Training.less";

.CareerGrowth-watchPPT {
  .left-container {
    position: relative;
  }

  .arror-right {
    background-color: pink;
    position: absolute;
    right: -3px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    cursor: pointer;
    height: 100px;
    background: rgba(255, 255, 255, 1);
    box-shadow: -8px 0px 20px 0px rgba(64, 67, 100, 0.2);
    border-radius: 16px;
    text-align: right;

    i {
      line-height: 100px;
      font-size: 30px;
      font-weight: 700;
    }
  }

  .PPT-box {
    position: relative;
    padding-bottom: 40px;

    img {
      width: 100%;
    }

    .left-img {
      height: 70vh;
    }

    .ppt-bottom-menu {
      width: 100%;
      height: 40px;
      position: absolute;
      bottom: 0;
      left: 0;
      background: #333333;
      padding: 0 32px;

      img {
        width: 20px;
        cursor: pointer;
      }

      .right-icon {
        width: 20px;
        height: 20px;
        display: inline-block;
        cursor: pointer;
      }

      .icon-ppt-prev {
        background: url("../../../assets/images/Interesting/icon-ppt-prev.png")
          no-repeat;
        background-size: 100% 100%;
      }

      .icon-ppt-prev-d {
        background: url("../../../assets/images/Interesting/icon-ppt-prev-d.png")
          no-repeat;
        background-size: 100% 100%;
      }

      .icon-ppt-next {
        background: url("../../../assets/images/Interesting/icon-ppt-next.png")
          no-repeat;
        background-size: 100% 100%;
      }

      .icon-ppt-next-d {
        background: url("../../../assets/images/Interesting/icon-ppt-next-d.png")
          no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}

.page-num {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
}
</style>