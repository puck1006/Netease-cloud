<template>
  <div class="CareerGrowth-index CareerGrowth-InExam height100">
    <div class="progress-show-container">
      <p class="pexam">{{$t("Training.InExam.title")}}</p>
      <div class="button-container">
        <el-button
          type="primary"
          size="mini"
          @click="handleSubmit"
        >{{$t("Training.InExam.progress[3]")}}</el-button>
      </div>
    </div>
    <div class="progress-precent flex">
      <div class="flex left">
        <div class="left-completed">{{$t("Training.InExam.progress[0]")}}</div>
        <el-progress :percentage="progressData" style="width:250px" :show-text="false"></el-progress>
        <div
          class="left-wait"
        >{{progressData == 100 ? $t("Training.InExam.progress[4]") : $t("Training.InExam.progress[1]")}} {{completedNum}}/{{totalNum}}</div>
      </div>
      <div class="right">
        <i class="icon-alarm" style="color:#4C5E95"></i>
        <span class="cal">
          {{$t("Training.InExam.progress[2]")}}
          <span
            style="color:#00A6FF"
          >{{String(minutes).padStart(2,'0')}}′{{String(seconds).padStart(2,'0')}}″</span>
        </span>
      </div>
    </div>
    <div class="bg-white bg-white-container">
      <ul class="question-container">
        <li class="question-item" v-for="(item, index) in questionListData" :key="index">
          <div class="item-title mb10">{{index+1}}、 {{item.question_title}}</div>
          <div v-for="(item2, index2) in item.option" :key="index2">
            <el-radio
              class="checkbox-item"
              v-model="item.answer"
              :label="item2.answers_optionname"
            >{{item2.answers_optionname}}.{{item2.answers_option}}</el-radio>
            <br />
          </div>

          <!-- <el-radio class="checkbox-item">B.作为一名教师我们应该如何让学生提高对学习的兴趣,如何提高个人讲解水平</el-radio>
          <br />
          <el-radio class="checkbox-item">C.师德</el-radio>-->
        </li>
      </ul>
    </div>

    <!-- 手动提交 -->
    <popTips
      :dialogVisable="moreLossItem"
      :popTipsCont="popTips_push"
      @handConfirm="comSubmit"
      @handCancel="moreLossItem=false"
      @handleCloseTip="moreLossItem=false"
    ></popTips>

    <!-- 考核时间已到 -->
    <popTips
      :dialogVisable="timeWaste"
      :popTipsCont="popTips_moreLoss"
      @handConfirm="comSubmit"
      @handCancel="timeWaste=false"
      @handleCloseTip="timeWaste=false"
    ></popTips>
  </div>
</template>

<script>
import myCard from "@/components/Training/progressCard.vue";
import progressTableCont from "@/components/tables/progressTableCont.vue";
import popTips from "../../../components/common/popTips/popTips.vue";
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
      timeWaste: false,
      minutes: 15,
      seconds: 0,
      // 批量无意向提示弹框
      popTips_moreLoss: {
        btn_text1: this.$t("Training.InExam.popinfo[0]"),
        btn_text2: this.$t("Training.InExam.popinfo[1]"),
        title: this.$t("Training.InExam.popinfo[2]"),
        context: this.$t("Training.InExam.popinfo[3]")
      },
      popTips_push: {
        btn_text1: this.$t("Training.InExam.popinfo[0]"),
        btn_text2: this.$t("Training.InExam.popinfo[1]"),
        title: this.$t("Training.InExam.popinfo[2]"),
        context: this.$t("Training.InExam.popinfo[4]")
      },
      moreLossItem: false, //批量无意向提示弹框
      delItem: false, //删除班级类型
      //删除班级类型****弹窗
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
          tableHeight: 0
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
      },
      questionList: [],
      questionListData: [],
      examine_branch: "",
      totalNum: "",
      totalMin: ""
    };
  },
  components: {
    myCard,
    progressTableCont,
    popTips
  },
  created() {
    this.getTestpaperQuestion();
  },
  methods: {
    comSubmit() {
      this.moreLossItem = !this.moreLossItem;
      let temp = [];
      this.questionListData.forEach(item => {
        let obj = {};
        obj.question_id = item.question_id;
        obj.answer = item.answer;
        temp.push(obj);
      });
      let examine_examtime =
        this.minutes + Number((this.seconds / 60).toFixed(2));
      console.log(this.totalMin, examine_examtime);
      httpApi
        .getScore({
          examine_branch: this.examine_branch,
          answer_list: JSON.stringify(temp),
          examine_examtime: Number(this.totalMin - examine_examtime).toFixed(2)
        })
        .then(res => {
          if (res.data.error == 0) {
            this.$message({
              message: res.data.errortip,
              type: "success"
            });
            this.$router.push(
              `/Training/AssessProgress/ExaminationRecord?stage_id=${this.$route.query.stage_id}`
            );
          } else {
            this.$message({
              message: res.data.errortip,
              type: "error"
            });
          }
        });
    },
    num: function(n) {
      return n < 10 ? "0" + n : "" + n;
    },
    add: function() {
      var _this = this;
      var time = window.setInterval(function() {
        if (_this.seconds === 0 && _this.minutes !== 0) {
          _this.seconds = 59;
          _this.minutes -= 1;
        } else if (_this.minutes === 0 && _this.seconds === 0) {
          _this.seconds = 0;
          window.clearInterval(time);
          _this.timeWaste = true;
        } else {
          _this.seconds -= 1;
        }
      }, 1000);
    },
    getTestpaperQuestion() {
      httpApi
        .getTestpaperQuestion({
          stage_id: this.$route.query.stage_id
        })
        .then(res => {
          const examine_branch = res.data.result.list.examine_branch;
          this.examine_branch = examine_branch;
          this.getSubjects(examine_branch);
        });
    },
    getSubjects(examine_branch) {
      httpApi
        .getSubjects({
          examine_branch: examine_branch
        })
        .then(res => {
          let { list, test_time, examine_branch } = res.data.result;
          this.questionList = list;
          this.minutes = test_time;
          this.getQuestion();
          this.totalMin = test_time;
        });
    },
    getQuestion() {
      httpApi
        .getQuestion({
          exam_list: JSON.stringify(this.questionList),
          stage_id: this.$route.query.stage_id
        })
        .then(res => {
          this.questionListData = res.data.result.list.list;
          this.totalNum = res.data.result.list.list.length;
          // this.totalMin = res.data.result.list.exam_score.examine_examtime;
        });
    },
    handleSubmit() {
      this.moreLossItem = !this.moreLossItem;
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
    this.add();
    this.$nextTick(() => {
      if (this.$refs["auto_height_table"]) {
        this.tableList.options.tableHeight = this.$Tool.getTableHeight(
          this.$refs.auto_height_table.getBoundingClientRect().top
        );
      }
    });
  },
  watch: {
    second: {
      handler(newVal) {
        this.num(newVal);
      }
    },
    minute: {
      handler(newVal) {
        this.num(newVal);
      }
    }
  },
  computed: {
    second: function() {
      return this.num(this.seconds);
    },
    minute: function() {
      return this.num(this.minutes);
    },
    completedNum() {
      let tempNum = 0;
      this.questionListData.forEach(item => {
        if (item.answer) {
          tempNum++;
        }
      });
      return tempNum;
    },
    progressData() {
      return parseInt((this.completedNum / this.totalNum) * 100)
        ? parseInt((this.completedNum / this.totalNum) * 100)
        : 0;
    }
  }
};
</script>
<style lang="less">
@import "../Training.less";
</style>
