<template>
  <div class="Educational-report-schoolTaskReport height100">
    <div class="content-box bg-white flex1 pl12 pr12">
      <div class="export_btn">
        <el-button type="primary" size="mini" @click="handExport">
          {{ $t("Interesting.report.btn_text1") }}
        </el-button>
      </div>
      <div class="flex-wrap">
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">
            {{ $t("Educational.educationalReport.schoolTaskReport.a1") }}
          </span>
          <div class="select-box" style="width: 160px">
            <el-date-picker
              v-model="filter.month"
              placeholder="请选择月份"
              type="month"
              value-format="yyyy-MM"
              @change="timeSearch"
              style="width: 160px"
            ></el-date-picker>
          </div>
        </div>
        <div class="lines ml16 mr16 mb12"></div>

        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">
            {{ $t("Educational.educationalReport.schoolTaskReport.a2") }}
          </span>
          <div class="time-box">
            <el-select
              v-model="filter.organizeclass_id"
              clearable
              filterable
              :placeholder="
                $t('Educational.educationalReport.schoolTaskReport.a3')
              "
              @change="searchSecond"
              style="width: 180px"
            >
              <el-option
                v-for="item in filter.organizeList"
                :key="item.organizeclass_id"
                :label="item.organizeclass_name"
                :value="item.organizeclass_id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="lines ml16 mr16 mb12"></div>
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">
            {{ $t("Educational.educationalReport.schoolTaskReport.a4") }}
          </span>
          <div class="select-box" style="width: 170px">
            <el-select
              v-model="filter.sec_organize_id"
              filterable
              clearable
              :placeholder="
                $t('Educational.educationalReport.schoolTaskReport.a5')
              "
              @change="searchThird"
            >
              <el-option
                v-for="item in filter.secOrganizeList"
                :key="item.organize_id"
                :label="item.organize_cnname"
                :value="item.organize_id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <!-- <div class="lines ml16 mr16 mb12"></div> -->
        <div class="flex-al mb12 ml12">
          <!-- <span class="mr10 fs14 color-4C5">三级组织</span> -->
          <div class="select-box" style="width: 170px">
            <el-select
              v-model="filter.re_school_id"
              clearable
              filterable
              :placeholder="
                $t('Educational.educationalReport.schoolTaskReport.a6')
              "
              @change="search"
            >
              <el-option
                v-for="item in filter.reSchoolList"
                :key="Math.random() + item.organize_id"
                :label="item.organize_cnname"
                :value="item.organize_id"
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
                $t('Educational.educationalReport.schoolTaskReport.find_ph')
              "
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
      </div>
      <div class="tableDiv" ref="auto_height_table">
        <progressAnaularTableCont
          :tableData="tableList"
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
              >
                {{ $t("Educational.educationalReport.schoolTaskReport.a7") }}
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
import eduHttp from "../../../Educational.js";

export default {
  name: "Educational-report-schoolTaskReport",
  components: {
    progressAnaularTableCont,
  },
  data() {
    return {
      //筛选
      filter: {
        organizeclass_id: "", //一级组织
        sec_organize_id: "", //二级组织
        re_school_id: "", //三级组织
        month: "",
        organizeList: [], //一级-下拉数据
        secOrganizeList: [], //二级-下拉数据
        reSchoolList: [], //三级-下拉数据
        keyword: "", //关键词
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
          moduleName: "schoolTaskReport", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "schoolTaskReport", //当前页面的名称，通常与路由名称一致
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
    this.getOneOrganize(); // 一级下拉
    this.getTwoOrganize(); // 二级下拉
    this.getThreeOrganize(); // 三级下拉
    this.getSchoolTaskRate();
  },
  watch: {},
  computed: {},
  methods: {
    // 获取列表
    getSchoolTaskRate() {
      eduHttp
        .getSchoolTaskRate({
          keyword: this.filter.keyword,
          organizeclass_id: this.filter.organizeclass_id,
          organize_id: this.filter.sec_organize_id,
          sec_organize_id: this.filter.re_school_id,
          month: this.filter.month,

          p: this.paging.curPage,
          num: this.paging.pageSize,
          is_count: "1", //是否需要总数
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
            // this.tableList.columns.map((v) => {
            //   if (v.fieldstring == "school_cnname") {
            //     this.$set(v, "ismethod", 1);
            //   }
            // });
          } else {
            this.tableList.list = [];
            this.tableList.options.errortip = res.data.errortip;
          }
        });
    },

    // 一级下拉
    getOneOrganize() {
      eduHttp.getComOrganizeClass({}).then((res) => {
        if (res.data.error == 0) {
          this.filter.organizeList = res.data.result;
        } else {
          this.filter.organizeList = [];
        }
      });
    },

    // 二级下拉
    getTwoOrganize() {
      eduHttp
        .getComOrganize({
          organizeclass_id: this.filter.organizeclass_id,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.filter.secOrganizeList = res.data.result;
          } else {
            this.filter.secOrganizeList = [];
          }
        });
    },

    // 三级下拉
    getThreeOrganize() {
      eduHttp
        .getComOrganize({
          re_organize_id: this.filter.sec_organize_id,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.filter.reSchoolList = res.data.result;
          } else {
            this.filter.reSchoolList = [];
          }
        });
    },
    // // 三级下拉
    // getOrgnizeSchool() {
    //   eduHttp
    //     .getOrgnizeSchool({
    //       organize_id: this.filter.sec_organize_id,
    //     })
    //     .then((res) => {
    //       if (res.data.error == 0) {
    //         this.filter.reSchoolList = res.data.result;
    //       } else {
    //         this.filter.reSchoolList = [];
    //       }
    //     });
    // },
    // 一级架构改变
    searchSecond() {
      this.filter.sec_organize_id = "";
      this.filter.re_school_id = "";
      this.getTwoOrganize(); // 二级下拉
      this.getThreeOrganize(); // 三级下拉
      this.search();
    },
    // 二级架构改变
    searchThird() {
      this.filter.re_school_id = "";
      this.getThreeOrganize(); // 三级下拉
      this.search();
    },
    // 时间检索
    timeSearch() {
      this.search();
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
      let url = eduHttp.getSchoolTaskRateExport();
      console.log(url);
      if (this.tableList.list.length > 0) {
        window.open(
          `${url}?is_export=1&language_type=${language_type}&staffer_id=${stafferId}&token=${token}&dataequity=${dataequity}&account_class=${account_class}&school_id=${schoolId}&company_id=${companyId}&re_postbe_id=${re_postbe_id}&organizeclass_id=${this.filter.organizeclass_id}&organize_id=${this.filter.sec_organize_id}&sec_organize_id=${this.filter.re_school_id}&month=${this.filter.month}&keyword=${this.filter.keyword}`,
          "_blank"
        );
      } else {
        this.$message.error(this.$t("Common.export_tips"));
      }
    },
    // 检索
    search() {
      this.paging.curPage = 1;
      this.getSchoolTaskRate();
    },
    handSee(row) {
      this.$router.push(
        `/Educational/report/classTaskReport?re_school_id=${row.school_id}`
      );
    },
    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
      this.getSchoolTaskRate();
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.getSchoolTaskRate();
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.getSchoolTaskRate();
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
.Educational-report-schoolTaskReport {
  .export_btn {
    position: absolute;
    top: 70px;
    right: 20px;
  }
}
</style>
