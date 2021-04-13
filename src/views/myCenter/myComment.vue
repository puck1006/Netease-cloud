<template>
  <div class="myCenter-myComment height100 myCenter-box">
    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">
          {{$t(
          'myCenter.page_myComment_title'
          )}}
        </span>
      </div>
      <div class="cr-head-right"></div>
    </div>
    <div class="content-box bg-white mt8">
      <div class="flex-wrap pt12 flex-warp-line pl12 pr12">
        <div class="flex-al Inquire-box mb12">
          <div class="ipt-box" style="width:320px;">
            <el-input
              v-model="filter.keyword"
              clearable
              :placeholder="$t('myCenter.placeholder1')"
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
          <div class="class-list" v-if="myCommentList.length>0">
            <div class="itemOne" v-for="(item,index) in myCommentList" :key="index">
              <div class="top flex-all pl16 pr16">
                <span class="fs16 color-243">
                  {{item.class_cnname}}
                  <span
                    v-if="item.class_status=='1'"
                    class="status status1 fs12 ml8"
                  >
                    {{$t(
                    'myCenter.labe_text1'
                    )}}
                  </span>
                  <!-- 两种状态---暂时注释 -->
                  <span v-else class="status status2 fs12 ml8">
                    {{$t(
                    'myCenter.labe_text2'
                    )}}
                  </span>
                </span>
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
                <div class="person progress flex-al">
                  {{$t(
                  'myCenter.labe_text6'
                  )}}
                  <div class="out-progress">
                    <div
                      class="inner-progress"
                      :style="{
                        width:
                          parseInt(item.class_fullnums.split('/')[0]) >
                          parseInt(item.class_fullnums.split('/')[1])
                            ? item.class_fullnums.split('/')[1]
                            : (item.class_fullnums.split('/')[0] /
                                item.class_fullnums.split('/')[1]) *
                                100 +
                              '%'
                      }"
                    ></div>
                  </div>
                  <span class="ml5">{{ item.class_fullnums }}</span>
                </div>
              </div>
              <div class="item-bottom tr">
                <el-button
                  type="primary"
                  size="mini"
                  class="fs14"
                  @click="handSee(item)"
                >{{ $t("Common.btn_see_comment") }}</el-button>
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
import httpApi from "./myCenter";
export default {
  name: "myCenter-myComment",
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
      //我的批注列表
      myCommentList: [],
      tips: "暂时没有批注哦",
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
    this.getPostil(); //个人中心->我的批注-- wgh
  },
  methods: {
    //个人中心->我的批注-- wgh
    getPostil() {
      httpApi
        .getPostil({
          is_count: "1", //是否需要总数，可以不传
          p: this.paging.curPage,
          num: this.paging.pageSize,
          // 筛选条件
          keyword: this.filter.keyword
        })
        .then(res => {
          this.paging.pageTotal = parseInt(res.data.result.allnum);
          if (res.data.error == 0) {
            this.myCommentList = res.data.result.list;
          } else {
            this.myCommentList = [];
          }
          this.tips = res.data.errortip;
        });
    },
    //检索
    search() {
      this.paging.curPage = 1;
      this.getPostil(); //个人中心->我的批注-- wgh
    },
    // 查看批注
    handSee(item) {
      this.$router.push(`/myCenter/seeComment?class_id=${item.class_id}&course_id=${item.course_id}`);
    },
    // 重置表单
    resetForm(form) {
      this.$refs[form].resetFields();
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.getPostil(); //个人中心->我的批注-- wgh
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.getPostil(); //个人中心->我的批注-- wgh
    },
    handleClose(done) {
      done();
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs["auto_height_table"]) {
        this.content_box_height = this.$Tool.getTableHeight(
          this.$refs.auto_height_table.getBoundingClientRect().top + 50
        );
      }
    });
  }
};
</script>

<style lang="less">
@import "./myCenter";
.myCenter-myComment {
}
</style>
