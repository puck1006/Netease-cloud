<template>
  <div class="Educational-report-classReport height100">
    <!-- <div class="cr-head-right">
      <el-button type="primary" size="mini" @click="handleExport">{{ $t("Common.export") }}</el-button>
    </div>-->
    <div class="content-box bg-white flex1 pl12 pr12">
      <div class="flex-wrap pt12">
        <!--
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">
            {{
            $t("Educational.educationalReport.classReport.campus")
            }}
          </span>
          <div class="time-box">
            <el-select
              v-model="filter.re_school_id"
              clearable
              filterable
              :placeholder="
                $t('Educational.educationalReport.classReport.campus_ph')
              "
              @change="search"
            >
              <el-option
                v-for="item in filter.schoolList"
                :key="item.school_id"
                :label="item.school_cnname"
                :value="item.school_id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="lines ml16 mr16 mb12"></div>

        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">
            {{ $t("Educational.educationalReport.schoolTaskReport.a1") }}
          </span>
          <div class="select-box" style="width: 320px">
            <el-date-picker
              v-model="filter.time"
              type="daterange"
              :range-separator="$t('Common.range_time')"
              value-format="yyyy-MM-dd"
              :start-placeholder="$t('Common.start_time')"
              :end-placeholder="$t('Common.end_time')"
              @change="search"
            ></el-date-picker>
          </div>
        </div>             <div class="lines ml16 mr16 mb12"></div>
   -->
        <template
          v-if="
            $userDetails.account_class == 1 ||
            $Tool.getStorage('postpart_isteregulator') == 1
          "
        >
          <div class="flex-al mb12">
            <span class="mr10 fs14 color-666">
              {{ $t("Educational.circulateRegistrat.teacher") }}
            </span>
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
        </template>

        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">
            {{ $t("Educational.educationalReport.classReport.class") }}
          </span>
          <div class="select-box" style="width: 170px">
            <el-select
              v-model="filter.course_id"
              clearable
              filterable
              :placeholder="$t('Educational.educationalReport.classReport.class_ph')"
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
          <span class="mr10 fs14 color-666">
            {{ $t("Educational.circulateRegistrat.classstatus") }}
          </span>
          <div class="select-box" style="width: 170px">
            <el-select
              v-model="filter.class_status"
              filterable
              clearable
              :placeholder="$t('Educational.circulateRegistrat.classstatus_ph')"
              @change="search"
            >
              <el-option
                :label="$t('Educational.circulateRegistrat.statusList[0]')"
                value="0"
              ></el-option>
              <el-option
                :label="$t('Educational.circulateRegistrat.statusList[1]')"
                value="1"
              ></el-option>
              <el-option
                :label="$t('Educational.circulateRegistrat.statusList[2]')"
                value="-1"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="lines ml16 mr16 mb12"></div>

        <div class="flex-al Inquire-box mb12">
          <div class="ipt-box" style="width: 240px">
            <el-input
              v-model="filter.keyword"
              clearable
              :placeholder="$t('views.Educational.EducationalReport.reportBox.classReport.55twjy1pezg0')"
              @clear="search"
              @keyup.enter.native="search"
            ></el-input>
          </div>
          <el-button type="primary" size="mini" class="search-btn fs14" @click="search">{{
            $t("Common.input_button")
          }}</el-button>
        </div>
      </div>
      <div class="tableDiv" ref="auto_height_table">
        <progressAnaularTableCont :tableData="tableList" @handSetting="handSetting">
          <!-- 按钮操作组********start -->
          <el-table-column
            ref="fixedColumn"
            :label="$t('views.Educational.EducationalReport.reportBox.classReport.55twjy1phsc0')"
            align="center"
            width="150px"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="handCount(scope.row)"
              >
                {{ $t("Educational.educationalReport.classReport.classTime") }}
              </el-button>
              <el-button
                type="text"
                size="small"
                @click.native.prevent="handRecord(scope.row)"
              >
                {{ $t("Educational.educationalReport.classReport.callRecord") }}
              </el-button>
            </template>
          </el-table-column>
          <!-- 按钮操作组********end -->
        </progressAnaularTableCont>
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
  </div>
</template>

<script>
import progressAnaularTableCont from "@/components/tables/progressAnaularTableCont.vue";
import eduHttp from "../../Educational.js";

export default {
  name: "Educational-report-classReport",
  components: {
    progressAnaularTableCont,
  },
  data() {
    return {
      //筛选
      filter: {
        class_status: "",
        re_school_id: "", //校园id
        course_id: "", //课程别id
        re_staffer_id: "", //教师id
        schoolList: [], //学校-下拉数据
        courseList: [], //课程别-下拉数据
        stafferList: [], //教师-下拉数据
        keyword: "", //关键词
        // time: "",
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
          moduleName: "classReport", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "classReport", //当前页面的名称，通常与路由名称一致
        },
      },
      // 分页
      paging: {
        curPage: 1,
        pageSize: 10,
        pageTotal: 0,
      },
    };
  },
  created() {
    // this.filter.time = [
    //   this.$Common.getMonthStartAndEnd(0)[0],
    //   this.$Common.getDate(0),
    // ];
    this.filter.keyword = this.$Tool.getStorage("classReportKey")
      ? this.$Tool.getStorage("classReportKey")
      : "";
    this.filter.course_id = this.$Tool.getStorage("classReportCourse")
      ? this.$Tool.getStorage("classReportCourse")
      : "";
    this.filter.re_school_id = this.$Tool.getStorage("classReportSchool")
      ? this.$Tool.getStorage("classReportSchool")
      : "";
    this.filter.re_staffer_id = this.$Tool.getStorage("classReportStaffer")
      ? this.$Tool.getStorage("classReportStaffer")
      : "";

    if (this.$route.query.staffer_id) {
      this.filter.re_staffer_id = this.$route.query.staffer_id;
    }
    if (this.$route.query.school_id) {
      this.filter.re_school_id = this.$route.query.school_id;
    }
    if (this.$route.query.status) {
      this.filter.class_status = this.$route.query.status;
    }
    this.getCourse(); //下拉->选择课程别
    this.getTeacherEdu(); //下拉->选择教师

    this.getStaClassReport();
  },
  watch: {},
  computed: {},
  methods: {
    setStorge() {
      this.$Tool.setStorage("classReportKey", this.filter.keyword);
      this.$Tool.setStorage("classReportCourse", this.filter.course_id);
      this.$Tool.setStorage("classReportSchool", this.filter.re_school_id);
      this.$Tool.setStorage("classReportStaffer", this.filter.re_staffer_id);
    },
    // 获取列表
    getStaClassReport() {
      eduHttp
        .getStaClassReport({
          keyword: this.filter.keyword,
          course_id: this.filter.course_id,
          re_school_id: this.filter.re_school_id,
          re_staffer_id: this.filter.re_staffer_id,
          class_status: this.filter.class_status,
          // starttime: this.filter.time ? this.filter.time[0] : "",
          // endtime: this.filter.time ? this.filter.time[1] : "",
          p: this.paging.curPage,
          num: this.paging.pageSize,
          is_count: "1", //是否需要总数
        })
        .then((res) => {
          this.paging.pageTotal = parseInt(res.data.result.allnum);
          let obj = this.$Tool.getStorage("module" + [this.tableList.options.moduleName]);
          if (obj) {
            if (obj["show_" + [this.tableList.options.ColumnName]]) {
              this.tableList.columns = obj["show_" + [this.tableList.options.ColumnName]];
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
    getTeacherEdu(id) {
      eduHttp.getTeacherEdu({}).then((res) => {
        if (res.data.error == 0) {
          this.filter.stafferList = res.data.result.list;
        } else {
          this.filter.stafferList = [];
        }
      });
    },
    // 检索
    search() {
      this.paging.curPage = 1;
      this.getStaClassReport();
    },
    // 点击课时统计
    handCount(row) {
      console.log(row);
      this.setStorge();
      this.$router.push(
        `/Educational/report/classTeacherReport/classTime?class_id=${row.class_id}`
      );
    },
    // 点击电访记录
    handRecord(row) {
      console.log(row);
      this.setStorge();
      this.$router.push(
        `/Educational/report/classTeacherReport/callRecord?class_id=${row.class_id}`
      );
    },
    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
      this.getStaClassReport();
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.getStaClassReport();
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.getStaClassReport();
    },
    // 重置表单
    resetForm(form) {
      this.$refs[form].resetFields();
    },
    handleClose(done) {
      done();
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
.Educational-report-classReport {
}
</style>
