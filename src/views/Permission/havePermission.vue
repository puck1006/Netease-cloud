<template>
  <div class="havePermission">
    <div class="page-havePermission">
      <p class="title">
        {{ $t("src.views.Permission.havePermission.521kbt5n8b40") }}
      </p>
      <div class="img">
        <img src="../../assets/images/img-havePermission.png" alt />
      </div>
      <p class="font-lightgray h3">
        <span class="time">{{ time }}</span>
        {{ $t("src.views.Permission.havePermission.521kbt5na6c0") }}
      </p>
      <el-button
        type="primary"
        style="width: 100px; height: 30px; text-align: center; line-height: 2px"
        @click="linkToIndex"
        >{{ $t("src.views.Permission.havePermission.521kbt5naho0") }}</el-button
      >
      <div class="square-container"></div>
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
      time: 3,
      timer: null,
    };
  },
  components: {
    // PageNav
  },
  created() {
    this.token = this.$route.query.token;
    this.stafferId = this.$route.query.staffer_id;
    this.companyId = this.$route.query.company_id;
    this.postbeId = this.$route.query.postbe_id;
    this.schoolId = this.$route.query.school_id;
    this.isAdmin = this.$route.query.isAdmin;
    window.localStorage.clear(); //先清空数据
    console.log(this.token, this.stafferId, this.companyId);
    this.getStafferInfo(); //获取教师信息 -- wgh
  },
  mounted() {},
  methods: {
    //获取教师信息 -- wgh
    getStafferInfo() {
      this.$http
        .getStafferInfo({
          token: this.token,
          staffer_id: this.stafferId,
          company_id: this.companyId,
          school_id: this.schoolId,
          re_postbe_id: this.$route.query.postbe_id,
        })
        .then((res) => {
          console.log(res);
          if (res.data.error == 0) {
            const {
              postrole_id,
              dataequity,
              school_id,
              company_id,
              postpart_isteregulator,
              postpart_isbeike,
              postpart_istraining,
              postpart_isregister
            } = res.data.result;
            this.$Tool.setStorage("UserInfo", res.data.result); //用户信息
            this.$Tool.setStorage("USER_TOKEN", this.token);
            this.$Tool.setStorage("STAFFER_ID", this.stafferId);
            this.$Tool.setStorage("COMPANY_ID", company_id);
            this.$Tool.setStorage(
              "postpart_isteregulator",
              postpart_isteregulator
            );
            this.$Tool.setStorage(
              "re_postbe_id",
              this.postbeId ? this.postbeId : ""
            );
            this.$Tool.setStorage("postrole_id", postrole_id);
            this.$Tool.setStorage("dataequity", dataequity);
            this.$Tool.setStorage("SCHOOL_ID", this.schoolId);
            this.$Tool.setStorage("language", this.$route.query.language);
            this.$Tool.setStorage("ISADMIN", this.$route.query.isAdmin);
            this.$store.dispatch("setUserInfo", res.data.result);
            this.$store.dispatch("setToken", this.token);
            this.$store.dispatch("setStaffer_id", this.stafferId);
            this.$store.dispatch("setSchool_id", this.schoolId);
            this.$store.dispatch("setCompany_id", company_id);

            this.$Tool.setStorage("postpart_isbeike", postpart_isbeike);
            this.$Tool.setStorage("postpart_istraining", postpart_istraining);
            this.$Tool.setStorage("postpart_isregister", postpart_isregister);
            this.$Tool.setStorage("openMenu", ["0"]);
            this.$store.dispatch("setOpenMenu", ["0"]);
            this.$Tool.setStorage("sliderActiveIndex", "0");
            this.$store.dispatch("setActiveIndex", "0");
            this.$Tool.setStorage("navActiveIndex", "3");
            this.$store.dispatch("setNavActiveIndex", "3");

            this.timer = setInterval(() => {
              this.time--;
              if (this.time == 0) {
                window.location.href = window.location.origin;
              }
            }, 1000);
          } else {
            this.$router.replace("/noPermission");
          }
        });
    },
    linkToIndex() {
      clearInterval(this.timer);
      window.location.href = window.location.origin;
    },
  },
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
  }
  .time {
    color: rgba(208, 2, 27, 1);
    font-weight: 500;
  }
  .img {
    width: 250px;
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
  .square-container {
    background-image: url("../../assets/images/Group 7.png");
    width: 538px;
    height: 464px;
    position: absolute;
    right: 0px;
    bottom: 0px;
    z-index: -111;
  }
}
</style>
