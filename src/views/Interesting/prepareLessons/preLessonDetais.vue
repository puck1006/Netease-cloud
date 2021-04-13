<template>
  <div class="Interesting-preLessonDetais Interesting-box">
    <div
      class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7"
    >
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18"
          >{{ prepareClassName }} ({{ hour_name }})</span
        >
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
            <template v-for="(item, index) in innerSlider">
              <router-link
                :key="index"
                v-if="
                  item.title != '课件' &&
                  item.title != '课程资料' &&
                  isLessonPlan &&
                  item.teachplan_class == newVal
                "
                class="page-head__navlist-item"
                tag="div"
                :to="{ path: item.url }"
                >{{ item.title }}</router-link
              >
              <router-link
                :key="index"
                v-else-if="item.title != '个性化教案'"
                class="page-head__navlist-item"
                tag="div"
                :to="{ path: item.url }"
                >{{ item.title }}</router-link
              >
            </template>
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
      newVal: "",
      hour_name: "",
      teachplan_class: "",
      innerSlider: [
        {
          title: this.$t(
            "views.Interesting.prepareLessons.preLessonDetais.521kg9bt50c0"
          ),
          module_id: "115",
          postrole_id: null,
          url: `/Interesting/prepareLessons/preLessonDetais/courseWare?class_id=${this.$route.query.class_id}&course_branch=${this.$route.query.course_branch}&hour_lessontimes=${this.$route.query.hour_lessontimes}`,
        },
        {
          title: this.$t(
            "views.Interesting.prepareLessons.preLessonDetais.521kg9bt5ag0"
          ),
          module_id: "116",
          postrole_id: null,
          teachplan_class: 0,
          url: `/Interesting/prepareLessons/preLessonDetais/editLessonPlans?class_id=${this.$route.query.class_id}&course_branch=${this.$route.query.course_branch}&hour_lessontimes=${this.$route.query.hour_lessontimes}`,
        },
        {
          title: this.$t(
            "views.Interesting.prepareLessons.preLessonDetais.521kg9bt5ag0"
          ),
          module_id: "116",
          postrole_id: null,
          teachplan_class: 1,
          url: `/Interesting/prepareLessons/preLessonDetais/lessonPlan?class_id=${this.$route.query.class_id}&course_branch=${this.$route.query.course_branch}&hour_lessontimes=${this.$route.query.hour_lessontimes}`,
        },
        {
          title: this.$t(
            "views.Interesting.prepareLessons.preLessonDetais.521kg9bt5eo0"
          ),
          module_id: "116",
          postrole_id: null,
          url: `/Interesting/prepareLessons/preLessonDetais/materials?class_id=${this.$route.query.class_id}&course_branch=${this.$route.query.course_branch}&hour_lessontimes=${this.$route.query.hour_lessontimes}`,
        },
      ],
    };
  },
  components: {},
  created() {
    this.teachplan_class = this.$Tool.getStorage("teachplan_class");
    this.class_id = this.$route.query.class_id;
    this.course_branch = this.$route.query.course_branch;
    this.hour_lessontimes = this.$route.query.hour_lessontimes;
    this.hour_name = localStorage.getItem("hour_name");

    // this.prepareClassName = this.$Tool.getStorage("prepareClassName")
    //   ? this.$Tool.getStorage("prepareClassName")
    //   : "";
    console.log(this.course_branch);
  },
  methods: {},
  mounted() {
    window.addEventListener("setItem", () => {
      this.newVal = localStorage.getItem("teachplan_class");
      this.hour_name = localStorage.getItem("hour_name");
      console.log(this.newVal);
      console.log("触发了");
    });
  },
  computed: {
    isLessonPlan() {
      return this.$store.state.isLessonPlan;
    },
    prepareClassName() {
      return this.$Tool.getStorage("prepareClassName")
        ? this.$Tool.getStorage("prepareClassName")
        : "";
    },
    // hour_name() {
    //   return this.$Tool.getStorage("hour_name")
    //     ? this.$Tool.getStorage("hour_name")
    //     : "";
    // },
  },
};
</script>
<style lang="less">
@import "../Interesting.less";
.Interesting-preLessonDetais {
}
</style>
