<template>
  <div style="height: 100%">
    <div class="flex-all bg-white pAll16">
      <div class="flex">
        <div class="view-date">
          <span class="bg-default cur-pointer" @click="viewChange('day')">{{ $t("mySchedule.tabsList[0]") }}</span>
          <span class="cur-pointer" @click="viewChange('week')">{{ $t("mySchedule.tabsList[1]") }}</span>

          <span class="cur-pointer" @click="viewChange('month')">{{ $t("mySchedule.tabsList[2]") }}</span>
        </div>
      </div>
      <div class="lessonState">
        <span><em class="icon icon1"></em>{{ $t("mySchedule.statusArr[0]") }}</span>
        <span><em class="icon icon2"></em>{{ $t("mySchedule.statusArr[1]") }}</span>
      </div>
    </div>
    <div class="viewOne">
      <div class="time-change">
        <i class="el-icon-arrow-left cur-pointer color-aaa" @click="reduceTime"></i>
        <span
          >{{ weekShow }}
          <el-date-picker type="date" class="myTime" :placeholder="$t('mySchedule.placeholder1')" value-format="yyyy-MM-dd" v-model="filter.time" style="width: 140px" @change="search"></el-date-picker>
        </span>

        <i class="el-icon-arrow-right cur-pointer color-aaa" @click="addTime"></i>
      </div>
      <div class="dayTime-list" v-if="this.dataList.length > 0">
        <div class="list" v-for="(item, index) of dataList" :key="index">
          <div class="list-left">
            {{ item.name }}
          </div>
          <div class="list-right">
            <div class="item" :class="itemList.hour_ischecking == 0 ? 'bgOne bgOneB' : 'bgTwo bgTwoB'" v-for="(itemList, indexList) of item.list" :key="indexList">
              <div class="one">
                <div class="fs14 color-aaa mb20">
                  {{ $t("mySchedule.labe_text1") }}
                  <span class="color-333">{{ itemList.hour_day }} {{ itemList.hour_starttime }}-{{ itemList.hour_endtime }}</span>
                </div>
                <div class="fs14 color-aaa">
                  班级名称：
                  <span class="color-333">{{ itemList.class_cnname }}</span>
                </div>
              </div>
              <div class="one">
                <div class="fs14 color-aaa mb20">
                  {{ $t("mySchedule.labe_text3") }}
                  <span class="color-333">{{ itemList.course_branch }}</span>
                </div>
               <div class="fs14 color-aaa">
                  {{ $t("mySchedule.labe_text2") }}
                  <span class="color-333">{{ itemList.class_enname }}</span>
                </div>
              </div>
              <div class="one">
                <div class="fs14 color-aaa mb20">
                  {{ $t("mySchedule.labe_text5") }}
                  <span class="color-333">{{ itemList.classroom_cnname }}</span>
                </div>
                <div class="fs14 color-aaa">
                  {{ $t("mySchedule.labe_text6") }}
                  <span class="color-red" v-if="itemList.hour_ischecking == 0">{{ itemList.hour_ischecking_name }}</span>
                  <span class="color-green" v-else>{{ itemList.hour_ischecking_name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dayTime-list" style="background: none" v-else>
        <div class="empty-box tc">
          <i class="mh-kym_icon icon"></i>
          <p class="col-66 text-1">{{ $t("mySchedule.emptyTip") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import educationHttp from "@/views/Educational/Educational";
export default {
  name: "dayView",
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
      //当天时间
      timeShow: "",
      weekShow: "",
      filter: {
        time: "",
      },
      dataList: [],
    };
  },
  created() {
    this.getNowTime(); //时间切换
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
          datatype: 1, //1 天 2 周 3月
          fixedtime: this.timeShow,
          // starttime:"2020-02-24",
          // endtime:'2020-03-01'
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.dataList = res.data.result.list;
            console.log(this.dataList);
          } else {
            this.dataList = [];
          }
        });
    },
    // 时间切换 - 开始 ******************************
    //获取当前日期
    getNowTime() {
      let day = new Date();
      this.getShowTime(day);
    },
    // 时间格式以及周几设置
    getShowTime(date) {
      let seperator1 = "-";
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      let myddy = date.getDay(); //获取存储当前日期
      let weekday = this.$t("mySchedule.weekdayArr");
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      let currentdate = year + seperator1 + month + seperator1 + strDate;
      this.timeShow = currentdate;
      this.weekShow = weekday[myddy];
      this.filter.time = currentdate;
      // this.propParentTime = currentdate;
    },
    // 时间选择++
    addTime() {
      let now = this.timeShow;
      // this.propParentTime = this.timeShow;
      now = this.dateToMs(now); //年月日转换为秒数
      now = now + 1000 * 60 * 60 * 24;
      now = new Date(now); //秒数转化为北京标准时间
      this.getShowTime(now);
      this.timetableDayListApi();
    },
    choose_time() {
      this.getShowTime(new Date(this.timeShow));
    },
    // 时间选择--
    reduceTime() {
      console.log(11111);
      let yesterday = this.timeShow;
      // this.propParentTime = this.timeShow;
      yesterday = this.dateToMs(yesterday); //年月日转换为秒数
      yesterday = yesterday - 1000 * 60 * 60 * 24;
      yesterday = new Date(yesterday); //秒数转化为北京标准时间
      this.getShowTime(yesterday);
      this.timetableDayListApi();
    },
    dateToMs(date) {
      let result = new Date(date).getTime();
      return result;
    },
    search() {
      if (this.filter.time != "") {
        if (this.filter.time == null) {
          this.getShowTime(new Date());
        } else {
          let newTime = new Date(this.filter.time);
          this.getShowTime(newTime);
        }
      }
      this.timetableDayListApi();
    },
    // 时间切换 - 结束 ******************************
  },
};
</script>
<style lang="less"></style>
