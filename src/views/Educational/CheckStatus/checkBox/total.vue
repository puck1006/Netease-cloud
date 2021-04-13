<template>
  <div class="Educational-total">
    <div class="flex-wrap pt12 pl12 pr12 flex-warp-line">
      <div class="flex-al mb12">
        <div class="right-mode fs14 color-8A9">
          <span
            class="cur-pointer mr20"
            @click="mode = true"
            :class="{ 'color-blue': mode }"
            >{{ $t("Common.mode.card_mode") }}</span
          >
          <span
            class="cur-pointer"
            :class="{ 'color-blue': !mode }"
            @click="tabList"
            >{{ $t("Common.mode.list_mode") }}</span
          >
        </div>
        <!-- <span class="mr10 fs14 color-666">{{$t("Educational.circulateRegistrat.school")}}</span>
        <div class="select-box" style="width:170px;">
          <el-select
            v-model="filter.re_school_id"
            filterable
            clearable
            :placeholder="$t('Educational.circulateRegistrat.school_ph')"
            @change="searchSchool"
          >
            <el-option
              v-for="item in filter.schoolList"
              :key="item.school_id"
              :label="item.school_cnname"
              :value="item.school_id"
            ></el-option>
          </el-select>
        </div> -->
      </div>
      <!-- <div class="lines ml16 mr16 mb12"></div> -->
      <div class="flex-al mb12">
        <span class="mr10 fs14 color-666">{{
          $t("Educational.circulateRegistrat.course")
        }}</span>
        <div class="select-box" style="width: 170px">
          <el-select
            v-model="filter.course_id"
            filterable
            clearable
            :placeholder="$t('Educational.circulateRegistrat.course_ph')"
            @change="search"
          >
            <el-option
              v-for="item in filter.courseList"
              :key="item.course_id"
              :label="item.course_cnname"
              :value="item.course_id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="lines ml16 mr16 mb12"></div>
      <div class="flex-al mb12">
        <span class="mr10 fs14 color-666">{{
          $t("Educational.circulateRegistrat.teacher")
        }}</span>
        <div class="select-box" style="width: 170px">
          <el-select
            v-model="filter.re_staffer_id"
            filterable
            clearable
            :placeholder="$t('Educational.circulateRegistrat.teacher_ph')"
            @change="search"
          >
            <el-option
              v-for="item in filter.stafferList"
              :key="item.staffer_id"
              :label="item.staffer_cnname"
              :value="item.staffer_id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="lines ml16 mr16 mb12"></div>
      <div class="flex-al mb12">
        <span class="mr10 fs14 color-666">{{
          $t("Educational.circulateRegistrat.classroom")
        }}</span>
        <div class="select-box" style="width: 170px">
          <el-select
            v-model="filter.classroom_id"
            filterable
            clearable
            :placeholder="$t('Educational.circulateRegistrat.classroom_ph')"
            @change="search"
          >
            <el-option
              v-for="item in filter.classRoomList"
              :key="item.classroom_id"
              :label="item.classroom_cnname"
              :value="item.classroom_id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="lines ml16 mr16 mb12"></div>
      <div class="flex-al Inquire-box mb12">
        <div class="ipt-box" style="width: 270px">
          <el-input
            v-model="filter.keyword"
            @clear="search"
            @keyup.enter.native="search"
            clearable
            :placeholder="$t('Educational.circulateRegistrat.find_ph')"
          ></el-input>
        </div>
        <el-button
          type="primary"
          size="small"
          class="search-btn fs14"
          @click="search"
          >{{ $t("Common.input_button") }}</el-button
        >
      </div>
    </div>
    <div class="content-box">
      <div
        v-if="mode"
        class="card mt10 mb10"
        ref="auto_height_table"
        :style="{ height: tableList.options.tableHeight + 'px' }"
      >
        <template v-if="tableList.list.length > 0">
          <div
            class="onecard"
            v-for="(card, index) in tableList.list"
            :key="index"
            @click="handSee(card)"
          >
            <div class="header color-243">
              <div class="title">{{ card.class_cnname }}</div>
              <div class="status1" v-if="card.class_status == 0">
                {{ $t("Educational.circulateRegistrat.class_tab[1]") }}
              </div>
              <div class="status2" v-else-if="card.class_status == 1">
                {{ $t("Educational.circulateRegistrat.class_tab[0]") }}
              </div>
            </div>
            <div class="main fs14">
              <div class="left">
                <div>
                  <span>{{ tableList.cardfield.course_cnname }}</span>
                  : {{ card.course_cnname }}
                  <span></span>
                </div>
                <div>
                  <span>{{ tableList.cardfield.course_branch }}</span>
                  : {{ card.course_branch }}
                  <span></span>
                </div>
                <div>
                  <span>{{ tableList.cardfield.classroom_cnname }}</span>
                  : {{ card.classroom_cnname }}
                  <span></span>
                </div>
                <div>
                  <span>{{ tableList.cardfield.class_enname }}</span>
                  : {{ card.class_enname }}
                  <span></span>
                </div>
                <div>
                  <span>{{ tableList.cardfield.class_branch }}</span>
                  : {{ card.class_branch }}
                  <span></span>
                </div>
                <!-- <div>
                <span>{{ tableList.cardfield.school_cnname }}</span>
                : {{ card.school_cnname }}
                <span></span>
              </div> -->
                <div class="flex-al">
                  <span>{{ tableList.cardfield.student_nums }}</span
                  >:
                  <div class="progress-au dsplay ml8 mr8">
                    <div class="out-progress">
                      <div
                        class="inner-progress"
                        :style="{
                          width:
                            parseInt(card.student_nums.split('/')[0]) >
                            parseInt(card.student_nums.split('/')[1])
                              ? card.student_nums.split('/')[1]
                              : (card.student_nums.split('/')[0] /
                                  card.student_nums.split('/')[1]) *
                                  100 +
                                '%',
                        }"
                      ></div>
                    </div>
                  </div>
                  <span>{{ card.student_nums }}</span>
                </div>
              </div>
              <div class="right">
                <el-progress
                  type="circle"
                  :percentage="
                    (Number(card.hour_checkingnum) / Number(card.hour_allnum)) *
                    100
                  "
                  class="progress"
                  :width="90"
                  :stroke-width="10"
                  :show-text="false"
                ></el-progress>
                <span class="mt10">
                  <span>{{ $t("Educational.circulateRegistrat.pro") }}</span>
                  {{ card.hour_checkingnum }}/{{ card.hour_allnum }}</span
                >
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <blank :blankCont="tableList.options.errortip" class="mt40"></blank>
        </template>
      </div>
      <div class="tableDiv mt10 mb10" ref="auto_height_table" v-else>
        <progressAnaularTableCont
          :tableData="tableList"
          @handleColumnChange="handleColumnChange"
          @handSetting="handSetting"
        >
          <!-- 按钮操作组********start -->
          <el-table-column
            ref="fixedColumn"
            label="操作"
            align="center"
            width="150px"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="handSee(scope.row)"
                >{{ $t("Educational.checkStatusrouter.handsee") }}</el-button
              >
            </template>
          </el-table-column>
          <!-- 按钮操作组********end -->
        </progressAnaularTableCont>
      </div>
      <!-- 分页 -->
      <el-pagination
        style="margin: 10px"
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
</template>

<script>
import progressAnaularTableCont from "@/components/tables/progressAnaularTableCont.vue";
import eduHttp from "../../Educational.js";
import blank from "@/components/common/Blank/blank.vue";

export default {
  name: "Educational-total",
  data() {
    return {
      mode: true,
      classId: "",
      //筛选
      filter: {
        re_school_id: "", //校园id
        course_id: "", //课程别id
        re_staffer_id: "", //教师id
        classroom_id: "", //教室id
        keyword: "", //关键词
        schoolList: [], //学校-下拉数据
        courseList: [], //课程别-下拉数据
        stafferList: [], //教师-下拉数据
        classRoomList: [], //教室-下拉数据
      },
      // 表格数据
      tableList: {
        // 表格的列
        columns: [],
        // 表格数据
        list: [],

        options: {
          errortip: "", //空页面提示内容
          mutiSelect: false, //是否显示多选
          issetting: true, //是否可以编辑列
          tableHeight: 0, //表格高度
          moduleName: "Educational", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "check_total", //当前页面的名称，通常与路由名称一致
        },
      },
      // 分页
      paging: {
        curPage: 1,
        pageSize: 30,
        pageTotal: 0,
      },
    };
  },
  components: { progressAnaularTableCont,blank },
  created() {
    this.getCourse(); //下拉->选择课程别
    this.getClassroom(); //下拉->选择教室
    this.getTeacher(); //下拉->选择教师
    this.getStaClassList();
  },
  methods: {
    // 获取列表
    getStaClassList() {
      eduHttp
        .getStaClassList({
          keyword: this.filter.keyword,
          course_id: this.filter.course_id,
          re_school_id: this.filter.re_school_id,
          classroom_id: this.filter.classroom_id,
          re_staffer_id: this.filter.re_staffer_id,
          p: this.paging.curPage,
          num: this.paging.pageSize,
          is_count: "1", //是否需要总数
          class_status: "",
        })
        .then((res) => {
          this.paging.pageTotal = parseInt(res.data.result.allnum);
          let obj = this.$Tool.getStorage(
            "module" + [this.tableList.options.moduleName]
          );
          if (obj) {
            if (obj["show_" + [this.tableList.options.ColumnName]]) {
              this.tableList.columns =
                obj["show_" + [this.tableList.options.ColumnName]];
            } else {
              this.tableList.columns = res.data.result.field;
            }
          } else {
            this.tableList.columns = res.data.result.field;
          }
          if (res.data.error == "0") {
            this.tableList.list = res.data.result.list; //表格数据
          } else {
            this.tableList.list = [];
            this.tableList.options.errortip = res.data.errortip;
          }
          console.log(this.tableList.columns);
          this.tableList.cardfield = {};
          this.tableList.columns.map((v) => {
            this.tableList.cardfield[v.fieldstring] = v.fieldname;
          });
          console.log(this.tableList.cardfield);
        });
    },
    // 下拉 -- 课程别
    getCourse() {
      eduHttp.getCourseEdu({}).then((res) => {
        if (res.data.error == 0) {
          this.filter.courseList = res.data.result.list;
        } else {
          this.filter.courseList = [];
        }
      });
    },
    // 下拉 -- 教师
    getTeacher() {
      eduHttp.getTeacherEdu({}).then((res) => {
        if (res.data.error == 0) {
          this.filter.stafferList = res.data.result.list;
        } else {
          this.filter.stafferList = [];
        }
      });
    },
    // 下拉 -- 教室
    getClassroom() {
      eduHttp.getClassroomEdu({}).then((res) => {
        if (res.data.error == 0) {
          this.filter.classRoomList = res.data.result.list;
        } else {
          this.filter.classRoomList = [];
        }
      });
    },
    // 检索
    search() {
      this.paging.curPage = 1;
      this.getStaClassList();
    },
    //按钮操作
    handSee(v) {
      console.log(v);
      this.classId = v.class_id;
      this.$router.push({
        path: `/Educational/viewCheckStatus?class_id=${v.class_id}`,
      });
    },
    tabList() {
      this.mode = false;
      this.getStaClassList();
    },
    // 表格内容绑定事件
    handleColumnChange(k, v) {
      console.log(k, v);
    },
    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
      this.getStaClassList();
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.getStaClassList();
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.getStaClassList();
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs["auto_height_table"]) {
        this.tableList.options.tableHeight = this.$Tool.getTableHeight(
          this.$refs.auto_height_table.getBoundingClientRect().top + 52
        );
      }
    });
  },
};
</script>
<style lang="less">
.Educational-total {
  .card {
    // height: 600px;

    overflow: scroll;
    display: flex;
    flex-wrap: wrap;
    .onecard {
      position: relative;
      cursor: pointer;
      width: calc(25% - 16px);
      height: 300px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 16px 0px rgba(27, 30, 73, 0.15);
      border-radius: 8px;
      margin: 8px;
      .header {
        display: flex;
        align-items: center;
        height: 58px;
        background: rgba(249, 252, 255, 1);
        border-radius: 8px 8px 0px 0px;
        .title {
          font-size: 16px;
          margin-left: 20px;
        }
        .status1 {
          color: #ff3569;
          font-size: 12px;
          margin-left: 12px;
          padding: 2px 5.5px;
          border-radius: 11px;
          border: 1px solid rgba(255, 53, 105, 1);
        }
        .status2 {
          color: #ff9e02;
          font-size: 12px;
          margin-left: 12px;
          padding: 2px 5.5px;
          border-radius: 11px;
          border: 1px solid rgba(255, 158, 2, 1);
        }
      }
      .main {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          > div {
            margin: 10px 0;
          }
        }
        .right {
          display: flex;
          flex-direction: column;
        }
        padding: 10px 20px;
      }
      .hoverDiv {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;

        .btnDiv {
          display: flex;
          width: 100%;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;

          .btn {
            margin: 6px;
            padding: 5px 10px;
            border-radius: 4px;
            width: 80px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
