<template>
  <div id="previewMedia">
    <div class="previewMedia-list">
      <template v-for="(item,index) in fileList">
        <!-- 图片 -->
        <div v-if="item.type=='img'" :key="index" class="item img-item">
          <div class="item-prew">
            <el-image :src="item.url" :preview-src-list="srcImgList"></el-image>
          </div>
          <i v-if="isEditImg" class="el-icon-error icon-remove" @click="delMedia(item,index)" />
        </div>
        <!-- 视频 -->
        <div v-else-if="item.type=='video'" :key="index" class="item video-item">
          <div class="item-prew" @click="playVideo(item)">
            <video>
              <source :src="item.url" type="video/mp4" />{{$t('Common.videoTips')}}
            </video>
            <div class="btn-video-play"></div>
          </div>
          <i v-if="isEditImg" class="el-icon-error icon-remove" @click="delMedia(item,index)" />
        </div>
        <!-- 音频 -->
        <div v-if="item.type=='audio'" :key="index" class="item audio-item">
          <div class="item-prew" @click="palyAudio(`eventAudio${index}`)">
            <img class="img" src="@/assets/images/yinpin.png" alt />
            <p class="fs12 tc mt5">00:{{parseInt(item.time)>10?item.time:('0'+item.time)}}/00:60</p>
            <audio :id="`eventAudio${index}`">
              <source :src="item.url" />{{$t('Common.audioTips')}}
            </audio>
          </div>
          <van-icon v-if="isEditImg" name="clear" @click="delMedia(item,index)" />
        </div>
        <!--默认 图片 -->
        <div v-else-if="!item.type" :key="index" class="item img-item">
          <div class="item-prew">
            <el-image :src="item.url" :preview-src-list="srcImgList"></el-image>
            <!-- <img :src="item.url" alt /> -->
          </div>
          <i v-if="isEditImg" class="el-icon-error icon-remove" @click="delMedia(item,index)" />
        </div>
      </template>
    </div>
    <!-- 查看视频弹框 -->
    <div v-if="showPrview" class="prview-dialog">
      <div class="prview-dialog-cont">
        <video controls>
          <source :src="currentInfo.url" type="video/mp4" />您的浏览器不支持 video 标签。
        </video>
        <i class="icon-gb btn-close" @click="showPrview=false"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["fileList", "isEditImg"],
  name: "previewMedia",
  data() {
    return {
      showPrview: false, // 显示视频
      isStore: false,
      srcImgList: [],
      currentInfo: {} //当前的信息
    };
  },
  mounted() {},
  created() {
    let arr = [];
    this.fileList.forEach(item => {
      if (item.type == "img") {
        arr.push(item.url);
      }
    });
    this.srcImgList = arr;
  },
  methods: {
    // 播放视频
    playVideo(item) {
      this.currentInfo = item;
      this.showPrview = true;
    },
    // 播放音频
    palyAudio(dom) {
      console.log(12121);
      let audio_dom = document.getElementById(dom.toString());
      this.isStore = !this.isStore;
      if (this.isStore) {
        // this.$toast({
        //   message: '正在准备音频资源，请稍等...'
        // });
        audio_dom.play();
      } else {
        audio_dom.pause();
      }
    },
    // 删除预览文件
    delMedia(item, index) {
      this.$emit("delMedia", item, index);
    }
  },
  watch: {
    getfileList(n, o) {
      console.log(n, o);
      let arr = [];
      n.forEach(item => {
        if (item.type == "img") {
          arr.push(item.url);
        }
      });
      this.srcImgList = arr;
      console.log(this.srcImgList);
    }
  },
  computed: {
    getfileList() {
      return this.fileList;
    }
  }
};
</script>

<style lang="less" scoped>
#previewMedia {
  .previewMedia-list {
    display: flex;
    flex-wrap: wrap;
    .item {
      position: relative;
      margin: 0 6px 6px 0;
      .icon-remove {
        font-size: 20px;
        color: #bcbcbc;
        position: absolute;
        top: -14px;
        right: -10px;
        cursor: pointer;
      }
    }
    .item .item-prew {
      position: relative;
      cursor: pointer;
      width: 106px;
      height: 106px;
      overflow: hidden;
      border-radius: 4px;
      // background: #f7f8fa;
      background: #ddd;
      .el-image {
        width: 106px;
        height: 106px;
        overflow: hidden;
        border-radius: 4px;
      }
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
      .btn-video-play {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: 35% auto;
        width: 30px;
        height: 30px;
        background: url("../../assets/images/paly.png") no-repeat;
        background-size: 100% 100%;
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
        width: 60px;
        height: auto;
        border-radius: 0;
        margin: 0 auto;
        object-fit: contain;
      }
      audio {
        position: absolute;
        top: 0;
        left: 0;
        width: 106px;
        height: 106px;
      }
    }
    .i-clear {
      position: absolute;
      top: -8px;
      right: -8px;
      color: #969799;
      font-size: 18px;
      background-color: #fff;
      border-radius: 100%;
    }
  }
  // 弹框
  .prview-dialog {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    z-index: 3000;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    .prview-dialog-cont {
      width: 700px;
      max-height: 400px;
      background: #fff;
      margin: 15vh auto 50px auto;
      position: relative;
      video {
        width: 100%;
        max-height: 400px;
      }
      .btn-close {
        position: absolute;
        top: -22px;
        right: 0;
        font-size: 16px;
      }
      .btn-close:before {
        color: #fff;
      }
    }
  }
}
</style>
