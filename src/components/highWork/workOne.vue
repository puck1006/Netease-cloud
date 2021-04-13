<template>
  <div class="highWork-workOne cur-pointer">
    <div class="work-img">
      <video
        :src="workInfo.tempworks_videourl"
        width="100%"
        ref="videoObj"
        height="100%"
        controls
      ></video>
      <!-- <img v-if="workInfo.tempvideo_coverimg" :src="workInfo.tempvideo_coverimg" alt />
      <img v-else src="@/assets/images/info-img.png" alt />

      <div class="frame-img"></div> -->
      <!-- <div class="btn-video">
        <img src="@/assets/images/Interesting/video-pause.png" alt />
      </div> -->
    </div>
    <div class="info-container">
      <div class="top">
        <div class="left">
          <img
            v-if="workInfo.staffer_img != ''"
            :src="workInfo.staffer_img"
            alt
          />
          <img
            v-else-if="workInfo.staffer_sex == '女'"
            src="@/assets/images/woman.png"
            alt
          />
          <img v-else src="@/assets/images/default-new-men.png" alt />
          {{ workInfo.staffer_cnname }}
        </div>
        <div>
          <el-button size="mini" type="primary" @click="viewVideo"
            >查看详情</el-button
          >
        </div>
      </div>
      <div class="bottom flex-all fs12 color-8A9">
        <div class="flex-al-ce flex1">
          <!-- <img
          src="@/assets/images/default-new-men.png"
          alt
        />-->
          <span class="author flex1">
            {{ $t("Interesting.preLessonDetais.bottomText[0]") }}
            {{ workInfo.staffer_cnname }}
          </span>
          <span class="ml6">{{ workInfo.tempworks_createtime }}</span>
        </div>
        <div class="right">
          <span class="mr16">
            {{ $t("Interesting.preLessonDetais.bottomText[1]") }}
            {{ workInfo.watch_num }}
          </span>
          <span
            class="color-red cur-pointer"
            @click="handVate(workInfo, 0, 'one')"
          >
            <i v-if="workInfo.is_zan" class="icon-dz mr4"></i>
            <i v-else class="icon-wdz mr4"></i>
            {{ $t("Interesting.preLessonDetais.bottomText[2]")
            }}{{ workInfo.praise_num }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import httpApi from "@/views/Interesting/Interesting.js";

export default {
  name: "workOne",
  props: ["workInfo", "currentIndex"],
  components: {},
  data() {
    return {};
  },
  mounted() {
    window.setTimeout(() => {
      console.log(this.$refs.videoObj);
      this.$refs.videoObj.addEventListener("ended", () => {
        this.AddCancelWatchAction();
      });
    }, 500);
  },
  updated() {},
  created() {},
  computed: {},
  methods: {
    AddCancelPraiseAction(tempvideo_id, code, index, type) {
      httpApi
        .AddCancelPraiseAction({
          tempworks_id: this.workInfo.tempworks_id, //视频点赞/取消点赞时需传
          temppostil_id: "", //批注点赞/取消点赞时需传
          code: code, //是否点赞 0取消点赞 1点赞
        })
        .then((res) => {
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
            this.getExcellentPostilVideoFinal(); //备课->获取优秀批注/视频 -- wgh
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    //备课->添加视频观看记录 -- wgh
    AddCancelWatchAction() {
      httpApi
        .AddCancelWatchAction({
          course_branch: this.$route.query.course_branch,
          classcode_branch: this.$route.query.classcode_branch, //班别编号
          // teachhour_branch: this.teachhour_branch, //课时编号
          tempworks_id: this.workInfo.tempworks_id,
        })
        .then((res) => {
          if (res.data.error == 0) {
            // this.$message({ message: res.data.errortip, type: "success" });
            this.$emit("updateData");
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    // 查看更多优秀作品
    viewVideo() {
      this.$emit("viewVideo", this.workInfo, this.currentIndex);
    },
    // 点赞
    handVate(val) {
      this.$emit("handVate",val);
    },
  },
};
</script>

<style lang="less">
.highWork-workOne {
  margin-bottom: 12px;
  .work-img {
    position: relative;
    > img {
      width: 100%;
    }
    .btn-video {
      position: absolute;
      top: 32%;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 65px;
      height: 65px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 20px;
      }
    }
    .frame-img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
    }
  }
  .info-container {
    background: #f9fcff;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px;
      .left {
        display: flex;
        align-items: center;
        font-size: 14px;
      }
      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        margin-right: 15px;
      }
    }
    .bottom {
      padding: 12px;
      background: #f9fcff;
      .author {
        display: inline-block;
        max-width: 110px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      img {
        width: 36px;
        height: 36px;
        margin: 0 8px;
        border-radius: 50%;
      }
      .right {
        width: 120px;
      }
    }
  }
}
.highWork-workOne:nth-of-type(1) {
  margin-bottom: 0px;
}
</style>
