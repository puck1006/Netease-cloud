<template>
  <div class="Educational-report-classTime Educational-box">
    <div
      class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7"
    >
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">
          {{ $t("Educational.educationalReport.classReport.callRecord") }}
        </span>
      </div>
      <div class="cr-head-right">
        <el-button size="mini" @click="back">
          {{ $t("Common.back") }}
        </el-button>
        <el-button type="primary" size="mini" @click="handleExport">
          {{ $t("Common.export") }}
        </el-button>
      </div>
    </div>
    <div class="content-box bg-white flex1 mt8">
      <div class="top-content">
        <ul>
          <li>
            <p>
              {{ $t("Educational.educationalReport.classTime.class_name") }}
            </p>
            <p>{{ classInfo.class_cnname }}</p>
          </li>
          <li>
            <p class="color-aaa">班级别名</p>
            <p class="color-333">{{ classInfo.class_enname || "--" }}</p>
          </li>
          <li>
            <p>
              {{ $t("Educational.educationalReport.classTime.school_name") }}
            </p>
            <p>{{ classInfo.school_cnname }}</p>
          </li>
          <li>
            <p>
              {{ $t("Educational.educationalReport.classTime.class_progress") }}
            </p>

            <div class="progress-au dsplay ml8 mr8">
              <div class="out-progress">
                <div
                  class="inner-progress"
                  :style="{
                    width:
                      parseInt(classInfo.hour_finishnum) >
                      parseInt(classInfo.hour_allnum)
                        ? classInfo.hour_allnum
                        : (parseInt(classInfo.hour_finishnum) /
                            parseInt(classInfo.hour_allnum)) *
                            100 +
                          '%',
                  }"
                ></div>
              </div>
            </div>
            <span
              >{{ classInfo.hour_finishnum }}/{{ classInfo.hour_allnum }}</span
            >
          </li>
        </ul>
      </div>
      <div class="pl12 pr12">
        <div class="flex-al mt10">
          <span class="left-line-orange mr10"></span>
          <span class="color-243 fs14">
            {{ $t("Educational.educationalReport.callRecord.student_list") }}
          </span>
        </div>
        <div class="flex-wrap pt12">
          <div class="flex-al mb12 ml12">
            <span class="mr10 fs14 color-666">{{
              $t("Educational.educationalReport.callRecord.call_time")
            }}</span>
            <div class="select-box" style="width: 250px">
              <el-date-picker
                v-model="filter.range_time"
                type="daterange"
                :range-separator="
                  $t('Educational.educationalReport.callRecord.range')
                "
                value-format="yyyy-MM-dd"
                :start-placeholder="
                  $t('Educational.educationalReport.callRecord.start_time')
                "
                :end-placeholder="
                  $t('Educational.educationalReport.callRecord.end_time')
                "
                @change="search"
              ></el-date-picker>
            </div>
          </div>
          <div class="lines ml16 mr16 mb12"></div>
          <div class="flex-al Inquire-box mb12 ml12">
            <div class="ipt-box" style="width: 260px">
              <el-input
                v-model="filter.keyword"
                clearable
                :placeholder="
                  $t('Educational.educationalReport.callRecord.find_ph')
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
import eduHttp from "../Educational.js";

export default {
  name: "Educational-report-classTime",
  components: {
    normalTableCont,
  },
  data() {
    return {
      classInfo: {},
      //筛选
      filter: {
        range_time: [], //日期
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
          moduleName: "Educational", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "report_callRecord", //当前页面的名称，通常与路由名称一致
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
    this.getStuCatitrack();
  },
  watch: {},
  computed: {},
  methods: {
    // 获取列表
    getStuCatitrack() {
      eduHttp
        .getStuCatitrack({
          keyword: this.filter.keyword,
          class_id: this.$route.query.class_id,
          starttime: this.filter.range_time[0] ? this.filter.range_time[0] : "", //开始时间
          endtime: this.filter.range_time[1] ? this.filter.range_time[1] : "", //	结束时间
          p: this.paging.curPage,
          num: this.paging.pageSize,
          is_count: "1", //是否需要总数
        })
        .then((res) => {
          this.paging.pageTotal = parseInt(res.data.result.allnum);
          this.classInfo = res.data.result.info;
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
        });
    },
    // 返回
    back() {
      this.$router.go(-1);
    },
    // 导出
    handleExport() {
      let token = this.$Tool.getStorage("USER_TOKEN")
        ? this.$Tool.getStorage("USER_TOKEN")
        : "";
      let stafferId = this.$Tool.getStorage("STAFFER_ID")
        ? this.$Tool.getStorage("STAFFER_ID")
        : "";
      let companyId = this.$Tool.getStorage("COMPANY_ID")
        ? this.$Tool.getStorage("COMPANY_ID")
        : "";
      if (!this.tableList.list.length == 0) {
        let is_count = 1;
        let p = this.paging.curPage;
        let num = this.paging.pageSize;
        let keyword = this.filter.keyword;
        let starttime = this.filter.range_time[0]
          ? this.filter.range_time[0]
          : "";
        let endtime = this.filter.range_time[1]
          ? this.filter.range_time[1]
          : "";
        let class_id = this.$route.query.class_id;
        let address = eduHttp.getStuCatitrackUrl();
        const url = `${address}?is_count=${is_count}&p=${p}&num=${num}&keyword=${keyword}&token=${token}&staffer_id=${stafferId}&company_id=${companyId}&class_id=${class_id}&starttime=${starttime}&endtime=${endtime}&is_export=1`;
        console.log(url,1);
        window.open(url);
      } else {
        this.$message({
          message: "暂无数据",
          type: "error",
        });
      }
    },
    // 检索
    search() {
      this.paging.curPage = 1;
      if (this.filter.range_time == null) {
        this.filter.range_time = "";
      }
      this.getStuCatitrack();
    },
    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
      this.getStuCatitrack();
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.getStuCatitrack();
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.getStuCatitrack();
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
.Educational-report-classTime {
  .top-content {
    margin: 8px 0;
    padding: 40px 10px;
    height: 121px;
    background: rgba(249, 252, 255, 1);
    ul {
      text-align: center;
      display: flex;
      li {
        margin-right: 40px;
        width: 20%;
        p:first-child {
          color: #4c5e95;
          font-size: 14px;
          margin-bottom: 8px;
        }
        p:last-child {
          font-size: 16px;
          color: #24356a;
        }
      }
    }
  }
}
</style>
