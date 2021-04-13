<template>
  <div class="message-messageDetail message-box">
    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">
          {{
          $t("myMessage.page_messageDetail_title")
          }}
        </span>
      </div>
      <div class="cr-head-right">
        <!-- <el-button type="primary" size="mini" @click="addAim">新增招生目标</el-button>
        <i class="btn-close icon-gb ml10" @click="handBack()"></i>-->
      </div>
    </div>
    <div class="content-box bg-white flex1 mt8">
      <div
        ref="auto_height_table"
        class="list-div-auto"
        :style="{ height: content_box_height + 'px' }"
      >
        <div class="message-detil flex" :style="{ height: (content_box_height-80) + 'px' }">
          <div class="left mr12">
            <span
              class="icon icon-xitong"
              :class="{'no-read':!messageDetail.is_read,'icon-tongzhi':messageDetail.message_type=='1'}"
            ></span>
          </div>
          <div class="right fs14">
            <p>
              <span class="color-243">{{messageDetail.message_type_name}}</span>
              <span class="time ml16">{{messageDetail.time}}</span>
            </p>
            <div class="message-small-cont">{{messageDetail.cont}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "message-messageDetail",
  data() {
    return {
      content_box_height: 0,
      messageDetail: {
        message_type: "0", //0是系统通知
        message_type_name: "系统通知",
        time: "2019-10-15  11:50",
        is_read: false, //是否已读
        cont:
          "8-19日19:00发布系统升级，可能短时间内不可使用，请你谅解～，恢复会通知，转采了你的采集app卡片流-app卡片式设计-作品集包装-UI图...到UI卡片；转采了你的采集app卡片流-app卡片式设计-作品集包装-UI图...到UI卡片"
      }
    };
  },
  components: {},
  created() {},
  methods: {
    // 返回关闭
    handBack() {
      this.$router.go(-1);
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
@import "./message.less";
.message-messageDetail {
}
</style>
