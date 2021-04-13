<template>
  <div class="small-dialog popTips permissionDilaog">
    <el-dialog
      title="提示"
      :visible.sync="showDialog"
      width="500px"
      @close="handClose"
      :modal-append-to-body="false"
    >
      <div class="dialog-content">
        <span>{{ $Tool.getStorage("permissionTip") }}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="handClose"
          >确定</el-button
        >
        <el-button size="mini" @click="handClose">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "popTips",
  props: {},
  components: {},
  data() {
    return {
      showDialog: false,
    };
  },
  created() {
    console.log();
  },
  watch: {
    showPermisssionDilaog(n) {
      this.showDialog = n;
    },
  },
  computed: {
    showPermisssionDilaog() {
      return this.$store.state.permisssionDilaog;
    },
  },

  methods: {
    // 关闭弹框
    handClose() {
      this.$store.dispatch("showPermisssionDilaog", false);
      this.getStafferInfo();
    },
    getStafferInfo() {
      this.$http
        .getStafferInfo({
          school_id: this.$Tool.getStorage("SCHOOL_ID"),
          re_postbe_id: this.$Tool.getStorage("re_postbe_id"),
        })
        .then((res) => {
          if (res.data.error == 0) {
            const {
              postrole_id,
              dataequity,
              school_id,
              school_cnname,
              company_id,
              postpart_isteregulator,
              postpart_isbeike, // 是否备课权限
              postpart_istraining, // 是否培训权限
              postpart_isregister, // 是否教务权限
            } = res.data.result;
            this.$Tool.setStorage("UserInfo", res.data.result); //用户信息
            this.$Tool.setStorage("COMPANY_ID", company_id);
            this.$Tool.setStorage("SCHOOL_ID", school_id);
            this.$Tool.setStorage(
              "postpart_isteregulator",
              postpart_isteregulator
            );
            this.$Tool.setStorage("postrole_id", postrole_id);
            this.$Tool.setStorage("dataequity", dataequity);
            this.$store.dispatch("setUserInfo", res.data.result);
            this.$store.dispatch("setSchool_id", school_id);
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
            window.location.href = "/"; //刷新页面
          }
        });
    },
  },
};
</script>

<style lang="less">
.small-dialog {
  z-index: 9999;
}
</style>
