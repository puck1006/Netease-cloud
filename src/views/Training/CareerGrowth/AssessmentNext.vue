<template>
  <div class="CareerGrowth-index CareerGrowth-Assessment height100">
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
    <div class="bg-white info mt5">
      <div class="info-item" v-if="isshow">
        <div class="info-container">
          <p class="title" style="margin:0 auto">{{ examData.stage_cnname }}</p>
          <div class="mt20">
            <span class="clock-info ml5" v-if="examDataNext.examine_score">
              {{ $t("Training.Assessment.infoNext[0]") }}
              <span
                style="color:#FF9E02"
              >{{examDataNext.examine_score ? examDataNext.examine_score : '0'  + $t("Training.Assessment.infoNext[1]")}}分</span>
            </span>
            <div class="clock-info clock-info3" v-if="examDataNext.examine_examtime" style="margin-left:-15px">
              {{ $t("Training.Assessment.infoNext[2]") }}
              <span
                style="color:#FF9E02"
              >{{examDataNext.examine_examtime ? examDataNext.examine_examtime : '0'  + $t("Training.Assessment.infoNext[3]")}}分钟</span>
            </div>
          </div>
          <div style="margin-top:20px">
            <i class="el-icon-alarm-clock clock"></i>
            <span
              class="clock-info"
            >{{ $t("Training.Assessment.info[1]") }}{{ examData.question_time + $t("Training.Assessment.info[4]")}}</span>
            <div
              class="clock-info clock-info2"
            >{{ $t("Training.Assessment.info[2]") }}{{ examData.question_num + $t("Training.Assessment.info[5]") }}</div>
          </div>
          <el-button
            type="primary"
            style="width:100%;margin-top:30px"
            size="mini"
            @click="handleNext"
          >{{ $t("Training.Assessment.info[3]") }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import httpApi from "./CareerGrowth";

export default {
  data() {
    return {
      examData: {},
      examDataNext: {},
      isshow:false
    };
  },
  created() {
    this.ExamInfo();
  },
  methods: {
    handleNext() {
      this.$router.push({
        path: `/Training/AssessProgress?stage_id=${this.$route.query.stage_id}`
      });
    },
    ExamInfo() {
      httpApi
        .ExamInfo({
          stage_id: this.$route.query.stage_id
        })
        .then(res => {
          this.examDataNext = res.data.result.list.lasttimeexam;
          this.examData = res.data.result.list.list;
          this.isshow = true
        });
    }
  }
};
</script>
<style lang="less">
@import "../Training.less";
.CareerGrowth-Assessment{
  .info{
    position: relative;
    flex: 1;
    flex-direction: column;
  }
}
</style>
