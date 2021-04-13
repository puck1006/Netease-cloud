<template>
  <!-- 我的课程表 -->
  <div class="classSchedule">
    <div class="top fs18 mb16">
      <div class="tc color-blue flex-al-ce">
        <i class="icon-left fs24 cur-pointer" @click="prevChange()"></i>
        <span class="ml30 mr30 yearMonth">{{ yearMonth }}</span>
        <i class="icon-right fs24 cur-pointer" @click="nextChange()"></i>
      </div>
      <div class="class-status fs12 tr color-243 flex-al">
        <span class="cicle bg-green mr5"></span>
        <span>{{ $t("Interesting.home.classScheduleStaus[0]") }}</span>
        <span class="cicle bg-red mr5 ml20"></span>
        <span>{{ $t("Interesting.home.classScheduleStaus[1]") }}</span>
      </div>
    </div>
    <div class="classSchedule-content">
      <div class="classSchedule-top flex-al tc">
        <span
          v-for="(item, index) in $t('Interesting.home.weeks')"
          :key="index"
          >{{ item }}</span
        >
      </div>
      <ul>
        <li
          class="cur-pointer"
          v-for="(item, index) in classScheduleList"
          :key="index"
        >
          <p
            class="day pl12 pr12"
            :class="{
              'color-B8C': item.isPrevMonth,
              'color-blue': item.list && item.list.length > 0,
            }"
          >
            {{ item.day }}
          </p>
          <ul class="fs12 mt4" v-if="item.list && item.list.length > 0">
            <li
              class="cur-pointer"
              v-for="(item1, index1) in item.list"
              :key="index1"
            >
              <el-popover
                placement="right-start"
                popper-class="pop-day-classSchedule"
                width="200"
                trigger="hover"
              >
                <div class="info-body">
                  <!-- prepare_status 0待备课 1已备课
                  attend_status 0待上课 1已上课-->
                  <div class="top mb10">
                    <span
                      class="mr16"
                      :class="
                        item1.prepare_status == '1'
                          ? 'color-green'
                          : 'color-red'
                      "
                    >
                      {{
                        item1.prepare_status == "1"
                          ? $t("Interesting.home.classSchedulePover.status1")
                          : $t("Interesting.home.classSchedulePover.status1_2")
                      }}
                    </span>
                    <span
                      :class="
                        item1.attend_status == '1' ? 'color-green' : 'color-red'
                      "
                    >
                      {{
                        item1.attend_status == "1"
                          ? $t("Interesting.home.classSchedulePover.status2")
                          : $t("Interesting.home.classSchedulePover.status2_2")
                      }}
                    </span>
                  </div>
                  <div class="cont">
                    <p>
                      {{
                        $t("Interesting.home.classSchedulePover.class_name")
                      }}：{{ item1.class_cnname }}
                    </p>
                    <p>
                      {{
                        $t("Interesting.home.classSchedulePover.course_name")
                      }}：{{ item1.course_cnname }}
                    </p>
                    <p>
                      {{
                        $t("Interesting.home.classSchedulePover.class_room")
                      }}：{{ item1.classroom_cnname }}
                    </p>
                    <p>
                      {{ $t("Interesting.home.classSchedulePover.time") }}：{{
                        item1.hour_starttime
                      }}
                      -{{ item1.hour_endtime }}
                    </p>
                  </div>
                  <div
                    class="tr mt10"
                    v-if="
                      (item1.is_beike &&
                        $Tool.getStorage('postpart_isteregulator') == '1') ||
                      $Tool.getStorage('postpart_isteregulator') == '0'
                    "
                  >
                    <el-button
                      type="primary"
                      size="mini"
                      @click="handPreparing(item1)"
                    >
                      {{ $t("Interesting.home.classSchedulePover.btn_name") }}
                    </el-button>
                  </div>
                </div>
                <el-button type="text" slot="reference">
                  <!-- prepare_status 0待备课 1已备课
                  attend_status 0待上课 1已上课-->
                  <p class="status tr">
                    <span
                      class="mr4"
                      :class="
                        item1.prepare_status == '1' ? 'bg-green' : 'bg-red'
                      "
                    ></span>
                    <span
                      :class="
                        item1.attend_status == '1' ? 'bg-green' : 'bg-red'
                      "
                    ></span>
                  </p>
                  <p class="class_name">{{ item1.class_cnname }}</p>
                </el-button>
              </el-popover>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import httpApi from "../../views/Interesting/Interesting";
export default {
  name: "classSchedule",
  props: ["dialogVisable", "re_staffer_id"],
  components: {},
  data() {
    return {
      // 日期列表
      classScheduleList: [],
      yearMonth: "",
      year: "",
      month: "",
    };
  },
  mounted() {},
  updated() {},
  created() {
    console.log(this.re_staffer_id);
    let now = new Date();
    this.year = now.getFullYear();
    this.month = now.getMonth() + 1;
    this.yearMonth =
      this.year +
      "-" +
      (parseInt(this.month) >= 10 ? this.month : "0" + this.month);
    this.LessonTotal(); //首页->备上课课程表  -- wgh
  },
  methods: {
    //首页->备上课课程表  -- wgh
    LessonTotal() {
      httpApi
        .LessonTotal({
          yearMonth: this.yearMonth,
          re_staffer_id: this.re_staffer_id,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.classScheduleList = res.data.result.list;
          } else {
            this.classScheduleList = [];
          }
        });
    },
    // 上个月
    prevChange() {
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
      this.LessonTotal(); //首页->备上课课程表  -- wgh
    },
    // 下个月
    nextChange() {
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
      this.LessonTotal(); //首页->备上课课程表  -- wgh
    },
    // 点击备课
    handPreparing(item) {
      console.log(item);
      this.$router.push(
        `/Interesting/prepareLessons/preLessonDetais?class_id=${item.class_id}&course_branch=${item.course_branch}&hour_lessontimes=${item.hour_lessontimes}`
      );
    },
  },
  computed: {},
};
</script>

<style lang="less">
@schoolBaseColor: #00a6ff;
.classSchedule {
  .class-status {
    justify-content: flex-end;
    .cicle {
      display: inline-block;
      width: 14px;
      height: 14px;
      border-radius: 50%;
    }
  }
  .classSchedule-content {
    .classSchedule-top {
      border: 1px solid #dadde9;
      border-bottom: none;
      border-right: none;
      span {
        display: inline-block;
        padding: 14px;
        width: 14.2857%;
        border: 1px solid #ddd;
        border-top: none;
        border-left: none;
        border-bottom: none;
        background: #f9fcff;
        color: #8a96bc;
      }
    }
    > ul {
      display: flex;
      flex-wrap: wrap;
      border: 1px solid #dadde9;
      border-bottom: none;
      border-right: none;
      > li {
        width: 14.2857%;
        height: 170px;
        overflow-y: auto;
        padding: 12px 0px;
        color: #24356a;
        border: 1px solid #ddd;
        border-top: none;
        border-left: none;
        ul li {
          width: 100%;
          background: rgba(0, 166, 255, 0.06);
          border-radius: 2px;
          margin-bottom: 8px;
          .status span {
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
          }
          .el-button--text {
            width: 100%;
            padding: 0px 12px 8px 12px;
            color: #24356a;
            .class_name {
              max-width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        ul li:hover {
          .el-button--text {
            color: #fff;
            background: @schoolBaseColor;
          }
        }
      }
      /*修改滚动条样式*/
      > li::-webkit-scrollbar {
        width: 5px;
        height: 10px;
        /**/
      }
      > li::-webkit-scrollbar-track {
        background: #d6d6d6;
        border-radius: 2px;
      }
      > li::-webkit-scrollbar-thumb {
        background: #efefef;
        border-radius: 10px;
      }
    }
  }
}
.pop-day-classSchedule {
  .color-red {
    color: #ff3569;
  }
  .color-8A9 {
    color: #8a96bc;
  }
  .info-body {
    color: #24356a;
    line-height: 24px;
    font-size: 12px;
  }
}
</style>
