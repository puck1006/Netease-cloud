<template>
  <div class="sta-teacher-container">
    <div class="content-box bg-white flex1">
      <div class="flex-wrap pt12 flex-warp-line pl12 pr12">
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">时间范围</span>
          <div class="select-box" style="width:170px;">
            <el-select
              v-model="filter.code"
              clearable
              filterable
              placeholder="请选择时间范围"
              @change="search"
            >
              <el-option
                v-for="item in filter.codeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="time-box ml12" style="width:320px;">
            <el-date-picker
              @change="search"
              v-model="filter.time"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </div>
        <div class="lines ml16 mr16 mb12"></div>
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">{{ $t("Interesting.prepareLessons.filter_name2") }}：</span>
          <div class="select-box" style="width:170px;">
            <el-select
              v-model="filter.course_id"
              @change="search"
              clearable
              filterable
              :placeholder="$t('Interesting.prepareLessons.placeholder2')"
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
          <span class="mr10 fs14 color-4C5">{{ $t("Interesting.prepareLessons.filter_name3") }}：</span>
          <div class="select-box" style="width:170px;">
            <el-select
              v-model="filter.re_staffer_id"
              @change="search"
              clearable
              filterable
              :placeholder="$t('Interesting.prepareLessons.placeholder3')"
            >
              <el-option
                v-for="(item,index) in filter.stafferList"
                :key="index"
                :label="item.staffer_cnname"
                :value="item.staffer_id"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="tableDiv" ref="auto_height_table">
        <progressAnaularTableCont
          @handleColumnChange="handleColumnChange"
          :tableData="tableList"
          @handSetting="handSetting"
        ></progressAnaularTableCont>
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
    <!-- 查看评价状况 -->
    <div class="small-dialog" v-if="seeWorkStatus">
      <el-dialog
        title="查看评价状况"
        :visible.sync="seeWorkStatus"
        width="700px"
        class="seeWorkStatus"
        :before-close="handleClose"
      >
        <div class="dialog-content">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="'评价('+evaluate_num + ')'" name="0">
              <ul class="fs12" v-if="StafferDataList.length > 0">
                <li class="flex-al mb24" v-for="(item,index) in StafferDataList" :key="index">
                  <img :src="item.student_img" v-if="item.student_img" alt />
                  <img
                    src="@/assets/images/default-new-men.png"
                    v-if="!item.student_img && item.student_sex == '男'"
                    alt
                  />
                  <img
                    src="@/assets/images/default-img-women.png"
                    v-if="!item.student_img && item.student_sex == '女'"
                    alt
                  />
                  <span class="ml4 mr4">{{item.student_cnname}}</span>
                  <i class="icon-girl" v-if="item.student_sex == '女'"></i>
                  <i class="icon-boy" v-else></i>
                  <span class="status ml5">评价</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane :label="'回评('+return_num + ')'" name="1">
              <ul class="fs12" v-if="StafferDataList.length > 0">
                <li class="flex-al mb24" v-for="(item,index) in StafferDataList" :key="index">
                  <img :src="item.student_img" v-if="item.student_img" alt />
                  <img
                    src="@/assets/images/default-new-men.png"
                    v-if="!item.student_img && item.student_sex == '男'"
                    alt
                  />
                  <img
                    src="@/assets/images/default-img-women.png"
                    v-if="!item.student_img && item.student_sex == '女'"
                    alt
                  />
                  <span class="ml4 mr4">{{item.student_cnname}}</span>
                  <i class="icon-girl" v-if="item.student_sex == '女'"></i>
                  <i class="icon-boy" v-else></i>
                  <span class="status ml5">评价</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane :label="'出勤('+allnum + ')'" name="2">
              <ul class="fs12" v-if="StafferDataList.length > 0">
                <li class="flex-al mb24" v-for="(item,index) in StafferDataList" :key="index">
                  <img :src="item.student_img" v-if="item.student_img" alt />
                  <img
                    src="@/assets/images/default-new-men.png"
                    v-if="!item.student_img && item.student_sex == '男'"
                    alt
                  />
                  <img
                    src="@/assets/images/default-img-women.png"
                    v-if="!item.student_img && item.student_sex == '女'"
                    alt
                  />
                  <span class="ml4 mr4">{{item.student_cnname}}</span>
                  <i class="icon-girl" v-if="item.student_sex == '女'"></i>
                  <i class="icon-boy" v-else></i>
                  <span class="status ml5">评价</span>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="seeWorkStatus = false">确 定</el-button>
          <el-button size="mini" @click="seeWorkStatus = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 上课明细 -->
    <div class="small-dialog" v-if="seeClassDetail">
      <el-dialog
        title="上课明细"
        :visible.sync="seeClassDetail"
        width="1000px"
        class="seeClassDetail"
        :before-close="handleClose"
      >
        <div class="dialog-content">
          <div class="tableDiv">
            <noBorderTableCont :tableData="tableList2" @handSetting="handSetting"></noBorderTableCont>
            <!-- 分页 -->
            <el-pagination
              style="margin: 10px;"
              :current-page.sync="paging2.curPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size.sync="paging2.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="paging2.pageTotal"
              @current-change="curPageChange2"
              @size-change="pageSizeChange2"
            ></el-pagination>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import progressAnaularTableCont from "@/components/tables/progressAnaularTableCont.vue";
import noBorderTableCont from "@/components/tables/noBorderTableCont.vue";
import httpApi from "../../Educational";
import popTips from "@/components/common/popTips/popTips.vue";
import blank from "@/components/common/Blank/blank.vue";
export default {
  name: "Educational-homeworkManage-jobQuery",
  components: {
    progressAnaularTableCont,
    noBorderTableCont
  },
  data() {
    let item = {
      a1: "幼儿初阶班",
      a2: "WK",
      a3: "23849384020",
      a4: "Eric",
      a5: "200",
      a6: "200",
      a7: "200",
      a8: "100%",
      a9: "200",
      a10: "100%"
    };
    let item2 = {
      a1: "2020-01-22 10:40-11:00",
      a2: "Eric",
      a3: "12",
      a4: "12",
      a5: "100%",
      a6: "12",
      a7: "100%"
    };
    return {
      activeName: "first",
      col: "",
      seeWorkStatus: false,
      seeClassDetail: false,
      //筛选
      filter: {
        codeList: [
          { label: "不限", value: "0" },
          { label: "今日", value: "1" },
          { label: "昨日", value: "2" },
          { label: "本周", value: "3" },
          { label: "近七天", value: "4" },
          { label: "近30天", value: "5" },
          { label: "本月", value: "6" },
          { label: "上月", value: "7" }
        ],
        code: "",
        time: [],
        start_time: "",
        end_time: "", //校园id
        keyword: "", //课程别id
        course_id: "", //教师id
        class_id: [], //学校-下拉数据
        courseList: [], //课程别-下拉数据
        stafferList: [] //教师-下拉数据
      },
      tableList2: {
        // 表格的列
        columns: [
          {
            fieldname: "上课时间",
            fieldstring: "a1",
            show: 1,
            custom: 1
          },
          {
            fieldname: "上课老师",
            fieldstring: "a2",
            show: 1,
            custom: 1
          },
          {
            fieldname: "出勤人数",
            fieldstring: "a3",
            show: 1,
            custom: 1
          },
          {
            fieldname: "评价人数",
            fieldstring: "a4",
            show: 1,
            custom: 1
          },
          {
            fieldname: "评价率",
            fieldstring: "a5",
            show: 1,
            custom: 1,
            ismethod: 1
          },
          {
            fieldname: "回评人数",
            fieldstring: "a6",
            show: 1,
            custom: 1
          },
          {
            fieldname: "回评率",
            fieldstring: "a7",
            show: 1,
            custom: 1,
            ismethod: 1
          }
        ],
        // 表格数据
        list: [],
        options: {
          errortip: "", //空页面提示内容
          mutiSelect: false, //是否显示多选
          issetting: false, //是否可以编辑列
          tableHeight: 522, //表格高度
          moduleName: "Educational", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "report_classReport" //当前页面的名称，通常与路由名称一致
        }
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
          ColumnName: "report_classReport" //当前页面的名称，通常与路由名称一致
        }
      },
      // 分页
      paging: {
        curPage: 1,
        pageSize: 10,
        pageTotal: 0
      },
      paging2: {
        curPage: 1,
        pageSize: 10,
        pageTotal: 0
      },
      is_evaluate: "",
      class_id: "",
      StafferDataList: [],
      allnum: "",
      evaluate_num: "",
      return_num: ""
    };
  },
  created() {
    this.StafferList();
    this.getTeacherJingle();
    this.getCourseJingle();
  },
  watch: {},
  computed: {},
  methods: {
    SevaluateState() {
      if (this.is_evaluate === "0") {
        this.is_evaluate = "1";
      } else if (this.is_evaluate === "1") {
        this.is_evaluate = "0";
      }
      httpApi
        .SevaluateState({
          class_id: this.class_id,
          is_evaluate: this.is_evaluate,
          p: "",
          num: "",
          is_count: "1",
          re_staffer_id: this.col.staffer_id
        })
        .then(res => {
          if (res.data.error == 0) {
            this.StafferDataList = res.data.result.list;
            let { attendance_num, evaluate_num, return_num } = res.data.result;
            this.allnum = attendance_num;
            this.evaluate_num = evaluate_num;
            this.return_num = return_num;
          } else {
            this.StafferDataList = [];
            let { attendance_num, evaluate_num, return_num } = res.data.result;
            this.allnum = attendance_num;
            this.evaluate_num = evaluate_num;
            this.return_num = return_num;
          }
        });
    },
    getTeacherJingle() {
      httpApi.getTeacherJingle({}).then(res => {
        this.filter.stafferList = res.data.result.list;
      });
    },
    getCourseJingle() {
      httpApi.getCourseJingle({}).then(res => {
        this.filter.courseList = res.data.result.list;
      });
    },
    StafferList() {
      if (!this.filter.time) {
        this.filter.time = [];
      }
      httpApi
        .StafferList({
          code: this.filter.code,
          start_time: this.filter.time.length != 0 ? this.filter.time[0] : "",
          end_time: this.filter.time.length != 0 ? this.filter.time[1] : "",
          keyword: this.filter.keyword,
          course_id: this.filter.course_id,
          re_staffer_id: this.filter.re_staffer_id,
          p: this.paging.curPage,
          num: this.paging.pageSize,
          is_count: "1",
          class_id: "",
          rs_staffer_id: ""
        })
        .then(res => {
          let { field, allnum, list } = res.data.result;
          this.tableList.columns = field;
          this.tableList.columns.forEach(item => {
            if (
              item.fieldstring == "hour_num" ||
              item.fieldstring == "evaluate_num" ||
              item.fieldstring == "return_num"
            ) {
              item.ismethod = 1;
            }
          });
          if (res.data.error == 0) {
            this.tableList.list = list;
            this.paging.pageTotal = Number(allnum);
          } else {
            this.tableList.list = [];
            this.paging.pageTotal = 0;
          }
        });
    },
    handleStafferList(item) {
      httpApi
        .StafferList({
          p: this.paging2.curPage,
          num: this.paging2.pageSize,
          is_count: "1",
          rs_staffer_id: item.staffer_id
        })
        .then(res => {
          let { field, allnum, list } = res.data.result;
          this.tableList2.columns = field;
          this.tableList2.columns.forEach(item => {
            if (
              item.fieldstring == "hour_num" ||
              item.fieldstring == "evaluate_num" ||
              item.fieldstring == "return_num"
            ) {
              item.ismethod = 1;
            }
          });
          if (res.data.error == 0) {
            this.tableList2.list = list;
            this.paging2.pageTotal = Number(allnum);
          } else {
            this.tableList2.list = [];
            this.paging2.pageTotal = 0;
          }
        });
    },
    handleColumnChange(k, v, col) {
      this.col = col;
      console.log(k, v, col);
      if (v.fieldname == "上课次数") {
        this.seeClassDetail = true;
        this.handleStafferList(col);
      } else {
        this.seeWorkStatus = true;
        if (v.fieldstring == "evaluate_num") {
          this.is_evaluate = 1;
          this.activeName = "0";
        } else if (v.fieldstring == "return_num") {
          this.is_evaluate = 0;
          this.activeName = "1";
        } else {
          this.is_evaluate = "";
          this.activeName = "2";
        }
        this.class_id = col.class_id;
        this.SevaluateState();
      }
    },
    // tab切换
    handleClick(tab, event) {
      this.is_evaluate = tab.name;
      this.SevaluateState();
    },
    // 检索
    search() {
      this.paging.curPage = 1;
      this.StafferList();
    },
    // 点击删除
    handDel(row) {
      console.log(row);
    },
    // 导出
    handExport() {
      // const token = this.$userDetails.token;
      // const stafferId = this.$userDetails.stafferId;
      // const schoolId = this.$userDetails.schoolId;
      // const companyId = this.$userDetails.companyId;
      // const re_postbe_id = this.$userDetails.re_postbe_id;
      // const dataequity = this.$userDetails.dataequity;
      // const account_class = this.$userDetails.account_class;
      // let url = httpApi.SchoolExport();
      // console.log(url);
      // if (this.tableList.list.length > 0) {
      //   window.open(
      //     `${url}?staffer_id=${stafferId}&token=${token}&dataequity=${dataequity}&account_class=${account_class}&school_id=${schoolId}&company_id=${companyId}&re_postbe_id=${re_postbe_id}&date=${this.filter.time}&schoolId=${this.filter.schoolId}`,
      //     "_blank"
      //   );
      // } else {
      //   this.$message.error("没有可导出的数据哦");
      // }
    },
    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
      this.StafferList();
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.StafferList();
    },
    curPageChange2(v) {
      this.paging2.curPage = v;
      this.handleStafferList();
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.StafferList();
    }, // pageSize改变
    pageSizeChange2() {
      this.paging2.curPage = 1;
      this.handleStafferList();
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
.sta-teacher-container {
  // 查看评价状况
  .seeWorkStatus {
    .el-dialog__body {
      padding: 10px 16px;
      .dialog-content ul {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        li {
          width: 33.33%;
          img {
            width: 26px;
            height: 26px;
            border-radius: 50%;
          }
          .status {
            display: inline-block;
            padding: 0 4px;
            color: #00b100;
            border: 1px solid rgba(28, 173, 6, 1);
          }
        }
      }
    }
  }
}
</style>
