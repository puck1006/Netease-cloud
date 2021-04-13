<template>
  <div class="Interesting-myClass Interesting-box">
    <div
      class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7"
    >
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">{{
          $t("Interesting.prepareLessons.page_title")
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
      innerSlider: [
        {
          title: this.$t('views.Interesting.prepareLessons.myClass.521kehovqs80'),
          module_id: "115",
          postrole_id: null,
          url: "/Interesting/prepareLessons/processing"
        },
        {
          title: this.$t('views.Interesting.prepareLessons.myClass.521kehovs9o0'),
          module_id: "116",
          postrole_id: null,
          url: "/Interesting/prepareLessons/noStart"
        },
        {
          title: this.$t('views.Interesting.prepareLessons.myClass.521kehovsp00'),
          module_id: "116",
          postrole_id: null,
          url: "/Interesting/prepareLessons/total"
        }
      ]
    };
  },
  components: {},
  created() {},
  methods: {},
  mounted() {}
};
</script>
<style lang="less">
@import "../Interesting.less";
.Interesting-report {
}
</style>
