<template>
  <div id="Educational-parentAssess" class="height100">
    <div
      class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7"
    >
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-333 fs18">{{
          $t("Educational.JingleAssistant.parentAssess.ac")
        }}</span>
      </div>
      <div class="cr-head-right fs14">
        <el-button type="primary" size="mini">{{
          $t("Common.export")
        }}</el-button>
      </div>
    </div>
    <div class="body mt8 bg-white flex1">
      <!-- 导航栏路由 -->
      <div
        class="flex-all pt10 pb10 pl12 pr12 bg-white height50 flex-warp-line"
      >
        <div class="ct-head-left flex-al">
          <div class="page-head__navlist">
            <router-link
              v-for="(item, index) in innerSlider"
              :key="index"
              class="page-head__navlist-item"
              tag="div"
              :to="{ path: item.url }"
              >{{ item.title }}</router-link
            >
          </div>
        </div>
        <div class="cr-head-right">
          <!-- <el-button type="primary" size="mini" @click="Clickexport">导出</el-button> -->
        </div>
      </div>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "Educational-parentAssess",
  data() {
    return {
      innerSlider: [
        {
          title: this.$t("Educational.JingleAssistant.parentAssess.ad"),
          module_id: "115",
          postrole_id: null,
          url: "/Educational/JingleAssistant/parentAssess/assessQuery"
        },
        {
          title: this.$t("Educational.JingleAssistant.parentAssess.ae"),
          module_id: "116",
          postrole_id: null,
          url: "/Educational/JingleAssistant/parentAssess/teacherCheck"
        }
      ]
    };
  },
  components: {},
  methods: {},
  mounted() {}
};
</script>
<style lang="less">
#Educational-parentAssess {
  position: relative;
  .flex-warp-line {
    border-bottom: 1px solid rgba(221, 221, 221, 1);
  }
}
</style>
