<template>
  <div class="Interesting-classReminder-publicClass height100">
    <!-- 页面右边按钮***start -->
    <!-- <div class="right-btn">
      <el-button v-if="$userDetails.account_class!='1'" type="primary" size="mini" @click="allReadItem = true">
        {{
        $t("Interesting.classReminder.btn_text1")
        }}
      </el-button>
    </div> -->
    <div class="content-box bg-white flex1 pl12 pr12">
      <div v-if="multipleSelection.length == 0" class="flex-wrap pt12">
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5"
            >{{ $t("Interesting.classReminder.filter_name1") }}：</span
          >
          <div class="time-box" style="width: 260px">
            <el-date-picker
              v-model="filter.time"
              type="daterange"
              :range-separator="$t('Interesting.classReminder.placeholder1[0]')"
              value-format="yyyy-MM-dd"
              :start-placeholder="
                $t('Interesting.classReminder.placeholder1[1]')
              "
              :end-placeholder="$t('Interesting.classReminder.placeholder1[2]')"
              @change="search"
            ></el-date-picker>
          </div>
        </div>
        <div class="lines ml16 mr16 mb12"></div>
        <template
          v-if="
            $userDetails.account_class == 1 ||
            $Tool.getStorage('postpart_isteregulator') == 1
          "
        >
          <div class="flex-al mb12">
            <span class="mr10 fs14 color-4C5">教师：</span>
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
          <span class="mr10 fs14 color-4C5"
            >{{ $t("Interesting.classReminder.filter_name2") }}：</span
          >
          <div class="select-box" style="width: 170px">
            <el-select
              v-model="filter.class_id"
              @change="search"
              clearable
              filterable
              :placeholder="$t('Interesting.classReminder.placeholder2')"
            >
              <el-option
                v-for="(item, index) in filter.classList"
                :key="index"
                :label="`${item.class_cnname}(${item.class_enname})`"
                :value="item.class_id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="lines ml16 mr16 mb12"></div>
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5"
            >{{ $t("Interesting.classReminder.filter_name3") }}：</span
          >
          <div class="select-box" style="width: 170px">
            <el-select
              v-model="filter.course_id"
              @change="search"
              clearable
              filterable
              :placeholder="$t('Interesting.classReminder.placeholder3')"
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
        <!-- <div class="lines ml16 mr16 mb12"></div>
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">{{ $t("Interesting.classReminder.filter_name4") }}：</span>
          <div class="select-box" style="width:170px;">
            <el-select
              v-model="filter.reading_state"
              @change="search"
              clearable
              filterable
              :placeholder="$t('Interesting.classReminder.placeholder4')"
            >
              <el-option :label="$t('Interesting.classReminder.readStatus[0]')" value="1"></el-option>
              <el-option :label="$t('Interesting.classReminder.readStatus[1]')" value="0"></el-option>
            </el-select>
          </div>
        </div> -->
      </div>
      <!-- 隐藏的按钮 -->
      <div v-else class="flex-wrap mb12 pt12">
        <el-button type="primary" size="mini" @click="remkReadItem = true">
          {{ $t("Interesting.classReminder.btn_text2") }}
        </el-button>
      </div>
      <div class="tableDiv" ref="auto_height_table">
        <remindTableCont
          :tableData="tableList"
          @handleSelectionChange="handleSelectionChange"
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
                v-if="
                  (scope.row.is_beike &&
                    $Tool.getStorage('postpart_isteregulator') == '1') ||
                  $Tool.getStorage('postpart_isteregulator') == '0'
                "
                size="small"
                @click.native.prevent="handPreparing(scope.row)"
                >{{ $t("Interesting.classReminder.btn_text3") }}</el-button
              >
            </template>
          </el-table-column>
          <!-- 按钮操作组********end -->
        </remindTableCont>
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
      <!-- 标记已读弹框-->
      <popTips
        :dialogVisable="remkReadItem"
        :popTipsCont="popTips_remkRead"
        @handConfirm="MarkReadAction('0')"
        @handCancel="remkReadItem = false"
        @handleCloseTip="remkReadItem = false"
      ></popTips>
      <!-- 全部标记已读弹框-->
      <popTips
        :dialogVisable="allReadItem"
        :popTipsCont="popTips_allRead"
        @handConfirm="MarkReadAction('1')"
        @handCancel="allReadItem = false"
        @handleCloseTip="allReadItem = false"
      ></popTips>
    </div>
  </div>
</template>

<script>
import remindTableCont from "@/components/tables/remindTableCont.vue";
import popTips from "@/components/common/popTips/popTips.vue";
import httpApi from "../../Interesting";
export default {
  name: "Interesting-classReminder-publicClass",
  components: {
    remindTableCont,
    popTips,
  },
  data() {
    return {
      remkReadItem: false, //标记已读弹框
      // 标记已读提示弹窗
      popTips_remkRead: {
        btn_text1: this.$t("Common.btn_sure"),
        btn_text2: this.$t("Common.btn_cancel"),
        title: this.$t("Common.pop_title"),
        context: this.$t("Interesting.classReminder.remkRead_cont"),
      },
      allReadItem: false, //标记已读弹框
      // 全部标记已读提示弹窗
      popTips_allRead: {
        btn_text1: this.$t("Common.btn_sure"),
        btn_text2: this.$t("Common.btn_cancel"),
        title: this.$t("Common.pop_title"),
        context: this.$t("Interesting.classReminder.allRead_cont"),
      },
      multipleSelection: [], //选中的数据
      hour_list: [], //选中的hour_id
      //筛选
      filter: {
        time: "", //日期
        class_id: "",
        course_id: "",
        re_staffer_id: "", //教师id

        reading_state: "", //是否阅读 0未阅读 1已阅读
        courseList: [], //课程别-下拉数据
        classList: [], //班级下拉列表
        stafferList: [], //教师-下拉数据
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
          ColumnName: "classReminder_publicClass", //当前页面的名称，通常与路由名称一致
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
    this.indexHome(); // 首页->备课提醒列表 -- wgh
    this.getTeacher(); //下拉->选择教师

    this.getClass(); // 首页->备课提醒->选择班级 -- wgh
    this.getCourse(); //备课->下拉->选择课程别 -- wgh
  },
  methods: {
    // 首页->备课提醒列表 -- wgh
    indexHome() {
      httpApi
        .indexHome({
          is_count: "1", //是否需要总数，可以不传
          p: this.paging.curPage,
          num: this.paging.pageSize,
          // 筛选条件
          code: "0", //0待备课 1延迟备课 2上课 3全部
          re_staffer_id: this.filter.re_staffer_id,

          starttime: this.filter.time ? this.filter.time[0] : "",
          endtime: this.filter.time ? this.filter.time[1] : "",
          course_id: this.filter.course_id,
          class_id: this.filter.class_id,
          reading_state: this.filter.reading_state, //是否阅读 0未阅读 1已阅读
        })
        .then((res) => {
          // this.filter.courseList = res.data.result.CourseList;
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
    // 首页->备课提醒->选择班级 -- wgh
    getClass() {
      this.$http
        .getClass({
          account_class: this.$Tool.getStorage("UserInfo")
            ? this.$Tool.getStorage("UserInfo").account_class
            : "",
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.filter.classList = res.data.result.list;
          } else {
            this.filter.classList = [];
          }
        });
    },
    //备课->下拉->选择课程别 -- wgh
    getCourse() {
      this.$http.getCourse({}).then((res) => {
        if (res.data.error == 0) {
          this.filter.courseList = res.data.result.list;
        } else {
          this.filter.courseList = [];
        }
      });
    },
    // 下拉 -- 教师
    getTeacher() {
      this.$http.getTeacher({}).then((res) => {
        if (res.data.error == 0) {
          this.filter.stafferList = res.data.result.list;
        } else {
          this.filter.stafferList = [];
        }
      });
    },
    //首页->备课提醒->标记阅读状态 -- wgh
    MarkReadAction(code) {
      httpApi
        .MarkReadAction({
          hour_list: JSON.stringify(code == "0" ? this.hour_list : ""),
          code: code, //0标记已读 1全部已读
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            if (code == "0") {
              this.remkReadItem = false;
            } else {
              this.allReadItem = false;
            }
            this.indexHome(); // 首页->备课提醒列表 -- wgh
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    // 检索
    search() {
      this.paging.curPage = 1;
      this.indexHome(); // 首页->备课提醒列表 -- wgh
    },
    // 点击备课
    handPreparing(row) {
      console.log(row);
      this.$router.push(
        `/Interesting/prepareLessons/preLessonDetais?class_id=${row.class_id}&course_branch=${row.course_branch}&hour_lessontimes=${row.hour_lessontimes}`
      );
    },
    // 复选框
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
      let _this = this,
        arr = [];
      this.multipleSelection.forEach((e) => {
        arr.push({
          hour_id: e.hour_id,
        });
      });
      this.hour_list = arr;
    },
    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
      this.indexHome(); // 首页->备课提醒列表 -- wgh
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.indexHome(); // 首页->备课提醒列表 -- wgh
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.indexHome(); // 首页->备课提醒列表 -- wgh
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
.Interesting-classReminder-publicClass {
}
</style>
