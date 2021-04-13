<template>
  <div class="Interesting-report-classReport Interesting-box height100">
    <div
      class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7"
    >
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">
          {{ $t("Interesting.report.classReport.page_title") }}
        </span>
      </div>
      <div class="cr-head-right">
        <el-button size="mini" @click="back">
          {{ $t("Common.back") }}
        </el-button>
        <el-button type="primary" size="mini" @click="handExport">
          {{ $t("Interesting.report.btn_text1") }}
        </el-button>
      </div>
    </div>
    <div class="content-box bg-white flex1 mt8">
      <div class="top-count-info">
        <ul>
          <li>
            <p>班级名称</p>
            <p>{{ topInfo.class_cnname }}</p>
          </li>
          <li>
            <p>主教老师</p>
            <p>{{ topInfo.staffer_cnname }}</p>
          </li>
          <li>
            <p>助教老师</p>
            <p>{{ topInfo.fu_staffer_cnname }}</p>
          </li>
          <!-- <li>
            <p>{{ $t("Interesting.report.classReport.countInfo[3]") }}</p>
            <p>{{topInfo.class_num}}</p>
          </li> -->
        </ul>
      </div>
      <div class="pl12 pr12">
        <div class="flex-al">
          <span class="left-line-orange mr10"></span>
          <span class="color-243 fs14">
            {{ $t("Interesting.report.classReport.page_title1") }}
          </span>
        </div>
        <div class="flex-wrap pt12">
          <div class="flex-al mb12">
            <!-- <span
              class="mr10 fs14 color-4C5"
            >日期：</span> -->
            <!-- <div class="select-box" style="width:170px;">
              <el-select
                v-model="filter.class_id"
                @change="search"
                clearable
                filterable
                @visible-change="changeValue($event)"
                placeholder="选择日期"
              >
                <el-option
                  v-for="(item,index) in filter.classList"
                  :key="index"
                  :label="item.class_cnname"
                  :value="item.class_id"
                ></el-option>
              </el-select>
            </div> -->
            <el-date-picker
              v-model="filter.timeInterval"
              type="daterange"
              @change="search"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
          <!-- <div class="lines ml16 mr16 mb12"></div>
          <div class="flex-al mb12">
            <span class="mr10 fs14 color-4C5"
              >{{ $t("Interesting.report.classReport.filter_name2") }}：</span
            >
            <div class="select-box" style="width:170px;">
              <el-select
                v-model="filter.GradeValue"
                clearable
                filterable
                :placeholder="$t('Interesting.report.classReport.placeholder2')"
              >
                <el-option
                  v-for="item in filter.GradeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>-->
          <div class="lines ml16 mr16 mb12"></div>
          <div class="flex-al mb12">
            <!-- <span
              class="mr10 fs14 color-4C5"
            >备课状态：</span> -->
            <div class="select-box" style="width: 170px">
              <el-select
                v-model="filter.class_state"
                @change="search"
                clearable
                filterable
                placeholder="请选择备课状态"
              >
                <el-option label="待备课" value="0"></el-option>
                <el-option label="已备课" value="1"></el-option>
              </el-select>
            </div>
          </div>
          <!-- <div class="lines ml16 mr16 mb12"></div>
          <div class="flex-al Inquire-box mb12">
            <div class="ipt-box" style="width:240px;">
              <el-input
                v-model="filter.keyword"
                clearable
                :placeholder="$t('Interesting.report.classReport.placeholder4')"
                @clear="search"
                @keyup.enter.native="search"
              ></el-input>
            </div>
            <el-button
              type="primary"
              size="mini"
              class="search-btn fs14"
              @click="search"
            >{{ $t("Common.input_button") }}</el-button>
          </div> -->
        </div>
        <div class="tableDiv" ref="auto_height_table">
          <normalTableCont
            :tableData="tableList"
            @handSetting="handSetting"
          ></normalTableCont>
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
  </div>
</template>

<script>
import normalTableCont from "@/components/tables/normalTableCont.vue";
// import popTips from "@/components/common/popTips/popTips.vue";
import httpApi from "../Interesting";
export default {
  name: "Interesting-report-classReport",
  components: {
    normalTableCont,
    // popTips
  },
  data() {
    return {
      topInfo: {}, //头部信息
      //筛选
      filter: {
        class_id: "", //班级id
        class_state: "", //上课状态
        keyword: "", //关键词
        classList: [], //班级下拉列表
        timeInterval: [],
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
          ColumnName: "report_classReport", //当前页面的名称，通常与路由名称一致
        },
      },
      // 分页
      paging: {
        curPage: 1,
        pageSize: 10,
        pageTotal: 0,
      },
      class_id: "",
    };
  },
  watch: {},
  computed: {},
  created() {
    this.filter.timeInterval = [
      this.$Common.getMonthStartAndEnd(0)[0],
      this.$Common.getMonthStartAndEnd(0)[1],
    ];
    this.class_id = this.$route.query.class_id;
    this.ClassHourTotal(); // 报表->班级课时统计 -- wgh
    this.getClass(); // 首页->备课提醒->选择班级 -- wgh
  },
  methods: {
    // 报表->班级课时统计 -- wgh
    ClassHourTotal() {
      httpApi
        .ClassHourTotal({
          is_count: "1", //是否需要总数，可以不传
          p: this.paging.curPage,
          num: this.paging.pageSize,
          // 筛选条件
          class_id: this.class_id,
          prepare_status: this.filter.class_state,
          keyword: this.filter.keyword,
          starttime: this.filter.timeInterval
            ? this.filter.timeInterval[0]
            : "",
          endtime: this.filter.timeInterval ? this.filter.timeInterval[1] : "",
        })
        .then((res) => {
          this.paging.pageTotal = parseInt(res.data.result.allnum);
          this.topInfo = res.data.result.staffer_list;
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
    // 首页->备课提醒->选择班级 -- wgh
    getClass() {
      this.$http.getClass({}).then((res) => {
        if (res.data.error == 0) {
          this.filter.classList = res.data.result.list;
        } else {
          this.filter.classList = [];
        }
      });
    },
    changeValue(callback) {
      console.log(callback);
    },
    // 检索
    search() {
      this.paging.curPage = 1;
      this.ClassHourTotal(); // 报表->班级课时统计 -- wgh
    },
    // 返回
    back() {
      this.$router.go(-1);
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
      let url = httpApi.ClassHourExport();
      console.log(url);
      if (this.tableList.list.length > 0) {
        window.open(
          `${url}?language_type=${language_type}&staffer_id=${stafferId}&token=${token}&dataequity=${dataequity}&account_class=${account_class}&school_id=${schoolId}&company_id=${companyId}&re_postbe_id=${re_postbe_id}&re_school_id=${this.re_school_id}&re_staffer_id=${this.re_staffer_id}&class_id=${this.filter.class_id}&class_state=${this.filter.class_state}&keyword=${this.filter.keyword}`,
          "_blank"
        );
      } else {
        this.$message.error(this.$t("Common.export_tips"));
      }
    },
    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
      this.ClassHourTotal(); // 报表->班级课时统计 -- wgh
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.ClassHourTotal(); // 报表->班级课时统计 -- wgh
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.ClassHourTotal(); // 报表->班级课时统计 -- wgh
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
          this.$refs.auto_height_table.getBoundingClientRect().top + 74
        );
      }
    });
  },
};
</script>

<style lang="less">
@import "../Interesting.less";
.Interesting-report-classReport {
}
</style>
