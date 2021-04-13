<template>
  <div class="Educational-myClass height100">
    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">{{$t("Educational.circulateRegistrat.my_class")}}</span>
      </div>
      <div class="cr-head-right fs12">
        <!-- <span>{{$t("Common.header.nav_name3")}}</span>><span>{{$t("Educational.circulateRegistrat.title")}}</span>><span class="color-blue">{{$t("Educational.circulateRegistrat.my_class")}}</span> -->
        <!-- <el-button type="primary" size="mini" @click="addAim">新增招生目标</el-button> -->
      </div>
    </div>
    <div class="content-box bg-white flex1 mt8">
      <!-- 导航栏路由 -->
      <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 flex-warp-line">
        <div class="ct-head-left flex-al">
          <div class="page-head__navlist">
            <router-link
              v-for="(item, index) in innerSlider"
              :key="index"
              class="page-head__navlist-item"
              tag="div"
              :to="{path: item.url}"
            >{{ item.title }}</router-link>
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
  name: "Educational-myClass",
  data() {
    return {
      innerSlider: [
        {
          title: "进行中",
          module_id: "115",
          postrole_id: null,
          url: "/Educational/JingleAssistant/myClasslist/onProgress"
        },
        {
          title: "未开始",
          module_id: "116",
          postrole_id: null,
          url: "/Educational/JingleAssistant/myClasslist/notStarted"
        },
        {
          title: "全部",
          module_id: "117",
          postrole_id: null,
          url: "/Educational/JingleAssistant/myClasslist/total"
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
.Educational-myClass {
}
</style>
