<template>
  <div class="page-header">
    <div class="header">
      <!-- 折叠按钮 -->
      <div class="header-left">
        <div class="collapse-btn" @click="toggleCollapse">
          <i class="icon-menu"></i>
        </div>
      </div>
      <div class="header-middle">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item
            v-for="(el, idx) in menuList"
            :key="el.id"
            :index="el.id"
            v-if="el.show"
          >
            <div>
              <i :class="el.icon"></i>
              {{ el.name }}
            </div>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="header-right">
        <!-- 切换学校 -->
        <div class="flex-al">
          <div class="btn-fullscreen" @click="showSchool()">
            <el-tooltip
              class="item"
              effect="dark"
              :content="changeSchool.schoolCnname"
              placement="bottom"
            >
              <span class="schoolCnname">{{ changeSchool.schoolCnname }}</span>
            </el-tooltip>
          </div>
          <div class="flex-al ml5 cur-pointer" @click="showSchool()">
            <i class="icon-qhyuyan mr5"></i>
            {{ $t("Common.header.schoolTab") }}
          </div>
        </div>
        <div class="head-line"></div>
        <!-- 消息提示 -->
        <el-dropdown
          class="message-dropdown"
          trigger="click"
          @command="handleCommandMessage"
        >
          <div class="use-message">
            <el-badge :value="0" class="item">
              <i class="icon-xiaoxi"></i>
            </el-badge>
          </div>
          <el-dropdown-menu class="message-menu-dropdown" slot="dropdown">
            <el-dropdown-item
              v-for="(item, index) in messageList"
              :key="index"
              divided
              :command="
                item.message_types == '0' ? 'system_notice' : 'notice_message'
              "
            >
              <div class="notice-top fs14 flex-all mb12">
                <span class="color-243 flex-al">
                  <span
                    class="icon icon-xitong mr8"
                    :class="{
                      'icon-tongzhi': item.message_type == '1',
                      'no-read': !item.is_read,
                    }"
                  ></span>
                  {{ item.message_type_name }}
                </span>
                <span class="time">{{ item.time }}</span>
              </div>
              <div class="notice-cont">{{ item.cont }}</div>
            </el-dropdown-item>
            <el-dropdown-item class="seeMore" divided command="see_more"
              >查看更多</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>

        <div class="head-line"></div>
        <!-- 登陆人信息 -->
        <div class="user-des mr10">
          <span class="user-department mr8">{{ userDataInfo.post_name }}</span>
          <span>-</span>
          <span class="user-name ml8">{{ userDataInfo.staffer_cnname }}</span>
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown
          class="user-option-dropdown"
          trigger="click"
          @command="handleCommand"
        >
          <div class="user-show">
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
              <img
                v-else
                src="../../../assets/images/default-new-men.png"
                alt
              />
            </div>
            <i class="mh-select icon-sxuanxiala"></i>
          </div>

          <el-dropdown-menu class="user-menu-dropdown" slot="dropdown">
            <el-dropdown-item divided command="userInfo">
              <i class="icon-grzx"></i>
              {{ $t("Common.header.userOperate1") }}
            </el-dropdown-item>
            <el-dropdown-item divided command="userSetting">
              <i class="icon-sz"></i>
              {{ $t("Common.header.userOperate2") }}
            </el-dropdown-item>
            <el-dropdown-item divided command="loginout">
              <!-- <i class="icon-sz"></i> -->
              {{ $t("Common.header.userOperate3") }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 退出登录 -->
    <popTips
      :dialogVisable="logOut"
      :popTipsCont="popTips_login"
      @handConfirm="logOutSubmit()"
      @handCancel="logOut = false"
      @handleCloseTip="logOut = false"
    ></popTips>
    <!-- 公共操作框 -->
    <div class="slider_nav_box" v-if="showSliderNav">
      <div class="items" @click="linkToChoose">
        <span class="icon icon_1"></span>
        <span class="txt">切换集团</span>
      </div>
      <!-- <div tag="div" class="items">
        <span class="icon icon_2"></span>
        <span class="txt">教学视频</span>
      </div>
      <router-link :to="{'path': '/'}" tag="div" class="items">
        <span class="icon icon_3"></span>
        <span class="txt">常见问题</span>
      </router-link>
      <div class="items">
        <span class="icon icon_4"></span>
        <span class="txt">查看文档</span>
      </div>-->
    </div>
    <!-- 切换学校弹框 -->
    <div class="small-dialog popTips" v-if="changeSchool.showlVisable">
      <el-dialog
        :title="$t('Common.header.changeSchoolTitle')"
        :visible="changeSchool.showlVisable"
        width="700px"
        class="choose-changeSchool-popTips"
        @close="changeSchool.showlVisable = false"
        :modal-append-to-body="false"
      >
        <div class="dialog-content">
          <div class="flex-wrap">
            <div class="flex-al mb12">
              <div class="select-box" style="width: 140px">
                <el-select
                  v-model="changeSchool.filter.district_id"
                  clearable
                  filterable
                  :placeholder="$t('Common.header.changeSchool.placeholder1')"
                  @change="schoolSearch"
                >
                  <el-option
                    v-for="item in changeSchool.filter.districtList"
                    :key="item.district_id"
                    :label="item.district_cnname"
                    :value="item.district_id"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="lines ml10 mr10 mb12"></div>
            <div class="flex-al mb12">
              <div class="select-box" style="width: 115px">
                <el-select
                  v-model="changeSchool.filter.province"
                  clearable
                  filterable
                  :placeholder="$t('Common.header.changeSchool.placeholder2')"
                  @change="schoolProviceSearch"
                >
                  <el-option
                    v-for="item in changeSchool.filter.provinceList"
                    :key="item.region_id"
                    :label="item.region_name"
                    :value="item.region_id"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="lines ml10 mr10 mb12"></div>
            <div class="flex-al mb12">
              <div class="select-box" style="width: 115px">
                <el-select
                  v-model="changeSchool.filter.city"
                  clearable
                  filterable
                  :placeholder="$t('Common.header.changeSchool.placeholder3')"
                  @change="schoolSearch"
                >
                  <el-option
                    v-for="item in changeSchool.filter.cityList"
                    :key="item.region_id"
                    :label="item.region_name"
                    :value="item.region_id"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="lines ml10 mr10 mb12"></div>
            <div class="flex-al Inquire-box mb12">
              <el-input
                style="width: 220px"
                v-model="changeSchool.filter.keyword"
                clearable
                :placeholder="$t('Common.header.changeSchool.placeholder4')"
                @clear="schoolSearch"
                @keyup.enter.native="schoolSearch"
              >
                <i
                  slot="suffix"
                  @click="schoolSearch"
                  class="el-input__icon cur-pointer el-icon-search"
                ></i>
              </el-input>
            </div>
          </div>
          <!-- 学校列表显示 -->
          <div class="school clearFloat">
            <div class="school-list pull-left">
              <div
                class="list-item"
                v-for="(item1, index1) in changeSchool.schoolList"
                :key="index1"
              >
                <div class="title">{{ item1.companyName }}</div>
                <ul class="list">
                  <li
                    v-for="(item2, index2) in item1.list"
                    :key="index2"
                    @click="selSchool(index1, index2, item1, item2)"
                    @dblclick="dbSelSchool(index1, index2, item1, item2)"
                    :class="{
                      active:
                        index2 == changeSchool.current &&
                        changeSchool.pagecurrent == index1,
                    }"
                  >
                    {{ item2.school_shortname }}&nbsp;&nbsp;({{
                      item2.school_branch
                    }})
                  </li>
                </ul>
              </div>
            </div>
            <div class="letter pull-right">
              <ul>
                <li
                  v-for="(item1, index1) in changeSchool.letter1"
                  :key="index1"
                  @click="SelectLetter(item1)"
                >
                  <span>{{ item1 }}</span>
                </li>
              </ul>
              <ul>
                <li
                  v-for="(item2, index2) in changeSchool.letter2"
                  :key="index2"
                  @click="SelectLetter(item2)"
                >
                  <span>{{ item2 }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="HandleButton">{{
            $t("Common.btn_sure")
          }}</el-button>
          <el-button size="mini" @click="changeSchool.showlVisable = false">
            {{ $t("Common.btn_cancel") }}
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import popTips from "@/components/common/popTips/popTips.vue";
import headerHttp from "./headerHttp.js";
export default {
  name: "Header",
  props: ["isCollapse"],
  data() {
    return {
      refush: false, // 刷新跳转
      showSliderNav: true,
      // activeIndex: "1",
      languagType: "", //语言
      logOut: false, //退出登录
      //退出登录****弹窗
      popTips_login: {
        btn_text1: this.$t("Common.btn_sure"),
        btn_text2: this.$t("Common.btn_cancel"),
        title: this.$t("Common.pop_title"),
        context: this.$t("Common.log_out_cont"),
      },
      menuList: [
        {
          id: "3",
          icon: "icon icon-jwgl",
          name: "叮铛助教",
          show: true,
        },
        {
          id: "4",
          icon: "icon icon-jwgl",
          name: this.$t("Common.header.nav_name3"),
          show:
            this.$Tool.getStorage("postpart_isregister") === "1" ||
            this.$userDetails.account_class == 1,
        },
        {
          id: "1",
          icon: "icon icon-qbk",
          name: this.$t("Common.header.nav_name1"),
          show:
            this.$Tool.getStorage("postpart_isbeike") === "1" ||
            this.$userDetails.account_class == 1,
        },
        {
          id: "2",
          icon: "icon icon-px",
          name: this.$t("Common.header.nav_name2"),
          show:
            this.$Tool.getStorage("postpart_istraining") === "1" ||
            this.$userDetails.account_class == 1,
        },
      ],
      // 消息列表
      messageList: [
        {
          message_type: "0", //0是系统通知
          message_type_name: "系统通知",
          time: "2019-10-15  11:50",
          is_read: true, //是否已读
          cont:
            "8-19日19:00发布系统升级，可能短时间内不可使用，请你谅解～，恢复会通知",
        },
        {
          message_type: "1", //0是系统通知
          message_type_name: "通知消息",
          time: "2019-10-15  11:50",
          is_read: false, //是否已读
          cont:
            "8-19日19:00发布系统升级，可能短时间内不可使用，请你谅解～，恢复会通知",
        },
      ],
      // 切换学校
      changeSchool: {
        showlVisable: false,
        current: -1,
        pagecurrent: -1,
        schoolCnname: "赫奇帕奇国际学校", //学校名称
        schoolItem: "", //暂存选择的学校
        // 检索
        filter: {
          district_id: "",
          province: "",
          city: "",
          keyword: "", //关键词
          letter: "", //字母
          districtList: [], //区域下拉列表
          provinceList: [], //省下拉列表
          cityList: [], //市下拉列表
        },
        schoolList: [], //学校列表
        // 字母列表
        letter1: [],
        letter2: [],
      },
      schoolId: "",
      companyId: "",
      postbe_id: "",
      status: "", //判断是否可以切换至校务
      schoolOneInfo: {}, //单个学校的信息
    };
  },
  components: {
    // noBorderTableCont,
    popTips,
  },
  created() {
    this.languagType = this.$Tool.getStorage("language")
      ? this.$Tool.getStorage("language")
      : "zh";
    // 默认学校显示
    this.changeSchool.schoolCnname = this.$Tool.getStorage("UserInfo")
      ? this.$Tool.getStorage("UserInfo").school_shortname
      : {};
  },
  methods: {
    //获取教师信息 -- wgh
    getStafferInfo() {
      this.$http
        .getStafferInfo({
          school_id: this.$Tool.getStorage("SCHOOL_ID"),
          re_postbe_id: this.$Tool.getStorage("re_postbe_id"),
        })
        .then((res) => {
          console.log(res);
          if (res.data.error == 0) {
            const {
              postrole_id,
              dataequity,
              school_id,
              school_cnname,
              school_shortname,
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
            // this.changeSchool.schoolCnname = school_cnname;
            this.changeSchool.schoolCnname = school_shortname;
            this.changeSchool.showlVisable = false;
            window.location.href = "/"; //刷新页面

            // if (this.refush) {
            //   window.location.href = "/"; //刷新页面
            // } else {
            //   this.$router.go(0);
            // }
          }
        });
    },
    // 侧边栏折叠
    toggleCollapse() {
      this.$emit("toggleCollapse", !this.isCollapse);
    },
    //导航栏模块选择
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.$Tool.setStorage("sliderActiveIndex", "0");
      this.$store.dispatch("setActiveIndex", "0");
      this.$Tool.setStorage("navActiveIndex", key);
      this.$store.dispatch("setNavActiveIndex", key);
      if (key == 1) {
        this.$router.push({ path: "/Interesting/index" });
      } else if (key == 2) {
        // this.$message.error("功能正在建设中");
        this.$router.push({ path: "/Training/CareerGrowth" });
      } else if (key == 3) {
        this.$router.push({ path: "/Educational/index" });
      } else if (key == 4) {
        this.$router.push({ path: "/Educational/mySchedule" });
      }
    },
    // 点击显示学校
    showSchool() {
      // 初始化数据
      this.changeSchool.filter.district_id = "";
      this.changeSchool.filter.province = "";
      this.changeSchool.filter.city = "";
      this.changeSchool.filter.keyword = "";
      this.changeSchool.filter.letter = "";
      // 筛选学校
      this.getSchool(); //获取学校
      this.getProvince(); //获取省份列表
      this.getDistrict(); //获取大区域
      this.changeSchool.showlVisable = true;
    },
    // 大区域 -- 筛选区域
    getDistrict() {
      headerHttp.getDistrict({}).then((res) => {
        const { error, result } = res.data;
        if (error == 0) {
          this.changeSchool.filter.districtList = result.data;
        } else {
          this.changeSchool.filter.districtList = [];
        }
      });
    },
    // 获取省份
    getProvince() {
      headerHttp.getProvince({}).then((res) => {
        const { error, result } = res.data;
        if (error == 0) {
          this.changeSchool.filter.provinceList = result.data;
        } else {
          this.changeSchool.filter.provinceList = [];
        }
      });
    },
    // 获取城市
    getCity() {
      headerHttp
        .getCity({
          region_id: this.changeSchool.filter.province,
        })
        .then((res) => {
          const { error, result } = res.data;
          if (error == 0) {
            this.changeSchool.filter.cityList = result.data;
          } else {
            this.changeSchool.filter.cityList = [];
          }
        });
    },
    //获取学校
    getSchool() {
      headerHttp
        .getSchool({
          keyword: this.changeSchool.filter.keyword,
          district_id: this.changeSchool.filter.district_id,
          school_province: this.changeSchool.filter.province,
          school_city: this.changeSchool.filter.city,
          school_cnname_initial: this.changeSchool.filter.letter,
        })
        .then((res) => {
          const { error, result } = res.data;
          if (error == 0) {
            const { data } = result;
            var list1 = [];
            var letter = data.initial;

            data.forEach((item, index) => {
              var company_name = "",
                company_id = "";
              var arr1 = {};
              var list2 = [];

              item.forEach((item1, index1) => {
                var arr2 = {};
                company_name = item1.company_cnname;
                company_id = item1.company_id;
                arr2.school_shortname = item1.school_shortname;
                arr2.school_id = item1.school_id;
                arr2.school_cnname = item1.school_cnname;
                arr2.school_branch = item1.school_branch;
                arr2.postbe_id = item1.postbe_id;
                arr2.status = item1.status;
                // 默认当前学校
                if (this.userDataInfo.school_id == item1.school_id) {
                  this.changeSchool.current = index1;
                  this.changeSchool.pagecurrent = index;
                }
                list2.push(arr2);
              });
              arr1.companyName = company_name;
              arr1.company_id = company_id;
              arr1.list = list2;
              list1.push(arr1);
            });
            console.log(list1, 'list1');
            this.changeSchool.schoolList = list1;

            //字母显示
            this.changeSchool.letter1 = []; //清空
            this.changeSchool.letter2 = [];
            letter.forEach((item, index) => {
              if (index < letter.length / 2) {
                this.changeSchool.letter1.push(item);
              } else {
                this.changeSchool.letter2.push(item);
              }
            });
          } else {
            this.changeSchool.schoolList = [];
          }
        });
    },
    // 切换学校检索
    schoolSearch() {
      this.getSchool(); //获取学校
    },
    // 切换学校--省份检索
    schoolProviceSearch() {
      this.changeSchool.filter.city = "";
      this.getCity(); //// 获取城市
      this.getSchool(); //获取学校
    },
    // 字母筛选学校
    SelectLetter(v) {
      this.changeSchool.filter.letter = v;
      this.getSchool(); //获取学校
    },
    //学校选择
    selSchool(key1, key2, item1, item2) {
      this.changeSchool.current = key2;
      this.changeSchool.pagecurrent = key1;
      // this.changeSchool.schoolItem = item2.school_cnname;
      this.changeSchool.schoolItem = item2.school_shortname;
      this.schoolId = item2.school_id;
      this.companyId = item1.company_id;
      this.postbe_id = item2.postbe_id ? item2.postbe_id : 0;
      this.$Tool.setStorage("SCHOOL_ID", this.schoolId);

      this.schoolOneInfo = item2;
    },
    // 双击选择学校
    dbSelSchool(key1, key2, item1, item2) {
      console.log(key1, key2, item1, item2);
      this.changeSchool.current = key2;
      this.changeSchool.pagecurrent = key1;
      // this.changeSchool.schoolItem = item2.school_cnname;
      this.changeSchool.schoolItem = item2.school_shortname;
      this.schoolId = item2.school_id;
      this.companyId = item1.company_id;
      this.postbe_id = item2.postbe_id ? item2.postbe_id : 0;
      this.$Tool.setStorage("SCHOOL_ID", this.schoolId);

      this.schoolOneInfo = item2;
      this.HandleButton();
    },
    // 选择学校确定
    HandleButton() {
      if (this.changeSchool.schoolItem != "") {
        this.$http
          .addStafferSchoolAction({
            newschool_id: this.schoolId,
          })
          .then((res) => {
            const { error, errortip } = res.data;
            if (error == 0) {
              this.$Tool.setStorage("re_postbe_id", this.postbe_id);
              this.$Tool.removeStorage("sliderIndex");
              this.$Tool.setStorage("schoolItem", this.changeSchool.schoolItem);
              this.$Tool.setStorage("SCHOOL_ID", this.schoolId);
              this.$Tool.setStorage("COMPANY_ID", this.companyId);
              this.$store.dispatch("setSchool_id", this.schoolId);
              this.$store.dispatch("setCompany_id", this.companyId);
              // if (window.location.href.indexOf("?") != -1) {
              //   this.refush = true;
              //   this.$Tool.setStorage("openMenu", ["0"]);
              //   this.$store.dispatch("setOpenMenu", ["0"]);
              //   this.$Tool.setStorage("sliderActiveIndex", "0");
              //   this.$store.dispatch("setActiveIndex", "0");
              //   this.$Tool.setStorage("navActiveIndex", 0);
              //   this.$store.dispatch("setNavActiveIndex", 0);
              // } else {
              //   this.refush = false;
              // }
              this.$Tool.setStorage("status", this.schoolOneInfo.status); //判断是否可以切换至校务
              this.status = this.schoolOneInfo.status; //判断是否可以切换至校务
            } else {
              this.$message.error(errortip);
            }
            this.getStafferInfo();
          });
      }
    },
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      // 退出登录
      if (command == "loginout") {
        this.logOut = true;
      } else if (command == "userInfo") {
        // 个人中心
        // this.$message.error("功能正在建设中");
        this.$Tool.setStorage("sliderActiveIndex", "0");
        this.$store.dispatch("setActiveIndex", "0");
        this.$Tool.setStorage("navActiveIndex", "5");
        this.$store.dispatch("setNavActiveIndex", "5");
        this.$router.push("/myCenter/myClass");
      } else if (command == "userSetting") {
        // 个人设置
        // this.$message.error("功能正在建设中");
        this.$Tool.setStorage("sliderActiveIndex", "0");
        this.$store.dispatch("setActiveIndex", "0");
        this.$Tool.setStorage("navActiveIndex", "6");
        this.$store.dispatch("setNavActiveIndex", "6");
        this.$router.push("/mySettings/myInfo");
      }
    },
    // 显示消息
    showMemessage() {
      // this.$message.error("功能正在建设中");
    },
    // 切换消息下拉菜单选择事件
    handleCommandMessage(command) {
      this.$Tool.setStorage("sliderActiveIndex", "0");
      this.$store.dispatch("setActiveIndex", "0");
      this.$Tool.setStorage("navActiveIndex", "7");
      this.$store.dispatch("setNavActiveIndex", "7");
      // this.$router.push("/message");
      if (command == "see_more") {
        this.$router.push("/message");
      } else {
        this.$router.push("/message/messageDetail");
      }
      console.log(command);
    },
    // 退出登录提交
    logOutSubmit() {
      window.localStorage.clear();
      location.href = this.$urls.wpc;
    },
    // 切换集团
    linkToChoose() {
      let languageData = this.$Tool.getStorage("language");
      axios
        .get(`${this.$urls.wpcApi}/Login/ChangePostApi`, { params: {} })
        .then((res) => {
          console.log(res);
          if (res.data.error == 0) {
            const { isAdmin, status } = res.data;
            let token = this.$userDetails.token;
            let id = this.$userDetails.stafferId;
            let cid = this.$userDetails.companyId;
            let sid = this.$userDetails.schoolId;
            window.localStorage.clear();
            window.location.href = `${this.$urls.wpc}/choose?token=${token}&staffer_id=${id}&company_id=${cid}&school_id=${sid}&status=${status}&isAdmin=${isAdmin}&language=${languageData}`;
          }
        });
    },
    // 重置表单
    resetForm(form) {
      if (this.$refs[form]) {
        this.$refs[form].resetFields();
      }
    },
    // 侧边栏和中间弹框******关闭
    handleClose(done) {
      done();
    },
  },
  watch: {},
  mounted() {
    let _this = this;

    //兼容性写法，该函数也是网上别人写的，不过找不到出处了，蛮好的，所有我也没有必要修改了
    //判断鼠标滚轮滚动方向
    if (window.addEventListener)
      //FF,火狐浏览器会识别该方法
      window.addEventListener("DOMMouseScroll", wheel, false);
    window.onmousewheel = document.onmousewheel = wheel; //W3C
    //统一处理滚轮滚动事件
    function wheel(event) {
      var delta = 0;
      if (!event) event = window.event;
      if (event.wheelDelta) {
        //IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
        delta = event.wheelDelta / 120;
        if (window.opera) delta = -delta; //因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
      } else if (event.detail) {
        //FF浏览器使用的是detail,其值为“正负3”
        delta = -event.detail / 3;
      }
      if (delta) handle(delta);
    }
    //上下滚动时的具体处理函数
    function handle(delta) {
      if (delta < 0) {
        //向下滚动
        _this.showSliderNav = false;
      } else {
        //向上滚动
        _this.showSliderNav = true;
      }
    }
  },
  computed: {
    activeIndex() {
      return this.$store.state.navActiveIndex;
    },
    userDataInfo() {
      return this.$store.state.USER_INFO;
    },
  },
};
</script>
<style lang="less">
@import url("./header.less");
</style>
