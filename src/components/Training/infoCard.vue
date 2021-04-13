<template>
  <div class="infoCard-container">
    <div class="container">
      <div class="title">
        <div class="flex-all pt10 pb10 pl12 pr12">
          <div class="ct-head-left flex-al">
            <span class="left-line-orange mr10"></span>
            <span class="color-243 fs18 title-info">{{title}}</span>
          </div>
          <div
            class="cr-head-right"
            style="margin-right:5px"
            v-if="isshowRight"
            @click="handleToggle"
            :class="{isDown:!isshowBody}"
          >
            <span class="icon-icon_arrow icon-css"></span>
            <!-- <span class="icon-icon_arrow icon-css"></span> -->
            <!-- <span class="icon-icon_arrow"></span> -->
          </div>
        </div>
      </div>
      <div class="body" v-if="isshowBody || !isshowRight">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "isshowRight"],
  data() {
    return {
      isshowBody: false
    };
  },
  methods: {
    handleToggle() {
      this.isshowBody = !this.isshowBody;
    }
  }
};
</script>

<style lang="less">
.container {
  // min-width: 486px;
  border: 1px solid #dadde9;
  margin-top: 20px;
  .title {
    height: 80px;
    background-color: #f9fcff;
    align-items: center;
    line-height: 60px;
    .title-info {
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(36, 53, 106, 1);
      line-height: 22px;
    }
    .flex-all {
      height: 100%;
    }
  }
  .body {
    background: #fff;
    border-bottom: 1px solid #dadde9;
  }
  .ct-head-left {
  }

  .icon-css {
    cursor: pointer;
  }
  .isDown {
    transform: rotate(180deg);
  }
}
</style>