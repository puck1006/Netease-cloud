<template>
  <div>
    <div class="flex-all bg-white pAll16">
      <div class="flex">
        <div class="view-date">
          <span class="cur-pointer" @click="viewChange('day')">{{
            $t("mySchedule.tabsList[0]")
          }}</span>
          <span class="bg-default cur-pointer" @click="viewChange('week')">{{
            $t("mySchedule.tabsList[1]")
          }}</span>

          <span class="cur-pointer" @click="viewChange('month')">{{
            $t("mySchedule.tabsList[2]")
          }}</span>
        </div>
      </div>
      <div class="lessonState">
        <span
          ><em class="icon icon1"></em>{{ $t("mySchedule.statusArr[0]") }}</span
        >
        <span
          ><em class="icon icon2"></em>{{ $t("mySchedule.statusArr[1]") }}</span
        >
      </div>
    </div>
    <div class="viewOne">
      <div class="time-change">
        <i class="el-icon-arrow-left color-aaa cur-pointer" @click="prev"></i>
        <span>{{ week.start }} {{ $t("mySchedule.text") }} {{ week.end }}</span>
        <i class="el-icon-arrow-right color-aaa cur-pointer" @click="next"></i>
      </div>
      <div class="weekTime-list">
        <!-- 周 -->
        <div class="weekTime-top" v-if="weekHead.length > 0">
          <div
            class="item"
            v-for="(itemHeader, indexHeader) of weekHead"
            :key="indexHeader"
          >
            {{ itemHeader }}
          </div>
        </div>
        <div class="weekTime-content" v-if="this.dataList.length > 0">
          <div class="weeklist" v-for="(item, index) of dataList" :key="index">
            <div class="list-left">{{ item.name }}</div>
            <div class="list-right flex">
              <div
                class="item"
                v-for="(itemList, indexList) of item.list"
                :key="indexList"
              >
                <div
                  class="item-inner"
                  v-for="(itemListInner, indexListInner) of itemList.week"
                  :key="indexListInner"
                >
                  <div class="inner tl">
                    <el-popover
                      popper-class="itemHover"
                      placement="right"
                      width="400"
                      trigger="hover"
                    >
                      <div class="cardHover">
                        <div class="flex-sb mb8">
                          <span class="fs16 tl">{{
                            itemListInner.class_cnname
                          }}</span>
                          <span
                            class="btn_state1"
                            style="top: 11px"
                            v-if="itemListInner.hour_ischecking == 0"
                            >{{ itemListInner.hour_ischecking_name }}</span
                          >
                          <span class="btn_state2" style="top: 11px" v-else>{{
                            itemListInner.hour_ischecking_name
                          }}</span>
                        </div>
                        <p class="fs14 color-333 mb8">
                          <span class="color-aaa mr4">{{
                            $t("mySchedule.labe_text1")
                          }}</span>
                          <span
                            >{{ itemListInner.hour_day }}
                            {{ itemListInner.hour_starttime }}-{{
                              itemListInner.hour_endtime
                            }}</span
                          >
                        </p>
                        <p class="fs14 color-333 mb8">
                          <span class="color-aaa mr4">{{
                            $t("mySchedule.labe_text2")
                          }}</span>
                          <span>{{ itemListInner.class_enname }}</span>
                        </p>
                        <p class="fs14 color-333 mb8">
                          <span class="color-aaa mr4">{{
                            $t("mySchedule.labe_text3")
                          }}</span>
                          <span>{{ itemListInner.course_branch }}</span>
                        </p>
                        <p class="fs14 color-333 mb8">
                          <span class="color-aaa mr4">{{
                            $t("mySchedule.labe_text5")
                          }}</span>
                          <span>{{ itemListInner.classroom_cnname }}</span>
                        </p>
                        <p class="fs14 color-333 mb8">
                          <span class="color-aaa mr4">{{
                            $t("mySchedule.labe_text6")
                          }}</span>
                          <span>{{ itemListInner.hour_ischecking_name }}</span>
                        </p>
                      </div>
                      <div slot="reference" class="everyItem week-item">
                        <div
                          class="pAll5"
                          :class="
                            itemListInner.hour_ischecking == 0
                              ? 'bgOne bgOneB'
                              : 'bgTwo bgTwoB'
                          "
                          style="position: relative"
                        >
                          <div class="flex-sb mb8">
                            <span
                              class="fs16 tl"
                              style="width: calc(100% - 50px)"
                              >{{ itemListInner.class_cnname }}</span
                            >
                            <span
                              class="btn_state1"
                              v-if="itemListInner.hour_ischecking == 0"
                              >{{ itemListInner.hour_ischecking_name }}</span
                            >
                            <span class="btn_state2" v-else>{{
                              itemListInner.hour_ischecking_name
                            }}</span>
                          </div>
                          <p class="fs14 color-333 mb8 flex">
                            <span class="color-aaa mr4" style="width: 50px">{{
                              $t("mySchedule.labe_text1")
                            }}</span>
                            <span class="flex1"
                              >{{ itemListInner.hour_day }}
                              {{ itemListInner.hour_starttime }}-{{
                                itemListInner.hour_endtime
                              }}</span
                            >
                          </p>
                          <p class="fs14 color-333 mb8">
                            <span class="color-aaa mr4" style="width: 50px">{{
                              $t("mySchedule.labe_text2")
                            }}</span>
                            <span class="flex1">{{
                              itemListInner.class_enname
                            }}</span>
                          </p>
                        </div>
                      </div>
                    </el-popover>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="weekTime-content" style="background: none" v-else>
          <div class="empty-box tc">
            <i class="mh-kym_icon icon"></i>
            <p class="col-66 text-1">{{ $t("mySchedule.emptyTip") }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import educationHttp from "@/views/Educational/Educational";
export default {
  name: "weekView",
  components: {
    // popTips,
  },
  props: {
    // 列表数据
    // tableData: {
    //   type: Array
    // }
  },
  data() {
    return {
      week: {
        start: "",
        end: "",
        prevWeek: 0, //上周(本周)
        period: [], //存放开始和结束时间
      },
      //周的头部
      weekHead: [],
      // 周的列表
      dataList: [],
    };
  },
  created() {
    this.week.start = this.$Common.getWeekStartAndEnd(0)[0];
    this.week.end = this.$Common.getWeekStartAndEnd(0)[1];
    this.timetableDayListApi();
  },
  watch: {},

  methods: {
    //日,周,月 视图切换
    viewChange(v) {
      console.log(v);
      this.$emit("viewChange", v);
    },
    //关闭
    handleClose(done) {
      done();
    },
    //获取教师所有课程 - 列表
    timetableDayListApi() {
      educationHttp
        .timetableDayListApi({
          datatype: 2, //1 天 2 周 3月
          // fixedtime: this.timeShow
          starttime: this.week.start,
          endtime: this.week.end,
        })
        .then((res) => {
          console.log(res);
          this.weekHead = res.data.result.field;
          if (res.data.error == 0) {
            this.dataList = res.data.result.list;
            console.log(this.dataList);
          } else {
            this.dataList = [];
          }
        });
    },
    // 时间切换 - 开始 -**************
    //上一周 --
    prev() {
      let time = --this.week.prevWeek;
      this.week.start = this.$Common.getWeekStartAndEnd(time)[0];
      this.week.end = this.$Common.getWeekStartAndEnd(time)[1];
      this.timetableDayListApi();
    },
    //下一周 ++
    next() {
      let time = ++this.week.prevWeek;
      this.week.start = this.$Common.getWeekStartAndEnd(time)[0];
      this.week.end = this.$Common.getWeekStartAndEnd(time)[1];
      this.timetableDayListApi();
    },
    // 时间切换 - 结束 -**************
  },
};
</script>

<style lang="less"></style>
