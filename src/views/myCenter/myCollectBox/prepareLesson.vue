<template>
  <div class="myCenter-myCollect-prepareLesson height100 myCenter-box">
    <div class="content-box bg-white mt8">
      <div class="flex-wrap pt12 flex-warp-line pl12 pr12">
        <div class="flex-al Inquire-box mb12">
          <div class="ipt-box" style="width:260px;">
            <el-input
              v-model="filter.keyword"
              clearable
              :placeholder="$t('myCenter.placeholder3')"
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
          <div class="class-list" v-if="myCollectList.length>0">
            <div class="itemOne" v-for="(item,index) in myCollectList" :key="index">
              <div class="top flex-all pl16 pr16">
                <span class="fs16 color-243">{{item.class_cnname}}</span>
              </div>
              <div class="item-cont fs14 color-4C5">
                <p>
                  {{$t(
                  'myCenter.labe_text3'
                  )}}{{item.course_cnname}}
                </p>
                <p>
                  {{$t(
                  'myCenter.labe_text4'
                  )}}{{item.course_branch}}
                </p>
                <p>
                  {{$t(
                  'myCenter.labe_text5'
                  )}}{{item.school_cnname}}
                </p>
              </div>
              <div class="item-bottom tr">
                <el-button
                  type="primary"
                  size="mini"
                  class="fs14"
                  @click="handSee(item)"
                >{{ $t("Common.see") }}</el-button>
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
  name: "myCenter-myCollect-prepareLesson",
  components: {
    progressTableCont,
    popTips,
    blank
  },
  data() {
    return {
      content_box_height: 0,
      //筛选
      filter: {
        keyword: "" //关键词
      },
      //我的收藏列表
      myCollectList: [],
      tips: "暂时没有收藏哦",
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
    this.getCollection(); // 个人中心->我的收藏-- wgh
  },
  methods: {
    // 个人中心->我的收藏-- wgh
    getCollection() {
      httpApi
        .getCollection({
          is_count: "1", //是否需要总数，可以不传
          p: this.paging.curPage,
          num: this.paging.pageSize,
          code:'1',//1 备课 2 培训
          // 筛选条件
          keyword: this.filter.keyword
        })
        .then(res => {
          this.paging.pageTotal = parseInt(res.data.result.allnum);
          if (res.data.error == 0) {
            this.myCollectList = res.data.result.list;
          } else {
            this.myCollectList = [];
          }
          this.tips = res.data.errortip;
        });
    },
    //检索
    search() {
      this.paging.curPage = 1;
      this.getCollection(); // 个人中心->我的收藏-- wgh
    },
    // 查看
    handSee(row) {
      this.$router.push(
        `/Interesting/prepareLessons/preLessonDetais?class_id=${row.class_id}&course_branch=${row.course_branch}&hour_lessontimes=${row.hour_lessontimes}`
      );
    },
    // 重置表单
    resetForm(form) {
      this.$refs[form].resetFields();
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.getCollection(); // 个人中心->我的收藏-- wgh
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.getCollection(); // 个人中心->我的收藏-- wgh
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
.myCenter-myCollect-prepareLesson {
}
</style>
