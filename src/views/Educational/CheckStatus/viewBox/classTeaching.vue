<template>
  <div class="Educational-classTeaching">
    <div class="content-box bg-white flex1 mt8 flex">
      <div class="online ml10">
        <div class="ct-head-left flex-al mt12 ml10">
          <span class="left-line-orange mr10"></span>
          <span class="color-333 fs14">{{ $t("Educational.checkStatusrouter.classTeaching.online") }}</span>
        </div>
        <div class="text-content">
          <div class="title">
            <div class="circle"></div>
            <span class="fs16 color-243">{{ $t("Educational.checkStatusrouter.classTeaching.homework_finish") }}</span>
          </div>
          <div class="content fs14 color-4C5">
            {{ $t("Educational.checkStatusrouter.classTeaching.homework_finish") }}:
            <div class="progress-au dsplay ml8 mr8">
              <div class="out-progress">
                <div
                  class="inner-progress"
                  :style="{
                    width: (onlineObj.finish_rate || 0) + '%',
                  }"
                ></div>
              </div>
            </div>
            <span>{{ onlineObj.finish_num }}/{{ onlineObj.all_num }}</span>
            | {{ onlineObj.finish_rate || 0 }}%
          </div>
        </div>
        <div class="text-content">
          <div class="title">
            <div class="circle"></div>
            <span class="fs16 color-243">{{ $t("Educational.checkStatusrouter.classTeaching.record_course") }}</span>
          </div>
          <div class="content fs14 color-4C5">{{ $t("Educational.checkStatusrouter.classTeaching.course_watch") }}: {{ onlineObj.video_course }}{{ $t("Educational.checkStatusrouter.classTeaching.ci") }}</div>
        </div>
        <div class="text-content">
          <div class="title">
            <div class="circle"></div>
            <span class="fs16 color-243">{{ $t("Educational.checkStatusrouter.classTeaching.online_score") }}</span>
          </div>
          <div class="content fs14 color-4C5">{{ $t("Educational.checkStatusrouter.classTeaching.online_score") }}:{{ onlineObj.check_score }}</div>
        </div>
        <div class="text-content">
          <div class="title">
            <div class="circle"></div>
            <span class="fs16 color-243">{{ $t("Educational.checkStatusrouter.classTeaching.dub_rate") }}</span>
          </div>
          <div class="content fs14 color-4C5">
            {{ $t("Educational.checkStatusrouter.classTeaching.dub_rate") }}:
            <div class="progress-au dsplay ml8 mr8">
              <div class="out-progress">
                <div
                  class="inner-progress"
                  :style="{
                    width: (onlineObj.radio_rate || 0) + '%',
                  }"
                ></div>
              </div>
            </div>
            <span>{{ onlineObj.radio_finishnum }}/{{ onlineObj.radio_allnum }}</span>
            | {{ onlineObj.radio_rate || 0 }}%
          </div>
        </div>
        <div class="text-content">
          <div class="title">
            <div class="circle"></div>
            <span class="fs16 color-243">{{ $t("Educational.checkStatusrouter.classTeaching.teacher_word") }}</span>
          </div>
          <div class="content fs14 color-4C5">
            {{ $t("Educational.checkStatusrouter.classTeaching.teacher_word") }}
            :{{ onlineObj.hour_mark }}
          </div>
          <div class="content fs14 color-4C5">
            {{ $t("Educational.checkStatusrouter.classTeaching.parent_word") }}
            :{{ onlineObj.hour_member_note }}
          </div>
        </div>
        <div class="text-content">
          <div class="title">
            <div class="circle"></div>
            <span class="fs16 color-243">{{ $t("Educational.checkStatusrouter.classTeaching.parent_servey") }}</span>
          </div>
          <div class="content fs14 color-4C5">
            {{ $t("Educational.checkStatusrouter.classTeaching.parent_servey") }}:
            <el-rate class="dsplay ml12" v-model="onlineObj.report_star" disabled score-template="{value}" :icon-classes="['icon-manyi', 'icon-manyi', 'icon-manyi']" void-icon-class="icon-bmanyi" disabled-void-icon-class="icon-bmanyi" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
          </div>
          <i class="mh-start_filled"></i>
        </div>
      </div>
      <div class="offline">
        <div class="ct-head-left flex-al mt12 ml10">
          <span class="left-line-orange mr10"></span>
          <span class="color-333 fs14">{{ $t("Educational.checkStatusrouter.classTeaching.offline") }}</span>
        </div>
        <div class="text-content">
          <div class="title">
            <div class="circle"></div>
            <span class="fs16 color-243">{{ $t("Educational.checkStatusrouter.classTeaching.offline_test") }}</span>
          </div>
          <div class="content fs14 color-4C5">{{ $t("Educational.checkStatusrouter.classTeaching.offline_test") }}:{{ offlineObj.hour_testscore }}</div>
        </div>
        <div class="text-content">
          <div class="title">
            <div class="circle"></div>
            <span class="fs16 color-243">{{ $t("Educational.checkStatusrouter.classTeaching.offline_homework") }}</span>
          </div>
          <div class="content fs14 color-4C5">{{ $t("Educational.checkStatusrouter.classTeaching.offline_homework") }}:{{ offlineObj.hour_homeworkscores }}</div>
        </div>
        <div class="text-content">
          <div class="title">
            <div class="circle"></div>
            <span class="fs16 color-243">{{ $t("Educational.checkStatusrouter.classTeaching.book_check") }}</span>
          </div>
          <div class="content fs14 color-4C5">{{ $t("Educational.checkStatusrouter.classTeaching.book_check") }}:{{ offlineObj.hour_bookcheck_name }}</div>
        </div>
        <div class="text-content">
          <div class="title">
            <div class="circle"></div>
            <span class="fs16 color-243">{{ $t("Educational.checkStatusrouter.classTeaching.course_take") }}</span>
          </div>
          <div class="content fs14 color-4C5">{{ $t("Educational.checkStatusrouter.classTeaching.course_take") }}:{{ offlineObj.hour_netstatus_name }}</div>
        </div>
        <div class="text-content">
          <div class="title">
            <div class="circle"></div>
            <span class="fs16 color-243">{{ $t("Educational.checkStatusrouter.classTeaching.course_score") }}</span>
          </div>
          <div class="content fs14 color-4C5">{{ $t("Educational.checkStatusrouter.classTeaching.course_score") }}:{{ offlineObj.hour_netscores }}</div>
        </div>

        <div class="text-content">
          <div class="title">
            <div class="circle"></div>
            <span class="fs16 color-243">{{ $t("Educational.checkStatusrouter.classTeaching.lesson_record") }}</span>
          </div>
          <div class="content fs14 color-4C5">{{ $t("Educational.checkStatusrouter.classTeaching.lesson_record") }}:{{ offlineObj.hour_refresher_name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eduHttp from "../../Educational.js";
export default {
  name: "Educational-classTeaching",
  data() {
    return {
      onlineObj: {},
      offlineObj: {},
      rate: "2",
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
          if (res.data.error == 0) {
            this.onlineObj = res.data.result.data;
            this.offlineObj = res.data.result.list;
          } else {
            this.onlineObj = {};
            this.offlineObj = {};
          }
        });
    },
  },
  mounted() {},
};
</script>
<style lang="less">
.Educational-classTeaching {
  .online {
    width: 50%;
  }
  .offline {
    width: 50%;
    padding: 0 40px;
    border-left: 1px solid #dadde9;
  }
  .el-rate {
    height: 36px;
    line-height: 36px;
    i {
      line-height: 36px;
      font-size: 14px;
      color: #ff8a00 !important;
    }
  }
  .text-content {
    margin: 25px 10px;
    .title {
      margin: 10px 0;
      .circle {
        margin-right: 6px;
        width: 14px;
        height: 14px;
        display: inline-block;
        background-color: #ff9e02;
        border-radius: 50%;
      }
    }
    .content {
      margin: 10px 20px;
    }
  }
}
</style>
