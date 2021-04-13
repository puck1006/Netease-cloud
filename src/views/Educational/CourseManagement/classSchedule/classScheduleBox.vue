<template>
  <div id="classScheduleBox" class="course-comm classSchedule--Box height100">
    <div
      class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7"
    >
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">课程表</span>
      </div>
    </div>
    <div class="subject-box content-box bg-white flex1 mt8">
        <div class="content">
          <div class="bg-white">
            <div class="course-datail text-1 font-333">
              <div class="page-tab--box">
                <div class="tab-nav">
                  <router-link
                    class="item"
                    :to="{path: '/Educational/classSchedule/teacherSchedule'}"
                  >教师课表</router-link>
                  <router-link
                    class="item"
                    :to="{path: '/Educational/classSchedule/classDetails'}"
                  >教师详情课表</router-link>
                  <router-link
                    class="item"
                    :to="{path: '/Educational/classSchedule/report'}"
                  >教师空闲时间段检索</router-link>
                </div>
              </div>
            </div>
          <keep-alive>
        <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      </keep-alive>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "classScheduleBox",
  data() {
    return {
      // 切换栏 显示按钮
      showBtns: "",
      isClassCheck: false
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  components: {
    // PageNav
  },
  created() {
    console.log(this.$store.state.USER_TOKEN, this.$store.state.Slider);
    this.slider = this.$store.state.Slider;
  },
  mounted() {},
  methods: {
    checkClass() {
      // isClassCheck
    }
  },
  computed: {
    innerSlider() {
      return this.$store.state.INNER_SLIDER;
    }
  }
};
</script>
<style lang="less">
@import url("classSchedule.less");
</style>
