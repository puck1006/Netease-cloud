<template>
  <div class="Interesting-report Interesting-box">
    <div
      class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7"
    >
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">{{
          $t("Interesting.report.page_title")
        }}</span>
      </div>
      <div class="cr-head-right">
        <!-- <el-button type="primary" size="mini" @click="addAim">新增招生目标</el-button> -->
      </div>
    </div>
    <div class="content-box bg-white flex1 mt8">
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
        <div class="cr-head-right"></div>
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
  name: "Interesting-report",
  data() {
    return {
      innerSlider: [],
    };
  },
  components: {},
  created() {
    if (
      this.$userDetails.account_class == 1 ||
      this.$Tool.getStorage("postpart_isteregulator") == 1
    ) {
      this.innerSlider = [
        {
          title: this.$t("views.Interesting.Report.report.521kh1xeq8o0"),
          module_id: "115",
          postrole_id: null,
          url: "/Interesting/report/campusReport",
        },
        {
          title: this.$t("views.Interesting.Report.report.521kh1xer5k0"),
          module_id: "116",
          postrole_id: null,
          url: "/Interesting/report/teacherReport",
        },
      ];
    } else {
      this.innerSlider = [
        {
          title: this.$t("views.Interesting.Report.report.521kh1xer5k0"),
          module_id: "116",
          postrole_id: null,
          url: "/Interesting/report/teacherReport",
        },
      ];
    }
  },
  methods: {},
  mounted() {},
};
</script>
<style lang="less">
@import "../Interesting.less";
.Interesting-report {
}
</style>
