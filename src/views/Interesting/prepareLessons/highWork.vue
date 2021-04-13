<template>
  <div class="Interesting-highWork Interesting-box">
    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <!-- <span class="color-243 fs18">课时1-幼儿初阶美语课程</span> -->
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
            <template v-for="(item, index) in innerSlider">
              <router-link
                :key="index"
                class="page-head__navlist-item"
                tag="div"
                :to="{ path: item.url }"
              >{{ item.title }}</router-link>
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
  name: "Interesting-highWork",
  data() {
    return {
      innerSlider: [
        {
          title: "优秀教学视频",
          module_id: "115",
          postrole_id: null,
          url: `/Interesting/prepareLessons/highWork/highVideo?classcode_branch=${this.$route.query.classcode_branch}&teachplan_id=${this.$route.query.teachplan_id}&teachhour_branch=${this.$route.query.teachhour_branch}`
        },
        {
          title: "优秀教案",
          module_id: "116",
          postrole_id: null,
          url: `/Interesting/prepareLessons/highWork/highLesson?classcode_branch=${this.$route.query.classcode_branch}&teachplan_id=${this.$route.query.teachplan_id}&teachhour_branch=${this.$route.query.teachhour_branch}`
        }
      ]
    };
  },
  components: {},
  created() {
    this.teachplan_id = this.$route.query.teachplan_id;
    this.classcode_branch = this.$route.query.classcode_branch;
    this.teachhour_branch = this.$route.query.teachhour_branch;
  },
  methods: {},
  mounted() {},
  computed: {}
};
</script>
<style lang="less">
@import "../Interesting.less";
.Interesting-highWork {
}
</style>
