<template>
  <div class="small-dialog popTips" v-if="dialogVisable">
    <el-dialog
      :title="popTipsCont.title"
      :visible="dialogVisable"
      width="500px"
      @close="handleCloseTip()"
      :modal-append-to-body="false"
    >
      <div class="dialog-content">
        <span>{{ popTipsCont.context }}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="handConfirm">{{
          popTipsCont.btn_text1
        }}</el-button>
        <el-button
          size="mini"
          @click="handCancel"
          v-if="popTipsCont.btn_text2"
          >{{ popTipsCont.btn_text2 }}</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "popTips",
  props: ["dialogVisable", "popTipsCont"],
  components: {},
  data() {
    return {};
  },
  mounted() {},
  updated() {},
  created() {},
  computed: {},
  methods: {
    // 关闭弹框
    handleCloseTip() {
      this.$emit("handleCloseTip");
    },
    // 确定*****提交
    handConfirm() {
      this.$emit("handConfirm");
    },
    // 取消
    handCancel() {
      this.$emit("handCancel");
    },
  },
};
</script>

<style lang="less">
.small-dialog {
  z-index: 9999;
}
</style>
