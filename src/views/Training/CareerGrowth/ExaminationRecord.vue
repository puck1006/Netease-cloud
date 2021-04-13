<template>
  <div class="CareerGrowth-index CareerGrowth-LearningStages height100">
    <div class="tableDiv bg-white " ref="auto_height_table">
      <progressTableCont
        :tableData="tableList"
        @switchChange="switchChange"
        @handSetting="handSetting"
      >
        <!-- 按钮操作组********start -->
        <el-table-column ref="fixedColumn" label="操作" align="center" width="150px" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              v-if="scope.row.exam_name != '暂未考核'"
              @click.native.prevent="handEdit(scope.row)"
            >{{$t("Training.ExaminationRecord.scoped[0]")}}</el-button>
            <el-button
              v-if="scope.row.exam_name == '暂未考核'"
              type="text"
              size="small"
              style="color:#8A96BC"
              @click.native.prevent="handDelete(scope.row)"
            >{{$t("Training.ExaminationRecord.scoped[1]")}}</el-button>
          </template>
        </el-table-column>
        <!-- 按钮操作组********end -->
      </progressTableCont>
      <!-- 分页 -->
      <el-pagination
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
import myCard from "@/components/Training/progressCard.vue";
import progressTableCont from "@/components/tables/progressTableCont.vue";
import httpApi from "./CareerGrowth";

export default {
  data() {
    let item = {
      a1: "222222222222222",
      a2: "222222222222222",
      a3: "222222222222222",
      a4: "222222222222222"
    };
    return {
      delItem: false, //删除班级类型
      //删除班级类型****弹窗
      popTips_del: {
        btn_text1: "确定",
        btn_text2: "取消",
        title: "删除班级类型",
        context: "操作不可撤回，确定删除吗？"
      },
      //检索-table
      filter: {
        keyword: ""
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
          tableHeight: 0,
          moduleName: "ExaminationRecord", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "ExaminationRecord" //当前页面的名称，通常与路由名称一致
        }
      },
      // 分页
      paging: {
        curPage: 1,
        pageSize: 10,
        pageTotal: 10
      },
      //侧边弹窗******新增或者编辑班级类型
      propData: {
        cancelVisible: false, //新增或者编辑班级类型
        isEdit: false, //是否编辑班级类型
        //select
        options: [
          {
            value: "选项1",
            label: "黄金糕"
          }
        ]
      },
      // 表单
      ruleForm: {
        postpart_name: "",
        region: "",
        postpart_name1: "",
        region1: "",
        desc: "",
        date1: "",
        date2: "",
        date: "",
        resource: 0
      },
      // 表单验证
      rules: {
        postpart_name: [
          {
            required: true,
            message: "请输入班级类型",
            trigger: "blur"
          }
        ],
        region: [
          {
            required: true,
            message: "请选择消息所属类别",
            trigger: "change"
          }
        ],
        postpart_name1: [
          {
            required: true,
            message: "请输入班级类型描述",
            trigger: "blur"
          }
        ],
        region1: [
          {
            required: true,
            message: "请选择启用状态",
            trigger: "change"
          }
        ]
      }
    };
  },
  components: {
    myCard,
    progressTableCont
  },
  created() {
    this.ExamRecord();
  },
  methods: {
    // 编辑列编辑提交
    handSetting(v) {
      this.tableList.columns = v;
      console.log(v, 121313);
    },
    ExamRecord() {
      httpApi
        .ExamRecord({
          stage_id: this.$route.query.stage_id,
          p: this.paging.curPage,
          num: this.paging.pageSize,
          is_count: 1
        })
        .then(res => {
          // this.tableList.columns = res.data.result.field;
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
            this.paging.pageTotal = Number(res.data.result.allnum);
            this.tableList.list = res.data.result.list;
          } else {
            this.tableList.list = [];
          }
        });
    },
    handleLearning() {
      this.$router.push({ path: "/Training/LearningStages" });
    },
    switchChange() {
      console.log("asd");
    },
    handEdit(row) {
      this.$router.push({
        path: `/Training/Answer?examine_id=${row.examine_id}`
      });
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.ExamRecord();
    },
    // pageSize改变
    pageSizeChange(v) {
      this.paging.curPage = 1;
      this.paging.pageSize = v;
      this.ExamRecord();
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs["auto_height_table"]) {
        this.tableList.options.tableHeight = this.$Tool.getTableHeight(
          this.$refs.auto_height_table.getBoundingClientRect().top + 32
        );
      }
    });
  }
};
</script>
<style lang="less">
@import "../Training.less";
</style>
