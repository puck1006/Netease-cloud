<template>
  <div class="classSchedule course-comm height100">
    <div class="filter-box">
      <div
        class="Schedule-box Schedule-box-height flex--space pl20"
        style="display: flex;
    justify-content: space-between;"
      >
        <div class="schedule-left">
          <div class="flex">
            <div class="week-box font-aa">
              <div class="week">
                <label class="label">时间:</label>
                <span class="prev operate" @click="prev()">&lt;</span>
                <span class="weeks weeks1 font-333 pl5" ref="preDom">2018-11-12</span>
                <span class="process font-333 pl5 pr5">—</span>
                <span class="weeks weeks2 font-333 pr5" ref="nextDom">2018-11-18</span>
                <span class="next operate" @click="next()">&gt;</span>
                <span
                  :class="[isMark==true && isMark1==true ?'cur':'','today']"
                  @click="today()"
                  ref="todayTime"
                >今日</span>
              </div>
            </div>
            <div class="tips">
              <div class="classroom">
                <span class="name font-aa">上课方式：</span>
                <el-select
                  clearable
                  filterable
                  v-model="myWay.way"
                  placeholder="请选择"
                  @change="keyWords"
                  style="width:100px"
                >
                  <el-option
                    v-for="item in myWay.wayList"
                    :key="item.hour_way"
                    :label="item.label"
                    :value="item.hour_way"
                  ></el-option>
                </el-select>
              </div>
              <div class="search tip-item">
                <el-input
                  placeholder="请输入教师名称 、教师编号"
                  v-model="keyword"
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
        <div class="schedule-right font-333 mt10">
          <ul>
            <li>
              <span class="state state3"></span>已取消
            </li>
            <li>
              <span class="state state1"></span>已上课
            </li>
            <li>
              <span class="state state2"></span>待上课
            </li>
            <!-- <li>
              <span class="state state4"></span>已冲突
            </li>-->
          </ul>
        </div>
      </div>
      <div class="tabList" ref="auto_height_table">
        <CoursetTable
          :tableData="ClassScheduleTable"
          :typeSchedule="2"
          @listsClick="listsClick"
          :isMark="isMark"
          :tableDateNumber="tableDate"
          :preDom="preDom"
        ></CoursetTable>
      </div>
    </div>

    <!-- 课程详情弹窗 -->
    <div class="smallDialog course-prop-box">
      <el-dialog
        title="课程详情"
        :visible.sync="courseVisible"
        width="600px"
        custom-class="myCourseProp"
      >
        <div class="create-box">
          <div class="course-detail">
            <div class="title font-333">
              <h3>{{this.courseClassInfo.class_cnname}}&nbsp;&nbsp;{{this.courseClassInfo.class_branch}}</h3>
              <span class="font-aa text-1">
                课程别编号：
                <span class="font-333">{{this.courseClassInfo.course_branch}}</span>
              </span>
            </div>
            <div class="info font-aa text-1">
              <ul>
                <li>
                  <i class="mh-skjs"></i>
                  <span>
                    教室：
                    <span
                      class="font-333"
                    >{{this.courseClassInfo.classroom_cnname}}({{this.courseClassInfo.hour_way_name}})</span>
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
import CoursetTable from "../../../../../components/tables/CourseTable1";
import storeclassSchedule from "../classSchedule";
export default {
  name: "classclassSchedule",
  components: {
    CoursetTable
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < new Date("2019-04-30");
        }
      },
      isMark: false, //点击今日筛选的标识
      isMark1: false, //点击今日筛选的标识
      prevWeek: 0, //上周(本周)
      prevWeekPlace: -1, //上周--
      nextWeek: 1, //下周
      nextWeekPlace: 1, //下周++
      isToday: true, //父组件向子组件传递-今日筛选的状态值
      todayDate: "", //今日筛选,日期
      tableDate: -1, //今日筛选表格表头数据的日期
      tableDateArray: [], //存储-今日筛选表格表头数据的日期-数组
      keyword: "", // 筛选
      selectForm: {
        className: ""
      },
      preDom: this.$Common.getWeekStartAndEnd(0)[0], //一周开始时间
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
      courseVisible: false, //课程详情
      //班级课程列表数据
      ClassScheduleTable: {
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
          ColumnName: "report_callRecord" //当前页面的名称，通常与路由名称一致
        }
      },
      courseClassInfo: {} //班级课表-课程详情-详细信息
    };
  },
  watch: {},
  created() {
    this.getTeacTimetableData(); //课务管理->获取班级的周课表

    //设置本周开始结束的默认值
    this.startTime4 = this.$Common.getWeekStartAndEnd(0)[0];
    this.endTime4 = this.$Common.getWeekStartAndEnd(0)[1];
    this.startTime3 = this.$Common.getWeekStartAndEnd(0)[0];
    this.endTime3 = this.$Common.getWeekStartAndEnd(0)[1];
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs["auto_height_table"]) {
        this.ClassScheduleTable.options.tableHeight = this.$Tool.getTableHeight(
          this.$refs.auto_height_table.getBoundingClientRect().top + 52
        );
      }
    });
    // this.prevWeek=0;
    this.$refs.preDom.innerHTML = this.$Common.getWeekStartAndEnd(0)[0];
    this.$refs.nextDom.innerHTML = this.$Common.getWeekStartAndEnd(0)[1];
    console.log(this.$refs.todayTime.innerHTML);
  },
  methods: {
    //课务管理->获取班级的周课表
    getTeacTimetableData() {
      return new Promise((resolve, reject) => {
        storeclassSchedule
          .getTeacTimetable({
            staffer_id: this.staffer_id,
            token: this.token,
            school_id: this.school_id,
            company_id: this.company_id,
            re_school_id: this.myWay.re_school_id,

            //数据筛选
            hour_startday: this.preDom, //一周开始时间
            keyword: this.keyword,
            conflict: this.isConflict,
            // classroom_id: this.selectForm.className,
            hour_way: this.myWay.way //上课方式
          })
          .then(res => {
            this.ClassScheduleTable.columns = res.data.result.field;
            this.tableDateArray = res.data.result.field;
            if (res.data.error == 0) {
              this.ClassScheduleTable.list = res.data.result.list;
              console.log(this.tableDateArray, 33333333);
              resolve(res);
            } else {
              this.ClassScheduleTable.list = [];
              // this.ClassScheduleTable.options.errortip = res.data.errortip;
            }
          })
          .catch(error => {
            reject(error);
          });
        console.log(this.isConflict);
      });
    },
    get() {
      this.getparent = this.$parent.isClassCheck;
      console.log(this.getparent);
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
          console.log(res);
          this.courseClassInfo = res.data.result.list.hour; //班级课表-课程详情-详细信息
          this.propState = res.data.result.list.hour.hour_ischecking; //需要传递到冲突课程调整里的冲突状态
          this.PointNameClassId = res.data.result.list.hour.class_id; //点名上课所需的班级id
          console.log(res.data.result.list.hour.class_id, 9999);
          this.conflictData = res.data.result.list.conflict; //列
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
    //切换上周-查询
    prev() {
      this.tableDate = -1;
      this.isMark1 = false;
      this.isMark = false;
      // this.isMark=!this.isMark;
      // if(this.isMark==true){
      //   this.isMark1=false;
      // }else{
      //   this.isMark1=true;
      // }
      console.log(this.isMark, this.isMark1, "切换上周");
      this.prevWeekPlace = --this.prevWeek;
      this.$refs.preDom.innerHTML = this.$Common.getWeekStartAndEnd(
        this.prevWeekPlace
      )[0];
      this.preDom = this.$refs.preDom.innerHTML;
      this.$refs.nextDom.innerHTML = this.$Common.getWeekStartAndEnd(
        this.prevWeekPlace
      )[1];
      this.getTeacTimetableData();
      console.log(this.$refs.preDom.innerHTML);
      console.log(this.$refs.nextDom.innerHTML);
      console.log(this.prevWeek, this.prevWeekPlace, 333333333333333);
    },
    //切换下周-查询
    next() {
      this.tableDate = -1;

      this.isMark1 = false;
      this.isMark = false;
      // this.isMark=!this.isMark;
      // if(this.isMark==true){
      //   this.isMark1=false;
      // }else{
      //   this.isMark1=true;
      // }
      console.log(this.isMark, this.isMark1, "切换下周");
      console.log(this.prevWeekPlace, this.prevWeek, "tttt");
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
      this.getTeacTimetableData();
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
      console.log(this.isMark, this.isMark1, "今日查询");
      this.getTeacTimetableData().then(res => {
        console.log(res);
        this.forData();
        this.isToday = false;
      });
      console.log(this.tableDateArray);
      // this.forData()
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
          console.log(day);
        }
      });
      this.tableDate = parseInt(day_index);
      this.nowToday = day;
    },
    //关键字-查询
    keyWords() {
      console.log(this.keyword);
      this.getTeacTimetableData();
    }
    //结束时间限制开始时间
    // changeStart() {
    //   // alert(this.pickerOptionsStart )
    //   this.pickerOptionsStart = Object.assign({}, this.pickerOptionsStart, {
    //     // 可通过箭头函数的方式访问到this
    //     disabledDate: time => {
    //       alert(1);
    //       var times = "";
    //       times =
    //         this.startTime < time.getTime() ||
    //         time.getTime() <
    //           new Date(new Date().toLocaleDateString()).getTime();
    //       return times;
    //     }
    //   });
    // },
    // //开始时间 控制结束时间
    // changeEnd() {
    //   // this.pickerOptionsEnd = Object.assign({}, this.pickerOptionsEnd, {
    //   //     disabledDate: (time) => {
    //   //         return time.getTime() < this.endTime
    //   //     }
    //   // })
    // },
  }
};
</script>

<style lang="less">
@import url("../classSchedule.less");
.tips {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  .classroom {
    margin-right: 15px;
    .font-aa {
      color: #333;
    }
    .el-input {
      input {
        height: 32px;
        line-height: 32px;
      }
    }
  }
}
.myCourseProp {
  .el-dialog__header {
    border-bottom: 1px solid #ddd;
  }
}
</style>
<style lang="less" scoped>
.classSchedule {
  .filter-box {
    font-size: 14px;
  }
  .classtype {
    // margin-right: 20px;
    padding-right: 20px;
    // border-right: 1px solid #DDDDDD;
  }
  .hjjhgs {
    display: flex;
    align-items: center;
    input {
      width: 228px;
      height: 32px;
      padding: 10px;
      padding-right: 10px;
      border: 1px solid #ddd;
      border-radius: 4px 0 0 4px;
    }
    span {
      vertical-align: top;
      width: 60px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      font-size: 14px;
      display: inline-block;
      background-color: #20a8d8;
      color: #fff;
      border: 1px solid #20a8d8;
      border-radius: 0 4px 4px 0;
      vertical-align: middle;
      cursor: pointer;
    }
  }
}
</style>
