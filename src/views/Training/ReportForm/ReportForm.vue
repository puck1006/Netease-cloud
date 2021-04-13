<template>
  <div class="Interesting-report Interesting-box">
    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">{{itemSelected}}</span>
      </div>
      <div class="cr-head-right">
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
              @click.native="handleToTitle(item)"
              :to="{ path: item.url }"
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
  data() {
    return {
      innerSlider: [
        {
          title: this.$t('Training.form.info[0]'),
          module_id: "115",
          postrole_id: null,
          url: "/Training/ReportForm/TrainingReport"
        },
        {
          title: this.$t('Training.form.info[1]'),
          module_id: "116",
          postrole_id: null,
          url: "/Training/ReportForm/JobStatistics"
        },
        {
          title: this.$t('Training.form.info[2]'),
          module_id: "117",
          postrole_id: null,
          url: "/Training/ReportForm/TeachersReport"
        },
        {
          title: this.$t('Training.form.info[3]'),
          module_id: "118",
          postrole_id: null,
          url: "/Training/ReportForm/OpenCourseReport"
        }
      ],
      itemSelected: {}
    };
  },
  components: {},
  created() {},
  methods: {
    handleToTitle(item) {
      console.log(item);
      this.itemSelected = item.title;
    }
  },
  mounted() {
    const routeName = this.$route.name;
    if (routeName == "JobStatistics") {
      this.itemSelected = this.$t('Training.form.info[0]');
    } else if (routeName == "inTrainingReportdex") {
      this.itemSelected = this.$t('Training.form.info[1]');
    } else if (routeName == "TeachersReport") {
      this.itemSelected = this.$t('Training.form.info[2]');
    } else if (routeName == "OpenCourseReport") {
      this.itemSelected = this.$t('Training.form.info[3]');
    }
  },
  watch: {
    // $route(to, from) {
    //   console.log(to, from);
    // },
    // deep: true,
    // immediate: true
  }
};
</script>
<style lang="less">
.Interesting-report {
}
</style>
