<template>
  <div class="Educational-mySchedule height100">
    <div
      class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7 bg-white"
    >
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">{{
          $t("Educational.MySchedule.page_title")
        }}</span>
      </div>
    </div>
    <div class="content-box flex1 mt8">
      <!-- 日视图 -->
      <template v-if="dateChangeFlag == 'day'">
        <dayView @viewChange="viewChange"></dayView>
      </template>
      <template v-if="dateChangeFlag == 'week'">
        <weekView @viewChange="viewChange"></weekView>
      </template>

      <template v-if="dateChangeFlag == 'month'">
        <monthView @viewChange="viewChange"></monthView>
      </template>
    </div>
  </div>
</template>

<script>
import dayView from "@/components/mySchedule/dayView";
import weekView from "@/components/mySchedule/weekView";
import monthView from "@/components/mySchedule/monthView";
export default {
  name: "mySchedule",
  components: {
    dayView,
    weekView,
    monthView,
  },
  data() {
    return {
      dateChangeFlag: "day", //日,周,月 视图切换
    };
  },
  created() {},
  methods: {
    viewChange(v) {
      this.dateChangeFlag = v;
    },
  },
  mounted() {},
};
</script>
<style lang="less">
@import url("./mySchedule");
</style>
