<template>
  <div class="Educational-report-classTaskReport height100">
    <div class="flex-all pt12 pb10 pl12 pr12 bg-white">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">
          {{ $t("Educational.educationalReport.schoolTaskReport.a8") }}
        </span>
      </div>
      <div class="cr-head-right">
        <el-button size="mini" @click="back">
          {{ $t("Common.back") }}
        </el-button>
        <!-- <el-button type="primary" size="mini" @click="handleExport">
          {{ $t("Common.export") }}
        </el-button> -->
      </div>
    </div>
    <div class="content-box bg-white flex1 pt10 pb10 pl12 pr12 mt8">
      <div class="flex-wrap">
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">{{
            $t("Educational.educationalReport.schoolTaskReport.a1")
          }}</span>
          <div class="select-box" style="width: 160px">
            <el-date-picker
              v-model="filter.month"
              placeholder="请选择月份"
              type="month"
              value-format="yyyy-MM"
              @change="search"
              style="width: 160px"
            ></el-date-picker>
          </div>
        </div>
        <div class="lines ml16 mr16 mb12"></div>
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5"> 班种 </span>
          <div class="select-box" style="width: 170px">
            <el-select
              v-model="filter.coursecat_id"
              clearable
              filterable
              placeholder="请选择班种"
              @change="searchCoursecat"
            >
              <el-option
                v-for="item in filter.coursecatList"
                :key="Math.random() + item.coursecat_id"
                :label="`${item.coursecat_cnname}(${item.coursecat_branch})`"
                :value="item.coursecat_id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="lines ml16 mr16 mb12"></div>
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
                :key="Math.random() + item.course_id"
                :label="`${item.course_cnname}(${item.course_branch})`"
                :value="item.course_id"
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
              :placeholder="
                $t(
                  'views.Educational.EducationalReport.reportBox.classReport.55twjy1pezg0'
                )
              "
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
import eduHttp from "../../../Educational.js";

export default {
  name: "Educational-report-classTaskReport",
  components: {
    progressAnaularTableCont,
  },
  data() {
    return {
      //筛选
      filter: {
        keyword: "", //关键词
        month: "",
        coursecatList: [], //班种列表
        courseList: [], //班别列表
        coursecat_id: "",
        course_id: "", //课程别id
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
          ColumnName: "report_classTaskReport", //当前页面的名称，通常与路由名称一致
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
    this.filter.month = this.$Tool.getCurrMonth();
    this.getCoursecat();
    this.getCourse();
    this.getClassTaskRate();
  },
  watch: {},
  computed: {},
  methods: {
    getCoursecat() {
      eduHttp.getCoursecatSchool({}).then((res) => {
        if (res.data.error == 0) {
          this.filter.coursecatList = res.data.result.list;
        } else {
          this.filter.coursecatList = [];
        }
      });
    },
    // 下拉 -- 课程别
    getCourse() {
      eduHttp
        .getCourseSchool({
          coursecat_id: this.filter.coursecat_id,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.filter.courseList = res.data.result.list;
          } else {
            this.filter.courseList = [];
          }
        });
    },
    // 获取列表
    getClassTaskRate() {
      eduHttp
        .getClassTaskRate({
          keyword: this.filter.keyword,
          re_school_id: this.$route.query.re_school_id
            ? this.$route.query.re_school_id
            : 0,
          coursecat_id: this.filter.coursecat_id,
          course_id: this.filter.course_id,
          month: this.filter.month,
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
    searchCoursecat() {
      this.getCourse();
      this.search();
    },
    // 检索
    search() {
      this.paging.curPage = 1;
      this.getClassTaskRate();
    },
    // 返回
    back() {
      this.$router.go(-1);
    },
    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.getClassTaskRate();
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.getClassTaskRate();
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
// .Educational-report-classTaskReport {
// }
</style>
