<template>
  <div class="Educational-publishWork">
    <div>
      <div class="pAll12 tab_post">
        <span v-for="(item, index) in innerSlider" :key="index">
          <span
            v-if="index == 0"
            :class="[isActive == 0 ? 'isActive' : 'noActive1', noActive]"
            @click="exchangespost(index)"
            >{{ item.title }}</span
          >
          <span
            v-if="index == 1"
            :class="[isActive == 1 ? 'isActive' : 'noActive1', noActive]"
            @click="exchangespost(index)"
            >{{ item.title }}</span
          >
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
  name: "Educational-publishWork",
  data() {
    return {
      isActive: "",
      noActive: "noActive",
      innerSlider: [
        {
          title: this.$t("Educational.JingleAssistant.educationWork.child2.aa"),
          module_id: "115",
          postrole_id: null,
          url:
            "/Educational/JingleAssistant/educationWork/publishWork/sendWork"
        },
        {
          title: this.$t("Educational.JingleAssistant.educationWork.child2.ab"),
          module_id: "115",
          postrole_id: null,
          url:
            "/Educational/JingleAssistant/educationWork/publishWork/alreadyWork"
        }
      ]
    };
  },
  components: {
    // normalTableCont
  },
  created() {
    console.log(this.$route.path);
    if (
      this.$route.path ==
      `/Educational/JingleAssistant/educationWork/publishWork/sendWork/?class_id=${this.$route.query.class_id}`
    ) {
      this.isActive = 0;
    } else if (
      this.$route.path ==
      `/Educational/JingleAssistant/educationWork/publishWork/alreadyWork/?class_id=${this.$route.query.class_id}`
    ) {
      this.isActive = 1;
    }
  },
  methods: {
    //切换
    exchangespost(index) {
      console.log(index);
      if (index == 0) {
        this.isActive = 0;
        this.$router.push({
          path: `/Educational/JingleAssistant/educationWork/publishWork/sendWork/?class_id=${this.$route.query.class_id}`
        });
      } else if (index == 1) {
        this.isActive = 1;
        this.$router.push({
          path: `/Educational/JingleAssistant/educationWork/publishWork/alreadyWork/?class_id=${this.$route.query.class_id}`
        });
      }
    }
  },
  mounted() {}
};
</script>

<style lang="less">
.Educational-publishWork {
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
