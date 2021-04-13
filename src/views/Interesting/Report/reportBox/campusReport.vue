<template>
  <div class="Interesting-report-campusReport height100">
    <!-- 页面右边按钮***start -->
    <div class="right-btn">
      <el-button type="primary" size="mini" @click="handExport">
        {{ $t("Interesting.report.btn_text1") }}
      </el-button>
    </div>
    <div class="content-box bg-white flex1 pl12 pr12">
      <div class="flex-wrap pt12">
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5"
            >{{ $t("Interesting.report.filter_name1") }}：</span
          >
          <div class="time-box">
            <el-date-picker
              v-model="filter.time"
              type="daterange"
              value-format="yyyy-MM-dd"
              @change="search"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
          <el-tooltip
            content="选择某一日期区间，列表则展示这一日期区间开班班级的备课数据"
            placement="right"
          >
            <i class="el-icon-warning color-blue ml10 fs20"></i>
          </el-tooltip>
        </div>
        <div class="lines ml16 mr16 mb12"></div>
        <div class="flex-al mb12">
          <div class="select-box" style="width: 170px">
            <el-select
              v-model="filter.coursetype_id"
              filterable
              clearable
              placeholder="请选择班组"
              @change="search"
            >
              <el-option
                v-for="(item, index) in filter.coursetypeList"
                :key="index"
                :label="`${item.coursetype_cnname}(${item.coursetype_branch})`"
                :value="item.coursetype_id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="lines ml16 mr16 mb12"></div>
        <div class="flex-al mb12">
          <div class="select-box" style="width: 170px">
            <el-select
              v-model="filter.coursecat_id"
              filterable
              clearable
              placeholder="请选择班种"
              @change="search"
            >
              <el-option
                v-for="item in filter.coursecatList"
                :key="item.coursecat_id"
                :label="`${item.coursecat_cnname}(${item.coursecat_branch})`"
                :value="item.coursecat_id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="lines ml16 mr16 mb12"></div>
        <div class="flex-al mb12">
          <div class="select-box" style="width: 170px">
            <el-select
              v-model="filter.course_id"
              filterable
              clearable
              placeholder="请选择课程别"
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
        <div class="flex-al Inquire-box mb12">
          <div class="ipt-box" style="width: 240px">
            <el-input
              v-model="filter.keyword"
              clearable
              :placeholder="$t('Interesting.report.placeholder3')"
              @clear="search"
              @keyup.enter.native="search"
            ></el-input>
          </div>
          <el-button
            type="primary"
            size="mini"
            class="search-btn fs14"
            @click="search"
            >{{ $t("Common.input_button") }}</el-button
          >
        </div>
        <!-- <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">{{ $t("Interesting.report.filter_name2") }}：</span>
          <div class="select-box" style="width:170px;">
            <el-select
              v-model="filter.schoolId"
              @change="search"
              clearable
              filterable
              :placeholder="$t('Interesting.report.placeholder2')"
            >
              <el-option
                v-for="item in filter.schoolList"
                :key="item.school_id"
                :label="item.school_cnname"
                :value="item.school_id"
              ></el-option>
            </el-select>
          </div>
        </div>-->
      </div>
      <div class="tableDiv" ref="auto_height_table">
        <normalTableCont :tableData="tableList" @handSetting="handSetting">
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
                @click.native.prevent="handCount(scope.row)"
                >班级备课详情</el-button
              >
            </template>
          </el-table-column>
          <!-- 按钮操作组********end -->
        </normalTableCont>
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
import normalTableCont from "@/components/tables/normalTableCont.vue";
// import popTips from "@/components/common/popTips/popTips.vue";
import httpApi from "../../Interesting";
export default {
  name: "Interesting-report-campusReport",
  components: {
    normalTableCont,
    // popTips
  },
  data() {
    return {
      //筛选
      filter: {
        time: "", //日期
        schoolId: "", //校园id
        coursetype_id: "",
        coursecat_id: "",
        course_id: "",
        schoolList: [], //学校-下拉数据
        coursetypeList: [], //班组列表
        coursecatList: [], //班种列表
        courseList: [], //班别列表
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
          moduleName: "Interesting", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "report_campusReport", //当前页面的名称，通常与路由名称一致
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
  watch: {},
  computed: {},
  created() {
    this.filter.time = [
      this.$Common.getMonthStartAndEnd(0)[0],
      this.$Common.getDate(0),
    ];
    this.getSchool(); //备课->下拉->选择校园 -- wgh
    this.getCoursetype();
    this.getCoursecat();
    this.getCourse();
    this.SchoolReport(); // 报表->校园统计报表 -- wgh
  },
  methods: {
    getCoursetype() {
      httpApi.getCoursetype({}).then((res) => {
        if (res.data.error == 0) {
          this.filter.coursetypeList = res.data.result.list;
        } else {
          this.filter.coursetypeList = [];
        }
      });
    },
    getCoursecat() {
      httpApi.getCoursecat({}).then((res) => {
        if (res.data.error == 0) {
          this.filter.coursecatList = res.data.result.list;
        } else {
          this.filter.coursecatList = [];
        }
      });
    },
    getCourse() {
      httpApi.getCourse({}).then((res) => {
        if (res.data.error == 0) {
          this.filter.courseList = res.data.result.list;
        } else {
          this.filter.courseList = [];
        }
      });
    },
    // 报表->校园统计报表 -- wgh
    SchoolReport() {
      httpApi
        .SchoolReport({
          is_count: "1", //是否需要总数，可以不传
          p: this.paging.curPage,
          num: this.paging.pageSize,
          // 筛选条件
          starttime: this.filter.time ? this.filter.time[0] : "",
          endtime: this.filter.time ? this.filter.time[1] : "",
          // schoolId: this.filter.schoolId,
          coursetype_id: this.filter.coursetype_id,
          coursecat_id: this.filter.coursecat_id,
          course_id: this.filter.course_id,
          keyword: this.filter.keyword,
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
          if (res.data.error == 0) {
            this.tableList.list = res.data.result.list;
          } else {
            this.tableList.list = [];
            this.tableList.options.errortip = res.data.errortip;
          }
        });
    },
    //备课->下拉->选择校园 -- wgh
    getSchool() {
      this.$http.getSchool({}).then((res) => {
        if (res.data.error == 0) {
          this.filter.schoolList = res.data.result.list;
        } else {
          this.filter.schoolList = [];
        }
      });
    },
    // 检索
    search() {
      this.paging.curPage = 1;
      this.SchoolReport(); // 报表->校园统计报表 -- wgh
    },
    // 点击教师统计
    handCount(row) {
      // console.log(row);
      // this.$router.push(
      //   `/Interesting/report/teacherReport?school_id=${row.school_id}`
      // );
      console.log(row);
      this.$router.push(
        `/Interesting/report/classReport?class_id=${row.class_id}`
      );
    },
    // 导出
    handExport() {
      const token = this.$userDetails.token;
      const stafferId = this.$userDetails.stafferId;
      const schoolId = this.$userDetails.schoolId;
      const companyId = this.$userDetails.companyId;
      const re_postbe_id = this.$userDetails.re_postbe_id;
      const dataequity = this.$userDetails.dataequity;
      const account_class = this.$userDetails.account_class;
      const language_type = this.$userDetails.language_type;
      let url = httpApi.SchoolExport();
      console.log(url);
      if (this.tableList.list.length > 0) {
        window.open(
          `${url}?staffer_id=${stafferId}&language_type=${language_type}&token=${token}&dataequity=${dataequity}&account_class=${account_class}&school_id=${schoolId}&company_id=${companyId}&re_postbe_id=${re_postbe_id}&starttime=${
            this.filter.time ? this.filter.time[0] : ""
          }&endtime=${this.filter.time ? this.filter.time[1] : ""}&schoolId=${
            this.filter.schoolId
          }&coursetype_id=${this.filter.coursetype_id}&coursecat_id=${
            this.filter.coursecat_id
          }&course_id=${this.filter.course_id}`,
          "_blank"
        );
      } else {
        this.$message.error(this.$t("Common.export_tips"));
      }
    },
    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
      this.SchoolReport(); // 报表->校园统计报表 -- wgh
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.SchoolReport(); // 报表->校园统计报表 -- wgh
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.SchoolReport(); // 报表->校园统计报表 -- wgh
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
.Interesting-report-campusReport {
}
</style>
