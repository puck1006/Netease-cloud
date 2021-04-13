<template>
  <div class="myCenter-previewComment height100 myCenter-box">
    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">{{courseCnname}}</span>
      </div>
      <div class="cr-head-right flex-al fs14">
        <el-button type="primary" size="mini" @click="handPrint">{{$t('Common.print')}}</el-button>
        <i class="btn-close icon-gb cur-pointer ml10" @click="handBack()"></i>
      </div>
    </div>
    <div class="content-box bg-white mt8" id="preview-print-page">
      <div class="topinfo fs14 tc color-4C5">
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
          )}}{{topInfo.classtime}}
        </span>
      </div>
      <div class="content-list">
        <div
          ref="auto_height_table"
          class="list-div-auto"
          :style="{ height: content_box_height + 'px' }"
        >
          <div class="comment-list pAll16" v-if="previewCommentList.length>0">
            <div class="itemOne" v-for="(item,index) in previewCommentList" :key="index">
              <div class="top flex-all">
                <span class="fs16 color-243">{{item.hour_name}}</span>
              </div>
              <div class="item-cont fs14 color-4C5 pAll16">
                 <template v-if="item.prepare && item.prepare.length>0">
                  <div :class="{'mb12':index!=item.prepare.length-1}" class="flex-sb" v-for="(item1,index1) in item.prepare" :key="index1">
                    <div class="flex">
                      <span>{{item1.teachplan_name}}:</span>
                      <div class="cont flex1 ml4" v-html="item1.prepare_postil"></div>
                    </div>
                  </div>
                </template>
                <!-- 当批注没有时显示，暂时隐藏，不要删除 -->
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
import progressTableCont from "@/components/tables/progressTableCont.vue";
import popTips from "@/components/common/popTips/popTips.vue";
import blank from "@/components/common/Blank/blank.vue";
import httpApi from "./myCenter";
export default {
  name: "myCenter-previewComment",
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
      courseCnname: "", //课程名称
      topInfo: {},
      //我的批注列表
      previewCommentList: [],
      tips: "暂时没有批注哦",
      tips1: "暂无批注，快来记录吧～"
    };
  },
  watch: {},
  computed: {},
  created() {
    this.class_id = this.$route.query.class_id;
    this.course_id = this.$route.query.course_id;
    this.SeePostil(); //个人中心->我的批注->查看批注-- wgh
  },
  methods: {
    //个人中心->我的批注->查看批注-- wgh
    SeePostil() {
      httpApi
        .SeePostil({
          class_id: this.class_id,
          course_id: this.course_id,
          code: "0" //0 预览批注（没有编辑按钮） 1查看批注（有编辑按钮）
        })
        .then(res => {
          this.topInfo=res.data.result.list.class_info;
          this.courseCnname = res.data.result.list.course_cnname;
          if (res.data.error == 0) {
            this.previewCommentList = res.data.result.list.list;
          } else {
            this.previewCommentList = [];
          }
          this.tips = res.data.errortip;
        });
    },
    // 打印
    handPrint() {
      this.$Common.printpage("preview-print-page");
    },
    // 编辑
    handEdit(item) {
      this.showEditPopup = true;
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
.myCenter-previewComment {
}
</style>
