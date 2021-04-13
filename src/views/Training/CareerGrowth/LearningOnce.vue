<template>
  <div class="CareerGrowth-index CareerGrowth-learning height100">
    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">{{ $t("Training.home.page_title") }}</span>
      </div>
      <div class="cr-head-right">
        <!-- <el-button type="primary" size="mini" @click="addAim">新增招生目标</el-button> -->
        <span>{{ $t("Training.home.page_title_right") }}</span>
        <span style="color:#00A6FF">{{ $t("Training.home.page_title_right2") }}</span>
      </div>
    </div>
    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7 mt10">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span
          class="color-243 fs18"
          style="color:#24356A;font-weight:700"
        >{{ $t("Training.home.index_title1") }}</span>
      </div>
    </div>
    <div class="bg-white pt15 pb15">
      <el-alert
        :title="tips"
        type="warning"
        show-icon
      ></el-alert>
    </div>
    <div class="content-box flex1 mt8 flex flex-wrap card-container">
      <myCard
        v-for="(item, index) in carditem"
        :key="index"
        :itemData="item"
        @handleLearning="handleLearning"
        @handletoExam="handletoExam"
      ></myCard>
    </div>
  </div>
</template>

<script>
import myCard from "@/components/Training/progressCard.vue";

export default {
  data() {
    return {
      carditem: [
        { title: "保教实习生", direction: "right", isinProgress: true },
        { title: "保教组长", direction: "right", isinProgress: false },
        { title: "保教主任", direction: "withDirection", isinProgress: false }
      ],
      tips: this.$t("Training.LearningOnce.LearningOnce")
    };
  },
  components: {
    myCard
  },
  created() {},
  methods: {
    handleLearning() {
      this.$router.push({ path: "/Training/LearningStages" });
    },
    handletoExam() {
      this.$router.push({ path: "/Training/Assessment" });
    }
  },
  mounted() {}
};
</script>
<style lang="less">
@import "../Training.less";
</style>
