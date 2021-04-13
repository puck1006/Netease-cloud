<template>
  <div class="myCenter-previewNote height100 myCenter-box">
    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">{{stageCnname}}</span>
      </div>
      <div class="cr-head-right flex-al fs14">
        <el-button type="primary" size="mini" @click="handPrint">{{$t('Common.print')}}</el-button>
        <i class="btn-close icon-gb cur-pointer ml10" @click="handBack()"></i>
      </div>
    </div>
    <div class="content-box bg-white mt8" id="preview-print-page">
      <!-- 暂时隐藏 -->
      <!-- <div class="topinfo fs14 tc color-4C5">
        <span>
          {{$t(
          'Interesting.preLessonDetais.topInfoList[0]'
          )}}{{topInfo.class_cnname}}
        </span>
        <span>
          {{$t(
          'Interesting.preLessonDetais.topInfoList[1]'
          )}}{{topInfo.staffer_cnname}}
        </span>
        <span>
          {{$t(
          'Interesting.preLessonDetais.topInfoList[2]'
          )}}{{topInfo.class_timestr}}
        </span>
      </div> -->
      <div class="content-list">
        <div
          ref="auto_height_table"
          class="list-div-auto"
          :style="{ height: content_box_height + 'px' }"
        >
          <div class="comment-list pAll16" v-if="seeNoteList.length>0">
            <div class="itemOne" v-for="(item,index) in seeNoteList" :key="index">
              <div class="top flex-all">
                <span class="fs16 color-243">{{item.trainhour_name}}</span>
              </div>
              <div class="item-cont fs14 color-4C5 pAll16">
                <div
                  v-if="item.learning_note!=null && item.learning_note!=''"
                  class="cont"
                  v-html="item.learning_note"
                ></div>
                <!-- 当笔记没有时显示，暂时隐藏，不要删除 -->
                <blank v-else :blankCont="tips1" :type="1"></blank>
              </div>
            </div>
          </div>
          <blank v-else :blankCont="tips"></blank>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import progressTableCont from "@/components/tables/progressTableCont.vue";
// import popTips from "@/components/common/popTips/popTips.vue";
import blank from "@/components/common/Blank/blank.vue";
import httpApi from "./myCenter";
export default {
  name: "myCenter-previewNote",
  components: {
    // progressTableCont,
    // popTips,
    blank
  },
  data() {
    return {
      content_box_height: 0,
      stageCnname: "", //课程名称
      OneNoteInfo: {}, //单个笔记信息
      //筛选
      filter: {
        keyword: "" //关键词
      },
      topInfo: {
        class_cnname: "幼儿初阶班一级Ａ班2019",
        staffer_cnname: "林国栋",
        class_timestr: "2019-10-01  16:00-17:30"
      },
      //我的笔记列表
      seeNoteList: [],
      tips: "暂时没有笔记哦",
      tips1: "暂无笔记，快来记录吧～"
    };
  },
  watch: {},
  computed: {},
  created() {
    this.stage_id = this.$route.query.stage_id;
    this.LookNote(); //个人中心->我的笔记->查看笔记-- wgh
  },
  methods: {
    //个人中心->我的笔记->查看笔记-- wgh
    LookNote() {
      httpApi
        .LookNote({
          stage_id: this.stage_id,
          code: "1", //0 预览笔记（没有编辑按钮） 1查看笔记（有编辑按钮）
          // 筛选条件
          keyword: this.filter.keyword
        })
        .then(res => {
          this.stageCnname = res.data.result.stage;
          if (res.data.error == 0) {
            this.seeNoteList = res.data.result.list;
          } else {
            this.seeNoteList = [];
          }
          this.tips = res.data.errortip;
        });
    },
    // 打印
    handPrint() {
      this.$Common.printpage("preview-print-page");
    },
    //检索
    search() {
      this.paging.curPage = 1;
    },
    // 重置表单
    resetForm(form) {
      this.$refs[form].resetFields();
    },
    // 返回关闭
    handBack() {
      this.$router.go(-1);
    },
    handleClose(done) {
      done();
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs["auto_height_table"]) {
        this.content_box_height = this.$Tool.getTableHeight(
          this.$refs.auto_height_table.getBoundingClientRect().top
        );
      }
    });
  }
};
</script>

<style lang="less">
@import "./myCenter";
.myCenter-previewNote {
}
</style>
