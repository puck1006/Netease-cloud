<template>
  <div>
    <div class="flex-all bg-white pAll16">
      <div class="flex">
        <div class="view-date">
          <span class="cur-pointer" @click="viewChange('day')">{{$t('mySchedule.tabsList[0]')}}</span>
          <span class="cur-pointer" @click="viewChange('week')">{{$t('mySchedule.tabsList[1]')}}</span>
          <span
            class="bg-default cur-pointer"
            @click="viewChange('month')"
          >{{$t('mySchedule.tabsList[2]')}}</span>
        </div>
      </div>
      <div class="lessonState">
        <span>
          <em class="icon icon1"></em>
          {{$t('mySchedule.statusArr[0]')}}
        </span>
        <span>
          <em class="icon icon2"></em>
          {{$t('mySchedule.statusArr[1]')}}
        </span>
      </div>
    </div>
    <div class="viewOne">
      <div class="time-change">
        <i class="el-icon-arrow-left cur-pointer color-aaa" @click="prevMonth"></i>
        <span>
          <el-date-picker
            clearable
            class="clear-icon"
            :placeholder="$t('mySchedule.placeholder2')"
            v-model="filter.time"
            @change="search"
            type="month"
            style="width: 120px;"
          ></el-date-picker>
        </span>
        <i class="el-icon-arrow-right cur-pointer color-aaa" @click="nextMonth"></i>
      </div>
      <div class="monthTime-list">
        <div class="tableDiv" ref="auto_height_table">
          <doubleListTable :tableData="tableList"></doubleListTable>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import doubleListTable from "@/components/tables/doubleListTable.vue";
import educationHttp from "@/views/Educational/Educational";
export default {
  name: "monthView",
  components: {
    doubleListTable,
  },
  props: {
    // 列表数据
    // tableData: {
    //   type: Array
    // }
  },
  data() {
    return {
      filter: {
        time: "",
      },
      month: {
        start: "",
        end: "",
        prevmonth: 0, //本月(本周)
      },
      // 表格数据
      tableList: {
        columns: [
          {
            fieldname: "周日",
            fieldstring: "G_1",
            show: 1,
            custom: 0,
          },
          {
            // fieldname: "2019-11-25 周一",
            fieldname: "周一",
            fieldstring: "A_1",
            show: 1,
            custom: 0,
          },
          {
            fieldname: "周二",
            fieldstring: "B_1",
            show: 1,
            custom: 0,
          },
          {
            fieldname: "周三",
            fieldstring: "C_1",
            show: 1,
            custom: 0,
          },
          {
            fieldname: "周四",
            fieldstring: "D_1",
            show: 1,
            custom: 0,
          },
          {
            fieldname: "周五",
            fieldstring: "E_1",
            show: 1,
            custom: 0,
          },
          {
            fieldname: "周六",
            fieldstring: "F_1",
            show: 1,
            custom: 0,
          },
        ],
        list: [],
        options: {
          errortip: "", //空页面提示内容
          mutiSelect: false, //是否显示多选
          issetting: false, //是否可以编辑列
          tableHeight: "", //表格高度
        },
      },
    };
  },
  created() {
    this.getNowTime();
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
          datatype: 3, //1 天 2 周 3月
          monthtime: this.month.start,
        })
        .then((res) => {
          console.log(res);
          if (res.data.error == 0) {
            this.tableList.list = res.data.result.list;
            console.log(this.dataList);
          } else {
            this.tableList.list = [];
          }
        });
    },
    //时间开始 ***********
    getNowTime() {
      console.log(new Date());
      this.getShowTime(new Date());
    },
    // 时间格式以及周几设置
    getShowTime(date) {
      let seperator1 = "-";
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      let currentdate = year + seperator1 + month + seperator1 + strDate;
      this.timeShow = currentdate;
      let dateShow = currentdate;
      this.month.start =
        dateShow.split("-")[0] + seperator1 + dateShow.split("-")[1];
      this.filter.time = this.month.start;
      console.log(this.timeShow, dateShow, this.month.start);
    },
    dateToMs(date) {
      let result = new Date(date).getTime();
      let myDate = date;
      let year = myDate.split("-")[0];
      let month = myDate.split("-")[1];
      let obj = {
        result: result,
        lenth: this.getMonthDayTotal(year, month),
      };
      console.log(obj);
      return obj;
    },
    //当前月份天数
    getMonthDayTotal(year, month) {
      month = parseInt(month, 10);
      var d = new Date(year, month, 0);
      return d.getDate();
    },
    //下个月 ++
    nextMonth() {
      let now = this.timeShow;
      let length = parseInt(this.dateToMs(now).lenth);
      now = this.dateToMs(now).result; //年月日转换为秒数
      now = now + 1000 * 60 * 60 * 24 * length;
      now = new Date(now); //秒数转化为北京标准时间
      this.getShowTime(now);
      this.timetableDayListApi();
      // this.getPlan();
    },
    //上个月 --
    prevMonth() {
      let yesterday = this.timeShow;
      let length = parseInt(this.dateToMs(yesterday).lenth);
      yesterday = this.dateToMs(yesterday).result; //年月日转换为秒数
      yesterday = yesterday - 1000 * 60 * 60 * 24 * length;
      yesterday = new Date(yesterday); //秒数转化为北京标准时间
      this.getShowTime(yesterday);
      this.timetableDayListApi();

      // this.getPlan();
    },
    //筛选
    search() {
      if (this.filter.time != "") {
        if (this.filter.time == null) {
          this.getShowTime(new Date());
        } else {
          // let newTime =  new Date(this.filter.time)
          let newTime = this.filter.time;
          this.getShowTime(newTime);
        }
      }
      this.timetableDayListApi();
    },
    //时间结束 ***********
  },
};
</script>
<style lang="less">
</style>
