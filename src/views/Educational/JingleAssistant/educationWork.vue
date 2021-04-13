<template>
  <div class="Educational-educationWork Educational-box height100">
    <div
      class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7"
    >
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">{{
          $t("Educational.JingleAssistant.educationWork.page_title")
        }}</span>
      </div>
    </div>
    <div class="content-box bg-white flex1 mt8">
      <div class="top-info flex">
        <div class="left mr20">
          <span class="info-icon tc fs22">{{
            $t("Educational.JingleAssistant.educationWork.labe1")
          }}</span>
        </div>
        <div class="right flex1 pt10">
          <p class="fs22 mb24">{{ classInfo.class_cnname }}</p>
          <ul class="fs14">
            <li>
              <p class="color-666">
                {{ $t("Educational.JingleAssistant.educationWork.labe2") }}
              </p>
              <p class="color-4C5">{{ classInfo.course_cnname }}</p>
            </li>
            <li>
              <p class="color-666">
                {{ $t("Educational.JingleAssistant.educationWork.labe3") }}
              </p>
              <p class="color-4C5">{{ classInfo.course_branch }}</p>
            </li>
            <li>
              <p class="color-666">
                {{ $t("Educational.JingleAssistant.educationWork.labe4") }}
              </p>
              <p class="color-4C5">{{ classInfo.school_shortname }}</p>
            </li>
            <li>
              <p class="color-666">
                {{ $t("Educational.JingleAssistant.educationWork.labe5") }}
              </p>
              <p class="color-4C5">{{ classInfo.teachername }}</p>
            </li>
            <li>
              <p class="color-666">
                {{ $t("Educational.JingleAssistant.educationWork.labe6") }}
              </p>
              <p class="color-4C5">{{ classInfo.classroomname }}</p>
            </li>
            <li>
              <p class="color-666">
                {{ $t("Educational.JingleAssistant.educationWork.labe7") }}
              </p>
              <div class="color-4C5 flex-al">
                <div class="out-progress mr12">
                  <div
                    class="inner-progress"
                    :style="{
                      width:
                        Math.floor(
                          (parseInt(classInfo.studentnum) /
                            parseInt(classInfo.class_fullnums)) *
                            100
                        ) + '%'
                    }"
                  ></div>
                </div>
                <span
                  >{{ parseInt(classInfo.studentnum) }}/{{
                    parseInt(classInfo.class_fullnums)
                  }}</span
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 导航栏路由 -->
      <div
        class="flex-all pt10 pb10 pl12 pr12 bg-white height50 flex-warp-line"
      >
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
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>

<script>
import JingleAssistantHttp from "./JingleAssistant";
export default {
  name: "Educational-educationWork",
  data() {
    return {
      innerSlider: [
        {
          title: this.$t(
            "Educational.JingleAssistant.educationWork.innerSliderArr[0]"
          ),
          module_id: "115",
          postrole_id: null,
          url: `/Educational/JingleAssistant/educationWork/classReviews/?class_id=${this.$route.query.class_id}`
        },
        {
          title: this.$t(
            "Educational.JingleAssistant.educationWork.innerSliderArr[1]"
          ),
          module_id: "115",
          postrole_id: null,
          url: `/Educational/JingleAssistant/educationWork/publishWork/?class_id=${this.$route.query.class_id}`
        },
        {
          title: this.$t(
            "Educational.JingleAssistant.educationWork.innerSliderArr[2]"
          ),
          module_id: "115",
          postrole_id: null,
          url: `/Educational/JingleAssistant/educationWork/communicate/?class_id=${this.$route.query.class_id}`
        },
        {
          title: this.$t(
            "Educational.JingleAssistant.educationWork.innerSliderArr[3]"
          ),
          module_id: "116",
          postrole_id: null,
          url: `/Educational/JingleAssistant/educationWork/noticeManage/?class_id=${this.$route.query.class_id}`
        }
      ],
      classInfo: {}
    };
  },
  components: {},
  created() {
    console.log(this.$route.query.class_id, "dddd");
    this.timetableOneApi(); // 单个班级的信息
  },
  methods: {
    // 单个班级的信息
    timetableOneApi() {
      JingleAssistantHttp.timetableOneApi({
        class_id: this.$route.query.class_id
      }).then(res => {
        if (res.data.error == "0") {
          console.log(res.data.result.list);
          this.classInfo = res.data.result.list;
        }
      });
    }
  },
  mounted() {}
};
</script>
<style lang="less">
.Educational-educationWork {
  .top-info {
    padding: 20px 20px 80px 20px;
    background: #f5f7fa;
    .info-icon {
      width: 56px;
      height: 56px;
      line-height: 56px;
      border-radius: 50%;
      color: #fff;
      display: block;
      background: rgba(221, 221, 221, 1);
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 16%;
        line-height: 20px;
        p + p {
          margin-top: 5px;
        }
      }
      .out-progress {
        width: 80px;
        height: 8px;
        background: #dddddd;
        border-radius: 7px;
        .inner-progress {
          height: 8px;
          background: #00a6ff;
          border-radius: 7px;
        }
      }
    }
  }
}
</style>
