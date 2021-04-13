<template>
  <div class="Educational-index Educational-box height100">
    <div
      class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7"
    >
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">
          {{ $t("Interesting.home.page_title") }}
        </span>
      </div>
    </div>
    <div class="content-box flex1 flex">
      <div class="index-left bg-white">
        <div class="flex-al mb20 pl16 pt16">
          <span class="left-line-orange mr10"></span>
          <span class="color-243 fs24">
            我的工作统计
          </span>
        </div>
        <div class="tc color-blue flex-al-ce">
          <i class="icon-left fs24 cur-pointer" @click="prevChange()"></i>
          <span class="ml30 mr30 yearMonth">{{ yearMonth }}</span>
          <i class="icon-right fs24 cur-pointer" @click="nextChange()"></i>
        </div>
        <div
          class="work-count"
          v-if="
            countData.alreadyNum &&
              countData.hourNum &&
              countData.dutyNum &&
              countData.stuNum &&
              countData.remarkNum &&
              countData.evaluate
          "
        >
          <div class="flex">
            <div class="item">
              <p class="title fs20 color-243 tl">进行班级数</p>
              <div class="two-show">
                <div class="img-left">
                  <img src="@/assets/images/home-icon.png" alt="" />
                </div>
                <div class="classData">
                  <p class="one">{{ countData.classNum }}</p>
                  <p class="two">进行班级数</p>
                </div>
              </div>
            </div>
            <div class="item">
              <p class="title fs20 color-243 tl">已上课时</p>
              <div class="lesson-show">
                <el-progress
                  type="circle"
                  :percentage="rate.rate1"
                  color="#FF3569"
                ></el-progress>
              </div>
              <div class="times-box">
                <p class="one fs16 color-243">
                  <em></em>已上{{ parseInt(countData.alreadyNum) }}次
                </p>
                <p class="two fs16 color-243">
                  <em style="background:#FF3569"></em>共计{{
                    parseInt(countData.hourNum)
                  }}次
                </p>
              </div>
            </div>
          </div>
          <div class="flex">
            <div class="item">
              <p class="title fs20 color-243 tl">学生出勤</p>
              <div class="lesson-show">
                <el-progress
                  type="circle"
                  :percentage="rate.rate2"
                  color="#1DE5C1"
                ></el-progress>
              </div>
              <div class="times-box">
                <p class="one fs16 color-243">
                  <em></em>实到{{ parseInt(countData.dutyNum) }}人
                </p>
                <p class="two fs16 color-243">
                  <em style="background:#1DE5C1"></em>应到{{
                    parseInt(countData.stuNum)
                  }}人
                </p>
              </div>
            </div>
            <div class="item">
              <p class="title fs20 color-243 tl">课程评价</p>
              <div class="lesson-show">
                <el-progress
                  type="circle"
                  :percentage="rate.rate3"
                  color="#FF9E02"
                ></el-progress>
              </div>
              <div class="times-box">
                <p class="one fs16 color-243">
                  <em></em>已评价{{ parseInt(countData.remarkNum) }}次
                </p>
                <p class="two fs16 color-243">
                  <em style="background:#FF9E02"></em>应评价{{
                    parseInt(countData.evaluate)
                  }}次
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="index-right bg-white pAll16">
        <div class="flex-sb">
          <div class="flex-al mb20">
            <span class="left-line-orange mr10"></span>
            <span class="color-243 fs24">
              待办事项
            </span>
          </div>
          <router-link
            class="color-blue fs14"
            :to="{ path: '/Educational/allTodo' }"
            >更多>></router-link
          >
        </div>
        <div class="" v-if="reviewData.length == 0">
          <div class="empty-box tc">
            <i class="mh-kym_icon icon"></i>
            <p class="col-66 text-1">暂无待办事项</p>
          </div>
        </div>
        <div class="To-do-list" v-else>
          <div
            class="list pAll20 mb8"
            v-for="(item, index) of reviewData"
            :key="index"
          >
            <div class="flex-sb mb12">
              <p class="fs18">
                <img
                  class="mr4 va-middle"
                  src="@/assets/images/home-right.png"
                  alt=""
                />{{ item.class_cnname }}
              </p>
              <p class="fs16 color-blue" @click="handReview(item)">待点评</p>
            </div>
            <div class="fs14 color-4C5 mb12">
              <span class="mr4">上课时间</span>{{ item.date }}
            </div>
            <div class="fs14 color-4C5 mb12">
              <span class="mr4">上课校区</span>{{ item.school_cnname }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import educationHttp from "../Educational";
export default {
  name: "Educational-index",
  data() {
    return {
      yearMonth: "",
      AddMonthCount: 0, // 当前月
      countData: {}, //首页统计
      rate: {
        rate1: 0,
        rate2: 0,
        rate3: 0
      },
      reviewData: []
    };
  },
  components: {},
  created() {
    let now = new Date();
    this.year = now.getFullYear();
    this.month = now.getMonth() + 1;
    this.yearMonth =
      this.year +
      "-" +
      (parseInt(this.month) >= 10 ? this.month : "0" + this.month);
    this.TotalStatistics(); // 首页统计
    this.AgentList(); // 待办事项
  },
  methods: {
    // 上个月
    prevChange() {
      this.AddMonthCount--;
      console.log(this.month);
      if (this.month > 1) {
        this.month = this.month - 1;
      } else if (this.month === 1) {
        this.month = 12;
        this.year = this.year - 1;
      }
      console.log(this.month, this.year, 1211);
      this.yearMonth =
        this.year +
        "-" +
        (parseInt(this.month) >= 10 ? this.month : "0" + this.month);
      console.log(this.$Common.getMonthStartAndEnd(this.AddMonthCount));
      this.TotalStatistics();
    },
    // 下个月
    nextChange() {
      this.AddMonthCount++;
      console.log(this.month, this.year, 1211);
      if (this.month < 12) {
        this.month = this.month + 1;
      } else if (this.month === 12) {
        this.month = 1;
        this.year = this.year + 1;
      }
      this.yearMonth =
        this.year +
        "-" +
        (parseInt(this.month) >= 10 ? this.month : "0" + this.month);
      console.log(this.$Common.getMonthStartAndEnd(this.AddMonthCount));
      this.TotalStatistics();
    },
    // 首页统计
    TotalStatistics() {
      educationHttp
        .TotalStatistics({
          start_time: this.$Common.getMonthStartAndEnd(this.AddMonthCount)[0],
          end_time: this.$Common.getMonthStartAndEnd(this.AddMonthCount)[1]
        })
        .then(res => {
          if (res.data.error == 0) {
            this.countData = res.data.result;
            const {
              alreadyNum,
              hourNum,
              dutyNum,
              stuNum,
              remarkNum,
              evaluate
            } = res.data.result;
            if (alreadyNum == 0 || hourNum == 0) {
              this.rate.rate1 = 0;
            } else {
              this.rate.rate1 = Math.floor(
                (parseInt(alreadyNum) / parseInt(hourNum)) * 100
              );
            }
            if (dutyNum == 0 || stuNum == 0) {
              this.rate.rate2 = 0;
            } else {
              this.rate.rate2 = Math.floor(
                (parseInt(dutyNum) / parseInt(stuNum)) * 100
              );
            }
            if (remarkNum == 0 || evaluate == 0) {
              this.rate.rate3 = 0;
            } else {
              this.rate.rate3 = Math.floor(
                (parseInt(remarkNum) / parseInt(evaluate)) * 100
              );
            }
            console.log(
              alreadyNum,
              hourNum,
              dutyNum,
              stuNum,
              remarkNum,
              evaluate
            );
            console.log(this.rate.rate1, this.rate.rate2, this.rate.rate3);
          } else {
            this.countData = {};
          }
        });
    },
    // 待办事项
    AgentList() {
      educationHttp
        .AgentList({
          start_time: "",
          end_time: "",
          p: 1,
          num: 5
        })
        .then(res => {
          if (res.data.error == 0) {
            this.reviewData = res.data.result.list;
          } else {
            this.reviewData = [];
          }
        });
    },
    // 评价
    handReview(v) {
      console.log(v);
      this.$router.push({
        path: "/Educational/JingleAssistant/educationWork",
        query: {
          class_id: v.class_id
        }
      });
    }
  },
  mounted() {}
};
</script>
<style lang="less">
@import url("./index");
</style>
