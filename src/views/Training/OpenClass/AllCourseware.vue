<template>
  <div class="CareerGrowth-index CareerGrowth-AllCourseware height100">
    <div class="mt8 AllCourseware-box">
      <el-alert style="margin-top:-7px" :title="tips" type="warning" show-icon></el-alert>
      <div class="tips">
        <div class="button-container">
          <el-button-group>
            <el-button
              @click="handleNew"
              size="middle"
              :class="{'new-css':btnFlag == 0}"
            >{{$t('Training.AllCourseware.info[0]')}}</el-button>
            <el-button
              @click="handleHot"
              :class="{'new-css':btnFlag == 1}"
              size="middle"
            >{{$t('Training.AllCourseware.info[1]')}}</el-button>
            <el-button
              :class="{'new-css':btnFlag == 2}"
              @click="handleCommoment"
              size="middle"
            >{{$t('Training.AllCourseware.info[2]')}}</el-button>
          </el-button-group>
        </div>
      </div>

      <div class="card-container-openCourse" ref="auto_height_table">
        <template v-if="dataList.length > 0">
          <openClassCard
            @handleWatch="handleWatch(item)"
            :dataInfo="item"
            v-for="(item, index) in dataList"
            :key="index"
          ></openClassCard>
        </template>
        <blank v-else :blankCont="tips1"></blank>
      </div>
      <div class="page-container" v-if="dataList.length > 0">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          style="margin: 10px;"
          :current-page.sync="paging.curPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size.sync="paging.pageSize"
          :total="paging.pageTotal"
          @current-change="curPageChange"
          @size-change="pageSizeChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import openClassCard from "@/components/Training/openClassCard.vue";
import httpApi from "../CareerGrowth/CareerGrowth";
import blank from "@/components/common/Blank/blank.vue";

export default {
  data() {
    return {
      tips: this.$t("Training.AllCourseware.tips"),
      tips1: this.$t("Training.AllCourseware.tipsBlank"),
      btnNew: 0,
      btnHot: 1,
      btnCom: 0,
      btnFlag: 1,
      dataList: [],
      // 分页
      paging: {
        curPage: 1,
        pageSize: 10,
        pageTotal: 0
      }
    };
  },
  components: {
    openClassCard,
    blank
  },
  created() {
    this.OpenCourse();
  },
  methods: {
    handleNew() {
      this.btnFlag = 0;
      this.btnNew = 1;
      this.btnHot = 0;
      this.btnCom = 0;
      this.OpenCourse();
    },
    handleHot() {
      this.btnFlag = 1;
      this.btnNew = 0;
      this.btnHot = 1;
      this.btnCom = 0;
      this.OpenCourse();
    },
    handleCommoment() {
      this.btnFlag = 2;
      this.btnNew = 0;
      this.btnHot = 0;
      this.btnCom = 1;
      this.OpenCourse();
    },
    OpenCourse() {
      httpApi
        .OpenCourse({
          course_recommend: this.btnCom == 0 ? "" : this.btnCom,
          course_popular: this.btnHot == 0 ? "" : this.btnHot,
          course_newest: this.btnNew == 0 ? "" : this.btnNew,
          p: this.paging.curPage,
          num: this.paging.pageSize,
          is_count: 1
        })
        .then(res => {
          this.paging.pageTotal = Number(res.data.result.allnum);
          this.dataList = res.data.result.list;
        });
    },
    handleWatch(item) {
      console.log(item);
      this.$router.push({
        path: `/Training/ViewCourses?course_id=${item.course_id}`
      });
    },
    handletoExam() {
      this.$router.push({ path: "/Training/Assessment" });
    },
    handleLearning() {
      this.$router.push({ path: "/Training/LearningOnce" });
    },
    handleExamPage() {
      console.log("考核");
      this.$router.push({ path: "/Training/ViewCourses" });
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
    },
    // pageSize改变
    pageSizeChange(v) {
      this.paging.curPage = 1;
      this.paging.pageSize = v;
    }
  },
  mounted() {
    this.$nextTick(() => {});
  }
};
</script>
<style lang="less">
@import "../Training.less";
.page-container {
  text-align: center;
  margin: 0 auto;
}

.CareerGrowth-AllCourseware {
  .el-button:hover {
    color: #000;
    background-color: #fff;
  }
  .el-button:focus {
    // color: #fff;
    // border-color: #00a6ff;
    background-color: #fff;
  }
  .new-css {
    color: #fff !important;
    background-color: #00a6ff !important;
    border-color: #00a6ff !important;
  }
}
</style>
