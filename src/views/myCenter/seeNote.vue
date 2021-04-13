<template>
  <div class="myCenter-seeNote height100 myCenter-box">
    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">{{stageCnname}}</span>
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
          <div class="comment-list pAll16" v-if="seeNoteList.length>0">
            <div class="itemOne" v-for="(item,index) in seeNoteList" :key="index">
              <div class="top flex-all">
                <span class="fs16 color-243">{{item.trainhour_name}}</span>
                <div v-if="item.learning_note!=null && item.learning_note!=''" class="btns">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="handEdit(item)"
                  >{{ $t("Common.btn_edit2") }}</el-button>
                </div>
              </div>
              <div class="item-cont fs14 color-4C5 pAll16">
                <div
                  v-if="item.learning_note!=null && item.learning_note!=''"
                  class="cont"
                  v-html="item.learning_note"
                ></div>
                <!-- 当笔记没有时显示，暂时隐藏，不要删除 -->
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
      :title="OneNoteInfo.trainhour_name"
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
// import progressTableCont from "@/components/tables/progressTableCont.vue";
// import popTips from "@/components/common/popTips/popTips.vue";
import blank from "@/components/common/Blank/blank.vue";
import httpApi from "./myCenter";
export default {
  name: "myCenter-seeNote",
  components: {
    // progressTableCont,
    // popTips,
    blank
  },
  data() {
    return {
      content_box_height: 0,
      showEditPopup: false,
      isEdit: false, //是否编辑笔记
      stageCnname: "", //课程名称
      OneNoteInfo: {}, //单个笔记信息
      //筛选
      filter: {
        keyword: "" //关键词
      },
      // 侧边弹框表单
      formData: {
        cont: ""
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
    //培训->添加/编辑个人笔记 -- wgh
    PersonNoteAction() {
      httpApi
        .PersonNoteAction({
          stage_id: this.stage_id,
          course_id: this.OneNoteInfo.course_id,
          chapter_id: this.OneNoteInfo.chapter_id,
          trainhour_id: this.OneNoteInfo.trainhour_id,
          learning_note: this.formData.cont, //个人笔记
          learning_id: this.OneNoteInfo.learning_id
        })
        .then(res => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            this.showEditPopup = false;
            this.LookNote(); //个人中心->我的笔记->查看笔记-- wgh
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    // 预览
    handPreview() {
      this.$router.push(`/myCenter/previewNote?stage_id=${this.stage_id}`);
    },
    // 打印
    handPrint() {
      this.$Common.printpage("preview-print-page");
    },
    // 提交保存
    onSubmit() {
      this.PersonNoteAction(); //培训->添加/编辑个人笔记 -- wgh
    },
    // 编辑
    handEdit(item) {
      this.isEdit = true;
      this.OneNoteInfo = item;
      this.formData.cont = this.OneNoteInfo.learning_note;
      this.showEditPopup = true;
    },
    // 新增添加笔记
    handAdd(item) {
      this.isEdit = false;
      this.OneNoteInfo = item;
      this.formData.cont = "";
      this.showEditPopup = true;
    },
    //检索
    search() {
      this.LookNote(); //个人中心->我的笔记->查看笔记-- wgh
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
.myCenter-seeNote {
}
</style>
