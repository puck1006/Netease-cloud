<template>
  <div class="Educational-viewCheckDetails height100">
    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7 mb8">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">{{
          $t("Educational.checkStatusrouter.viewCheckDetails")
        }}</span>
      </div>
      <div class="cr-head-right fs12">
        <div class="right-btn fs14 mt10">
          <!-- <el-button type="warning" size="mini" class="fs14">打印</el-button>
          <el-button type="primary" size="mini" class="fs14">导出</el-button> -->
          <i class="btn-close icon-gb ml10" @click="handBack()"></i>
        </div>
      </div>
    </div>
    <div class="height100" style="background-color: #f9fcff">
      <div class="class-list">
        <div class="title mAll16 tc fs16 color-243">班级: {{ infoObj.class_cnname }}</div>
        <div class="title mAll16 tc fs14 color-8A9">
          <span class="pr8">班级: {{ infoObj.class_cnname }}</span>
          <span class="pr8">课时: {{ infoObj.hour_name }}</span>
          <span>学生: {{ infoObj.student_cnname }}</span>
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
                :to="{ path: item.url }"
                >{{ item.title }}</router-link
              >
            </div>
          </div>
          <div class="cr-head-right"></div>
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
</template>

<script>
import eduHttp from "../Educational.js";

export default {
  name: "Educational-viewCheckDetails",
  data() {
    return {
      infoObj: {},
      innerSlider: [
        {
          title: "课时教务",
          module_id: "118",
          postrole_id: null,
          url: `/Educational/viewCheckDetails/classTeaching?hour_id=${this.$route.query.hour_id}&class_id=${this.$route.query.class_id}&student_id=${this.$route.query.student_id}`,
        },
        {
          title: "平常期教务",
          module_id: "119",
          postrole_id: null,
          url: `/Educational/viewCheckDetails/commonTeaching?hour_id=${this.$route.query.hour_id}&class_id=${this.$route.query.class_id}&student_id=${this.$route.query.student_id}`,
        },
      ],
    };
  },
  components: {},
  created() {
    this.getHourcheckOneApi();
  },
  methods: {
    getHourcheckOneApi() {
      eduHttp
        .getHourcheckOneApi({
          hour_id: this.$route.query.hour_id,
          class_id: this.$route.query.class_id,
          student_id: this.$route.query.student_id,
        })
        .then((res) => {
          this.infoObj = res.data.result.info;
        });
    },
    handBack() {
      this.$router.push({
        path: `/Educational/viewCheckStatus?class_id=${this.$route.query.class_id}`,
      });
    },
  },
  mounted() {},
};
</script>
<style lang="less">
.Educational-viewCheckDetails {
}
</style>
