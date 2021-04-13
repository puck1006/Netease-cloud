<template>
  <div class="Interesting-prepareLessons-highVideo height100">
    <div
      class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7"
    >
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">{{ hour_name }}</span>
      </div>
      <div class="cr-head-right flex-all">
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
            {{ $t("Interesting.preLessonDetais.btn_text7") }}
          </el-button>
        </div>
        <i class="btn-close icon-gb ml10 cur-pointer" @click="handBack()"></i>
      </div>
    </div>
    <div
      ref="content_box_height"
      :style="{ height: content_box_height + 'px' }"
      class="content-box bg-white mt8 pAll12"
    >
      <div class="flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">
          {{ $t("Interesting.preLessonDetais.highVideo_stitle1") }}
        </span>
      </div>
      <div v-if="videoList.perfectOne" class="current-video">
        <div class="video-box">
          <video
            :src="videoList.perfectOne.tempvideo_videourl"
            :poster="videoList.perfectOne.tempvideo_coverimg"
            controls="controls"
            controlslist="nodownload"
          >
            {{ $t("Common.video_tips") }}
          </video>
        </div>
        <div class="bottom flex-all fs12 color-8A9">
          <div class="flex-al-ce">
            {{ $t("Interesting.preLessonDetais.bottomText[0]") }}
            <!-- <img src="../../../assets/images/default-new-men.png" alt="" /> -->
            {{ videoList.perfectOne.tempvideo_author }}
            <span class="ml6">{{
              videoList.perfectOne.tempvideo_createtime
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
              <i v-if="videoList.perfectOne.is_zan" class="icon-dz mr4"></i>
              <i v-else class="icon-wdz mr4"></i>
              {{ $t("Interesting.preLessonDetais.bottomText[2]")
              }}{{ videoList.perfectOne.watch_num }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex-al mt16">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">
          {{ $t("Interesting.preLessonDetais.highVideo_stitle2") }}
        </span>
      </div>
      <swiper
        v-if="videoList.perfect && videoList.perfect.length > 0"
        class="all-video"
        :options="swiperOption"
      >
        <swiper-slide v-for="(slide, index) in videoList.perfect" :key="index">
          <div class="one-swiper">
            <div class="video-box">
              <video
                :src="slide.tempvideo_videourl"
                :poster="slide.tempvideo_coverimg"
                controls="controls"
                controlslist="nodownload"
              >
                {{ $t("Common.video_tips") }}
              </video>
            </div>
            <div class="bottom flex-all fs12 color-8A9">
              <div class="flex-al-ce">
                {{ $t("Interesting.preLessonDetais.bottomText[0]") }}
                <!-- <img src="../../../assets/images/default-new-men.png" alt="" /> -->
                {{ slide.tempvideo_author }}
                <span class="ml6">{{ slide.tempvideo_createtime }}</span>
              </div>
              <div class="right">
                <span class="mr16">
                  {{ $t("Interesting.preLessonDetais.bottomText[1]") }}
                  {{ slide.watch_num }}
                </span>
                <span
                  class="color-red cur-pointer"
                  @click="handVate(slide, index, 'more')"
                >
                  <i v-if="slide.is_zan" class="icon-dz mr4"></i>
                  <i v-else class="icon-wdz mr4"></i>
                  {{ $t("Interesting.preLessonDetais.bottomText[2]")
                  }}{{ slide.watch_num }}
                </span>
              </div>
            </div>
            <!-- 遮罩层 -->
            <div
              class="frame-video"
              @click="changeVideoPlay(slide, index)"
            ></div>
          </div>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
      <blank v-else :blankCont="tips"></blank>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import progressTableCont from "@/components/tables/progressTableCont.vue";
import popTips from "@/components/common/popTips/popTips.vue";
import blank from "@/components/common/Blank/blank.vue";
import httpApi from "../Interesting";
export default {
  name: "Interesting-prepareLessons-highVideo",
  components: {
    progressTableCont,
    popTips,
    swiper,
    blank,
    swiperSlide,
  },
  data() {
    return {
      tempworks_id: "",
      classcode_branch: "",
      teachhour_branch: "",
      content_box_height: 0,
      currentIndex: 0, //当前播放的视频
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        slidesPerView: 4,
        initialSlide: 4,
      },
      Uploadimg: {
        ossfile: "",
        company_id: this.$userDetails.companyId,
      },
      hour_name: "", //课时名称
      // 上传的教学视频信息
      tempvideoInfo: {
        tempvideo_name: "", //视频名称
        tempvideo_author: "", //视频作者
        tempvideo_coverimg: "", //教案封面
        tempvideo_videourl: "", //视频url
      },
      videoList: {}, //优秀视频
      tips: "暂时没有其他优秀教学视频哦",
    };
  },
  watch: {},
  computed: {},
  created() {
    this.course_branch = this.$route.query.course_branch;
    this.classcode_branch = this.$route.query.classcode_branch;
    this.teachhour_branch = this.$route.query.teachhour_branch;
    this.tempworks_id = this.$route.query.tempworks_id;
    this.getExcellentPostilVideo(); //备课->获取优秀批注/视频 -- wgh
  },
  methods: {

    //备课->获取优秀批注/视频 -- wgh
    getExcellentPostilVideo() {
      httpApi
        .getExcellentPostilVideo({
          teachhour_branch: this.teachhour_branch,
          tempworks_id: this.tempworks_id,
          // course_branch: this.course_branch,
          code: "1", //	0 优秀批注 1优秀视频
        })
        .then((res) => {
          this.hour_name = res.data.result.list.hour_name.hour_name;
          if (res.data.error == 0) {
            this.videoList = res.data.result.list;
          } else {
            this.videoList = {
              perfectOne: {},
              perfect: [],
            };
          }
        });
    },
    //备课->添加/取消点赞 -- wgh
    AddCancelPraiseAction(tempvideo_id, code, index, type) {
      httpApi
        .AddCancelPraiseAction({
          tempvideo_id: tempvideo_id, //视频点赞/取消点赞时需传
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
          course_branch: this.course_branch,
          tempvideo_name: this.tempvideoInfo.tempvideo_name,
          tempvideo_author: this.tempvideoInfo.tempvideo_author,
          tempvideo_coverimg: this.tempvideoInfo.tempvideo_coverimg,
          tempvideo_videourl: this.tempvideoInfo.tempvideo_videourl,
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
      this.videoList.perfectOne = slide;
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
@import "../Interesting.less";
.Interesting-prepareLessons-highVideo {
}
</style>
