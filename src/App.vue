<template>
  <div id="app" :class="isSchoolAffairs ? 'app-school' : 'app-graden'">
    <Nav v-if="showNav">
      <keep-alive>
        <router-view
          v-if="$route.meta.keepAlive && isRouterAlive"
        ></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive && isRouterAlive"></router-view>
    </Nav>
    <template v-else>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </template>
    <permissionDilaog></permissionDilaog>
  </div>
</template>
<script>
import Nav from "@/components/common/Nav/nav.vue";
import permissionDilaog from "@/components/common/permissionDilaog.vue";

export default {
  name: "app",

  provide() {
    return {
      reload: this.reload,
    };
  },

  components: {
    Nav,
    permissionDilaog,
  },
  data() {
    return {
      showNav: false,
      isRouterAlive: true,
    };
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
      if (JSON.stringify(to.query) == "{}") {
        to.meta.keepAlive = true;
        console.log("不带参数的route", to);
      }
      if (to.fullPath.toLowerCase().includes("permission")) {
        this.showNav = false;
      } else {
        this.showNav = true;
      }
    },
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
  computed: {
    isSchoolAffairs() {
      return this.$store.state.isSchoolAffairs;
    },
  },
};
</script>

<style lang="less">
@import url("assets/less/reset.less");
@import url("assets/less/common.less");
@import url("assets/fonts/style.css");
#app {
  // height: 100vh;
  & > .el-container {
    height: 100vh;
  }
  .el-main {
    padding: 0px;
    background-color: #e9f0f2;
  }
}
</style>
