<template>
  <div class="Educational-report-schoolCenterReport height100">
    <div
      class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7"
    >
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">
          {{ $t("Educational.educationalReport.title2") }}
        </span>
      </div>
    </div>
    <div class="mt8">
      <div class="pAll12 tab_post bg-white">
        <span v-for="(item, index) in innerSlider" :key="index">
          <span
            :class="[
              isActive == item.url ? 'isActive' : 'noActive1',
              noActive,
            ]"
            @click="exchangespost(index,item)"
            >{{ item.title }}</span
          >
          <!-- <span
            v-if="index == 1"
            :class="[isActive == 1 ? 'isActive' : 'noActive1', noActive]"
            @click="exchangespost(index)"
            >{{ item.title }}</span
          >
          <span
            v-if="index == 2"
            :class="[isActive == 2 ? 'isActive' : 'noActive1', noActive]"
            @click="exchangespost(index)"
            >{{ item.title }}</span
          > -->
        </span>
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
  name: "Educational-report-schoolCenterReport",
  components: {},
  data() {
    return {
      isActive: "",
      noActive: "noActive",
      innerSlider: [
        {
          title: "总表",
          module_id: "115",
          postrole_id: null,
          url: "/Educational/report/schoolCenterReport/schoolTaskReport",
        },
        {
          title: "平均值",
          module_id: "115",
          postrole_id: null,
          url: "/Educational/report/schoolCenterReport/averageTaskReport",
        },
        {
          title: "校园平常期电访执行统计表",
          module_id: "115",
          postrole_id: null,
          url: "/Educational/report/schoolCenterReport/normalPhone",
        },
      ],
    };
  },
  created() {
    this.isActive = this.$route.fullPath;
  },
  watch: {},
  computed: {},
  methods: {
    exchangespost(index,item) {
      console.log(index,item);
      if (index == 0) {
        this.isActive = item.url;
        this.$router.push({
          path: "/Educational/report/schoolCenterReport/schoolTaskReport",
        });
      } else if (index == 1) {
        this.isActive = item.url;
        this.$router.push({
          path: "/Educational/report/schoolCenterReport/averageTaskReport",
        });
      } else if (index == 2) {
        this.isActive = item.url;
        this.$router.push({
          path: "/Educational/report/schoolCenterReport/normalPhone",
        });
      }
    },
  },
  mounted() {},
};
</script>

<style lang="less">
.Educational-report-schoolCenterReport {
  .tab_post {
    .noActive,
    .noActive1 {
      display: inline-block;
      height: 36px;
      line-height: 36px;
      color: #aaaaaa;
      cursor: pointer;
      background: #f5f7fa;
      border-radius: 19px;
      text-align: center;
      font-size: 14px;
      padding: 0 10px;
      margin-right: 20px;
    }

    .isActive {
      color: #fff;
      background: #00a6ff;
    }
  }
}
</style>
