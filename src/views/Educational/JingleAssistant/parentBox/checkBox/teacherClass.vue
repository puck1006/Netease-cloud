<template>
  <div class="Educational-teacherClass">
    <!-- 页面右边按钮***end -->
    <div class="flex-wrap pt12 pl12 pr12">
      <div class="flex-al mb12">
        <span class="mr10 fs14 color-666">{{
          $t("Educational.JingleAssistant.parentAssess.af")
        }}</span>
        <div class="select-box" style="width:170px;">
          <el-select
            v-model="filter.code"
            filterable
            clearable
            :placeholder="$t('Educational.JingleAssistant.parentAssess.ag')"
            @change="search"
          >
            <el-option
              v-for="item in filter.timeList"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="lines ml16 mr16 mb12"></div>
      <div class="flex-al mb12">
        <span class="mr10 fs14 color-666">{{
          $t("Educational.JingleAssistant.parentAssess.ah")
        }}</span>
        <div class="select-box" style="width:300px;">
          <el-date-picker
            v-model="filter.times"
            type="daterange"
            :range-separator="$t('Common.range_time')"
            value-format="yyyy-MM-dd"
            :start-placeholder="$t('Common.start_time')"
            :end-placeholder="$t('Common.end_time')"
            @change="search"
          ></el-date-picker>
        </div>
      </div>

      <div class="lines ml16 mr16 mb12"></div>
      <div class="flex-al mb12">
        <span class="mr10 fs14 color-666">{{
          $t("Educational.JingleAssistant.parentAssess.ak")
        }}</span>
        <div class="select-box" style="width:170px;">
          <el-select
            v-model="filter.re_staffer_id"
            filterable
            clearable
            :placeholder="$t('Educational.JingleAssistant.parentAssess.al')"
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
    </div>
    <div class="tableDiv" ref="auto_height_table">
      <normalTableCont
        :tableData="tableList"
        @handSetting="handSetting"
        @handleColumnChange="handleColumnChange"
      ></normalTableCont>
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
    <!-- 点击查看 -->
    <div class="small-dialog" v-if="viewDetails">
      <el-dialog
        :title="$t('Educational.JingleAssistant.parentAssess.an')"
        :visible.sync="viewDetails"
        width="900px"
        @close="handleClose"
        :before-close="handleClose"
      >
        <div class="dialog-content">
          <div class="flex-wrap">
            <div class="flex-al mb12">
              <span class="mr10 fs14 color-666">{{
                $t("Educational.JingleAssistant.parentAssess.ao")
              }}</span>
              <div class="select-box" style="width:140px;">
                <el-select
                  v-model="filterDetails.is_evaluate"
                  clearable
                  @change="searchDetails"
                  filterable
                  :placeholder="
                    $t('Educational.JingleAssistant.parentAssess.ao')
                  "
                >
                  <el-option
                    v-for="item in filterDetails.pingList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="lines ml16 mr16 mb12"></div>
            <div class="flex-al Inquire-box mb12">
              <div class="ipt-box" style="width:280px;">
                <el-input
                  v-model="filterDetails.keyword"
                  @clear="searchDetails"
                  @keyup.enter.native="searchDetails"
                  clearable
                  :placeholder="
                    $t('Educational.JingleAssistant.parentAssess.ap')
                  "
                ></el-input>
              </div>
              <el-button
                @click="searchDetails"
                type="primary"
                size="small"
                class="search-btn fs14"
                >{{ $t("Common.input_button") }}</el-button
              >
            </div>
          </div>
          <div class="tableDiv" ref="auto_height_table1">
            <levelTableCont :tableData="tableviewDetails"></levelTableCont>
          </div>
          <!-- 分页 -->
          <el-pagination
            style="margin: 10px;"
            :current-page.sync="paging1.curPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size.sync="paging1.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paging1.pageTotal"
            @current-change="curPageChange1"
            @size-change="pageSizeChange1"
          ></el-pagination>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="viewDetails = false">{{
            $t("Common.btn_sure")
          }}</el-button>
          <el-button size="mini" @click="viewDetails = false">{{
            $t("Common.btn_cancel")
          }}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import normalTableCont from "@/components/tables/normalTableCont.vue";
import levelTableCont from "@/components/tables/levelTableCont.vue";
import eduHttp from "../../../Educational.js";

export default {
  name: "Educational-teacherClass",
  data() {
    return {
      viewDetails: false,
      //筛选
      filter: {
        code: "", //时间范围
        times: [], //选择时间
        re_staffer_id: "", //教师id
        timeList: [
          {
            text: this.$t("Educational.JingleAssistant.timeListText[0]"),
            value: ""
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[1]"),
            value: "1"
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[2]"),
            value: "2"
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[3]"),
            value: "3"
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[4]"),
            value: "4"
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[5]"),
            value: "5"
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[6]"),
            value: "6"
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[7]"),
            value: "7"
          }
        ],
        stafferList: [] //教师-下拉数据
      },
      filterDetails: {
        keyword: "",
        is_evaluate: "",
        pingList: [
          {
            value: "0",
            label: this.$t("Educational.JingleAssistant.parentAssess.aq")
          },
          {
            value: "1",
            label: this.$t("Educational.JingleAssistant.parentAssess.ar")
          }
        ]
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
          ColumnName: "teacherClass" //当前页面的名称，通常与路由名称一致
        }
      },
      // 弹窗表哥
      tableviewDetails: {
        // 表格的列
        columns: [],
        // 表格数据
        list: [],
        options: {
          errortip: "", //空页面提示内容
          mutiSelect: false, //是否显示多选
          issetting: false, //是否可以编辑列
          tableHeight: 300 //表格高度
        }
      },
      // 分页
      paging: {
        curPage: 1,
        pageSize: 10,
        pageTotal: 0
      },
      // 分页
      paging1: {
        curPage: 1,
        pageSize: 10,
        pageTotal: 0
      }
    };
  },
  components: {
    normalTableCont,
    levelTableCont
  },
  created() {
    this.ScoreTotalTwo();
    this.getTeacherJingle();
  },
  methods: {
    // 获取列表
    ScoreTotalTwo() {
      eduHttp
        .ScoreTotalTwo({
          code: this.filter.code,
          re_staffer_id: this.filter.re_staffer_id,
          start_time: this.filter.times ? this.filter.times[0] : "", //	开始时间
          end_time: this.filter.times ? this.filter.times[1] : "", //结束时间
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
    // 弹窗列表
    Attendance() {
      eduHttp
        .Attendance({
          keyword: this.filterDetails.keyword,
          is_evaluate: this.filterDetails.is_evaluate,
          p: this.paging1.curPage,
          num: this.paging1.pageSize,
          is_count: "1" //是否需要总数
        })
        .then(res => {
          this.paging1.pageTotal = parseInt(res.data.result.allnum);
          this.tableviewDetails.columns = res.data.result.field;
          if (res.data.error == "0") {
            this.tableviewDetails.list = res.data.result.list; //表格数据
          } else {
            this.tableviewDetails.list = [];
            this.tableviewDetails.options.errortip = res.data.errortip;
          }
        });
    },
    // 下拉 -- 教师
    getTeacherJingle() {
      eduHttp.getTeacherJingle({}).then(res => {
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
      this.ScoreTotalTwo();
    },
    searchDetails() {
      this.paging1.curPage = 1;
      this.Attendance();
    },
    // 点击事件
    handleColumnChange(k, v, column) {
      this.viewDetails = true;
      this.Attendance();
      console.log(k, v, column);
    },

    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
      this.ScoreTotalTwo();
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.ScoreTotalTwo();
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.ScoreTotalTwo();
    },
    curPageChange1(v) {
      this.paging1.curPage = v;
      this.Attendance();
    },
    // pageSize改变
    pageSizeChange1() {
      this.paging1.curPage = 1;
      this.Attendance();
    },
    // 关闭弹框
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
// .Educational-teacherClass {
// }
</style>
