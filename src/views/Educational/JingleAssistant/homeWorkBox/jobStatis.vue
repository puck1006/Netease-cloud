<template>
  <div class="Educational-homeworkManage-jobStatis height100">
    <!-- 页面右边按钮***start -->
    <div class="right-btn">
      <el-button type="primary" size="mini" @click="handExport">
        {{
        $t("Common.export")
        }}
      </el-button>
    </div>
    <div class="content-box bg-white flex1">
      <div class="flex-wrap pl12 pr12 pt12">
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">
            {{
            $t('Educational.JingleAssistant.homeWork.labe_text5')
            }}
          </span>
          <div class="select-box" style="width:170px;">
            <el-select
              v-model="filter.tiemRange"
              clearable
              filterable
              :placeholder="$t('Educational.JingleAssistant.homeWork.placeholder5')"
              @change="tiemRangeSearch"
            >
              <el-option
                v-for="item in filter.timeList"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="time-box ml12" style="width:260px;">
            <el-date-picker
              v-model="filter.time"
              type="daterange"
              :range-separator="$t('Common.range_time')"
              value-format="yyyy-MM-dd"
              :start-placeholder="$t('Common.start_time')"
              :end-placeholder="$t('Common.end_time')"
              @change="timeSearch"
            ></el-date-picker>
          </div>
        </div>
      </div>
      <div class="page_tabs pl12 pr12 fs14 mb12">
        <span
          :class="{'active':index==tabCurrentIndex}"
          v-for="(item,index) in page_tabs"
          :key="index"
          @click="handClickTab(index)"
        >{{item}}</span>
      </div>
      <div class="flex-wrap pl12 pr12">
        <div class="flex-al Inquire-box mb12">
          <div class="ipt-box" style="width:200px;">
            <el-input
              v-if="tabCurrentIndex==0"
              v-model="filter.keyword"
              clearable
              :placeholder="$t('Educational.JingleAssistant.homeWork.placeholder6')"
              @clear="search"
              @keyup.enter.native="search"
            ></el-input>
            <el-input
              v-else
              v-model="filter.keyword"
              clearable
              :placeholder="$t('Educational.JingleAssistant.homeWork.placeholder7')"
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
        </div>
      </div>
      <div class="top-tips flex-al mb12 fs14">
        <i class="icon-tips mr4"></i>
        <p>{{$t('Educational.JingleAssistant.homeWork.tips')}}</p>
      </div>
      <div class="tableDiv pl12 pr12" ref="auto_height_table">
        <normalTableCont :tableData="tableList" @handSetting="handSetting"></normalTableCont>
        <!-- 分页 -->
        <el-pagination
          style="margin: 10px;"
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
import httpApi from "../../Educational.js";

export default {
  name: "Educational-homeworkManage-jobStatis",
  components: {
    normalTableCont
  },
  data() {
    return {
      page_tabs: [this.$t("Educational.JingleAssistant.homeWork.pageTabs[0]"), this.$t("Educational.JingleAssistant.homeWork.pageTabs[1]")],
      tabCurrentIndex: 0,
      //筛选
      filter: {
        time: "",
        tiemRange: "",
        starttime: "",
        endtime: "",
        //时间范围-下拉数据
        timeList: [
          {
            text: this.$t("Educational.JingleAssistant.timeListText[0]"),
            value: ""
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[1]"),
            value: "today"
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[2]"),
            value: "yesterday"
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[3]"),
            value: "week"
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[4]"),
            value: "sevenDay"
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[5]"),
            value: "threeDay"
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[6]"),
            value: "thisMonth"
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[7]"),
            value: "prevMonth"
          }
        ],
        keyword: "" //关键词
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
          ColumnName: "JingleAssistant_jobStatis" //当前页面的名称，通常与路由名称一致
        }
      },
      // 分页
      paging: {
        curPage: 1,
        pageSize: 30,
        pageTotal: 0
      }
    };
  },
  created() {
    this.homeworkClassStatisApi(); // 后台PC->作业统计 按班级 - 97
  },
  watch: {},
  computed: {},
  methods: {
    // 后台PC->作业统计 按班级 - 97
    homeworkClassStatisApi() {
      httpApi
        .homeworkClassStatisApi({
          keyword: this.filter.keyword,
          starttime: this.filter.time ? this.filter.time[0] : "",
          endtime: this.filter.time ? this.filter.time[1] : "",

          p: this.paging.curPage,
          num: this.paging.pageSize,
          is_count: "1" //是否需要总数
        })
        .then(res => {
          this.paging.pageTotal = parseInt(res.data.result.allnum);
          let obj = this.$Tool.getStorage(
            "module" + [this.tableList.options.moduleName]
          );
          if (obj) {
            if (obj["show_class" + [this.tableList.options.ColumnName]]) {
              this.tableList.columns =
                obj["show_class" + [this.tableList.options.ColumnName]];
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
    // 后台PC->作业统计 按老师 - 97
    homeworkTeacherStatisApi() {
      httpApi
        .homeworkTeacherStatisApi({
          keyword: this.filter.keyword,
          starttime: this.filter.time ? this.filter.time[0] : "",
          endtime: this.filter.time ? this.filter.time[1] : "",

          p: this.paging.curPage,
          num: this.paging.pageSize,
          is_count: "1" //是否需要总数
        })
        .then(res => {
          this.paging.pageTotal = parseInt(res.data.result.allnum);
          let obj = this.$Tool.getStorage(
            "module" + [this.tableList.options.moduleName]
          );
          if (obj) {
            if (obj["show_teacher" + [this.tableList.options.ColumnName]]) {
              this.tableList.columns =
                obj["show_teacher" + [this.tableList.options.ColumnName]];
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
    // 检索
    search() {
      this.paging.curPage = 1;
      if (this.tabCurrentIndex == 0) {
        this.homeworkClassStatisApi(); // 后台PC->作业统计 按班级 - 97
      } else {
        this.homeworkTeacherStatisApi(); // 后台PC->作业统计 按老师 - 97
      }
    },
    // 时间范围检索
    tiemRangeSearch() {
      this.paging.curPage = 1;
      switch (this.filter.tiemRange) {
        case "today":
          this.filter.starttime = this.$Tool.getDay(0);
          this.filter.endtime = this.filter.starttime;
          break;
        case "yesterday":
          this.filter.starttime = this.$Tool.getDay(-1);
          this.filter.endtime = this.filter.starttime;
          break;
        case "week":
          console.log(this.$Tool.getAppointedDate(1, 0).startDate);
          this.filter.starttime = this.$Tool.getAppointedDate(1, 0).startDate;
          this.filter.endtime = this.$Tool.getAppointedDate(1, 0).endDate;
          break;
        case "sevenDay":
          this.filter.starttime = this.$Tool.getDay(-7);
          this.filter.endtime = this.$Tool.getDay(0);
          break;
        case "threeDay":
          this.filter.starttime = this.$Tool.getDay(-30);
          this.filter.endtime = this.$Tool.getDay(0);
          break;
        case "thisMonth":
          this.filter.starttime = this.$Tool.getAppointedDate(2, 0).startDate;
          this.filter.endtime = this.$Tool.getAppointedDate(2, 0).endDate;
          break;
        case "prevMonth":
          console.log(this.$Tool.getAppointedDate(2, 1).startDate);
          this.filter.starttime = this.$Tool.getAppointedDate(2, 1).startDate;
          this.filter.endtime = this.$Tool.getAppointedDate(2, 1).endDate;
          break;
        default:
          this.filter.starttime = "";
          this.filter.endtime = "";
          break;
      }
      this.filter.time = [this.filter.starttime, this.filter.endtime];
      if (this.tabCurrentIndex == 0) {
        this.homeworkClassStatisApi(); // 后台PC->作业统计 按班级 - 97
      } else {
        this.homeworkTeacherStatisApi(); // 后台PC->作业统计 按老师 - 97
      }
    },
    // 时间检索
    timeSearch() {
      this.filter.tiemRange = "";
      this.paging.curPage = 1;
      if (this.tabCurrentIndex == 0) {
        this.homeworkClassStatisApi(); // 后台PC->作业统计 按班级 - 97
      } else {
        this.homeworkTeacherStatisApi(); // 后台PC->作业统计 按老师 - 97
      }
    },
    // tab切换
    handClickTab(index) {
      this.tabCurrentIndex = index;
      this.filter.time = "";
      this.filter.tiemRange = "";
      this.filter.starttime = "";
      this.filter.endtime = "";
      if (this.tabCurrentIndex == 0) {
        this.homeworkClassStatisApi(); // 后台PC->作业统计 按班级 - 97
      } else {
        this.homeworkTeacherStatisApi(); // 后台PC->作业统计 按老师 - 97
      }
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
      let starttime = this.filter.time ? this.filter.time[0] : "";
      let endtime = this.filter.time ? this.filter.time[1] : "";
      let url =
        this.tabCurrentIndex == 0
          ? httpApi.homeworkClassStatisApi1()
          : httpApi.homeworkTeacherStatisApi1();
      console.log(url);
      if (this.tableList.list.length > 0) {
        window.open(
          `${url}?is_export=1&language_type=${language_type}&staffer_id=${stafferId}&token=${token}&dataequity=${dataequity}&account_class=${account_class}&school_id=${schoolId}&company_id=${companyId}&re_postbe_id=${re_postbe_id}&starttime=${starttime}&endtime=${endtime}&keyword=${this.filter.keyword}`,
          "_blank"
        );
      } else {
        this.$message.error(this.$t("Common.export_tips"));
      }
    },
    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
      // this.getStaClassReport();
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      // this.getStaClassReport();
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      // this.getStaClassReport();
    },
    // 重置表单
    resetForm(form) {
      this.$refs[form].resetFields();
    },
    handleClose(done) {
      done();
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs["auto_height_table"]) {
        this.tableList.options.tableHeight = this.$Tool.getTableHeight(
          this.$refs.auto_height_table.getBoundingClientRect().top + 52
        );
      }
    });
  }
};
</script>

<style lang="less">
.Educational-homeworkManage-jobStatis {
  .page_tabs {
    span {
      display: inline-block;
      cursor: pointer;
      padding: 6px 8px;
      color: #aaa;
      background: rgba(245, 247, 250, 1);
      border-radius: 20px;
    }
    span + span {
      margin-left: 12px;
    }
    .active {
      color: #fff;
      background: #00a6ff;
    }
  }
  .top-tips {
    padding: 6px 8px;
    color: #00a6ff;
    background: rgba(0, 166, 255, 0.19);
    i:before {
      color: #00a6ff;
    }
  }
}
</style>
