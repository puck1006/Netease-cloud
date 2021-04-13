<template>
  <div class="CareerGrowth-index CareerGrowth-viewCourses CareerGrowth-watchVideo height100">
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
          <div
            class="prism-player"
            :class="{'back-color':isshowImg}"
            id="player-con"
            v-if="isshowplayer"
          >
            <img src="../../../assets/images/audiocover.png" v-if="isshowImg" class="img-css" alt />
            <div class="arror-right" @click="handleHideRight">
              <i class="el-icon-arrow-right" v-if="isshowRight"></i>
              <i class="el-icon-arrow-left" v-if="!isshowRight"></i>
            </div>
          </div>
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
                  <i class="my-circle" v-if="!item2.learning_status||item2.learning_status == 0"></i>
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
                  <i class="my-circle" v-if="!item2.learning_status||item2.learning_status == 0"></i>
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
    <div class="bg-white node-container pt30">
      <div class="node-title">
        <div class="flex" @click="handleViewAll" style="cursor: pointer;">
          <div>{{$t('Training.Watch.info[2]')}}</div>
          <div class="el-icon-caret-right right-arrow"></div>
        </div>
        <div class="mr30">
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
          :disabled="isdisabled"
          type="textarea"
          :placeholder="$t('Training.Watch.info[3]')"
          style="width:99%;"
          :rows="10"
          v-model="inputData"
          class="elinput"
        ></el-input>
      </div>
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
      isshowSave: true,
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
      canDrag: false,
      playDuration: "",
      isdisabled: false,
      noted: true,
      learning_id: "",
      learning_status: 1,
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
    console.log(this.noted);
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

      if (
        this.videoInfo.learning_watchfinish == 1 &&
        this.videoInfo.learning_status != 2
      ) {
        httpApi
          .WatchVideoCompleteAction({
            learning_id: that.learning_id,
            learning_status: 2,
            learning_watchtime: that.player.getCurrentTime().toFixed(2),
            learning_watchfinish: 1,
          })
          .then((res) => {
            if (res.data.error == 0) {
              that.WatchVideo();
              that.isshowImg = false;
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
    AddWatchVideoInfoAction() {
      httpApi
        .AddWatchVideoInfoAction({
          course_id: this.course_id,
          chapter_id: this.chapter_id,
          trainhour_id: this.trainhour_id,
        })
        .then((res) => {
          this.learning_id = res.data.result.learning_id;
          if (res.data.error == 0) {
            this.WatchVideo();
          }
        });
    },
    WatchVideo() {
      httpApi
        .WatchVideo({
          trainhour_id: this.trainhour_id,
          course_id: this.course_id,
        })
        .then((res) => {
          this.videoInfo = res.data.result.list.list;
          this.chapter = res.data.result.list.chapter;
          this.inputData = res.data.result.list.list.learning_note;
          if (this.inputData != "") {
            this.noted = false;
          }
          if (this.videoInfo.learning_watchfinish == 0) {
            this.newAliplayerIsbegin();
          } else if (this.videoInfo.learning_watchfinish == 1) {
            this.newAliplayerUIsOver();
          }
        });
    },
    handlecourse1() {
      // this.$message({
      //   message: "上阶段考核合格才可继续学习哦～",
      //   type: "warning"
      // });
    },
    handleHideRight() {
      this.isshowRight = !this.isshowRight;
    },
    handleWathVideo(item, val) {
      // if (!item.learning_status) {
      //   this.handlecourse1();
      //   return false;
      // }
      val.trainhour.forEach((info, index) => {
        if (info.trainhour_id == item.trainhour_id) {
          console.log(index - 1);
          if (
            item.learning_status == 0 &&
            index - 1 > 0 &&
            val.trainhour[index - 1].learning_status != 2
          ) {
            // this.handlecourse1();
            // return false;
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
      // if (!item.learning_status) {
      //   this.handlecourse1();
      //   return false;
      // }
      val.trainhour.forEach((info, index) => {
        if (info.trainhour_id == item.trainhour_id) {
          console.log(index - 1);
          if (
            item.learning_status == 0 &&
            index - 1 > 0 &&
            val.trainhour[index - 1].learning_status != 2
          ) {
            // this.handlecourse1();
            // return false;
          } else {
            this.course_id = this.$route.query.course_id;
            this.trainhour_id = item.trainhour_id;
            this.chapter_id = val.chapter_id;

            this.$router.push({
              path: `/Training/WatchPPT?course_id=${this.course_id}&trainhour_id=${this.trainhour_id}&chapter_id=${this.chapter_id}`,
            });
          }
        }
      });
    },
    handleWatchAudio(item, val) {
      // if (!item.learning_status) {
      //   this.handlecourse1();
      //   return false;
      // }
      val.trainhour.forEach((info, index) => {
        if (info.trainhour_id == item.trainhour_id) {
          console.log(index - 1);
          if (
            item.learning_status == 0 &&
            index - 1 > 0 &&
            val.trainhour[index - 1].learning_status != 2
          ) {
            // this.handlecourse1();
            // return false;
          } else {
            this.course_id = this.$route.query.course_id;
            this.trainhour_id = item.trainhour_id;
            this.chapter_id = val.chapter_id;
            this.$router.push({
              path: `/Training/WatchAudio?course_id=${this.course_id}&trainhour_id=${this.trainhour_id}&chapter_id=${this.chapter_id}`,
            });
            this.handleReset();
          }
        }
      });
    },
    newAliplayerUIsOver() {
      let that = this;
      this.player = new Aliplayer(
        {
          id: "player-con",
          source: this.videoInfo.trainhour_fileurl,
          width: "98%",
          height: "55vh",
          autoplay: false,
          isLive: false,
          rePlay: false,
          playsinline: true,
          preload: true,
          controlBarVisibility: "hover",
          cover: this.videoInfo.trainhour_coverimg,
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
        function (player) {}
      );
      this.player.on("play", function () {
        that.isshowImg = true;
        // that.player.seek(5)
      });
      this.player.on("pause", function () {
        that.isshowImg = false;
        console.log();
      });
      this.player.on("ready", function () {});
      this.player.on("ended", function () {
        console.log("播放完毕");
      });
    },
    newAliplayerIsbegin() {
      let that = this;
      this.player = new Aliplayer(
        {
          id: "player-con",
          source: this.videoInfo.trainhour_fileurl,
          width: "98%",
          height: "55vh",
          autoplay: false,
          cover: this.videoInfo.trainhour_coverimg,
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
      this.player.on("play", function () {
        that.isshowImg = true;
        console.log();
      });
      this.player.on("pause", function () {
        that.isshowImg = false;
        that.player.getCurrentTime();
        console.log(that.player.getCurrentTime());
        console.log(that.player.getDuration());
        // player.seek(4);
        // player.play();
        // that.$message({
        //   message: "跳转到上次的播放时间",
        //   type: "success"
        // });
      });

      this.player.on("ready", function () {
        if (that.videoInfo.learning_watchfinish == 1) {
          that.player.seek(Math.floor(that.videoInfo.learning_watchtime));
          console.log("readyreadyready");
        }
      });

      if (this.videoInfo.learning_watchfinish == 0) {
        this.player.on("ready", function () {
          that.player.seek(that.videoInfo.learning_watchtime);
        });
      }

      this.player.on("ended", function () {
        console.log("播放完毕");
        httpApi
          .WatchVideoCompleteAction({
            learning_id: that.learning_id,
            learning_status: that.noted ? 1 : 2,
            learning_watchtime: that.player.getCurrentTime().toFixed(2),
            learning_watchfinish: 1,
          })
          .then((res) => {
            if (res.data.error == 0) {
              that.WatchVideo();
              that.isshowImg = false;
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
      });
    },
  },
  mounted() {},
  watch: {
    $route(to, from) {
      console.log(to.path);
    },
  },
  destroyed() {
    if (this.videoInfo.learning_watchfinish == 0) {
      httpApi
        .WatchVideoCompleteAction({
          learning_id: this.learning_id,
          learning_status: 1,
          learning_watchtime: this.player.getCurrentTime().toFixed(2),
          learning_watchfinish: 0,
        })
        .then((res) => {
          console.log(res, "页面离开发的接口");
          // if (res.data.error == 0) {
          //   that.WatchVideo();
          //   that.isshowImg = false;
          //   that.isshowplayer = false;
          //   that.$nextTick(() => {
          //     that.isshowplayer = true;
          //   });
          //   that.$message({
          //     message: res.data.errortip,
          //     type: "success"
          //   });
          // } else {
          //   that.$message({
          //     message: res.data.errortip,
          //     type: "error"
          //   });
          // }
        });
    }
    console.log("页面跳转");
  },
};
</script>
<style lang="less">
@import "../Training.less";
.CareerGrowth-watchVideo {
  .prism-player {
    position: relative;
  }
  .back-color {
    background: #f9fcff;
  }
  .prism-player .prism-controlbar .prism-controlbar-bg {
    background: black !important;
  }
  .img-css {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }
}
</style>
