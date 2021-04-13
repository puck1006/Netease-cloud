<template>
  <div class="myCenter-currentCourse-careerGrowth height100 myCenter-box">
    <div class="content-box bg-white mt8">
      <div class="flex-wrap pt12 flex-warp-line pl12 pr12">
        <div class="flex-al Inquire-box mb12">
          <div class="ipt-box" style="width:260px;">
            <el-input
              v-model="filter.keyword"
              clearable
              :placeholder="$t('myCenter.placeholder2')"
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
      <div class="content-list">
        <div
          ref="auto_height_table"
          class="list-div-auto"
          :style="{ height: content_box_height + 'px' }"
        >
          <div class="class-list" v-if="careerGrowthList.length>0">
            <div class="itemOne" v-for="(item,index) in careerGrowthList" :key="index">
              <div class="img flex-al-ce">
                <img :src="item.course_img" alt />
              </div>
              <div class="bottom mt12 mb12 fs14 color-8A9 flex-all">
                <span class="fs16 color-243">{{item.course_name}}</span>
                <span>{{$t('myCenter.labe_text7')}} {{item.finish_ratio}}</span>
              </div>
            </div>
          </div>
          <blank v-else :blankCont="tips"></blank>
        </div>
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
import progressTableCont from "@/components/tables/progressTableCont.vue";
import popTips from "@/components/common/popTips/popTips.vue";
import blank from "@/components/common/Blank/blank.vue";
import httpApi from "../myCenter";
export default {
  name: "myCenter-currentCourse-careerGrowth",
  components: {
    progressTableCont,
    popTips,
    blank
  },
  data() {
    let item = {
      img: require("../../../assets/images/info-img.png"),
      course_cnname: "幼儿初阶美语课程",
      num: "3/18"
    };
    return {
      content_box_height: 0,
      //筛选
      filter: {
        keyword: "" //关键词
      },
      careerGrowthList: Array(10).fill(item),
      tips: "暂时没有内容哦",
      // 分页
      paging: {
        curPage: 1,
        pageSize: 10,
        pageTotal: 0
      }
    };
  },
  watch: {},
  computed: {},
  created() {
    this.InlearnCourse(); //个人中心->在学课程 -- wgh
  },
  methods: {
    //个人中心->在学课程 -- wgh
    InlearnCourse() {
      httpApi
        .InlearnCourse({
          is_count: "1", //是否需要总数，可以不传
          p: this.paging.curPage,
          num: this.paging.pageSize,
          course_type: "1", //课程类型 0通识课 1职业成长
          // 筛选条件
          keyword: this.filter.keyword
        })
        .then(res => {
          this.paging.pageTotal = parseInt(res.data.result.allnum);
          if (res.data.error == 0) {
            this.careerGrowthList = res.data.result.list;
          } else {
            this.careerGrowthList = [];
          }
          this.tips = res.data.errortip;
        });
    },
    //检索
    search() {
      this.paging.curPage = 1;
      this.InlearnCourse(); //个人中心->在学课程 -- wgh
    },
    // 重置表单
    resetForm(form) {
      this.$refs[form].resetFields();
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.InlearnCourse(); //个人中心->在学课程 -- wgh
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.InlearnCourse(); //个人中心->在学课程 -- wgh
    },
    handleClose(done) {
      done();
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs["auto_height_table"]) {
        this.content_box_height = this.$Tool.getTableHeight(
          this.$refs.auto_height_table.getBoundingClientRect().top + 52
        );
      }
    });
  }
};
</script>

<style lang="less">
.myCenter-currentCourse-careerGrowth {
}
</style>
