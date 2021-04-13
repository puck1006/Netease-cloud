<template>
  <div class="message-messagePage message-box">
    <!-- <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">
          {{
          $t("message.page_messagePage_title")
          }}
        </span>
      </div>
      <div class="cr-head-right">
        <el-button type="primary" size="mini" @click="addAim">新增招生目标</el-button>
        <i class="btn-close icon-gb ml10" @click="handBack()"></i>
      </div>
    </div>-->
    <!-- 导航栏路由 -->
    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 flex-warp-line">
      <div class="ct-head-left flex-al">
        <div class="page-head__navlist">
          <router-link
            v-for="(item, index) in innerSlider"
            :key="index"
            class="page-head__navlist-item"
            tag="div"
            :to="{ path: item.url }"
          >{{ item.title }}</router-link>
        </div>
      </div>
      <div class="cr-head-right"></div>
    </div>
    <div class="content-box bg-white flex1 mt8">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "message-messagePage",
  data() {
    return {
      innerSlider: [
        {
          title: "全部消息",
          module_id: "115",
          postrole_id: null,
          url: "/message/total"
        },
        {
          title: "通知消息",
          module_id: "116",
          postrole_id: null,
          url: "/message/notice"
        },
        {
          title: "系统消息",
          module_id: "116",
          postrole_id: null,
          url: "/message/system"
        }
      ]
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
  mounted() {}
};
</script>
<style lang="less">
@import "./message.less";
.message-messagePage {
}
</style>
