<template>
  <div class="havePermission">
    <div class="page-havePermission">
      <div class="img">
        <img src="../../assets/images/img-noPermission.png" class="img-container" alt />
      </div>
      <p class="title">{{$t('src.views.Permission.noPermission.521kconwl9k0')}}</p>
      <!-- <p class="font-lightgray h3">
        <span class="time">{{time}}</span>秒后自动跳转
      </p>-->
      <!-- <el-button
        type="primary"
        style="width:100px;height:30px;text-align:center;line-height:2px"
      >{{$t('src.views.Permission.noPermission.521kconwmdo0')}}</el-button>-->
      <div class="building-container"></div>
      <div class="car-container"></div>
      <div class="bottom-container"></div>
    </div>
  </div>
</template>
<script>
// import PageNav from "../../components/Nav/nav.vue";
// import axios from "axios";
export default {
  name: "havePermission",
  data() {
    return {
      openMenu: ["1"],
      time: 3,
      timer: ""
    };
  },
  components: {
    // PageNav
  },
  created() {
    // this.isjump();
    // this.slider = this.$store.state.Slider;
  },
  mounted() {}
  // methods: {
  //   isjump() {
  //     axios
  //       .get("http://gmcapi.kidcastle.org/Company/getCompanyidApi", {
  //         params: {
  //           staffer_id: this.$route.query.staffer_id,
  //           token: this.$route.query.token,
  //           company_id: this.$route.query.company_id,
  //           re_postbe_id:this.$route.query.postbe_id
  //         }
  //       })
  //       .then(res => {
  //         if (res.data.error == 0) {
  //           this.$Tool.setStorage("sliderActiveIndex", "0-1");
  //           this.$store.dispatch("setActiveIndex", "0-1");
  //           this.$Tool.setStorage("openMenu", ["0"]);
  //           this.$store.dispatch("setOpenMenu", ["0"]);
  //           // this.$Tool.setStorage("module_id", ['0']);
  //           // this.$Tool.setStorage("module_id", id);
  //           const { company_cnname, dataequity } = res.data.result;
  //           console.log(parseInt(dataequity))
  //           this.$Tool.setStorage('dataequity', parseInt(dataequity))
  //           this.dataequity=parseInt(dataequity);
  //           this.$Tool.setStorage("SCHOOL_NAME", company_cnname);
  //           window.localStorage.setItem(
  //             "staffer_id",
  //             this.$route.query.staffer_id
  //           );
  //           let role_id = res.data.result.postrole_id;
  //           window.localStorage.setItem(
  //             "re_postbe_id",
  //             this.$route.query.postbe_id ? this.$route.query.postbe_id : 0
  //           );
  //           window.localStorage.setItem("CURRENT_USER_POSTROLE_ID", role_id);
  //           window.localStorage.setItem("token", this.$route.query.token);
  //           window.localStorage.setItem(
  //             "SCHOOL_ID",
  //             this.$route.query.school_id
  //           );
  //           window.localStorage.setItem(
  //             "company_id",
  //             res.data.result.company_id
  //           );
  //           this.$store.dispatch("setToken", this.$route.query.token);
  //           this.$store.dispatch("setStaffer_id", this.$route.query.staffer_id);
  //           this.$store.dispatch("setCompany_id", res.data.result.company_id);
  //           this.Countdown();
  //         } else {
  //           this.$router.push("/noPermission");
  //         }
  //       });
  //   },
  //   Countdown() {
  //     this.timer = setInterval(() => {
  //       if (this.time > 1) {
  //         this.time--;
  //       } else {
  //         // window.location.replace(`${window.location.origin}/home`);
  //         window.location = `${window.location.origin}/home?dataequity=${this.dataequity}`;
  //         clearInterval(this.timer);
  //       }
  //     }, 1000);
  //   },

  //   jump() {
  //     clearInterval(this.timer);
  //     window.location = `${window.location.origin}/home?dataequity=${this.dataequity}`;
  //   }
  // }
};
</script>
<style lang="less">
.havePermission {
  margin: 0 auto;
  height: 100vh;
  font-size: 20px;
  .el-aside {
    display: none;
  }
}
.page-havePermission {
  text-align: center;
  padding-top: 15%;
  .title {
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: #333;
    line-height: 37px;
    margin-top: -70px;
  }
  .time {
    color: rgba(208, 2, 27, 1);
    font-weight: 500;
  }
  .img {
    width: 299px;
    background: #fff;
    margin: 30px auto 20px auto;
    padding: 15px 30px;
    img {
      width: 100%;
    }
  }
  button {
    margin-top: 20px;
  }
  // .square-container{
  //   width: 538px;
  //   height: 464px;
  //   background-image: url("../../assets/images/Group 7.png");
  //   // background: pink;
  // }
  .bottom-container {
      background-image: url("../../assets/images/road.png");
      // background-size: contain;
      background-size: 100% 100%;
      width: 100%;
      height: 30px;
      background-repeat: no-repeat;
      position: absolute;
      left: 0px;
      bottom: 0px;
      z-index: -111;
    }
    .car-container {
      background-image: url("../../assets/images/car.png");
      // background-size: contain;
      // background-size: 100% 100%;
      width: 120px;
      height: 60px;
      background-repeat: no-repeat;
      position: absolute;
      left: 1500px;
      bottom: 16px;
      z-index: 999;
    }
    .building-container {
      background-image: url("../../assets/images/building.png");
      // background-size: contain;
      // background-size: 100% 100%;
      width: 230px;
      height: 140px;
      background-repeat: no-repeat;
      position: absolute;
      left: 170px;
      bottom: 24px;
      z-index: 999;
    }
}
</style>
