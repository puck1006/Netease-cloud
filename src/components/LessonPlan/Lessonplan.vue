<template>
  <div class="Lessonplan-componet">
    <div class="ppt-img">
      <img
        :src="courseMenuList[LessonImgIndex]?courseMenuList[LessonImgIndex].teachpics_url:''"
        @click="viewImg(courseMenuList[LessonImgIndex].teachpics_url)"
        alt
      />
    </div>
    <div v-if="courseMenuList.length>0" class="ppt-bottom-menu flex-all">
      <div class="left">
        <img @click="handCourseMenu()" src="../../assets/images/Interesting/icon-full-menu.png" alt />
      </div>
      <div class="right">
        <span
          class="right-icon icon-ppt-view mr12"
          @click="viewImg(courseMenuList[LessonImgIndex].teachpics_url)"
        ></span>
        <span
          class="right-icon icon-ppt-prev"
          :class="{'icon-ppt-prev-d':LessonImgIndex==0}"
          @click="prev"
        ></span>
        <span
          class="right-icon icon-ppt-next ml12"
          :class="{'icon-ppt-next-d':LessonImgIndex==(parseInt(courseMenuList.length)-1)}"
          @click="next"
        ></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Lessonplan",
  props: ["courseMenuList", "LessonPlanInfoOneData", "LessonImgIndex"],
  components: {},
  data() {
    return {};
  },
  mounted() {},
  updated() {},
  created() {},
  computed: {},
  methods: {
    // 查看图片
    viewImg(imgurl) {
      window.open(imgurl);
    },
    prev() {
      this.$emit("prev");
    },
    next() {
      this.$emit("next");
    },
    handCourseMenu() {
      this.$emit("handCourseMenu");
    }
  }
};
</script>

<style lang="less">
.Lessonplan-componet {
  position: relative;
  padding-bottom: 40px;
  img {
    width: 100%;
  }
  .ppt-img {
    max-height: 500px;
    overflow-y: auto;
  }
  /*修改滚动条样式*/
  .ppt-img::-webkit-scrollbar {
    width: 5px;
    height: 10px;
    /**/
  }
  .ppt-img::-webkit-scrollbar-track {
    background: #d6d6d6;
    border-radius: 2px;
  }
  .ppt-img::-webkit-scrollbar-thumb {
    background: #efefef;
    border-radius: 10px;
  }
  .ppt-bottom-menu {
    width: 100%;
    height: 40px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #333333;
    padding: 0 32px;
    img {
      width: 20px;
      cursor: pointer;
    }
    .right-icon {
      width: 20px;
      height: 20px;
      display: inline-block;
      cursor: pointer;
    }
    .icon-ppt-view {
      background: url("../../assets/images/Interesting/icon-full-screen.png")
        no-repeat;
      background-size: 100% 100%;
    }
    .icon-ppt-prev {
      background: url("../../assets/images/Interesting/icon-ppt-prev.png")
        no-repeat;
      background-size: 100% 100%;
    }
    .icon-ppt-prev-d {
      background: url("../../assets/images/Interesting/icon-ppt-prev-d.png")
        no-repeat;
      background-size: 100% 100%;
    }
    .icon-ppt-next {
      background: url("../../assets/images/Interesting/icon-ppt-next.png")
        no-repeat;
      background-size: 100% 100%;
    }
    .icon-ppt-next-d {
      background: url("../../assets/images/Interesting/icon-ppt-next-d.png")
        no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
