<template>
  <div class="classSchedule classSchedule-add course-comm">
    <div class="filter-box">
      <div class="Schedule-box flex--space Schedule-box-add pl20">
        <div class="schedule-left">
          <div class="flex-wrap pt12">
            <div class="flex-al mb12">
              <span class="mr10 fs14 color-4C5">
                选择职务:
              </span>
              <div class="select-box" style="width:170px;">
                <el-select
                  v-model="filter.com_postbe_id"
                  clearable
                  filterable
                  placeholder="选择职务"
                  @change="search"
                >
                  <el-option
                    v-for="item in filter.teacherList"
                    :key="item.post_id"
                    :label="item.post_name"
                    :value="item.post_id"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="lines ml16 mr16 mb12"></div>
            <div class="flex-al mb12">
              <span class="mr10 fs14 color-4C5">选择时间</span>
              <div class="time-box ml12">
                <el-date-picker
                  v-model="filter.time"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择时间"
                  @clear="search"
                  @change="search"
                  style="width:160px;"
                ></el-date-picker>
              </div>
            </div>
            <div class="lines ml16 mr16 mb12"></div>
            <div class="detail-time mb12">
                <label for >起始时间：</label>
                <el-time-select
                  clearable
                  @clear="search"
                  @blur="search"
                  class="time__select"
                  size="small"
                  placeholder="开始时间"
                  v-model="filter.starttime"
                  :picker-options="{
                  start: '00:01',
                  step: '00:01',
                  end: '23:59'
                }"
                ></el-time-select>
                <span class="font-333">至</span>
                <el-time-select
                  clearable
                  @blur="search"
                  class="time__select"
                  size="small"
                  placeholder="结束时间"
                  v-model="filter.endtime"
                  :picker-options="{
                  start: '00:01',
                  step: '00:01',
                  end: '23:59'
                }"
                ></el-time-select>
              </div>
            <div class="lines ml16 mr16 mb12"></div>
            <div class="flex-al Inquire-box mb12">
              <div class="ipt-box" style="width:230px;">
                <el-input
                  v-model="filter.keyword"
                  clearable
                  placeholder="请输入教师名称/教师编号"
                  @clear="search"
                  @keyup.enter.native="search"
                ></el-input>
              </div>
              <el-button
                type="primary"
                size="mini"
                class="search-btn fs14"
                @click="search"
                >查询</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="tabList" ref="auto_height_table">
         <normalTableCont
          :tableData="tableList"
          @handleColumnChange="handleColumnChange"
          @handSetting="handSetting"
        ></normalTableCont>
        <!-- 分页 -->
        <el-pagination
          style="margin: 10px;"
          :current-page.sync="paging.curPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size.sync="paging.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="paging.pageTotal"
          @current-change="curPageChange"
          @size-change="pageSizeChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import normalTableCont from "@/components/tables/normalTableCont.vue";
import storeclassSchedule from "../classSchedule";
export default {
  name: "classclassSchedule",
  components: {
    normalTableCont
  },
  data() {
    return {
      filter: {
        lengthtime: 60,
        classList: [],
        starttime: "",
        endtime: "",
        classroom_id: "",
        teacherList: [
          // {
          //   teacher_type:'1',
          //   label:'中文老师'
          // },
          // {
          //   teacher_type:'2',
          //   label:'外籍老师'
          // },
        ],
        keyword:'',
        com_postbe_id:'',
        time: "",
      },
      startTime: "", //开始时间
      endTime: "", //结束时间
      prevWeek: 0, //上周(本周)
      prevWeekPlace: -1, //上周--
      nextWeek: 1, //下周
      nextWeekPlace: 1, //下周++
      isToday: true, //父组件向子组件传递-今日筛选的状态值
      todayDate: "", //今日筛选,日期
      tableDate: -1, //今日筛选表格表头数据的日期
      tableDateArray: [], //存储-今日筛选表格表头数据的日期-数组
      keyword: "", // 筛选
      preDom: this.$Common.getWeekStartAndEnd(0)[0], //一周开始时间

      accept: [], //出勤，缺勤的下拉筛选
      attendanceList: [], //获取的出勤，缺勤的下拉筛选数据
      student_checkin_list: [],
      isMark: false, //点击今日筛选的标识
      isMark1: false, //点击今日筛选的标识
      nowToday: "", //今日日期-传递到子组件
      value10: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < new Date("2019-04-30");
        }
      },
      courseVisible: false, //课程详情
      //限制开始时间
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.endTime;
          let beginDateVal = this.startTime;
          if (endDateVal) {
            return (
              time.getTime() <
                new Date(new Date().toLocaleDateString()).getTime() &&
              new Date(beginDateVal).getTime() < new Date(endDateVal).getTime()
            );
          } else {
            return (
              time.getTime() <
              new Date(new Date().toLocaleDateString()).getTime()
            );
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.startTime;
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            );
          }
        }
      },
      //上课方式 --- 结束
      // 表格数据
      tableList: {
        // 表格的列
        columns: [],
        // 表格数据
        list: [],
        options: {
          errortip: "", //空页面提示内容
          mutiSelect: false, //是否显示多选
          issetting: false, //是否可以编辑列
          tableHeight: 0, //表格高度
          moduleName: "Educational", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "JingleAssistant_schoolComplaint" //当前页面的名称，通常与路由名称一致
        }
      },
      // 分页
      paging: {
        curPage: 1,
        pageSize: 30,
        pageTotal: 0
      }
    };
  },
  watch: {},
  created() {
    this.getStafferTeachingTime();
    this.getCompanyTeaPostApi();
    //设置本周开始结束的默认值
    this.startTime4 = this.$Common.getWeekStartAndEnd(0)[0];
    this.endTime4 = this.$Common.getWeekStartAndEnd(0)[1];
    this.startTime3 = this.$Common.getWeekStartAndEnd(0)[0];
    this.endTime3 = this.$Common.getWeekStartAndEnd(0)[1];
  },
  mounted() {
    // this.$refs.preDom.innerHTML = this.$Common.getWeekStartAndEnd(0)[0];
    // this.$refs.nextDom.innerHTML = this.$Common.getWeekStartAndEnd(0)[1];
    this.$nextTick(() => {
      if (this.$refs["auto_height_table"]) {
        this.tableList.options.tableHeight = this.$Tool.getTableHeight(
          this.$refs.auto_height_table.getBoundingClientRect().top + 52
        );
      }
    });
  },
  methods: {
    // 获取职务
    getCompanyTeaPostApi() {
      storeclassSchedule.getCompanyTeaPostApi({}).then(res => {
        if (res.data.error == 0) {
          this.filter.teacherList = res.data.result;
        }
      });
    },
     //关键字-查询
    search() {
      this.paging.curPage = 1;
      console.log(this.keyword);
      this.getStafferTeachingTime();
    },
    // 教师空闲时间段
    getStafferTeachingTime() {
      return new Promise((resolve, reject) => {
        storeclassSchedule
          .getStafferTeachingTime({
            com_postbe_id:this.filter.com_postbe_id,
            hour_day: this.filter.time,
            starttime: this.filter.starttime,
            endtime: this.filter.endtime,
            keyword: this.filter.keyword,
            p: this.paging.curPage,
            num: this.paging.pageSize,
            is_count: "1" //是否需要总数
          })
          .then(res => {
             this.paging.pageTotal = parseInt(res.data.result.all_num);
            this.tableList.columns = res.data.result.field;
            if (res.data.error == "0") {
              this.tableList.list = res.data.result.list; //表格数据
            } else {
              this.tableList.list = [];
              this.tableList.options.errortip = res.data.errortip;
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    //课程详情-点击
    listsClick(index, row, item) {
      console.log(index);
      console.log(row);
      // console.log(item.class_id);
      this.classCourse_hour_id = item.hour_id;
      this.courseVisible = true;
      this.classCourseOneApiData();
      // this.getClassroomClassData();
    },
    //课程表-班级课表-课程详情
    classCourseOneApiData() {
      storeclassSchedule
        .classCourseOneApi({
          // staffer_id: this.staffer_id, //用户_id
          // token: this.token,
          // school_id: this.school_id, //	学校id
          // company_id: this.company_id, //集团id
          hour_id: this.classCourse_hour_id
        })
        .then(res => {
            this.paging.pageTotal = parseInt(res.data.result.all_num);
          this.tableList.columns = res.data.result.field;
          if (res.data.error == "0") {
            this.tableList.list = res.data.result.list; //表格数据
          } else {
            this.tableList.list = [];
            this.tableList.options.errortip = res.data.errortip;
          }
        });
    },
    //结束时间限制开始时间
    changeStart() {
      // alert(this.pickerOptionsStart )
      this.pickerOptionsStart = Object.assign({}, this.pickerOptionsStart, {
        // 可通过箭头函数的方式访问到this
        disabledDate: time => {
          alert(1);
          var times = "";
          times =
            this.startTime < time.getTime() ||
            time.getTime() <
              new Date(new Date().toLocaleDateString()).getTime();
          return times;
        }
      });
    },
     // 点击表格中的内容
    handleColumnChange(v1, v2, v3) {
      console.log(v1, v2, v3);
      this.seeComplaintDetail = true;
      this.complain_id = v3.complain_id;
      this.ComplainDetail();
    },
    // 编辑列编辑提交
    handSetting(v) {
      console.log(v);
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.getStafferTeachingTime();
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.getStafferTeachingTime();
    },
    handleClose(done) {
      done();
    },
    
    //切换上周-查询
    prev() {
      this.tableDate = -1;
      this.isMark1 = false;
      this.isMark = false;
      this.prevWeekPlace = --this.prevWeek;
      this.$refs.preDom.innerHTML = this.$Common.getWeekStartAndEnd(
        this.prevWeekPlace
      )[0];
      this.preDom = this.$refs.preDom.innerHTML;
      this.$refs.nextDom.innerHTML = this.$Common.getWeekStartAndEnd(
        this.prevWeekPlace
      )[1];
      this.getStafferTeachingTime();
    },
    //切换下周-查询
    next() {
      this.tableDate = -1;

      this.isMark1 = false;
      this.isMark = false;
      let aaa = ++this.prevWeek;
      this.nextWeekPlace = aaa;
      // this.nextWeekPlace = this.nextWeek++;
      this.$refs.preDom.innerHTML = this.$Common.getWeekStartAndEnd(
        this.nextWeekPlace
      )[0];
      this.preDom = this.$refs.preDom.innerHTML;
      this.$refs.nextDom.innerHTML = this.$Common.getWeekStartAndEnd(
        this.nextWeekPlace
      )[1];
      this.getStafferTeachingTime();
    },
    //今日-查询
    today() {
      this.prevWeek = 0;
      this.$refs.preDom.innerHTML = this.$Common.getWeekStartAndEnd(0)[0];
      this.preDom = this.$refs.preDom.innerHTML;
      this.$refs.nextDom.innerHTML = this.$Common.getWeekStartAndEnd(0)[1];
      this.isMark = !this.isMark;
      if (this.isMark == true) {
        this.isMark1 = true;
      } else {
        this.isMark1 = false;
      }
      this.getStafferTeachingTime().then(res => {
        this.forData();
        this.isToday = false;
      });
      this.$Common.getWeekStartAndEnd(
        this.prevWeekPlace
      )[0] = this.$Common.getWeekStartAndEnd(0)[0];
      this.$Common.getWeekStartAndEnd(
        this.nextWeekPlace
      )[1] = this.$Common.getWeekStartAndEnd(0)[1];
    },
    forData() {
      this.todayDate = this.$Common.getDate(0);
      var today = this.todayDate;
      var weekFirst = this.preDom;
      var day = "";
      var day_index = -1;
      this.tableDateArray.forEach(function(item, index) {
        if (item.fieldname.trim().split(/\s+/)[0] == today) {
          day = item.fieldname.trim().split(/\s+/)[0];
          day_index = index;
        }
      });
      this.tableDate = parseInt(day_index);
      this.nowToday = day;
    },
  }
};
</script>

<style lang="less">
@import url("../classSchedule.less");
.classSchedule-add .schedule-left .week-box {
  flex-wrap: wrap;
}
.classSchedule{
  .filter-box{
    font-size: 14px;
  }
  .dsadwq{
    display: flex;
    align-items: center;
  }
}

.Schedule-box-add {
  display: flex;
  align-items: center;
  .detail-time,
  .tips {
    display: flex;
    align-items: center;
    border: none !important;
  }
  .time_split {
    display: flex !important;
    align-items: center;
    .title {
      width: 60px;
    }
    .el-input {
      width: 60px !important;
      .el-input__inner {
        width: 100% !important;
      }
    }
  }
  .el-date-editor.el-input {
    width: 120px;
  }
  .time__select {
    .el-input__inner {
      width: 120px;
      text-align: center;
      border: none;
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>
