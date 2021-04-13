<template>
  <div class="classSchedule classSchedule-add course-comm">
    <div class="filter-box">
      <div class="Schedule-box flex--space Schedule-box-add">
        <div class="schedule-left">
          <div class="flex">
            <div class="week-box font-aa tips">
              <div class="week">
                <label class="label">时间:</label>
                <span class="prev operate" @click="prev()">&lt;</span>
                <span class="weeks weeks1 font-333 pl5" ref="preDom">2018-11-12</span>
                <span class="process font-333 pl5 pr5">—</span>
                <span class="weeks weeks2 font-333 pr5" ref="nextDom">2018-11-18</span>
                <span class="next operate" @click="next()">&gt;</span>
              </div>
              <div class="detail-time">
                <label for class="pl20">起始时间：</label>
                <el-time-select
                  clearable
                  @blur="roomTimeTableList"
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
                  @blur="roomTimeTableList"
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
              <div class="split-line"></div>
              <div class="tip-item time_split">
                <span class="title">时间间隔:</span>
                <el-input v-model="filter.lengthtime" @blur="roomTimeTableList" placeholder="时间间隔"></el-input>分
              </div>
              <div class="split-line"></div>
              <div class="search tip-item">
                <el-input
                  placeholder="请输入教师名称 、教师编号"
                  v-model="filter.keyword"
                  @keyup.enter.native="keyWords()"
                  clearable
                  @clear="keyWords()"
                  style="width:210px;"
                ></el-input>
                <el-button type="primary" size="small" @click="keyWords()">查询</el-button>
              </div>
            
            </div>

          </div>
        </div>
      </div>
      <div class="tabList mt12">
        <CourseTableReport
          :list="ClassScheduleTable.tableData"
          :options="ClassScheduleTable.optionCourse"
          :columns="ClassScheduleTable.courseClassColumns"
          :operates="ClassScheduleTable.operatesCourse"
          :tableOperate="{}"
          tableType="1"
          :isMark="isMark"
          :tableDateNumber="tableDate"
          :preDom="preDom"
          @listsClick="listsClick"
        ></CourseTableReport>
      </div>
    </div>
    <!-- 课程详情弹窗 -->
    <div class="smallDialog course-prop-box">
      <el-dialog title="课程详情" :visible.sync="courseVisible" width="600px">
        <div class="create-box">
          <div class="course-detail">
            <div class="title font-333">
              <h3>{{this.courseClassInfo.class_cnname}}&nbsp;&nbsp;{{this.courseClassInfo.class_branch}}</h3>
              <span class="font-aa text-1">
                课程编号：
                <span class="font-333">{{this.courseClassInfo.course_branch}}</span>
              </span>
            </div>
            <div class="info font-aa text-1">
              <ul>
                <li>
                  <i class="mh-skjs"></i>
                  <span>
                    教室：
                    <span class="font-333">{{this.courseClassInfo.classroom_cnname}}</span>
                  </span>
                </li>
                <li>
                  <i class="mh-skls"></i>
                  <span>
                    教师：
                    <span class="font-333">{{this.courseClassInfo.staffer_cnname}}</span>
                  </span>
                </li>
                <li>
                  <i class="mh-skbj"></i>
                  <span>
                    班级：
                    <span class="font-333">{{this.courseClassInfo.class_cnname}}</span>
                    <!-- <span class="font-f0" v-if="this.courseClassInfo.hour_ischecking === -2">[冲突]</span> -->
                    <!-- <span
                      class="font-f0"
                      v-if="this.courseClassInfo.hour_ischecking_status === -2"
                    >[冲突]</span>
                    <span v-else>[冲突]</span>-->
                  </span>
                </li>
                <li>
                  <i class="mh-sksj"></i>
                  <span>
                    时间：
                    <span
                      class="font-333"
                    >{{this.courseClassInfo.hour_day}} {{this.courseClassInfo.hour_starttime}} — {{this.courseClassInfo.hour_endtime}}</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer pull-left"></span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import CourseTableReport from "../../../../../components/tables/CourseTableReport";
import storeclassSchedule from "../classSchedule";
export default {
  name: "classclassSchedule",
  components: {
    CourseTableReport
  },
  data() {
    return {
      filter: {
        lengthtime: 60,
        classList: [],
        starttime: "",
        endtime: "",
        classroom_id: "",
        teacherList: [],
        keyword: ""
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
      //班级课程列表数据
      ClassScheduleTable: {
        tableData: [],
        optionCourse: {
          stripe: true,
          mutiSelect: false, // 是否支持列表项选中功能
          highlightCurrentRow: true, // 是否支持当前行高亮显示
          tableHeight: Number,
          errortip: ""
        },
        courseClassColumns: [],
        tableOperate: {},
        // 列操作按钮,
        operatesCourse: {
          width: 200,
          label: "操作",
          align: "center",
          fixed: "right",
          list: []
        }
      },
      // 表格数据
      conflictData: [],
      optionscaozuo: {
        stripe: true,
        mutiSelect: false, // 是否支持列表项选中功能
        highlightCurrentRow: true // 是否支持当前行高亮显示
      },
      columns: [],
      // 列操作按钮,
      operates: {
        width: 200,
        label: "操作",
        align: "center",
        fixed: "right",
        list: []
      },
      value10: "",
      //调整上课时间-按教室调整--表格数据
      classChooseData: [],
      optionsClassChoose: {
        stripe: true,
        mutiSelect: false, // 是否支持列表项选中功能
        highlightCurrentRow: true // 是否支持当前行高亮显示
      },
      columnsClassChoose: [],
      // 列操作按钮,
      operatesClassChoose: {
        width: 200,
        label: "操作",
        align: "center",
        fixed: "right",
        list: []
      },

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
      //上课方式 --- 开始
      myWay: {
        way: "",
        re_school_id: "",
        schoolList: "",
        wayList: [
          {
            hour_way: "",
            label: "不限"
          },
          {
            hour_way: "0",
            label: "实体课"
          },
          {
            hour_way: "1",
            label: "线上课"
          }
        ]
      },
      //上课方式 --- 结束
      courseClassInfo: {} //班级课表-课程详情-详细信息
    };
  },
  watch: {},
  created() {
    this.ClassScheduleTable.optionCourse.tableHeight = this.$Common.getTableHeight(
      260
    );
    this.roomTimeTableList();

    // this.getTeacherApi();
    //设置本周开始结束的默认值
    this.startTime4 = this.$Common.getWeekStartAndEnd(0)[0];
    this.endTime4 = this.$Common.getWeekStartAndEnd(0)[1];
    this.startTime3 = this.$Common.getWeekStartAndEnd(0)[0];
    this.endTime3 = this.$Common.getWeekStartAndEnd(0)[1];
  },
  mounted() {
    this.$refs.preDom.innerHTML = this.$Common.getWeekStartAndEnd(0)[0];
    this.$refs.nextDom.innerHTML = this.$Common.getWeekStartAndEnd(0)[1];
  },
  methods: {
    //关键字-查询
    keyWords() {
      console.log(this.keyword);
      this.roomTimeTableList();
    },
    // 教师详情 stafferTimeTable
    roomTimeTableList() {
      return new Promise((resolve, reject) => {
        storeclassSchedule
          .stafferTimeTable({
            classroom_id: this.filter.classroom_id,
            re_school_id: this.myWay.re_school_id,
            hour_startday: this.preDom,
            starttime: this.filter.starttime,
            endtime: this.filter.endtime,
            lengthtime: this.filter.lengthtime,
            keyword: this.filter.keyword
            // hour_way:this.myWay.way //上课方式
          })
          .then(res => {
            this.ClassScheduleTable.courseClassColumns = res.data.result.field;
            if (res.data.error == 0) {
              this.ClassScheduleTable.tableData = res.data.result.list;
              // this.tableDateArray = res.data.result.field;
              resolve(res);
            } else {
              this.ClassScheduleTable.tableData = [];
              this.ClassScheduleTable.optionCourse.errortip = res.data.errortip;
              // this.$message({
              //   message: res.data.errortip,
              //   type: "error"
              // });
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
          this.courseClassInfo = res.data.result.list.hour; //班级课表-课程详情-详细信息
          this.propState = res.data.result.list.hour.hour_ischecking; //需要传递到冲突课程调整里的冲突状态
          this.PointNameClassId = res.data.result.list.hour.class_id; //点名上课所需的班级id
          console.log(res.data.result.list.hour.class_id, 9999);
          this.conflictData = res.data.result.list.conflict; //列
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
    //开始时间 控制结束时间
    changeEnd() {
      // this.pickerOptionsEnd = Object.assign({}, this.pickerOptionsEnd, {
      //     disabledDate: (time) => {
      //         return time.getTime() < this.endTime
      //     }
      // })
    },
    // // 获取教室
    // getClassroomList() {
    //   storeclassSchedule.getClassroomList({}).then(res => {
    //     if (res.data.error == 0) {
    //       this.filter.classList = res.data.result;
    //     }
    //   });
    // },
    // 获取教师
    // getTeacherApi() {
    //   storeclassSchedule.getTeacherApi({}).then(res => {
    //     if (res.data.error == 0) {
    //       this.filter.teacherList = res.data.result.list;
    //     }
    //   });
    // },

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
      this.roomTimeTableList();
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
      this.roomTimeTableList();
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
      this.roomTimeTableList().then(res => {
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
    // 获取窗口高度
    getClientHeight() {
      var clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        var clientHeight =
          document.body.clientHeight < document.documentElement.clientHeight
            ? document.body.clientHeight
            : document.documentElement.clientHeight;
      } else {
        var clientHeight =
          document.body.clientHeight > document.documentElement.clientHeight
            ? document.body.clientHeight
            : document.documentElement.clientHeight;
      }
      return clientHeight - 270;
    },
    handleColumnChange(params1, params2) {
      console.log(params1, params2);
      // this.$router.push({path: '/'})
      this.$router.push({
        path: "/ClassManagement/studentDetails"
      });
    }
  }
};
</script>

<style lang="less">
@import url("../classSchedule.less");
.classSchedule-add .schedule-left .week-box {
  flex-wrap: wrap;
}
.classSchedule {
  .filter-box {
    font-size: 14px;
  }
  .dsadwq {
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
