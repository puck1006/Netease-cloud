<template>
  <div id="previewMedia">
    <div class="previewMedia-list" v-if="getAllFileList.length>0">
      <template v-for="(item,index) in getAllFileList">
        <!-- 图片 -->
        <div v-if="item.type=='img'" :key="index" class="item img-item">
          <div @click="showBigImg" class="item-prew">
            <!-- <el-image style="width: 100px; height: 100px" :src="item.url" ></el-image> -->
            <img :src="item.url" alt />
          </div>
          <i class="el-icon-close" v-if="isEditImg" name="clear" @click="delMedia(item,index)" />
        </div>
        <!-- 视频 -->
        <div v-if="item.type=='video'" :key="index" class="item video-item">
          <div class="item-prew">
            <video controls>
              <source :src="item.url" type="video/mp4" />您的浏览器不支持 video 标签。
            </video>
          </div>
          <!-- <van-icon v-if="isEditImg" name="clear" @click="delMedia(item,index)" /> -->
        </div>
        <!-- 音频 -->
        <div v-if="item.type=='audio'" :key="index" class="item audio-item">
          <div class="item-prew" @click="palyAudio(`eventAudio${index}`,item.url,index)">
            <!-- <img v-if="item.currentPlay" class="img" src="@/assets/images/yinpin.gif" alt />
            <img v-else class="img" src="@/assets/images/yinpin.png" alt />-->
            <p class="fs12 tc mt5">00:{{parseInt(item.time)>10?item.time:('0'+item.time)}}/00:60</p>
            <audio :id="`eventAudio${index}`" preload="auto" @ended="ended(index)">
              <source :src="item.url" />您的浏览器不支持 audio 标签。
            </audio>
          </div>
        </div>
      </template>
    </div>
    <!-- 显示预览图片 -->
    <!-- <van-image-preview v-model="showImg" :images="imageList"></van-image-preview> -->
    <!-- <van-uploader preview-size="106px" v-model="getAllFileList" multiple /> -->
  </div>
</template>

<script>
export default {
  props: ["fileList", "isEditImg"],
  name: "previewMedia",
  data() {
    return {
      // 显示图片
      showImg: false,
      isStore: false,
      imageList: [],
      allFileList: [],
    };
  },
  mounted() {},
  created() {},
  methods: {
    showBigImg(item, index) {
      let arr = [];
      this.allFileList.forEach((item) => {
        if (item.type == "img") {
          arr.push(item.url);
        }
      });
      this.imageList = arr;
      // 显示大图片
      this.showImg = true;
    },
    // 播放音频
    palyAudio(dom, audioUrl, index) {
      console.log(12121);
      let audioDom = document.getElementById(dom.toString());
      this.currentAudio = audioDom;
      this.isStore = !this.isStore;
      let dataList = this.allFileList;
      if (audioUrl && audioUrl != "") {
        if (this.isStore) {
          this.$toast({
            message: "正在准备音频资源，请稍等...",
          });
          dataList[index].currentPlay = true; // 当前正在播放的音频
          audioDom.play();
        } else {
          dataList[index].currentPlay = false; // 当前正在播放的音频
          audioDom.pause();
        }
        this.allFileList = [];
        this.allFileList = dataList;
        console.log(this.allFileList);
      } else {
        this.$toast({
          message: "音频资源出错",
        });
      }
    },
    // 监听音频播放完毕
    ended(index) {
      console.log(index);
      let dataList = this.allFileList;
      dataList[index].currentPlay = false; // 当前正在播放的音频
      this.allFileList = [];
      this.allFileList = dataList;
      console.log("audio end");
    },
    // 删除预览文件
    delMedia(item, index) {
      this.$emit("delMedia", item, index);
    },
  },
  watch: {
    getAllFileList(n, o) {
      n.forEach((item) => {
        item.currentPlay = false;
      });
      this.allFileList = n;
    },
  },
  computed: {
    getAllFileList() {
      return this.fileList;
    },
  },
};
</script>

<style lang="less" scoped>
#previewMedia {
  .previewMedia-list {
    display: flex;
    flex-wrap: wrap;
    .item {
      position: relative;
      margin: 0 8px 8px 0;
      &:nth-child(3n+1) {
        margin-left: 0!important;
      }
    }
    .item .item-prew {
      position: relative;
      cursor: pointer;
      width: 106px;
      height: 106px;
      overflow: hidden;
      border-radius: 4px;
      background: #f7f8fa;
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      video {
        width: 106px;
        height: 106px;
        display: block;
      }
    }
    .audio-item .item-prew {
      background: rgba(0, 0, 0, 0.69);
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .img {
        width: 50px;
        height: 23px;
        margin: 0 auto;
        object-fit: fill;
      }
      audio {
        position: absolute;
        top: 0;
        left: 0;
        width: 106px;
        height: 106px;
      }
    }
    .el-icon-close {
      position: absolute;
      top: -6px;
      right: -6px;
      color: #fff;
      font-size: 18px;
      border-radius: 100%;
      background-color: red;
    }
  }
}
</style>
