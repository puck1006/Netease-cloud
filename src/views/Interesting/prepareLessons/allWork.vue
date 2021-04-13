<template>
  <div class="Interesting-hightWork-allWork height100">
    <div
      class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7"
    >
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18"
          >{{ class_cnname }}（{{ hour_name }}）</span
        >
      </div>
      <div class="cr-head-right flex-all">
        <i class="btn-close icon-gb ml10 cur-pointer" @click="handBack()"></i>
      </div>
    </div>
    <div class="content-box bg-white mt8">
      <div class="flex-wrap pt12 flex-warp-line pl12 pr12">
        <div class="flex-al mb12 fliter-Sort tc color-8A9 fs14">
          <span
            v-for="(item, index) in filter.sortList"
            :key="index"
            @click="searchSort(item, index)"
            class="sort-label"
            :class="{ active: index == sortIndex }"
          >
            {{ item.name }}
            <i
              v-if="index == 1 || index == 0"
              class="el-icon-bottom"
              :class="{ isTop: isTop && index == sortIndex }"
            ></i>
          </span>
        </div>
        <div class="lines ml16 mr16 mb12"></div>
        <div class="flex-al Inquire-box mb12">
          <div class="ipt-box" style="width: 260px">
            <el-input
              v-model="filter.keyword"
              clearable
              :placeholder="
                $t('Interesting.preLessonDetais.allwork_placeholder')
              "
              @clear="search"
              @keyup.enter.native="search"
            ></el-input>
          </div>
          <el-button
            type="primary"
            size="mini"
            class="search-btn fs14"
            @click="search"
            >{{ $t("Common.input_button") }}</el-button
          >
        </div>
      </div>
      <div class="content-list">
        <div
          class="list-div-auto"
          ref="content_box_height"
          :style="{ height: content_box_height + 'px' }"
        >
          <div
            v-if="videoList.perfect && videoList.perfect.length > 0"
            class="all-videoImg-list"
          >
            <template v-for="(item, index) in videoList.perfect">
              <workOne
                :key="index"
                :workInfo="item"
                :currentIndex="index"
                @viewVideo="changeVideoPlay"
                @handVate="handVate"
                @updateData="updateData"
              ></workOne>
            </template>
          </div>
          <blank v-else :blankCont="tips"></blank>
        </div>
        <!-- 分页 -->
        <el-pagination
          style="margin: 10px"
          :current-page.sync="paging.curPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size.sync="paging.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="paging.pageTotal"
          @current-change="curPageChange"
          @size-change="pageSizeChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import popTips from "@/components/common/popTips/popTips.vue";
import blank from "@/components/common/Blank/blank.vue";
import workOne from "@/components/highWork/workOne.vue"; //优质作品
import httpApi from "../Interesting";
export default {
  name: "Interesting-hightWork-allWork",
  components: {
    popTips,
    blank,
    workOne,
  },
  data() {
    return {
      isTop: false,
      content_box_height: 0,
      currentIndex: 0, //当前播放的视频
      sortIndex: 0,
      class_cnname: "", //班级名称
      hour_name: "", //课时名称
      videoList: {}, //优秀视频
      tips: "暂时没有其他优秀教学视频哦",
      //筛选
      filter: {
        keyword: "", //关键词
        code: "1",
        // 1点赞数 2观看数 3最新
        sortList: [
          // {
          //   name: this.$t("Interesting.preLessonDetais.sortList[0]"),
          //   code: ""
          // },
          {
            name: this.$t("Interesting.preLessonDetais.sortList[1]"),
            code: "1",
          },
          {
            name: this.$t("Interesting.preLessonDetais.sortList[2]"),
            code: "2",
          },
          {
            name: this.$t("Interesting.preLessonDetais.sortList[3]"),
            code: "3",
          },
        ],
      },
      // 分页
      paging: {
        curPage: 1,
        pageSize: 30,
        pageTotal: 0,
      },
    };
  },
  watch: {},
  computed: {},
  created() {
    this.classcode_branch = this.$route.query.classcode_branch;
    this.teachhour_branch = this.$route.query.teachhour_branch;
    this.teachplan_id = this.$route.query.teachplan_id;
    this.getExcellentPostilVideoFinal(); //备课->获取优秀批注/视频 -- wgh
  },
  methods: {
    updateData() {
      this.getExcellentPostilVideoFinal();
    },
    //备课->获取优秀批注/视频 -- wgh
    getExcellentPostilVideoFinal() {
      httpApi
        .getExcellentPostilVideoFinal({
          is_count: "1", //是否需要总数，可以不传
          p: this.paging.curPage,
          num: this.paging.pageSize,
          teachhour_branch: this.teachhour_branch,
          keyword: this.filter.keyword,
          order_praise: this.sortIndex === 0 ? (this.isTop ? 2 : 1) : "",
          order_watch: this.sortIndex === 1 ? (this.isTop ? 2 : 1) : "",
          order_time: this.sortIndex == 2 ? "1" : "",
        })
        .then((res) => {
          this.paging.pageTotal = parseInt(res.data.result.allnum);
          this.hour_name = res.data.result.list.hour_name.hour_name;
          this.class_cnname = res.data.result.list.hour_name.class_cnname;
          if (res.data.error == 0) {
            this.videoList = res.data.result.list;
          } else {
            this.videoList = {
              perfectOne: {},
              perfect: [],
            };
          }
          this.tips = res.data.result.errortip;
        });
    },
    // 检索
    search() {
      this.paging.curPage = 1;
      this.getExcellentPostilVideoFinal(); //备课->获取优秀批注/视频 -- wgh
    },
    // 检索
    searchSort(val, index) {
      if (this.sortIndex == index) {
        this.isTop = !this.isTop;
      } else {
        this.isTop = false;
      }
      console.log("触发检索");
      this.paging.curPage = 1;
      this.filter.code = val.code;
      this.sortIndex = index;
      this.getExcellentPostilVideoFinal(); //备课->获取优秀批注/视频 -- wgh
    },
    //备课->添加/取消点赞 -- wgh
    AddCancelPraiseAction(tempworks_id, code, index, type, item) {
      httpApi
        .AddCancelPraiseAction({
          tempworks_id: tempworks_id, //视频点赞/取消点赞时需传
          temppostil_id: "", //批注点赞/取消点赞时需传
          code: code, //是否点赞 0取消点赞 1点赞
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            console.log(item);
            item.is_zan = !item.is_zan;
            item = JSON.parse(JSON.stringify(item));
            this.getExcellentPostilVideoFinal(); //备课->获取优秀批注/视频 -- wgh
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    //备课->上传个人教学视频 -- wgh
    UploadVideoAction() {
      httpApi
        .UploadVideoAction({
          classcode_branch: this.classcode_branch, //班别编号
          teachhour_branch: this.teachhour_branch, //课时编号
          tempvideo_name: this.tempvideoInfo.tempvideo_name,
          tempvideo_author: this.tempvideoInfo.tempvideo_author,
          tempvideo_coverimg: this.tempvideoInfo.tempvideo_coverimg,
          tempvideo_videourl: this.tempvideoInfo.tempvideo_videourl,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            this.getExcellentPostilVideoFinal(); //备课->获取优秀批注/视频 -- wgh
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    // 视频上传
    handleAvatarSuccess(res, file) {
      if (res.error == "0") {
        console.log(res.result, file);
        this.tempvideoInfo.tempvideo_videourl = res.result.file_url;
        let name = this.tempvideoInfo.tempvideo_videourl;
        let pos = name.lastIndexOf("/"); //'/所在的最后位置'
        let str = name.substr(pos + 1); //截取文件名称字符串
        this.tempvideoInfo.tempvideo_name = str;
        this.tempvideoInfo.tempvideo_author = this.$Tool.getStorage("UserInfo")
          ? this.$Tool.getStorage("UserInfo").staffer_cnname
          : "";
        this.UploadVideoAction(); //备课->上传个人教学视频 -- wgh
      }
    },
    // 视频上传前格式校验
    beforeAvatarUpload(file) {
      console.log(file, "这是视频数据");
      const isAvi = file.type === "video/avi";
      const isMpg = file.type === "video/mpg";
      const isMpeg = file.type === "video/mpeg";
      const isMp4 = file.type === "video/mp4";
      const isVideo = isAvi || isMpg || isMpeg || isMp4;
      if (!isVideo) {
        this.$message.error("上传头像图片只能是 AVI/MPG/MPEG/MP4 格式!");
      }
      return isVideo;
    },
    // 是否点赞
    handVate(item, index, type) {
      let code = "";
      //是否点赞 0取消点赞 1点赞
      if (item.is_zan) {
        code = "0";
      } else {
        code = "1";
      }
      this.AddCancelPraiseAction(item.tempworks_id, code, index, type, item);
    },
    // 切换当前播放的视频
    changeVideoPlay(slide, index) {
      console.log(slide);
      this.currentIndex = index;
      console.log(1111);
      this.$router.push(
        `/Interesting/prepareLessons/highWork?tempworks_id=${slide.tempworks_id}&teachhour_branch=${this.$route.query.teachhour_branch}`
      );
    },
    // 返回关闭
    handBack() {
      this.$router.go(-1);
    },
    // 重置表单
    resetForm(form) {
      this.$refs[form].resetFields();
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.getExcellentPostilVideoFinal(); //备课->获取优秀批注/视频 -- wgh
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.getExcellentPostilVideoFinal(); //备课->获取优秀批注/视频 -- wgh
    },
    handleClose(done) {
      done();
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs["content_box_height"]) {
        this.content_box_height = this.$Tool.getTableHeight(
          this.$refs.content_box_height.getBoundingClientRect().top + 52
        );
      }
    });
  },
};
</script>

<style lang="less">
@import "../Interesting.less";
.Interesting-hightWork-allWork {
  .isTop {
    transform: rotate(180deg);
  }
}
</style>
