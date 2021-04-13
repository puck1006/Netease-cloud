<template>
  <div class="Educational-noticemanage Educational-box">
    <div
      class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7"
    >
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">{{
          $t("Educational.JingleAssistant.noticeManage.page_title")
        }}</span>
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
  name: "Educational-noticemanage",
  data() {
    return {
      innerSlider: [
        {
          title: this.$t(
            "Educational.JingleAssistant.noticeManage.innerSliderArr[0]"
          ),
          module_id: "115",
          postrole_id: null,
          url: "/Educational/JingleAssistant/noticeManage/notification"
        },
        {
          title: this.$t(
            "Educational.JingleAssistant.noticeManage.innerSliderArr[1]"
          ),
          module_id: "116",
          postrole_id: null,
          url: "/Educational/JingleAssistant/noticeManage/announcement"
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
.Educational-homeworkManage {
}
</style>
