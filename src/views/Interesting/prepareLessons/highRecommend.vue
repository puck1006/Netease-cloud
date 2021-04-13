<template>
  <div class="Interesting-prepareLessons-highRecommend height100">
    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">
          {{$t(
          'Interesting.preLessonDetais.highRecommend_title'
          )}}
        </span>
      </div>
      <div class="cr-head-right">
        <i class="btn-close icon-gb ml10 cur-pointer" @click="handBack()"></i>
      </div>
    </div>
    <div
      ref="content_box_height"
      :style="{ height: content_box_height + 'px' }"
      class="content-box bg-white mt8"
    >
      <div class="flex-al pl12 pr12 mt16">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">
          {{$t(
          'Interesting.preLessonDetais.highRecommend_stitle1'
          )}}
        </span>
      </div>
      <ul
        v-if="recommendList.popular && recommendList.popular.length>0"
        class="recommend hot-recommend"
      >
        <li v-for="(item, index) in recommendList.popular" :key="index">
          <div
            class="cont fs14"
            :class="item.isShowAll ? 'unfold' : 'fold'"
          >{{ item.temppostil_details }}</div>
          <div
            @click="toggleCont(item, index,'hot')"
            class="mb16 color-blue pl12 pr12 fs14 tr cur-pointer"
          >
            <template v-if="!item.isShowAll">
              {{$t(
              'Interesting.preLessonDetais.showText[0]'
              )}}
              <i
                class="ml8 el-icon-caret-bottom"
              ></i>
            </template>
            <template v-else>
              {{$t(
              'Interesting.preLessonDetais.showText[1]'
              )}}
              <i
                class="ml8 el-icon-caret-top"
              ></i>
            </template>
          </div>
          <div class="bottom flex-all fs12 color-8A9">
            <div class="flex-al-ce">
              {{$t(
              'Interesting.preLessonDetais.bottomText[0]'
              )}}
              <!-- <img src="../../../assets/images/default-new-men.png" alt /> -->
              {{ item.temppostil_author }}
              <span class="ml6">{{ item.temppostil_createtime }}</span>
            </div>
            <div class="right">
              <span class="mr16">
                {{$t(
                'Interesting.preLessonDetais.bottomText[1]'
                )}} {{ item.watch_num }}
              </span>
              <span class="color-red cur-pointer" @click="handVate(item, index,'hot')">
                <i v-if="item.is_zan" class="icon-dz mr4"></i>
                <i v-else class="icon-wdz mr4"></i>
                {{$t(
                'Interesting.preLessonDetais.bottomText[2]'
                )}}{{ item.praise_num }}
              </span>
            </div>
          </div>
        </li>
      </ul>
      <blank v-else :blankCont="tips1"></blank>
      <div class="flex-al pl12 pr12 mt16">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">
          {{$t(
          'Interesting.preLessonDetais.highRecommend_stitle2'
          )}}
        </span>
      </div>
      <ul
        v-if="recommendList.perfect && recommendList.perfect.length>0"
        class="recommend high-recommend"
      >
        <li v-for="(item, index) in recommendList.perfect" :key="index">
          <div
            class="cont fs14"
            :class="item.isShowAll ? 'unfold' : 'fold'"
          >{{ item.temppostil_details }}</div>
          <div
            @click="toggleCont(item, index,'high')"
            class="mb16 color-blue pl12 pr12 fs14 tr cur-pointer"
          >
            <template v-if="!item.isShowAll">
              {{$t(
              'Interesting.preLessonDetais.showText[0]'
              )}}
              <i
                class="ml8 el-icon-caret-bottom"
              ></i>
            </template>
            <template v-else>
              {{$t(
              'Interesting.preLessonDetais.showText[1]'
              )}}
              <i
                class="ml8 el-icon-caret-top"
              ></i>
            </template>
          </div>
          <div class="bottom flex-all fs12 color-8A9">
            <div class="flex-al-ce">
              {{$t(
              'Interesting.preLessonDetais.bottomText[0]'
              )}}
              <!-- <img src="../../../assets/images/default-new-men.png" alt /> -->
              {{ item.temppostil_author }}
              <span class="ml6">{{ item.temppostil_createtime }}</span>
            </div>
            <div class="right">
              <span class="mr16">
                {{$t(
                'Interesting.preLessonDetais.bottomText[1]'
                )}} {{ item.watch_num }}
              </span>
              <span class="color-red cur-pointer" @click="handVate(item, index,'high')">
                <i v-if="item.is_zan" class="icon-dz mr4"></i>
                <i v-else class="icon-wdz mr4"></i>
                {{$t(
                'Interesting.preLessonDetais.bottomText[2]'
                )}}{{ item.praise_num }}
              </span>
            </div>
          </div>
        </li>
      </ul>
      <blank v-else :blankCont="tips1"></blank>
    </div>
  </div>
</template>

<script>
import progressTableCont from "@/components/tables/progressTableCont.vue";
import popTips from "@/components/common/popTips/popTips.vue";
import blank from "@/components/common/Blank/blank.vue";
import httpApi from "../Interesting";
export default {
  name: "Interesting-prepareLessons-highRecommend",
  components: {
    progressTableCont,
    popTips,
    blank
  },
  data() {
    return {
      content_box_height: 0,
      tips1: "暂时没有热门批注哦",
      tips2: "暂时没有优质批注哦",
      recommendList: {} //批注列表
    };
  },
  watch: {},
  computed: {},
  created() {
    this.classcode_branch = this.$route.query.classcode_branch;
    this.teachhour_branch = this.$route.query.teachhour_branch;
    this.getExcellentPostilVideo(); //备课->获取优秀批注/视频 -- wgh
  },
  methods: {
    //备课->获取优秀批注/视频 -- wgh
    getExcellentPostilVideo() {
      httpApi
        .getExcellentPostilVideo({
          teachhour_branch: this.teachhour_branch,
          code: "0" //	0 优秀批注 1优秀视频
        })
        .then(res => {
          if (res.data.error == 0) {
            this.recommendList = res.data.result.list;
          } else {
            this.recommendList = {
              popular: [],
              perfect: []
            };
          }
        });
    },
    //备课->添加/取消点赞 -- wgh
    AddCancelPraiseAction(temppostil_id, code, index, type) {
      httpApi
        .AddCancelPraiseAction({
          tempvideo_id: "", //视频点赞/取消点赞时需传
          temppostil_id: temppostil_id, //批注点赞/取消点赞时需传
          code: code //是否点赞 0取消点赞 1点赞
        })
        .then(res => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            if (type == "hot") {
              // 是否是热门批注
              this.recommendList.popular[index].is_zan = !this.recommendList
                .popular[index].is_zan;
            } else {
              this.recommendList.perfect[index].is_zan = !this.recommendList
                .perfect[index].is_zan;
            }
            this.getExcellentPostilVideo(); //备课->获取优秀批注/视频 -- wgh
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    // 展开内容/收起内容
    toggleCont(item, index, type) {
      if (type == "hot") {
        // 是否是热门批注
        this.recommendList.popular[index].isShowAll = !this.recommendList
          .popular[index].isShowAll;
      } else {
        this.recommendList.perfect[index].isShowAll = !this.recommendList
          .perfect[index].isShowAll;
      }
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
      this.AddCancelPraiseAction(item.temppostil_id, code, index, type);
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
@import "../Interesting.less";
.Interesting-prepareLessons-highRecommend {
}
</style>
