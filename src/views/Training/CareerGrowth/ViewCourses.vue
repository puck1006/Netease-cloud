<template>
  <div class="CareerGrowth-index CareerGrowth-viewCourses height100">
    <div
      class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7"
    >
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">{{
          $t("Training.ViewCourses.info[0]")
        }}</span>
      </div>
      <div class="cr-head-right">
        <span>
          {{ $t("Training.ViewCourses.info[1]") }}
          <span style="color: #00a6ff">{{
            $t("Training.ViewCourses.info[0]")
          }}</span>
        </span>
      </div>
    </div>
    <div class="bg-container">
      <div class="body-container" v-if="isReceive">
        <div class="left-container">
          <div class="center-info">
            <div class="ct-head-left flex-al">
              <span class="left-line-orange mr10"></span>
              <span class="color-243 fs18 course">{{
                $t("Training.ViewCourses.info[2]")
              }}</span>
            </div>
            <div class="body-info-container flex">
              <div class="body-left">
                <img
                  :src="course_info.course_img"
                  v-if="course_info.course_img"
                  alt
                />
                <template v-else>
                  <img
                    src="../../../assets/images/crmTeacher.png"
                    v-if="item.career_branch == 'B0106'"
                    alt
                  />
                  <img
                    src="../../../assets/images/master.png"
                    v-if="item.career_branch == 'A0101'"
                    alt
                  />
                  <img
                    src="../../../assets/images/kmcTeacher.png"
                    v-if="item.career_branch == 'E0101'"
                    alt
                  />
                </template>
              </div>
              <div class="body-right">
                <div class="one">{{ course_info.stage_cnname }}</div>
                <div class="two">{{ course_info.course_name }}</div>
                <div class="three">
                  {{ course_info.number
                  }}{{ $t("Training.ViewCourses.info[5]") }}
                </div>
                <div class="collected">
                  <i
                    class="icon-collected collect mr10"
                    v-if="iscollected"
                    @click="handleCollect"
                  ></i>
                  <i
                    class="icon-uncollect collect mr10"
                    v-else
                    @click="handleCollect"
                  ></i>
                  {{ $t("Training.ViewCourses.info[6]") }}
                </div>
                <ul>
                  <li v-html="course_info.course_intro">
                    {{ course_info.course_intro }}
                  </li>
                  <!-- <li>1. {{$t('Training.ViewCourses.info2[1]')}}</li>
                <li>2. {{$t('Training.ViewCourses.info2[2]')}}</li>
                <li>3. {{$t('Training.ViewCourses.info2[3]')}}</li>
                <li>4. {{$t('Training.ViewCourses.info2[4]')}}</li>
                  <li>5. {{$t('Training.ViewCourses.info2[5]')}}</li>-->
                </ul>
              </div>
            </div>
          </div>
          <div class="Course-catalogue">
            <div class="ct-head-left flex-al">
              <span class="left-line-orange mr10"></span>
              <span class="color-243 fs18 course">{{
                $t("Training.ViewCourses.title")
              }}</span>
            </div>
            <infoCard
              :title="item.chapter_name"
              :isshowRight="true"
              v-for="(item, index) in catalogList"
              :key="index"
            >
              <div class="good-course" v-if="item.chapter_name.length != 0">
                <div
                  class="course-container"
                  v-for="(item2, index2) in item.trainhour"
                  :key="index2"
                >
                  <div
                    @click="handleWatchAudio(item2, item)"
                    class="course-item"
                    v-if="item2.trainhour_class == 1"
                  >
                    <div>
                      <i
                        class="my-circle"
                        v-if="
                          !item2.learning_status || item2.learning_status == 0
                        "
                      ></i>
                      <i
                        class="icon-finish"
                        v-if="item2.learning_status == 2"
                      ></i>
                      <i
                        class="icon-jxz1"
                        v-if="item2.learning_status == 1"
                      ></i>
                      <span
                        >课时{{ index2 + 1 }} {{ item2.trainhour_name }}</span
                      >
                    </div>
                    <div>
                      <!-- <span class="time">01:11</span> -->
                      <span class="time">{{ item2.durationNum }}</span>
                      <i class="icon-sound"></i>
                    </div>
                  </div>
                  <div
                    @click="handleWathVideo(item2, item)"
                    class="course-item"
                    v-else-if="item2.trainhour_class == 0"
                  >
                    <div>
                      <i
                        class="my-circle"
                        v-if="
                          !item2.learning_status || item2.learning_status == 0
                        "
                      ></i>
                      <i
                        class="icon-finish"
                        v-if="item2.learning_status == 2"
                      ></i>
                      <i
                        class="icon-jxz1"
                        v-if="item2.learning_status == 1"
                      ></i>
                      <span
                        >课时{{ index2 + 1 }} {{ item2.trainhour_name }}</span
                      >
                    </div>
                    <div>
                      <span class="time">{{ item2.durationNum }}</span>
                      <i class="icon-video"></i>
                    </div>
                  </div>
                  <div
                    @click="handleWatchPPT(item2, item)"
                    class="course-item"
                    v-else-if="item2.trainhour_class == 2"
                  >
                    <div>
                      <i
                        class="my-circle"
                        v-if="item2.learning_status == 0"
                      ></i>
                      <i
                        class="icon-finish"
                        v-if="item2.learning_status == 2"
                      ></i>
                      <i
                        class="icon-jxz1"
                        v-if="item2.learning_status == 1"
                      ></i>
                      <span
                        >课时{{ index2 + 1 }} {{ item2.trainhour_name }}</span
                      >
                    </div>
                    <div>
                      <span class="time">{{ item2.img_num }}页</span>
                      <i class="icon-ppt"></i>
                    </div>
                  </div>
                  <!-- <div
                    @click="handleWatchPPT(item2,item)"
                    class="course-item"
                    v-else
                  >
                    <div>
                      <i class="my-circle" v-if="item2.learning_status == 0"></i>
                      <i class="icon-finish" v-if="item2.learning_status == 2"></i>
                      <i class="icon-jxz1" v-if="item2.learning_status == 1"></i>
                      <span>课时{{index2+1}} {{item2.trainhour_name}}</span>
                    </div>
                    <div>
                      <span class="time">{{item2.img_num}}页</span>
                      <i class="icon-ppt"></i>
                    </div>
                  </div>-->
                </div>
              </div>
            </infoCard>
            <!-- <infoCard title="教学评比优秀课程" :isshowRight="true"></infoCard>
          <infoCard title="教学评比优秀课程" :isshowRight="true">
            <ul class="good-course">
              <li @click="handlecourse1">
                <div>
                  <i class="my-circle"></i>
                  <span>课时1 教学评比优秀课程</span>
                </div>
                <div>
                  <span class="time">01:11</span>
                  <i class="icon-sound"></i>
                </div>
              </li>
              <li>
                <div>
                  <i class="my-circle"></i>
                  <span>课时2 教学评比优秀课程</span>
                </div>
                <div>
                  <span class="time">01:11</span>
                  <i class="icon-video"></i>
                </div>
              </li>
            </ul>
            </infoCard>-->
          </div>
        </div>
        <div class="right-container">
          <infoCard
            style="width: 95%; margin-left: 10px"
            :title="$t('Training.ViewCourses.info[7]')"
          >
            <ul
              class="flex ul-scsb"
              style="height: 60px; line-height: 20px; padding-left: 3%"
            >
              <li style="margin-top: 0">
                <i class="icon-sound"></i>
                <span
                  >{{ $t("Training.ViewCourses.coninfo[0]") }}（{{
                    total[0].audio_num ? total[0].audio_num : 0
                  }}）</span
                >
              </li>
              <li style="margin-top: 0">
                <i class="icon-video"></i>
                <span
                  >{{ $t("Training.ViewCourses.coninfo[1]") }}（{{
                    total[1].video_num ? total[1].video_num : 0
                  }}）</span
                >
              </li>
              <li style="margin-top: 0">
                <i class="icon-ppt"></i>
                <span
                  >{{ $t("Training.ViewCourses.coninfo[2]") }}（{{
                    total[2].ppt_num ? total[2].ppt_num : 0
                  }}）</span
                >
              </li>
            </ul>
          </infoCard>
          <infoCard title="最新学习成员" style="width: 95%; margin-left: 10px">
            <ul class="newPeople">
              <li
                class="people-item"
                v-for="(item, index) in staffer"
                :key="index"
              >
                <img :src="item.staffer_img" v-if="item.staffer_img" alt />
                <img src="@/assets/images/default-new-men.png" v-else alt />
                <div style="font-size: 14px" class="mt5">
                  {{ item.staffer_cnname }}
                </div>
              </li>
            </ul>
          </infoCard>
          <infoCard title="学习动态" style="width: 95%; margin-left: 10px">
            <div class="ul-container">
              <ul class="dynamics">
                <li
                  class="dynamics-item"
                  v-for="(item, index) in dynamic"
                  :key="index"
                >
                  <div class="left-info">
                    <img :src="item.staffer_img" v-if="item.staffer_img" alt />
                    <img src="@/assets/images/default-new-men.png" v-else alt />
                  </div>
                  <div class="right-info">
                    <div class="right-info-title">
                      <span class="name">{{ item.staffer_cnname }}</span>
                      <span class="status">{{
                        $t("Training.ViewCourses.learning")
                      }}</span>
                    </div>
                    <div class="right-info-body">
                      <div>{{ item.course_name }}</div>
                      <div style="color: #b8c3e6">{{ item.dynamic_time }}</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </infoCard>
        </div>
      </div>
      <div class="body-container loading" v-else></div>
      <div id="player-con" v-show="false"></div>
    </div>
  </div>
</template>

<script>
import myCard from "@/components/Training/progressCard.vue";
import infoCard from "@/components/Training/infoCard.vue";
import httpApi from "./CareerGrowth";

export default {
  data() {
    return {
      iscollected: false,
      course_info: {},
      total: [],
      staffer: [],
      dynamic: [],
      catalogList: [],
      isReceive: false,
      isshowDur: false,
      isready: false,
    };
  },
  components: {
    myCard,
    infoCard,
  },
  created() {
    this.CourseCollectAction();
  },
  methods: {
    CourseCollectAction() {
      httpApi
        .CourseCollectAction({
          course_id: this.$route.query.course_id,
        })
        .then((res) => {
          this.SeeCourse();
        });
    },
    handleCollect() {
      let tempNum = 0;
      if (this.iscollected) {
        tempNum = 0;
      } else {
        tempNum = 1;
      }
      httpApi
        .AddCourseCollectAction({
          course_id: this.$route.query.course_id,
          collect_status: tempNum,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.$message({
              message: res.data.errortip,
              type: "success",
            });
            this.iscollected = !this.iscollected;
          } else {
            this.$message({
              message: res.data.errortip,
              type: "error",
            });
          }
        });
    },
    SeeCourse() {
      httpApi
        .SeeCourse({
          course_id: this.$route.query.course_id,
        })
        .then((res) => {
          this.isReceive = true;
          let { catalog, dynamic, list, staffer, total } = res.data.result;
          this.iscollected = list.is_collect;
          this.course_info = list;
          this.total = total;
          this.staffer = staffer;
          this.dynamic = dynamic;

          // this.catalogList = catalog;
          catalog.forEach((item) => {
            item.trainhour.forEach((val, index) => {
              if (val.trainhour_class == 0 || val.trainhour_class == 1) {
                let that = this;
                var audio = new Aliplayer(
                  {
                    id: "player-con",
                    autoplay: false,
                    source: val.trainhour_fileurl,
                  },
                  function (player) {
                    console.log(player);
                    player.on("ready", function () {
                      var s = parseInt(player.getDuration());
                      let timeData =
                        String(Math.floor(s / 60)).padStart(2, 0) +
                        ":" +
                        String(s % 60).padStart(2, 0);
                      val = Object.assign(val, {
                        durationNum: timeData,
                      });
                      that.$nextTick(() => {
                        that.catalogList = catalog;
                      });
                    });
                  }
                );
              } else {
                this.catalogList = catalog;
              }
            });
          });
        });
    },
    handleReset() {
      this.$nextTick(() => {
        this.catalogList = this.catalogList;
      });
    },
    handlecourse1() {
      // this.$message({
      //   message: "上阶段考核合格才可继续学习哦～",
      //   type: "warning"
      // });
      // return false;
    },
    handleWathVideo(item, val) {
      console.log(item, val);
      val.trainhour.forEach((info, index) => {
        if (info.trainhour_id == item.trainhour_id) {
          console.log(index - 1);
          // if (
          //   !item.learning_status &&
          //   val.trainhour[index - 1].learning_status != 2
          // ) {
          // }

          let course_id = this.$route.query.course_id;
          let trainhour_id = item.trainhour_id;
          let chapter_id = val.chapter_id;
          this.$router.push({
            path: `/Training/WatchVideo?course_id=${course_id}&trainhour_id=${trainhour_id}&chapter_id=${chapter_id}`,
          });
        }
      });
    },
    handleWatchPPT(item, val) {
      // if (!item.learning_status) {
      //   this.handlecourse1();
      //   return false;
      // }
      val.trainhour.forEach((info, index) => {
        if (info.trainhour_id == item.trainhour_id) {
          console.log(index - 1);
          if (
            item.learning_status == 0 &&
            index - 1 > 0 &&
            val.trainhour[index - 1].learning_status != 2
          ) {
            // this.handlecourse1();
            // return false;
          } else {
            let course_id = this.$route.query.course_id;
            let trainhour_id = item.trainhour_id;
            let chapter_id = val.chapter_id;

            this.$router.push({
              path: `/Training/WatchPPT?course_id=${course_id}&trainhour_id=${trainhour_id}&chapter_id=${chapter_id}`,
            });
          }
        }
      });
    },
    handleWatchAudio(item, val) {
      // if (!item.learning_status) {
      //   this.handlecourse1();
      //   return false;
      // }
      console.log(item, val);
      val.trainhour.forEach((info, index) => {
        if (info.trainhour_id == item.trainhour_id) {
          console.log(index - 1);
          let course_id = this.$route.query.course_id;
          let trainhour_id = item.trainhour_id;
          let chapter_id = val.chapter_id;
          console.log(item, val);
          this.$router.push({
            path: `/Training/WatchAudio?course_id=${course_id}&trainhour_id=${trainhour_id}&chapter_id=${chapter_id}`,
          });
          // if (
          //   item.learning_status == 0 &&
          //   index - 1 > 0 &&
          //   val.trainhour[index - 1].learning_status != 2
          // ) {
          // } else {
          //   let course_id = this.$route.query.course_id;
          //   let trainhour_id = item.trainhour_id;
          //   let chapter_id = val.chapter_id;
          //   console.log(item, val);
          //   this.$router.push({
          //     path: `/Training/WatchAudio?course_id=${course_id}&trainhour_id=${trainhour_id}&chapter_id=${chapter_id}`
          //   });
          // }
        }
      });
    },
  },
  mounted() {},
};
</script>
<style lang="less">
@import "../Training.less";

.CareerGrowth-viewCourses {
  .bg-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #fff;
  }
  .body-container {
    position: relative;
    display: flex;
  }
}

.collect {
  cursor: pointer;
}
.ul-scsb {
  justify-content: space-around;
}
.loading {
}

.el-alert--warning.is-light {
  color: #ff3569;
  background-color: #f5ecdf !important;
}
</style>
