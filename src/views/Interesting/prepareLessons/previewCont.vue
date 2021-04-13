<template>
  <div class="Interesting-prepareLessons-previewCont height100">
    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">{{topInfo.teachplan_name}}</span>
      </div>
      <div class="cr-head-right flex-all fs14">
        <el-button type="primary" size="mini" @click="handPrint">
          {{$t(
          'Common.print'
          )}}
        </el-button>
        <i class="btn-close icon-gb ml10 cur-pointer" @click="handBack()"></i>
      </div>
    </div>
    <div
      ref="content_box_height"
      id="preview-print-page"
      :style="{ height: content_box_height + 'px' }"
      class="content-box bg-white pAll12 mt8"
    >
      <div class="top fs14 tc color-4C5">
        <span>
          {{$t(
          'Interesting.preLessonDetais.topInfoList[0]'
          )}}{{topInfo.class_cnname}}
        </span>
        <span>
          {{$t(
          'Interesting.preLessonDetais.topInfoList[1]'
          )}}{{topInfo.staffer_cnname}}
        </span>
        <span>
          {{$t(
          'Interesting.preLessonDetais.topInfoList[2]'
          )}}{{topInfo.class_timestr}}
        </span>
      </div>
      <div class="text-box fs14 color-4C5">
        <div class="item">
          <p class="fs16 color-243 mb12">
            {{$t(
            'Interesting.preLessonDetais.small_title4'
            )}}
          </p>
          <div class="text-cont mb24" v-html="topInfo.teachplan_postil"></div>
        </div>
        <div class="item">
          <p class="fs16 color-243 mb12">
            {{$t(
            'Interesting.preLessonDetais.small_title1'
            )}}
          </p>
          <div class="text-cont mb24" v-html="topInfo.prepare_postil"></div>
        </div>
        <div class="item">
          <p class="fs16 color-243 mb12">
            {{$t(
            'Interesting.preLessonDetais.small_title9'
            )}}
          </p>
          <div class="text-cont" v-html="topInfo.teachplan_matters"></div>
        </div>
      </div>
      <div class="ppt-box" v-for="(item,index) in teachpicsList" :key="index">
        <p class="fs14 color-243 mb16">
          {{item.teachplan_name}}
          <span class="ml4">
            {{$t(
            'Common.page[0]'
            )}}{{item.teachpics_sort}}{{$t(
            'Common.page[1]'
            )}}
          </span>
          <template v-if="type==1">
            <span
              v-if="item.prepare_isemphasis=='1'"
              class="fs14 ml10 color-red"
            >{{item.prepare_isemphasis_name}}</span>
            <span
              v-if="item.prepare_isnokeep=='1'"
              class="fs14 ml10 color-blue"
            >{{item.prepare_isnokeep_name}}</span>
          </template>
        </p>
        <div class="page-one">
          <img style="width:100%" :src="item.teachpics_url" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import progressTableCont from "@/components/tables/progressTableCont.vue";
// import popTips from "@/components/common/popTips/popTips.vue";
import httpApi from "../Interesting";
export default {
  name: "Interesting-prepareLessons-previewCont",
  components: {
    // progressTableCont,
    // popTips
  },
  data() {
    return {
      content_box_height: 0,
      topInfo: {},
      teachpicsList: [] //教案列表
    };
  },
  watch: {},
  computed: {},
  created() {
    this.teachplan_id = this.$route.query.teachplan_id;
    this.type = this.$route.query.type;
    this.getCourseware(); //备课->教案信息->预览批注/预览教案 -- wgh
  },
  methods: {
    //备课->教案信息->预览批注/预览教案 -- wgh
    getCourseware() {
      httpApi
        .getCourseware({
          teachplan_id: this.teachplan_id,
          code: this.type == 0 ? "" : 1 //type是1时是教案，0是批注
        })
        .then(res => {
          this.topInfo = res.data.result.list.list;
          if (res.data.error == 0) {
            this.teachpicsList = res.data.result.list.teachpics;
          } else {
            this.teachpicsList = [];
          }
        });
    },
    // 打印
    handPrint() {
      this.$Common.printpage("preview-print-page");
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
.Interesting-prepareLessons-previewCont {
}
</style>
