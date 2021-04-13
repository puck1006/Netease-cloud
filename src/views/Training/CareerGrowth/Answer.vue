<template>
  <div class="CareerGrowth-index CareerGrowth-InExam CareerGrowth-Answer height100">
    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">{{ $t("Training.home.page_title") }}</span>
      </div>
      <div class="cr-head-right">
        <!-- <el-button type="primary" size="mini" @click="addAim">新增招生目标</el-button> -->
        <span>{{ $t("Training.home.page_title_right") }}</span>
        <span style="color:#00A6FF">{{ $t("Training.home.page_title_right2") }}</span>
      </div>
    </div>
    <div class="viewAnswer">
      <p>{{ $t("Training.Answer.info[0]") }}</p>
      <div>
        <el-button
          type="primary"
          size="mini"
          v-if="!isshowWrong"
          @click="handleWrong"
        >{{ $t("Training.Answer.info[1]") }}</el-button>
        <el-button
          v-if="isshowWrong"
          type="primary"
          size="mini"
          @click="LookAnswerAll"
        >{{ $t("Training.Answer.info[6]") }}</el-button>
      </div>
    </div>
    <div class="progress-show-container">
      <div class="score">
        {{ $t("Training.Answer.info[2]") }}
        <span>{{examOne.examine_score}}{{ $t("Training.Answer.info[4]") }}</span>
      </div>
      <div class="line"></div>
      <div class="wrong">
        {{ $t("Training.Answer.info[3]") }}
        <span>{{examOne.wrong_num}}{{ $t("Training.Answer.info[5]") }}</span>
      </div>
    </div>
    <div class="bg-white bg-white-container">
      <ul class="question-container">
        <li class="question-item" v-for="(item, index) in answerList" :key="index">
          <div class="item-title"> {{index+1}}、 {{item.question_title}}</div>
          <el-checkbox-group v-model="item.answersArr" @change="handleChange">
            <div v-for="(item2, index2) in item.option" :key="index2">
              <el-checkbox
                :label="item2.answers_optionname"
                class="checkbox-item"
                :class="{'wrong':item.question_correct != item2.answers_optionname}"
              >{{item2.answers_optionname}}.{{item2.answers_option}}</el-checkbox>
              <br />
            </div>
            <!-- <el-checkbox label="B" class="checkbox-item">B.作为一名教师我们应该如何让学生提高对学习的兴趣,如何提高个人讲解水平</el-checkbox>
            <br />
            <el-checkbox label="C" class="checkbox-item wrong">C.师德</el-checkbox>-->
          </el-checkbox-group>
          <div class="answer-description">
            <div class="flex answer-container">
              <div class="your-answer">
                {{ $t("Training.Answer.answer[0]") }}
                <span>{{item.question_correct}}</span>
              </div>
              <div class="right-answer">
                {{ $t("Training.Answer.answer[1]") }}
                <span>{{item.answers ? item.answers : '无'}}</span>
              </div>
            </div>
            <div class="answer-info">
              {{ $t("Training.Answer.answer[2]") }}
              <span v-html="item.question_analysis"></span>
            </div>
            <div class="table-container">
              <p class="mb10">{{ $t("Training.Answer.answer[3]") }}</p>
              <normalTableCont :tableData="item.tableList"></normalTableCont>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <popTips
      :dialogVisable="moreLossItem"
      :popTipsCont="popTips_moreLoss"
      @handConfirm="moreLossItem=false"
      @handCancel="moreLossItem=false"
      @handleCloseTip="moreLossItem=false"
    ></popTips>
  </div>
</template>

<script>
import myCard from "@/components/Training/progressCard.vue";
import normalTableCont from "@/components/tables/normalTableCont.vue";
import popTips from "../../../components/common/popTips/popTips.vue";
import httpApi from "./CareerGrowth";

export default {
  data() {
    let item = {
      answers: "3892",
      correctrate: "87%",
      exam_num: "B"
    };
    return {
      isshowWrong: false,
      examOne: {},
      answerList: [],
      checkList: ["B", "C"],
      checkListCopy: ["B", "C"],
      // 批量无意向提示弹框
      popTips_moreLoss: {
        btn_text1: "确定",
        btn_text2: "取消",
        title: "提示",
        context: "考核时间已到，是否立即提交？"
      },
      moreLossItem: false, //批量无意向提示弹框
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
        columns: [
          {
            fieldstring: "answers",
            fieldname: "作答次数",
            show: "1"
            // sortable: true
          },
          {
            fieldstring: "correctrate",
            fieldname: "正确率",
            show: "1"
          },
          {
            fieldstring: "exam_num",
            fieldname: "易错项",
            show: "1",
            isred: 1
          }
        ],
        // 表格数据
        list: Array(1).fill(item),
        options: {
          errortip: "", //空页面提示内容
          mutiSelect: false, //是否显示多选
          issetting: false, //是否可以编辑列
          tableHeight: 130
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
    normalTableCont,
    popTips
  },
  created() {
    this.LookAnswer();
  },
  methods: {
    LookAnswerAll() {
      this.LookAnswer();
      this.isshowWrong = !this.isshowWrong;
    },
    LookAnswer() {
      httpApi
        .LookAnswer({
          examine_id: this.$route.query.examine_id
        })
        .then(res => {
          this.examOne = res.data.result.examOne;
          this.answerList = res.data.result.list;
          this.answerList.forEach(item => {
            if (item.is_right == "0") {
              let temp = [];
              temp.push(item.answers);
              temp.push(item.question_correct);
              item.answersArr = temp;
            } else {
              let tempArr = [];
              tempArr.push(item.answers);
              item.answersArr = tempArr;
            }
            let tableList = {
              // 表格的列
              columns: [
                {
                  fieldstring: "exam_num",
                  fieldname: "作答次数",
                  show: "1"
                  // sortable: true
                },
                {
                  fieldstring: "correctrate",
                  fieldname: "正确率",
                  show: "1"
                },
                {
                  fieldstring: "answers",
                  fieldname: "易错项",
                  show: "1",
                  isred: 1
                }
              ],
              // 表格数据
              list: Array(1).fill(item.total),
              options: {
                errortip: "", //空页面提示内容
                mutiSelect: false, //是否显示多选
                issetting: false, //是否可以编辑列
                tableHeight: 130
              }
            };
            item.tableList = tableList;
          });
        });
    },
    LookAnswerWrong() {
      httpApi
        .LookAnswer({
          examine_id: this.$route.query.examine_id,
          wrong_topic: 1
        })
        .then(res => {
          this.examOne = res.data.result.examOne;
          this.answerList = res.data.result.list;
          this.answerList.forEach(item => {
            if (item.is_right == "0") {
              let temp = [];
              temp.push(item.answers);
              temp.push(item.question_correct);
              item.answersArr = temp;
            } else {
              let tempArr = [];
              tempArr.push(item.answers);
              item.answersArr = tempArr;
            }
            let tableList = {
              // 表格的列
              columns: [
                {
                  fieldstring: "answers",
                  fieldname: "易错项",
                  show: "1"
                  // sortable: true
                },
                {
                  fieldstring: "correctrate",
                  fieldname: "正确率",
                  show: "1"
                },
                {
                  fieldstring: "exam_num",
                  fieldname: "作答次数",
                  show: "1",
                  isred: 1
                }
              ],
              // 表格数据
              list: Array(1).fill(item.total),
              options: {
                errortip: "", //空页面提示内容
                mutiSelect: false, //是否显示多选
                issetting: false, //是否可以编辑列
                tableHeight: 130
              }
            };
            item.tableList = tableList;
          });
        });
    },
    handleChange() {
      this.checkList = this.checkListCopy;
    },
    handleWrong() {
      this.isshowWrong = !this.isshowWrong;
      console.log("筛选数据");
      this.LookAnswerWrong();
    },
    handleLearning() {
      this.$router.push({ path: "/Training/LearningStages" });
    },
    switchChange() {
      console.log("asd");
    },
    handEdit() {
      this.$router.push({ path: "/Training/Assessment" });
    }
  },
  mounted() {
    Object.freeze(this.checkList);
    this.$nextTick(() => {
      if (this.$refs["auto_height_table"]) {
        this.tableList.options.tableHeight = this.$Tool.getTableHeight(
          this.$refs.auto_height_table.getBoundingClientRect().top
        );
      }
    });
  }
};
</script>
<style lang="less">
@import "../Training.less";
.wrong {
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #ff3569 !important;
    border-color: #ff3569 !important;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #ff3569 !important;
  }
  .el-checkbox.is-bordered.is-checked {
    border-color: #ff3569;
  }
  .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #ff3569;
  }
  .el-checkbox__inner::after {
    content: "x" !important;
    color: white !important;
    left: 2px !important;
    top: -2px !important;
    border: 0 !important;
    transform: rotate(0deg) !important;
  }
}
</style>
