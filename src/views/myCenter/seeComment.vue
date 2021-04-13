<template>
  <div class="myCenter-seeComment height100 myCenter-box">
    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">{{courseCnname}}</span>
      </div>
      <div class="cr-head-right flex-al fs14">
        <el-button type="warning" size="mini" @click="handPreview">{{$t('Common.preview')}}</el-button>
        <!-- <el-button type="primary" size="mini" @click="handPrint">{{$t('Common.print')}}</el-button> -->
        <i class="btn-close icon-gb cur-pointer ml10" @click="handBack()"></i>
      </div>
    </div>
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
      <div class="content-list" id="preview-print-page">
        <div
          ref="auto_height_table"
          class="list-div-auto"
          :style="{ height: content_box_height + 'px' }"
        >
          <div class="comment-list pAll16" v-if="seeCommentList.length>0">
            <div class="itemOne" v-for="(item,index) in seeCommentList" :key="index">
              <div class="top flex-all">
                <span class="fs16 color-243">{{item.hour_name}}</span>
                <!-- <div v-if="item.prepare" class="btns">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="handEdit(item)"
                  >{{ $t("Common.btn_edit2") }}</el-button>
                </div>-->
              </div>
              <div class="item-cont fs14 color-4C5 pAll16">
                <template v-if="item.prepare && item.prepare.length>0">
                  <div  :class="{'mb12':index!=item.prepare.length-1}" class="flex-sb" v-for="(item1,index1) in item.prepare" :key="index1">
                    <div class="flex">
                      <span>{{item1.teachplan_name}}:</span>
                      <div class="cont flex1 ml4" v-html="item1.prepare_postil"></div>
                    </div>
                    <div v-if="item1.prepare_postil && item1.prepare_postil!=''" class="btns">
                      <el-button
                        type="primary"
                        size="mini"
                        @click="handEdit(item1)"
                      >{{ $t("Common.btn_edit2") }}</el-button>
                    </div>
                  </div>
                </template>

                <!-- 当批注没有时显示，暂时隐藏，不要删除 -->
                <blank
                  v-else
                  :blankCont="tips1"
                  :type="1"
                  :listOneInfo="item"
                  @handOperate="handAdd"
                ></blank>
              </div>
            </div>
          </div>
          <blank v-else :blankCont="tips"></blank>
        </div>
      </div>
    </div>
    <!-- 编辑弹框 -->
    <el-drawer
      :title="OnePostilInfo.hour_name"
      :visible.sync="showEditPopup"
      direction="rtl"
      size="700px"
      :modal="false"
      custom-class="pop-slider--box editAdd-box"
      :before-close="handleClose"
    >
      <div class="slider-btn">
        <el-button type="primary" size="mini" @click="onSubmit">{{$t('Common.btn_save')}}</el-button>
        <el-button type="plain" size="mini" @click="showEditPopup=false">{{$t('Common.btn_cancel')}}</el-button>
      </div>
      <div class="slider-content pAll20">
        <el-form label-width="0px" ref="formData" :model="formData">
          <el-form-item label>
            <el-input
              type="textarea"
              clearable
              :placeholder="$t('myCenter.placeholder5')"
              v-model="formData.cont"
              :autosize="{ minRows: 10, maxRows: 20}"
              style="width:100%"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import progressTableCont from "@/components/tables/progressTableCont.vue";
import popTips from "@/components/common/popTips/popTips.vue";
import blank from "@/components/common/Blank/blank.vue";
import httpApi from "./myCenter";
export default {
  name: "myCenter-seeComment",
  components: {
    progressTableCont,
    popTips,
    blank
  },
  data() {
    return {
      content_box_height: 0,
      showEditPopup: false,
      isEdit: false, //是否编辑批注
      courseCnname: "", //课程名称
      OnePostilInfo: {}, //单个批注信息
      //筛选
      filter: {
        keyword: "" //关键词
      },
      // 侧边弹框表单
      formData: {
        cont: ""
      },
      //我的批注列表
      seeCommentList: [],
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
          code: "1", //0 预览批注（没有编辑按钮） 1查看批注（有编辑按钮）
          // 筛选条件
          keyword: this.filter.keyword
        })
        .then(res => {
          this.courseCnname = res.data.result.list.course_cnname;
          if (res.data.error == 0) {
            this.seeCommentList = res.data.result.list.list;
          } else {
            this.seeCommentList = [];
          }
          this.tips = res.data.errortip;
        });
    },
    //备课->添加/修改个人批注 -- wgh
    PersonPostilAction() {
      httpApi
        .PersonPostilAction({
          class_id: this.class_id,
          course_id: this.course_id,
          prepare_id: this.OnePostilInfo.prepare_id,
          classcode_branch: this.OnePostilInfo.classcode_branch,
          course_branch: this.OnePostilInfo.course_branch,
          hour_lessontimes: this.OnePostilInfo.hour_lessontimes,
          prepare_postil: this.formData.cont, //个人批注
          teachplan_id: this.OnePostilInfo.teachplan_id
        })
        .then(res => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            this.showEditPopup = false;
            this.SeePostil(); //个人中心->我的批注->查看批注-- wgh
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    // 预览
    handPreview() {
      this.$router.push(
        `/myCenter/previewComment?class_id=${this.class_id}&course_id=${this.course_id}`
      );
    },
    // 打印
    handPrint() {
      this.$Common.printpage("preview-print-page");
    },
    // 提交保存
    onSubmit() {
      this.PersonPostilAction(); //备课->添加/修改个人批注 -- wgh
    },
    // 编辑
    handEdit(item) {
      this.isEdit = true;
      this.OnePostilInfo = item;
      this.formData.cont = this.OnePostilInfo.prepare_postil;
      this.showEditPopup = true;
    },
    // 新增添加批注
    handAdd(item) {
      this.isEdit = false;
      this.OnePostilInfo = item;
      this.formData.cont = "";
      this.showEditPopup = true;
    },
    //检索
    search() {
      this.SeePostil(); //个人中心->我的批注->查看批注-- wgh
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
.myCenter-seeComment {
}
</style>
