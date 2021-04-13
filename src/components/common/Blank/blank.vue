<template>
  <!-- 空白页 -->
  <div class="blank" :class="{'blank1':type=='1'}">
    <div class="empty-box">
      <img src="../../../assets/images/icon-empty.svg" alt />
    </div>
    <p class="mt12" :class="{'cur-pointer':type=='1'}" @click="handOperate(listOneInfo)">
      {{blankCont}}
      <i v-if="type=='1'" class="el-icon-caret-right ml8"></i>
    </p>
  </div>
</template>
<script>
export default {
  name: "blank",
  props: ["blankCont", "type","listOneInfo"], //type:1,个人中心我的批注
  components: {},
  data() {
    return {};
  },
  mounted() {},
  updated() {},
  created() {},
  computed: {},
  methods: {
    //点击操作
    handOperate(listOneInfo){
      this.$emit("handOperate",listOneInfo);
    },
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
    }
  }
};
</script>

<style lang="less">
@schoolBaseColor: #00a6ff;
.blank {
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 22px;
  padding: 24px 0;
  width: 100%;
  .empty-box {
    margin: 0px auto 0px auto;
    img {
      width: 110px;
      margin: 0 auto;
    }
  }
}
.blank1 {
  font-size: 14px;
  color: @schoolBaseColor;
  .empty-box {
    margin: 0px auto 0px auto;
    img {
      width: 90px;
    }
  }
}
</style>
