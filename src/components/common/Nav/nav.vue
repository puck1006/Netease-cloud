<template>
  <el-container>
    <el-aside width="auto" class="header-nav__slider">
      <!-- <div class="logo" v-if="!isCollapse">
        <img src="../../../assets/images/common/logo.png" alt />
      </div>
      <div class="small-logo" v-else>
        <img src="../../../assets/images/common/small-logo.svg" alt />
      </div>-->
      <div class="logo" v-if="imgLogo && !isCollapse">
        <img :src="imgLogo" alt />
      </div>
      <div class="small-logo" v-else-if="imgLogo && isCollapse">
        <img :src="imgLogo" alt />
      </div>
      <div class="logo" v-else-if="!imgLogo && !isCollapse">
        <img src="../../../assets/images/common/logo.png" alt />
      </div>
      <div class="small-logo" v-else-if="!imgLogo && isCollapse">
        <img src="../../../assets/images/common/logo.png" alt />
      </div>
      <el-menu
        background-color="#ffffff"
        text-color="#2A304D"
        :default-openeds="open"
        :default-active="sliderActiveIndex"
        :unique-opened="sigle"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        width="250px"
      >
        <li v-if="navIndexValue == 5" class="aside-useinfo tc">
          <div class="user-avator">
            <img
              v-if="userDataInfo.staffer_img != ''"
              :src="userDataInfo.staffer_img"
              alt
            />
            <img
              v-else-if="userDataInfo.staffer_sex == '女'"
              src="../../../assets/images/woman.png"
              alt
            />
            <img v-else src="../../../assets/images/default-new-men.png" alt />
          </div>
          <p class="fs14 color-243 mt8">{{ userDataInfo.staffer_cnname }}</p>
          <p class="fs12 color-8A9">{{ userDataInfo.post_name }}</p>
        </li>
        <template v-for="(item, index) in slider">
          <!-- <el-menu-item
            v-if="item.children.length==0"
            :index="String(index)"
            :key="index"
            v-show="item.isshow !=1"
          >
            <div
              class="itemOne"
              @click="
                linkToPage(
                  item.url,
                  item.module_id,
                  item.activeIndex,
                  item.index,
                  item
                )
              "
            >
              <div class="item-button">
                <i :class="item.icon"></i>
                <span slot="title" class="margin-9">{{ item.title }}</span>
              </div>
            </div>
          </el-menu-item>-->
          <!-- v-if="item.title !== '叮铛助教' || isShow" -->
          <el-submenu :index="String(index)" :key="index + '-1'">
            <template slot="title">
              <el-menu-item
                class="one-menuItem"
                :index="String(index)"
                v-if="item.children.length == 0"
              >
                <div
                  class="itemOne"
                  @click="
                    linkToPage(
                      item.url,
                      item.module_id,
                      item.activeIndex,
                      item.index,
                      item
                    )
                  "
                >
                  <div class="item-button">
                    <i :class="item.icon"></i>
                    <span slot="title" class="margin-9">{{ item.title }}</span>
                  </div>
                </div>
              </el-menu-item>
              <div v-else class="itemOne">
                <div class="item-button">
                  <i :class="item.icon"></i>
                  <span slot="title" class="margin-9">{{ item.title }}</span>
                </div>
              </div>
            </template>
            <el-menu-item-group v-if="item.children.length > 0">
              <template v-for="(iItem, iIndex) in item.children">
                <el-menu-item
                  @click="
                    linkToTwoPage(
                      iItem.url,
                      iItem.module_id,
                      iItem.activeIndex,
                      index,
                      iItem,
                      item.activeIndex
                    )
                  "
                  @contextmenu.prevent.stop.native="jumpToLink(iItem.url)"
                  :index="index + '-' + (iIndex + 1)"
                  :key="iIndex"
                  v-if="iItem.title !== '消息查询' || $userDetails.companyId == '1001'"
                >
                  <div class="padding_40">{{ iItem.title }}</div>
                </el-menu-item>
              </template>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <Header @toggleCollapse="navcollapse" :isCollapse="isCollapse" />
      </el-header>
      <el-main>
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Header from "../Header/header.vue";
import zhStoreLang from "../../../storeLang/store-cn";
import twStoreLang from "../../../storeLang/store-tw";
export default {
  name: "pageNav",
  // props: ["slider", "openMenu", "index"],
  props: ["openMenu", "index"],
  data() {
    return {
      slider: [],
      navIndexValue: 1,
      locationUrl: window.location.origin,
      sigle: true,
      isCollapse: false,
      value: "",
      isShow: true,
      imgLogo: "",
    };
  },
  components: {
    Header,
  },
  created() {
    if (window.location.host == "easx.kedingdang.com") {
      this.isShow = false;
    }
    let localeLang;
    if (window.location.href.indexOf("havePermission") > -1) {
      localeLang = this.$Tool.getParameter("language");
    } else {
      localeLang = this.$Tool.getStorage("language")
        ? this.$Tool.getStorage("language")
        : "zh";
    }

    let navIndex = this.$store.state.navActiveIndex;
    this.navIndexValue = navIndex;
    if (localeLang == "zh") {
      if (navIndex == 1) {
        this.slider = zhStoreLang.Slider;
      } else if (navIndex == 2) {
        this.slider = zhStoreLang.SliderTwo;
      } else if (navIndex == 3) {
        this.slider = zhStoreLang.SliderThree;
      } else if (navIndex == 4) {
        this.slider = zhStoreLang.SliderFour;
        this.calcSlider();
      } else if (navIndex == 5) {
        this.slider = zhStoreLang.SliderFive;
      } else if (navIndex == 6) {
        this.slider = zhStoreLang.SliderSix;
      }
    } else {
      if (navIndex == 1) {
        this.slider = twStoreLang.Slider;
      } else if (navIndex == 2) {
        this.slider = twStoreLang.SliderTwo;
      } else if (navIndex == 3) {
        this.slider = twStoreLang.SliderThree;
      } else if (navIndex == 4) {
        this.slider = twStoreLang.SliderFour;
        this.calcSlider();
      } else if (navIndex == 5) {
        this.slider = twStoreLang.SliderFive;
      } else if (navIndex == 6) {
        this.slider = twStoreLang.SliderSix;
      }
    }

    this.GetCompanyImg();
  },
  methods: {
    // 一级目录的跳转
    linkToPage(url, id, index, open, item) {
      this.$Tool.setStorage("sliderActiveIndex", index);
      this.$store.dispatch("setActiveIndex", index);
      // if (item.children && item.children.length > 0) {
      //   this.$Tool.setStorage("innerSlider", item.children);
      //   this.$store.dispatch("setInnerSlider", item.children);
      // } else {
      //   this.$Tool.removeStorage("innerSlider");
      //   this.$store.dispatch("setInnerSlider", []);
      // }
      // this.$Tool.setStorage("module_id", id);
      // this.$store.dispatch("setModuleId", id);
      // this.$Tool.setStorage("sliderActiveIndex", index);
      // this.$store.dispatch("setActiveIndex", index);

      // if (open != this.$store.state.openMenu[0]) {
      //   this.$Tool.setStorage("openMenu", ["" + open]);
      //   this.$store.dispatch("setOpenMenu", ["" + open]);
      // }
      this.$router.push({ path: url });
    },
    // 二级目录的跳转
    linkToTwoPage(url, id, index, open, item, oneIndex) {
      console.log(item, oneIndex);
      this.$Tool.setStorage("sliderActiveIndex", open + "-" + index);
      this.$store.dispatch("setActiveIndex", open + "-" + index);
      // this.$Tool.setStorage("sliderActiveIndex", index);
      // this.$store.dispatch("setActiveIndex", index);
      // if (item.children && item.children.length > 0) {
      //   this.$Tool.setStorage("innerSlider", item.children);
      //   this.$store.dispatch("setInnerSlider", item.children);
      // } else {
      //   this.$Tool.removeStorage("innerSlider");
      //   this.$store.dispatch("setInnerSlider", []);
      // }
      // this.$Tool.setStorage("module_id", id);
      // this.$store.dispatch("setModuleId", id);
      // this.$Tool.setStorage("sliderActiveIndex", index);
      // this.$store.dispatch("setActiveIndex", index);

      if (open != this.$store.state.openMenu[0]) {
        this.$Tool.setStorage("openMenu", ["" + open]);
        this.$store.dispatch("setOpenMenu", ["" + open]);
      }
      this.$router.push({ path: url });
    },
    jumpToLink(url) {
      window.open(`${this.locationUrl}${url}`, "_blank");
    },
    navcollapse(v) {
      console.log(this.isCollapse, v);
      this.isCollapse = v;
    },
    // 获取logo
    GetCompanyImg() {
      this.$http.GetCompanyImg({}).then((res) => {
        if (res.data.error == 0) {
          this.imgLogo = res.data.result;
        }
      });
    },
    calcSlider() {
      if (
        this.$userDetails.account_class == 0 &&
        this.$Tool.getStorage("postpart_isteregulator") == 0
      ) {
        this.slider[3].children = this.slider[3].children.filter((el) => {
          return el.activeIndex != 2;
        });
      }
    },
  },
  watch: {
    navActiveIndex(n, o) {
      let localeLang;
      if (window.location.href.indexOf("havePermission") > -1) {
        localeLang = this.$Tool.getParameter("language");
      } else {
        localeLang = this.$Tool.getStorage("language")
          ? this.$Tool.getStorage("language")
          : "zh";
      }
      this.navIndexValue = n;
      if (localeLang == "zh") {
        if (n == 1) {
          this.slider = zhStoreLang.Slider;
        } else if (n == 2) {
          this.slider = zhStoreLang.SliderTwo;
        } else if (n == 3) {
          this.slider = zhStoreLang.SliderThree;
        } else if (n == 4) {
          this.slider = zhStoreLang.SliderFour;
          this.calcSlider();
        } else if (n == 5) {
          this.slider = zhStoreLang.SliderFive;
        } else if (n == 6) {
          this.slider = zhStoreLang.SliderSix;
        }
      } else {
        if (n == 1) {
          this.slider = twStoreLang.Slider;
        } else if (n == 2) {
          this.slider = twStoreLang.SliderTwo;
        } else if (n == 3) {
          this.slider = twStoreLang.SliderThree;
        } else if (n == 4) {
          this.slider = twStoreLang.SliderFour;
          this.calcSlider();
        } else if (n == 5) {
          this.slider = twStoreLang.SliderFive;
        } else if (n == 6) {
          this.slider = twStoreLang.SliderSix;
        }
      }
    },
  },
  computed: {
    navActiveIndex() {
      return this.$store.state.navActiveIndex;
    },
    sliderActiveIndex() {
      return this.$store.state.sliderActiveIndex;
    },
    open: {
      get: function () {
        return this.$store.state.openMenu;
      },
      set: function () {},
    },
    userDataInfo() {
      return this.$store.state.USER_INFO;
    },
  },
};
</script>

<style lang="less">
// 校务的主题色
@schoolBaseColor: #00a6ff;
.header-nav__slider {
  display: flex;
  flex-direction: column;
  .el-menu {
    flex: 1;
    box-shadow: 1px 0px 8px -10px rgba(0, 0, 0, 0.08);
    .el-menu-item {
      display: flex;
      align-items: center;
      min-width: auto;
    }
    .el-submenu__title {
      display: flex;
      align-items: center;
    }
    .el-submenu__title .el-submenu__icon-arrow {
      display: none;
    }
  }
  .el-menu:not(.el-menu--collapse) {
    width: 200px;
    border-right: 1px solid #f2f7f9;
    background-color: rgba(255, 255, 255, 1);
  }
  // 侧边栏打开样式
  .el-menu {
    // .is-opened {
    //   .itemOne .item-button {
    //     color: #fff;
    //     box-shadow: 0px 0px 20px 0px rgba(64, 67, 100, 0.2);
    //     border-radius: 4px;
    //     background: #00a6ff;
    //     i:before {
    //       color: #fff;
    //     }
    //   }
    // }
    .el-menu-item-group__title {
      display: none;
    }
    .itemOne {
      font-size: 14px;
      i {
        font-size: 18px;
        margin-right: 16px;
      }
      .item-button {
        width: 160px;
        padding: 0 12px;
        height: 36px;
        line-height: 36px;
      }
    }
    .is-active .itemOne .item-button {
      color: #fff;
      box-shadow: 0px 0px 20px 0px rgba(64, 67, 100, 0.2);
      border-radius: 4px;
      i:before {
        color: #fff;
      }
    }
    .one-menuItem {
      padding: 0px !important;
    }
  }
  .logo {
    width: 100%;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #f2f7f9;
    border: 1px solid #f2f7f9;
    img {
      margin: 0 auto;
      width: 160px;
      display: block;
    }
  }
  .small-logo {
    width: 100%;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #f2f7f9;
    border: 1px solid #f2f7f9;
    img {
      margin: 0 auto;
      width: 45px;
      display: block;
    }
  }
  .aside-useinfo {
    line-height: 20px;
    padding: 16px;
    border-bottom: 1px solid #f2f4f7;
    .user-avator {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
// 校务专用样式
.app-school {
  .header-nav__slider .el-menu .is-active .itemOne .item-button {
    background: @schoolBaseColor;
  }
}
</style>
