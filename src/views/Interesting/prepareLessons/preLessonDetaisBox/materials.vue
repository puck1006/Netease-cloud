<template>
  <div class="Interesting-prepareLessons-materials height100">
    <!-- 页面右边按钮***start -->
    <div class="right-btn fs14">
      <i class="btn-close icon-gb ml10" @click="handBack()"></i>
    </div>
    <div class="content-box bg-white pAll16">
      <div class="top flex mt16">
        <div
          v-for="(item, index) in materialsType"
          :key="index"
          class="item cur-pointer"
          @click="handClickTab(item, index)"
        >
          <div class="img">
            <img :src="item.img" alt />
          </div>
          <div class="item-text color-243 ml20">
            <p :class="{ 'color-blue': index == currentIndex }" class="fs24">
              {{ item.name }}
            </p>
            <p class="color-8A9">
              <span :class="{ 'color-blue': index == currentIndex }">
                {{ item.num }}{{ $t("Common.piece") }}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="materials-list" ref="item_height">
        <div
          :style="{ height: item_height + 'px' }"
          :class="{ active: currentIndex == 0 }"
          class="itemone"
        >
          <div class="title fs24 color-243">
            {{ $t("Interesting.preLessonDetais.courseFile[0]") }}
          </div>
          <ul>
            <li v-for="(item, index) in wordList" :key="index" class="fs16">
              <span class="li-1" style="width: 50%">{{
                item.tempfiles_name
              }}</span>
              <span class="li-2 color-4C5 tc" style="width: 20%">{{
                item.tempfiles_size
              }}</span>
              <span class="tr" style="width: 15%">
                <el-button
                  type="text"
                  size="mini"
                  class="fs16 li-3"
                  @click="handSee(item, 'word')"
                >
                  {{ $t("Common.see") }}
                </el-button>
              </span>
              <span class="tr" style="width: 15%">
                <el-button
                  type="text"
                  size="mini"
                  class="fs16 li-3"
                  @click="handDowload(item, 'word')"
                >
                  {{ $t("Common.download") }}
                </el-button>
              </span>
            </li>
          </ul>
        </div>
        <div
          :style="{ height: item_height + 'px' }"
          :class="{ active: currentIndex == 1 }"
          class="itemone item-Mp3 ml16 mr16"
        >
          <div class="title fs24 color-243">
            {{ $t("Interesting.preLessonDetais.courseFile[1]") }}
          </div>
          <ul>
            <li v-for="(item, index) in mp3List" :key="index" class="fs16">
              <div class="mp3-cont">
                <span class="li-1" style="width: 55%">{{
                  item.tempfiles_name
                }}</span>
                <span class="li-2 color-4C5 tc" style="width: 25%">{{
                  item.tempfiles_size
                }}</span>
                <span class="tr" style="width: 20%">
                  <el-button
                    type="text"
                    size="mini"
                    class="fs16 li-3"
                    @click="handDowload(item, 'mp3')"
                  >
                    {{ $t("Common.download") }}
                  </el-button>
                </span>
              </div>
              <div class="audio-box flex-all">
                <div class="btn-audio">
                  <!-- <img
                    @click="audioPaly(`myaudio${index}`,item,index)"
                    src="../../../../assets/images/icon/icon-audio-play.png"
                    alt
                  /> -->
                  <!-- <img src="../../../../assets/images/icon/icon-audio-pause.png" alt=""> -->
                  <!-- <video controls style="width:200px;height:100px" ref="myaudio" :id="`myaudio${index}`">
                    <source :src="item.tempfiles_url" />
                    {{$t(
                    'Common.video_tips'
                    )}}
                  </video> -->
                </div>
                <!-- <div class="audio-right flex-al">
                  <div class="process">
                    <div class="inner" :style="{'width':item.progress}"></div>
                  </div>
                  <span class="time">{{item.currentTime}}/{{item.duration}}</span>
                </div> -->
              </div>
              <video
                controls
                style="width: 100%; height: 200px"
                ref="myaudio"
                :id="`myaudio${index}`"
              >
                <source :src="item.tempfiles_url" />
                {{ $t("Common.video_tips") }}
              </video>
            </li>
          </ul>
        </div>
        <div
          :style="{ height: item_height + 'px' }"
          :class="{ active: currentIndex == 2 }"
          class="itemone"
        >
          <div class="title fs24 color-243">
            {{ $t("Interesting.preLessonDetais.courseFile[2]") }}
          </div>
          <ul>
            <li v-for="(item, index) in pptList" :key="index" class="fs16">
              <span class="li-1" style="width: 50%">{{
                item.tempfiles_name
              }}</span>
              <span class="li-2 color-4C5 tc" style="width: 20%">{{
                item.tempfiles_size
              }}</span>
              <span class="tr" style="width: 15%">
                <el-button
                  type="text"
                  size="mini"
                  class="fs16 li-3"
                  @click="handSee(item, 'ppt')"
                >
                  {{ $t("Common.see") }}
                </el-button>
              </span>
              <span class="tr" style="width: 15%">
                <el-button
                  type="text"
                  size="mini"
                  class="fs16 li-3"
                  @click="handDowload(item, 'ppt')"
                >
                  {{ $t("Common.download") }}
                </el-button>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 查看文件的弹框 -->
    <div class="small-dialog" v-if="checkFileVisible">
      <el-dialog
        :title="$t('Interesting.preLessonDetais.seeFile')"
        :visible.sync="checkFileVisible"
        class="checkFile-box"
        width="85%"
        :before-close="handleClose"
      >
        <div class="dialog-content">
          <iframe
            :src="fileUrl"
            name="test"
            width="100%"
            :height="check_file_height + 'px'"
            frameborder="1"
            align="left"
            ref="check_file_height"
            scrolling="yes"
          ></iframe>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            size="mini"
            @click="checkFileVisible = false"
          >
            {{ $t("Common.btn_sure") }}
          </el-button>
          <el-button size="mini" @click="checkFileVisible = false">
            {{ $t("Common.btn_cancel") }}
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import progressTableCont from "@/components/tables/progressTableCont.vue";
import popTips from "@/components/common/popTips/popTips.vue";
import httpApi from "../../Interesting";
export default {
  name: "Interesting-prepareLessons-materials",
  components: {
    progressTableCont,
    popTips,
  },
  data() {
    return {
      checkFileVisible: false, //查看文件
      item_height: 0,
      check_file_height: 0,
      currentIndex: 0,
      materialsType: [
        {
          img: require("../../../../assets/images/img-word.png"),
          name: this.$t("Interesting.preLessonDetais.courseFile[0]"),
          num: "0",
        },
        {
          img: require("../../../../assets/images/img-mp3.png"),
          name: this.$t("Interesting.preLessonDetais.courseFile[1]"),
          num: "0",
        },
        {
          img: require("../../../../assets/images/img-ppt.png"),
          name: this.$t("Interesting.preLessonDetais.courseFile[2]"),
          num: "0",
        },
      ],
      fileUrl: "", //查看的文件链接
      tempfiles_url: "", //文件链接
      tempfiles_name: "", //文件名称
      wordList: [],
      mp3List: [],
      pptList: [],
      timer: "", //监听时间循环
    };
  },
  watch: {},
  computed: {},
  created() {
    this.class_id = this.$route.query.class_id;
    this.course_branch = this.$route.query.course_branch;
    this.hour_lessontimes = this.$route.query.hour_lessontimes;
    this.CourseMaterials(); //备课->获取课程信息 -- wgh
  },
  methods: {
    //备课->获取课程信息 -- wgh
    CourseMaterials() {
      httpApi
        .CourseMaterials({
          class_id: this.class_id,
          course_branch: this.course_branch,
          hour_lessontimes: this.hour_lessontimes,
        })
        .then((res) => {
          this.materialsType[0].num = res.data.result.list.wordnum;
          this.materialsType[1].num = res.data.result.list.mp3num;
          this.materialsType[2].num = res.data.result.list.pptnum;
          this.wordList = res.data.result.list.word;
          let mp3_list = res.data.result.list.mp3;
          this.pptList = res.data.result.list.ppt;
          this.mp3List = mp3_list;
          if (mp3_list.length > 0) {
            let _this = this;
            let audio_duration = "0";
            let audio = document.getElementsByClassName("myaudio");
            mp3_list.forEach((e, index) => {
              e.isStore = false; //是否正在播放音频
              e.progress = "0%"; //播放进度
              e.currentTime = "00:00"; //播放时间
              e.duration = "00:00"; //播放总时间
              _this.$nextTick(() => {
                let audio_dom = audio[index];
                let time_audio = setInterval(() => {
                  if (isNaN(audio_dom.duration)) {
                    console.log(11);
                  } else {
                    audio_duration = audio_dom.duration.toFixed(2); //播放总时间
                    e.duration = audio_duration;
                    this.mp3List = [];
                    this.mp3List = mp3_list;
                    clearInterval(time_audio);
                  }
                }, 30);
              });

              console.log(e.duration);
            });
          }
        });
    },
    //备课->课程资料下载 -- wgh
    getDownload() {
      httpApi
        .getDownload({
          tempfiles_url: this.tempfiles_url, //文件链接
          tempfiles_name: this.tempfiles_name, //文件名称
        })
        .then((res) => {});
    },
    // 切换模块
    handClickTab(item, index) {
      this.currentIndex = index;
    },
    // 点击查看
    handSee(item, type) {
      this.tempfiles_url = item.tempfiles_url;
      this.tempfiles_name = item.tempfiles_name;
      this.fileUrl = item.Chakan;
      this.checkFileVisible = true;
      this.$nextTick(() => {
        if (this.$refs["check_file_height"]) {
          this.check_file_height = this.$Tool.getTableHeight(
            this.$refs.check_file_height.getBoundingClientRect().top + 100
          );
        }
      });
    },
    // 点击下载
    handDowload(item, type) {
      this.tempfiles_url = item.tempfiles_url;
      this.tempfiles_name = item.tempfiles_name;
      const token = this.$userDetails.token;
      const stafferId = this.$userDetails.stafferId;
      const schoolId = this.$userDetails.schoolId;
      const companyId = this.$userDetails.companyId;
      const re_postbe_id = this.$userDetails.re_postbe_id;
      const dataequity = this.$userDetails.dataequity;
      let url = httpApi.getDownload();
      window.open(
        `${url}?staffer_id=${stafferId}&token=${token}&dataequity=${dataequity}&school_id=${schoolId}&company_id=${companyId}&re_postbe_id=${re_postbe_id}&tempfiles_url=${this.tempfiles_url}&tempfiles_name=${this.tempfiles_name}`,
        "_blank"
      );
      // if (type == "word") {
      // } else if (type == "mp3") {
      // } else {
      //   // ppt
      // }
    },
    // 播放音频
    audioPaly(dom, item, index) {
      let audio_dom = document.getElementById(dom.toString());
      console.log(audio_dom.paused, 1212123);
      this.mp3List[index].isStore = !this.mp3List[index].isStore;
      //   duration***时长，currentTime****播放进度
      if (this.mp3List[index].isStore) {
        audio_dom.play();
        this.changeProgress(audio_dom, item, index);
      } else {
        audio_dom.pause();
      }
    },
    // 播放音频***进度
    changeProgress(element, item, index) {
      const audio_dom = element;
      let list = this.mp3List;
      this.timer = setInterval(() => {
        const numbers = audio_dom.currentTime / audio_dom.duration;
        let perNumber = (numbers * 100).toFixed(2);
        let num = perNumber;
        if (perNumber >= 100) {
          list[index].isStore = false;
          clearInterval(this.timer);
        }
        perNumber += "%";
        list[index].progress = perNumber;
        list[index].currentTime = audio_dom.currentTime.toFixed(2);
        this.mp3List = [];
        this.mp3List = list;
      }, 30);
    },
    // 返回关闭
    handBack() {
      this.$router.go(-1);
    },
    // 重置表单
    resetForm(form) {
      this.$refs[form].resetFields();
    },
    handleClose(done) {
      done();
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs["item_height"]) {
        this.item_height = this.$Tool.getTableHeight(
          this.$refs.item_height.getBoundingClientRect().top + 32
        );
      }
    });
  },
};
</script>

<style lang="less">
.Interesting-prepareLessons-materials {
}
</style>
