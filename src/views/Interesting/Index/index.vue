<template>
  <div class="Interesting-index Interesting-box">
    <div
      class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7"
    >
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">
          {{ $t("Interesting.home.page_title") }}
        </span>
      </div>
      <div class="cr-head-right">
        <!-- <el-button type="primary" size="mini" @click="addAim" >新增招生目标</el-button> -->
      </div>
    </div>
    <div class="content-box flex1 flex">
      <div class="index-left">
        <div class="class-overview bg-white pAll12">
          <div class="flex-al mb20">
            <span class="left-line-orange mr10"></span>
            <span class="color-243 fs24">
              {{ $t("Interesting.home.index_title1") }}
            </span>
            <!-- 筛选 -->
            <div class="filter-tabs ml30">
              <a
                v-for="(item, index) in $t('Interesting.home.filterTabs')"
                :key="index"
                href="javascript:;"
                class="filter-time fs14 color-blue mr20"
                :class="{ active: index == currentIndex }"
                @click="handClckTabs(item, index)"
              >
                <el-date-picker
                  v-if="index == 2"
                  v-model="filterTime"
                  @change="highTimeChange"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
                <i v-if="index == 2" class="icon-gjsx mr4"></i>
                {{ item }}
              </a>
              <span
                v-if="currentIndex == 2 && filter.start_time != ''"
                class="fs14"
              >
                {{ filter.start_time }}
                <span class="ml4 mr4">-</span>
                {{ filter.end_time }}
              </span>
            </div>
            <div
              class="filter-teacher"
              v-if="
                $userDetails.account_class == 1 ||
                $Tool.getStorage('postpart_isteregulator') == 1
              "
            >
              <el-select
                v-model="selectTeacher"
                placeholder="请选择教师"
                clearable
                @change="handleChangeTeacher"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="`${item.staffer_cnname}`"
                  :value="item.staffer_id"
                ></el-option>
              </el-select>
            </div>
          </div>
          <el-row :gutter="20" class="overview-list">
            <el-col
              :span="6"
              v-for="(item, index) in overviewList"
              :key="index"
            >
              <div class="item" :class="`item${index + 1}`">
                <i v-if="index == 0 || index == 1" class="icon-dbks"></i>
                <i v-else class="icon-dsks"></i>
                <div class="info tc">
                  <p class="num">{{ item.value }}</p>
                  <p class="fs16">{{ item.label }}</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="my-curriculum bg-white pAll12 mt12">
          <div class="flex-al mb20">
            <span class="left-line-orange mr10"></span>
            <span class="color-243 fs24">
              {{ $t("Interesting.home.index_title2") }}
            </span>
          </div>
          <!-- 我的课程表 -->
          <div v-if="tempTrue">
            <classSchedule :re_staffer_id="selectTeacher"></classSchedule>
          </div>
        </div>
      </div>
      <div class="index-right">
        <div class="class-reminder bg-white pt12 pb12">
          <div class="flex-al mb20 pl12 pr12">
            <span class="left-line-orange mr10"></span>
            <span class="color-243 fs24">
              {{ $t("Interesting.home.index_title3") }}
            </span>
          </div>
          <!-- 筛选 -->
          <div class="flex-all fs14 pl12 pr12">
            <div class="filter-tabs">
              <a
                v-for="(item, index) in $t('Interesting.home.filterStatusTabs')"
                :key="index"
                href="javascript:;"
                class="filter-status fs14 color-8A9 mr12"
                :class="{ 'status-active': index == currentIndex2 }"
                @click="handClckStatusTabs(item, index)"
                >{{ item }}</a
              >
            </div>
            <router-link
              class="color-blue"
              :to="{ path: '/Interesting/classReminder' }"
              >更多>></router-link
            >
          </div>
          <div class="flex-wrap pl12 pr12">
            <div class="flex-al mb20 mt20">
              <span class="mr10 fs14 color-4C5">
                {{ $t("Interesting.home.remind_text1") }}
              </span>
              <div class="select-box" style="width: 170px">
                <el-select
                  @change="remindSearch"
                  v-model="filter.class_id"
                  clearable
                  filterable
                  :placeholder="$t('Interesting.home.placeholder1')"
                >
                  <el-option
                    v-for="(item, index) in filter.classList"
                    :key="index"
                    :label="`${item.class_cnname}(${item.class_enname})`"
                    :value="item.class_id"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div v-if="remindList.length > 0" class="remind-list fs18 pl12 pr12">
            <div class="item" v-for="(item, index) in remindList" :key="index">
              <div class="cont mb16 color-4C5">
                <i class="icon-alarm mr12"></i>
                <span>{{ item.reminds }}</span>
              </div>
              <div class="btns tr fs16">
                <el-button
                  type="text"
                  @click="handPreparing(item)"
                  v-if="
                    (item.is_beike &&
                      $Tool.getStorage('postpart_isteregulator') == '1') ||
                    $Tool.getStorage('postpart_isteregulator') == '0'
                  "
                >
                  {{ $t("Interesting.home.remindBtns[0]") }}
                </el-button>
                <el-button
                  v-if="item.hour_read_status == '0'"
                  type="text"
                  @click="handKnow(item)"
                >
                  <!-- 是否已经阅读 -->
                  {{ $t("Interesting.home.remindBtns[1]") }}
                </el-button>
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
import classSchedule from "@/components/classSchedule/classSchedule";
import blank from "@/components/common/Blank/blank.vue";
import httpApi from "../Interesting";
export default {
  name: "Interesting-index",
  data() {
    return {
      tempTrue: true,
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      // 筛选
      selectTeacher: "",
      currentIndex: 0,
      currentIndex2: 0,
      filterTime: "", //高级筛选
      filter: {
        start_time: "", //开始时间
        end_time: "", //结束时间
        class_id: "",
        code: "0", //0待备课 1备课延迟 2上课
        classList: [], //班级下拉列表
      },
      // 备上课总览列表
      overviewList: [],
      // 近两周备课上课提醒列表
      remindList: [],
      tips: "近两周暂无备课上课提醒",
    };
  },
  components: {
    classSchedule,
    blank,
  },
  created() {
    this.filter.start_time = this.$Common.getWeekStartAndEnd(0)[0];
    this.filter.end_time = this.$Common.getWeekStartAndEnd(0)[1];
    this.Statistic(); // 首页->备上课时统计 -- wgh
    this.getTeacher(); // 首页->备上课时统计 -- wgh
    this.getClass(); // 首页->备课提醒->选择班级 -- wgh
    this.LessonReminder(); //首页->备课提醒 -- wgh
  },
  methods: {
    handleChangeTeacher() {
      this.Statistic(); // 首页->备上课时统计 -- wgh
      this.getClass(); // 首页->备课提醒->选择班级 -- wgh
      this.LessonReminder(); //首页->备课提醒 -- wgh
      this.tempTrue = false;
      this.$nextTick(() => {
        this.tempTrue = true;
      });
    },
    getTeacher() {
      this.$http
        .getTeacher({
          starttime: this.filter.start_time,
          endtime: this.filter.end_time,
        })
        .then((res) => {
          this.options = res.data.result.list;
        });
    },
    // 首页->备上课时统计 -- wgh
    Statistic() {
      httpApi
        .Statistic({
          start_time: this.filter.start_time,
          end_time: this.filter.end_time,
          re_staffer_id: this.selectTeacher,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.overviewList = res.data.result.list.overviewList;
          } else {
            this.overviewList = [];
          }
        });
    },
    //首页->备课提醒 -- wgh
    LessonReminder() {
      httpApi
        .LessonReminder({
          code: this.filter.code,
          re_staffer_id: this.selectTeacher,
          // 筛选
          class_id: this.filter.class_id,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.remindList = res.data.result.list;
          } else {
            this.remindList = [];
            this.tips = res.data.errortip;
          }
        });
    },
    // 首页->备课提醒->选择班级 -- wgh
    getClass() {
      this.$http
        .getClass({
          re_staffer_id: this.selectTeacher,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.filter.classList = res.data.result.list;
          } else {
            this.filter.classList = [];
          }
        });
    },
    //首页->备课提醒->标记阅读状态 -- wgh
    MarkReadAction(hour_list) {
      httpApi
        .MarkReadAction({
          hour_list: JSON.stringify(hour_list),
          code: "0", //0标记已读 1全部已读
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            this.LessonReminder(); //首页->备课提醒 -- wgh
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    // 筛选
    handClckTabs(item, index) {
      console.log("筛选");
      this.currentIndex = index;
      if (this.currentIndex == 0) {
        // 本周
        this.filter.start_time = this.$Common.getWeekStartAndEnd(0)[0];
        this.filter.end_time = this.$Common.getWeekStartAndEnd(0)[1];
        this.getTeacher(); // 首页->备上课时统计 -- wgh
        this.Statistic(); // 首页->备上课时统计 -- wgh
      } else if (this.currentIndex == 1) {
        // 本月
        this.filter.start_time = this.$Common.getMonthStartAndEnd(0)[0];
        this.filter.end_time = this.$Common.getMonthStartAndEnd(0)[1];
        this.getTeacher(); // 首页->备上课时统计 -- wgh
        this.Statistic(); // 首页->备上课时统计 -- wgh
      } else {
        this.filter.start_time = "";
        this.filter.end_time = "";
        this.getTeacher(); // 首页->备上课时统计 -- wgh
      }
    },
    highTimeChange() {
      this.filter.start_time = this.filterTime ? this.filterTime[0] : "";
      this.filter.end_time = this.filterTime ? this.filterTime[1] : "";
      this.getTeacher(); // 首页->备上课时统计 -- wgh
      this.Statistic(); // 首页->备上课时统计 -- wgh
    },
    // 近两周备课上课提醒----筛选
    handClckStatusTabs(item, index) {
      this.currentIndex2 = index;
      this.filter.code = index;
      this.LessonReminder(); //首页->备课提醒 -- wgh
    },
    // 备课提醒筛选
    remindSearch() {
      this.LessonReminder(); //首页->备课提醒 -- wgh
    },
    // 点击备课
    handPreparing(row) {
      this.$router.push(
        `/Interesting/prepareLessons/preLessonDetais?class_id=${row.class_id}&course_branch=${row.course_branch}&hour_lessontimes=${row.hour_lessontimes}`
      );
    },
    // 点击我知道了
    handKnow(row) {
      let hour_list = [];
      hour_list.push({
        hour_id: row.hour_id,
      });
      this.MarkReadAction(hour_list); //首页->备课提醒->标记阅读状态 -- wgh
    },
  },
  mounted() {},
};
</script>
<style lang="less">
@import "../Interesting.less";
.Interesting-index {
  .filter-teacher {
    i {
      color: #00a6ff !important;
    }
    color: #00a6ff;
    input {
      color: #00a6ff;
      border-color: #00a6ff;
    }
    .el-select:hover .el-input__inner {
      color: #00a6ff;
      border-color: #00a6ff;
    }
    ::placeholder {
      color: #00a6ff;
    }
  }
}
</style>
