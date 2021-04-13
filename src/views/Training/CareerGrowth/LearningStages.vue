<template>
  <div class="CareerGrowth-index CareerGrowth-LearningStages height100">
    <div
      class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7"
    >
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">{{ $t("Training.home.page_title") }}</span>
      </div>
      <div class="cr-head-right">
        <!-- <el-button type="primary" size="mini" @click="addAim">新增招生目标</el-button> -->
        <span>{{ $t("Training.home.page_title_right") }}</span>
        <span style="color: #00a6ff">{{
          $t("Training.home.page_title_right2")
        }}</span>
      </div>
    </div>
    <div class="bg-white pt15 pb15 mt10">
      <el-alert
        title="温馨提示:按阶段依次完成学习与考核,上阶段考核不合格不可进行下阶段的学习哦~"
        type="warning"
        show-icon
      ></el-alert>
    </div>
    <div class="progress-show-container">
      <ul class="progress-show flex">
        <li>
          <div class="li-title">
            {{ $t("Training.LearningStages.infoTitle[0]") }}
          </div>
          <div class="li-content">{{ stuInfo.career_cnname }}</div>
        </li>
        <li>
          <div class="li-title">
            {{ $t("Training.LearningStages.infoTitle[1]") }}
          </div>
          <div class="li-content">{{ stuInfo.stage_num }}</div>
        </li>
        <li>
          <div class="li-title">
            {{ $t("Training.LearningStages.infoTitle[2]") }}
          </div>
          <div class="li-content">{{ stuInfo.completedNum }}</div>
        </li>
        <li>
          <div class="li-title">
            {{ $t("Training.LearningStages.infoTitle[3]") }}
          </div>
          <div class="li-content">{{ stuInfo.schedule }}</div>
        </li>
      </ul>
    </div>
    <div
      class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7"
    >
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">{{
          $t("Training.LearningStages.learnProgress")
        }}</span>
      </div>
    </div>
    <div class="tableDiv bg-white" ref="auto_height_table">
      <progressTableCont :tableData="tableList" @switchChange="switchChange">
        <!-- 按钮操作组********start -->
        <el-table-column
          ref="fixedColumn"
          label="操作"
          align="center"
          width="120px"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click.native.prevent="handSee(scope.row)"
              >查看</el-button
            >
            <el-button
              type="text"
              size="small"
              @click.native.prevent="handEdit(scope.row)"
              v-if="scope.row.flag == true && scope.row.career_isexam != 1"
              >考核</el-button
            >
          </template>
        </el-table-column>
        <!-- 按钮操作组********end -->
      </progressTableCont>
    </div>
  </div>
</template>

<script>
import myCard from "@/components/Training/progressCard.vue";
import progressTableCont from "@/components/tables/progressTableCont.vue";
import httpApi from "./CareerGrowth.js";

export default {
  data() {
    let item = {
      a1: "222222222222222",
      a2: "222222222222222",
      a3: "222222222222222",
      a4: "222222222222222",
    };
    return {
      stuInfo: {},
      delItem: false, //删除班级类型
      //删除班级类型****弹窗
      popTips_del: {
        btn_text1: "确定",
        btn_text2: "取消",
        title: "删除班级类型",
        context: "操作不可撤回，确定删除吗？",
      },
      //检索-table
      filter: {
        keyword: "",
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
        },
      },
      // 分页
      paging: {
        curPage: 1,
        pageSize: 10,
        pageTotal: 10,
      },
      //侧边弹窗******新增或者编辑班级类型
      propData: {
        cancelVisible: false, //新增或者编辑班级类型
        isEdit: false, //是否编辑班级类型
        //select
        options: [
          {
            value: "选项1",
            label: "黄金糕",
          },
        ],
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
        resource: 0,
      },
      // 表单验证
      rules: {
        postpart_name: [
          {
            required: true,
            message: "请输入班级类型",
            trigger: "blur",
          },
        ],
        region: [
          {
            required: true,
            message: "请选择消息所属类别",
            trigger: "change",
          },
        ],
        postpart_name1: [
          {
            required: true,
            message: "请输入班级类型描述",
            trigger: "blur",
          },
        ],
        region1: [
          {
            required: true,
            message: "请选择启用状态",
            trigger: "change",
          },
        ],
      },
    };
  },
  components: {
    myCard,
    progressTableCont,
  },
  created() {
    console.log(this.$route.query.career_id);
    this.AtOnceStudy();
  },
  methods: {
    AtOnceStudy() {
      httpApi
        .AtOnceStudy({
          career_id: this.$route.query.career_id,
        })
        .then((res) => {
          this.tableList.columns = res.data.result.field;
          this.tableList.columns.forEach((item) => {
            if (item.fieldstring == "study_situation") {
              item.isProgress = true;
              // item.width = 60
            }
          });
          if (res.data.error == 0) {
            this.tableList.list = res.data.result.list.listinfo;
            this.stuInfo = res.data.result.list.list;
            this.tableList.list.forEach((item) => {
              let temp = item.study_situation.split("/");
              if (temp[1] == 0) {
                item.flag = false;
              } else if (temp[0] == temp[1]) {
                item.flag = true;
                console.log(item);
              } else {
                item.flag = false;
              }
            });
          } else {
            this.tableList.list = [];
          }
        });
    },
    handSee(row) {
      this.$router.push({
        path: `/Training/ViewCourses?course_id=${row.course_id}`,
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
        path: `/Training/AssessmentNext?stage_id=${row.stage_id}`,
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs["auto_height_table"]) {
        this.tableList.options.tableHeight = this.$Tool.getTableHeight(
          this.$refs.auto_height_table.getBoundingClientRect().top
        );
      }
    });
  },
};
</script>
<style lang="less">
@import "../Training.less";
</style>
