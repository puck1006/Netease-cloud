<template>
  <div class="CareerGrowth-index CareerGrowth-box CareerGrowth height100">
    <div
      class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7"
    >
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">{{ $t("Training.home.page_title") }}</span>
      </div>
      <div class="cr-head-right">
        <!-- <el-button type="primary" size="mini" @click="addAim">新增招生目标</el-button> -->
        <span>{{ $t("Training.home.page_title_right") }}</span>
        <span style="color: #00a6ff">{{
          $t("Training.home.page_title_right2")
        }}</span>
      </div>
    </div>
    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 mt10">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18" style="color: #24356a; font-weight: 700">{{
          $t("Training.home.index_title1")
        }}</span>
      </div>
    </div>
    <el-alert
      :title="tips"
      type="warning"
      style="padding: 16px"
      show-icon
    ></el-alert>

    <div
      class="content-box flex1 flex card-container bg-white"
      v-if="carditem.length != 0"
    >
      <myCard
        v-for="(item, index) in carditem"
        :key="index"
        :itemData="item"
        @handleLearning="handleLearning(item)"
        @handleExam="handleExamPage(item)"
        @handletoExam="handletoExam(item)"
      ></myCard>
    </div>
  </div>
</template>

<script>
import myCard from "@/components/Training/progressCard.vue";
import httpApi from "./CareerGrowth.js";

export default {
  data() {
    return {
      tips: this.$t("Training.AllCourseware.tips"),
      carditem: [
        // {
        //   title: this.$t("Training.home.learningProgress[0]"),
        //   direction: "right",
        //   isinProgress: 2
        // },
        // {
        //   title: this.$t("Training.home.learningProgress[1]"),
        //   direction: "right",
        //   isinProgress: 3
        // },
        // {
        //   title: this.$t("Training.home.learningProgress[2]"),
        //   direction: "bottom",
        //   isinProgress: 3
        // },
        // {
        //   title: this.$t("Training.home.learningProgress[3]"),
        //   direction: "withDirection",
        //   isinProgress: 3
        // },
        // {
        //   title: this.$t("Training.home.learningProgress[4]"),
        //   direction: "left",
        //   isinProgress: 3
        // },
        // {
        //   title: this.$t("Training.home.learningProgress[5]"),
        //   direction: "left",
        //   isinProgress: 3
        // },
        // {
        //   title: this.$t("Training.home.learningProgress[5]"),
        //   direction: "left",
        //   isinProgress: 1
        // }
      ],
    };
  },
  components: {
    myCard,
  },
  created() {
    this.Home();
  },
  methods: {
    Home() {
      httpApi
        .Home({
          post_id: this.$UserInfo.post_id,
        })
        .then((res) => {
          this.carditem = res.data.result.list;
          // this.carditem = this.carditem.filter(item =>item.course_id && item.progress)
        });
    },
    handletoExam(item) {
      const tempObj = item.stage_list.find((item) => item.progress == "2");
      // const stage = tempObj.stage_list.find(item => {
      //   return item.progress == "2";
      // });
      // console.log("考核", tempObj,this.carditem);
      console.log(item);
      this.$router.push({
        path: `/Training/AssessmentNext?stage_id=${tempObj.stage_id}`,
      });
    },
    handleLearning(item) {
      // const tempObj = this.carditem.find(item => item.progress == "2");
      // const stage = tempObj.stage_list.find(item => {
      //   return item.progress == "2";
      // });
      // console.log(tempObj, stage);
      // if(item.career_id != '2')
      this.$router.push({
        path: `/Training/LearningStages?career_id=${item.career_id}`,
      });
    },
    handleExamPage(item) {
      console.log(item);
      this.$router.push({
        path: `/Training/ViewCourses?course_id=${item.course_id}`,
      });
    },
  },
  mounted() {},
};
</script>
<style lang="less">
@import "../Training.less";
.CareerGrowth-index {
  .content-box {
    // padding: 0 30px;
    padding-left: 2.5%;
  }
  .card-container {
    flex-wrap: wrap;
    // min-height: 70vh;
  }
}
.CareerGrowth {
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
