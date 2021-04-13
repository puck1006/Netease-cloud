<template>
  <div class="Interesting-report-teacherReport height100">
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
            <!-- <el-date-picker
              v-model="filter.time"
              type="date"
              style="width:170px;"
              value-format="yyyy-MM-dd"
              :placeholder="$t('Interesting.report.placeholder1')"
              @change="search"
            ></el-date-picker> -->
          </div>
        </div>
        <div class="lines ml16 mr16 mb12"></div>
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
        </div>
        <div class="lines ml16 mr16 mb12"></div> -->
        <div class="flex-al Inquire-box mb12">
          <div class="ipt-box" style="width: 240px">
            <el-input
              v-model="filter.keyword"
              clearable
              placeholder="请输入教师名称、编号"
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
        <normalTableCont :tableData="tableList" @handSetting="handSetting">
          <!-- 按钮操作组********start -->
          <!-- <el-table-column ref="fixedColumn" label="操作" align="center" width="150px" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="handCount(scope.row)"
              >{{ $t("Interesting.report.btn_text3") }}</el-button>
            </template>
          </el-table-column> -->
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
  name: "Interesting-report-teacherReport",
  components: {
    normalTableCont,
    // popTips
  },
  data() {
    return {
      //筛选
      filter: {
        time: [], //日期
        schoolId: "", //校园id
        schoolList: [], //学校-下拉数据

        GradeValue: "", //选择园所
        GradeList: [
          {
            value: "选项1",
            label: "黄金糕",
          },
          {
            value: "选项2",
            label: "双皮奶",
          },
        ], //选择园所-下拉数据
        GradeType: [
          {
            value: "选项1",
            label: "黄金糕",
          },
          {
            value: "选项2",
            label: "双皮奶",
          },
        ], //货品类别-下拉数据
        GradeTypeValue: "", //货品类别
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
          moduleName: "teacherReport", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "teacherReport", //当前页面的名称，通常与路由名称一致
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
    if (this.$route.query.school_id) {
      this.filter.schoolId = this.$route.query.school_id;
    }
    this.filter.time = [
      this.$Common.getMonthStartAndEnd(0)[0],
      this.$Common.getDate(0),
    ];
    this.StafferReport(); //  报表->教师统计报表 -- wgh
  },
  methods: {
    //  报表->教师统计报表 -- wgh
    StafferReport() {
      httpApi
        .StafferReport({
          is_count: "1", //是否需要总数，可以不传
          p: this.paging.curPage,
          num: this.paging.pageSize,
          // 筛选条件
          starttime: this.filter.time ? this.filter.time[0] : "",
          endtime: this.filter.time ? this.filter.time[1] : "",
          schoolId: this.filter.schoolId,
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

    // 检索
    search() {
      this.paging.curPage = 1;
      this.StafferReport(); //  报表->教师统计报表 -- wgh
    },
    // 点击教师统计
    handCount(row) {
      console.log(row);
      this.$router.push(
        `/Interesting/report/classReport?re_school_id=${row.school_id}&re_staffer_id=${row.staffer_id}`
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
      let url = httpApi.StafferExport();
      console.log(url);
      if (this.tableList.list.length > 0) {
        window.open(
          `${url}?staffer_id=${stafferId}&language_type=${language_type}&token=${token}&dataequity=${dataequity}&account_class=${account_class}&school_id=${schoolId}&company_id=${companyId}&re_postbe_id=${re_postbe_id}&starttime=${
            this.filter.time ? this.filter.time[0] : ""
          }&endtime=${this.filter.time ? this.filter.time[1] : ""}&schoolId=${
            this.filter.schoolId
          }&keyword=${this.filter.keyword}`,
          "_blank"
        );
      } else {
        this.$message.error(this.$t("Common.export_tips"));
      }
    },
    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
      this.StafferReport(); //  报表->教师统计报表 -- wgh
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.StafferReport(); //  报表->教师统计报表 -- wgh
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.StafferReport(); //  报表->教师统计报表 -- wgh
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
.Interesting-report-teacherReport {
}
</style>
