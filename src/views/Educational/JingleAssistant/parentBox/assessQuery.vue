<template>
  <div class="Educational-assessQuery">
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
      <!-- <div class="flex-al mb12">
        <span class="mr10 fs14 color-666">{{
          $t("Educational.JingleAssistant.homeWork.labe_text11")
        }}</span>
        <div class="select-box" style="width:170px;">
          <el-select
            v-model="filter.schoolId"
            filterable
            clearable
            :placeholder="
              $t('Educational.JingleAssistant.homeWork.placeholder11')
            "
            @change="changeSchool"
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
      <div class="flex-al mb12">
        <span class="mr10 fs14 color-666">{{
          $t("Educational.JingleAssistant.parentAssess.ai")
        }}</span>
        <div class="select-box" style="width:170px;">
          <el-select
            v-model="filter.classId"
            filterable
            clearable
            :placeholder="$t('Educational.JingleAssistant.parentAssess.aj')"
            @change="changeClass"
          >
            <el-option
              v-for="item in filter.classRoomList"
              :key="item.class_id"
              :label="item.class_cnname"
              :value="item.class_id"
            ></el-option>
          </el-select>
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
      <div class="lines ml16 mr16 mb12"></div>
      <div class="flex-al Inquire-box mb12">
        <div class="ipt-box" style="width:270px;">
          <el-input
            v-model="filter.keyword"
            clearable
            :placeholder="$t('Educational.JingleAssistant.parentAssess.am')"
            @clear="search"
            @keyup.enter.native="search"
          ></el-input>
        </div>
        <el-button
          type="primary"
          size="small"
          class="search-btn fs14"
          @click="search"
          >{{ $t("Common.input_button") }}</el-button
        >
      </div>
    </div>
    <div class="tableDiv" ref="auto_height_table">
      <levelTableCont
        :tableData="tableList"
        @handSetting="handSetting"
      ></levelTableCont>
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
</template>

<script>
import levelTableCont from "@/components/tables/levelTableCont.vue";
import eduHttp from "../../Educational.js";

export default {
  name: "Educational-assessQuery",
  data() {
    return {
      //筛选
      filter: {
        code: "", //时间范围
        times: [], //选择时间
        schoolId: "", // 学校id
        re_staffer_id: "", //教师id
        classId: "", //教室id
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
        schoolList: [], //学校-下拉数据
        stafferList: [], //教师-下拉数据
        classRoomList: [], //教室-下拉数据
        keyword: "" //关键词
      },
      // isLevel: true
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
          ColumnName: "assessQuery" //当前页面的名称，通常与路由名称一致
        }
      },
      // 分页
      paging: {
        curPage: 1,
        pageSize: 10,
        pageTotal: 0
      }
    };
  },
  components: {
    levelTableCont
  },
  created() {
    this.EvaluateQuery();
    this.EvaluateSchListPCApi(); //下拉->选择学校
    this.EvaluateClassListPCApi(); //下拉->选择班级
    this.EvaluateTeaListPCApi(); //下拉->选择老师
  },
  methods: {
    // 获取列表
    EvaluateQuery() {
      eduHttp
        .EvaluateQuery({
          keyword: this.filter.keyword,
          code: this.filter.code,
          class_id: this.filter.classId,
          re_staffer_id: this.filter.re_staffer_id,
          re_school_id: this.filter.schoolId,
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
            res.data.result.list.forEach(item => {
              // item.hourcomment_score=parseInt(item.hourcomment_score);
              item.hourcomment_score = 4;
            });
            this.tableList.list = res.data.result.list; //表格数据
          } else {
            this.tableList.list = [];
            this.tableList.options.errortip = res.data.errortip;
          }
        });
    },
    // 下拉 -- 学校
    EvaluateSchListPCApi() {
      eduHttp.EvaluateSchListPCApi({}).then(res => {
        if (res.data.error == 0) {
          this.filter.schoolList = res.data.result.list;
        } else {
          this.filter.schoolList = [];
        }
      });
    },
    // 下拉 -- 教室
    EvaluateClassListPCApi() {
      eduHttp
        .EvaluateClassListPCApi({
          re_school_id: this.filter.schoolId
        })
        .then(res => {
          if (res.data.error == 0) {
            this.filter.classRoomList = res.data.result.list;
          } else {
            this.filter.classRoomList = [];
          }
        });
    },
    // 下拉 -- 教师
    EvaluateTeaListPCApi() {
      eduHttp
        .EvaluateTeaListPCApi({
          class_id: this.filter.classId
        })
        .then(res => {
          if (res.data.error == 0) {
            this.filter.stafferList = res.data.result.list;
          } else {
            this.filter.stafferList = [];
          }
        });
    },
    // 改学校检索
    changeSchool() {
      this.filter.classId = "";
      this.filter.re_staffer_id = "";
      this.EvaluateClassListPCApi();
      this.search();
    },
    // 改班级检索
    changeClass() {
      this.filter.re_staffer_id = "";
      this.EvaluateTeaListPCApi();
      this.search();
    },
    // 检索
    search() {
      this.paging.curPage = 1;
      this.EvaluateQuery();
    },

    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
    },
    // 页码变化
    curPageChange(v) {
      this.curPage = v;
      this.EvaluateQuery();
    },
    // pageSize改变
    pageSizeChange() {
      this.curPage = 1;
      this.EvaluateQuery();
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
// .Educational-assessQuery {
// }
</style>
