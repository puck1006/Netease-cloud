<template>
  <div class="myCenter-myNote height100 myCenter-box">
    <div
      class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7"
    >
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">
          {{ $t("myCenter.page_myNote_title") }}
        </span>
      </div>
      <div class="cr-head-right flex-al fs14"></div>
    </div>
    <div
      class="content-box bg-white mt8"
      ref="auto_height_table"
      :style="{ height: content_box_height + 'px' }"
    >
      <div class="flex-wrap pt12 flex-warp-line pl12 pr12">
        <div class="flex-al Inquire-box mb12">
          <div class="ipt-box" style="width: 260px">
            <el-input
              v-model="filter.keyword"
              clearable
              :placeholder="$t('myCenter.placeholder2')"
              @clear="search"
              @keyup.enter.native="search"
            ></el-input>
          </div>
          <el-button
            type="primary"
            size="mini"
            class="search-btn fs14"
            @click="search"
            >{{ $t("Common.input_button") }}</el-button
          >
        </div>
      </div>
      <div class="pl12 pr12 post-list">
        <swiper class="all-swiper" :options="swiperOption">
          <swiper-slide v-for="(slide, index) in postList" :key="index">
            <div
              class="one-swiper cur-pointer"
              :class="[
                index == currentIndex ? 'swiper-active' : '',
                index == postList.length - 1 ? 'swiper-last' : '',
              ]"
              @click="handClckPost(slide, index)"
            >
              {{ slide.career_cnname }}
            </div>
          </swiper-slide>
          <div class="line"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="content-list">
        <div class="list-div-auto">
          <div class="note-list pAll16" v-if="myNoteList.length > 0">
            <div
              class="itemOne"
              :class="[
                index + 1 < postList[currentIndex].progress ? 'active' : '',
              ]"
              v-for="(item, index) in myNoteList"
              :key="index"
            >
              <div class="left mr24">
                <span
                  class="progress"
                  :class="'progress' + postList[currentIndex].progress"
                >
                  <template v-if="postList[currentIndex].progress == 1">
                    <img
                      v-if="index == 0"
                      src="../../assets/images/progress1.png"
                      alt
                    />
                    <img v-else src="../../assets/images/progress3.png" alt />
                  </template>
                  <template v-else-if="postList[currentIndex].progress == 2">
                    <img
                      v-if="index == 0"
                      src="../../assets/images/progress1.png"
                      alt
                    />
                    <img
                      v-else-if="index == 1"
                      src="../../assets/images/progress2.png"
                      alt
                    />
                    <img v-else src="../../assets/images/progress3.png" alt />
                  </template>
                  <template v-else-if="postList[currentIndex].progress == 3">
                    <img
                      v-if="index == 0 || index == 1"
                      src="../../assets/images/progress1.png"
                      alt
                    />
                    <img v-else src="../../assets/images/progress2.png" alt />
                  </template>
                </span>
              </div>
              <div class="right fs16 flex-all color-243">
                <span>
                  <!-- <span class="mr8">第一阶段</span> -->
                  {{ item.stage_cnname }}
                </span>
                <img
                  @click="handSee(item)"
                  src="../../assets/images/icon/icon-left-see.png"
                  alt
                  class="cur-pointer"
                />
              </div>
            </div>
          </div>
          <blank v-else :blankCont="tips"></blank>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import progressTableCont from "@/components/tables/progressTableCont.vue";
import popTips from "@/components/common/popTips/popTips.vue";
import blank from "@/components/common/Blank/blank.vue";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import httpApi from "./myCenter";
export default {
  name: "myCenter-myNote",
  components: {
    progressTableCont,
    popTips,
    swiper,
    swiperSlide,
    blank,
  },
  data() {
    return {
      content_box_height: 0,
      currentIndex: 0,
      //筛选
      filter: {
        keyword: "", //关键词
      },
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        slidesPerView: 7,
        initialSlide: 7,
      },
      postList: [], //职位列表
      //我的笔记列表
      myNoteList: [],
      tips: "暂时没有笔记哦",
    };
  },
  watch: {},
  computed: {},
  created() {
    this.TrainingHome(); // 个人中心->我的收藏-- wgh
  },
  methods: {
    // 个人中心->我的收藏-- wgh
    TrainingHome() {
      httpApi
        .TrainingHome({
          // 筛选条件
          keyword: this.filter.keyword,
          post_id: this.$UserInfo.post_id,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.postList = res.data.result.list;
          } else {
            this.postList = [];
          }
          if (this.postList.length > 0) {
            this.myNoteList = this.postList[0].stage_list;
          }
          this.tips = res.data.errortip;
        });
    },
    // 点击晋升职位
    handClckPost(item, index) {
      this.currentIndex = index;
      this.myNoteList = item.stage_list;
    },
    // 查看笔记
    handSee(item) {
      this.$router.push(`/myCenter/seeNote?stage_id=${item.stage_id}`);
    },
    //检索
    search() {
      this.TrainingHome(); // 个人中心->我的收藏-- wgh
    },
    // 重置表单
    resetForm(form) {
      this.$refs[form].resetFields();
    },
    // 返回关闭
    handBack() {
      this.$router.go(-1);
    },
    handleClose(done) {
      done();
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs["auto_height_table"]) {
        this.content_box_height = this.$Tool.getTableHeight(
          this.$refs.auto_height_table.getBoundingClientRect().top
        );
      }
    });
  },
};
</script>

<style lang="less">
@import "./myCenter";
.myCenter-myNote {
  .one-swiper {
    position: relative;
  }
  .one-swiper::after {
    content: "";
    background-image: url("../../assets/images/arrows.png");
    background-size: 9px 14px;
    width: 9px;
    height: 14px;
    position: absolute;
    right: -30px;
  }
  .swiper-last::after {
    display: none;
  }
}
</style>
