<template>
  <div class="openclass-card-container" @click="handleWatch">
    <div class="header">
      <img :src="dataInfo.course_img" alt />
    </div>
    <div class="body">
      <div class="left-info">
        <span>{{dataInfo.course_name}}</span>
      </div>
      <div class="right-info">
        <span>{{dataInfo.learn_num}}{{$t('Training.Card.info[0]')}}</span>
      </div>
    </div>
    <div class="footer">
      <div class="footer-left">
        <span>{{$t('Training.Card.info[1]')}}</span>
      </div>
      <div class="footer-right">
        <span v-html="dataInfo.course_intro"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    console.log(this.dataInfo)
  },
  props: ["dataInfo"],
  methods: {
    handleWatch() {
      this.$emit("handleWatch");
    }
  }
};
</script>

<style lang="less">
.openclass-card-container {
  cursor: pointer;
  margin-top: 2%;
  margin-right: 2.3%;
  width: 31%;
  min-height: 42vh;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  .header {
    padding: 10px;
    img {
      margin: 0 auto;
      display: block;
      width: 98%;
      height: 30vh;
    }
  }
  .body {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    border-bottom: 1px solid #dadde9;
    .left-info {
      span {
        width: 130px;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: rgba(36, 53, 106, 1);
        line-height: 22px;
      }
    }
    .right-info {
      span {
        width: 82px;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(138, 150, 188, 1);
        line-height: 22px;
      }
    }
  }
  .footer {
    display: flex;
    padding: 10px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(76, 94, 149, 1);
    line-height: 20px;
    .footer-left {
      flex: 2;
    }
    .footer-right {
      flex: 12;
    }
  }
}
</style>