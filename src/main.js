import Vue from "vue";
import App from "./App.vue";
import router from "./routers/main-router";
import "./plugins/element.js";
import locale from "element-ui/lib/locale";
import VueI18n from "vue-i18n";
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import zhTwLocale from "element-ui/lib/locale/lang/zh-TW";
import store from "./store/store";
import Tool from "./utils/tool";
import httpService from "./utils/http";
import axios from "axios";
import Common from "./utils/common"; //公共数据请求方法
import urls from "./routerUrl";
import zhStoreLang from "./storeLang/store-cn";
import twStoreLang from "./storeLang/store-tw";
import permissionDilaog from "./components/common/popTips/popTips.vue"

import { Message, Loading } from "element-ui";
let localeLang;
if (window.location.href.indexOf("havePermission") > -1) {
  localeLang = Tool.getParameter("language");
} else {
  localeLang = Tool.getStorage("language") ? Tool.getStorage("language") : "zh";
}
let userDetails = {
  token: Tool.getStorage("USER_TOKEN") ? Tool.getStorage("USER_TOKEN") : "",
  stafferId: Tool.getStorage("STAFFER_ID") ? Tool.getStorage("STAFFER_ID") : "",
  schoolId: Tool.getStorage("SCHOOL_ID") ? Tool.getStorage("SCHOOL_ID") : "",
  companyId: Tool.getStorage("COMPANY_ID") ? Tool.getStorage("COMPANY_ID") : "",
  re_postbe_id: Tool.getStorage("re_postbe_id")
    ? Tool.getStorage("re_postbe_id")
    : "0",
  dataequity: Tool.getStorage("dataequity")
    ? Tool.getStorage("dataequity")
    : "",
  account_class: Tool.getStorage("UserInfo")
    ? Tool.getStorage("UserInfo").account_class
    : "",
  language_type: localeLang,
};
let UserInfo = Tool.getStorage("UserInfo") ? Tool.getStorage("UserInfo") : {};
let isLessonPlan = Tool.getStorage("isLessonPlan");
Vue.use(VueI18n);
// 语言切换
const i18n = new VueI18n({
  locale: localeLang,
  messages: {
    zh: Object.assign(
      require("./langs/cn.js"),
      zhLocale,
      require("./locales/zh-cn.json")
    ), //将我们项目中的语言包与Element的语言包进行合并
    en: Object.assign(
      require("./langs/en.js"),
      enLocale,
      require("./locales/en.json")
    ),
    tw: Object.assign(
      require("./langs/tw.js"),
      zhTwLocale,
      require("./locales/zh-tw.json")
    ),
  },
});
locale.i18n((key, value) => i18n.t(key, value)); //为了实现element插件的多语言切换
if (localeLang == "zh") {
  store.dispatch("setSlider", zhStoreLang.Slider);
} else {
  store.dispatch("setSlider", twStoreLang.Slider);
}
if (isLessonPlan) {
  store.dispatch("setIsLessonPlan", isLessonPlan);
}
// // 把token,compamy_id,staffer_id绑定到原型上
store.dispatch("setToken", userDetails.token);
store.dispatch("setStaffer_id", userDetails.stafferId);
store.dispatch("setSchool_id", userDetails.schoolId);
store.dispatch("setCompany_id", userDetails.companyId);

store.dispatch("setUserInfo", UserInfo);
Vue.prototype.$userDetails = userDetails;
Vue.prototype.$UserInfo = UserInfo;
Vue.prototype.$urls = urls;
router.beforeEach((to, from, next) => {
  if (Tool.getStorage("navActiveIndex")) {
    store.dispatch("setNavActiveIndex", Tool.getStorage("navActiveIndex"));
  }
  if (Tool.getStorage("sliderActiveIndex")) {
    store.dispatch("setActiveIndex", Tool.getStorage("sliderActiveIndex"));
  }
  if (Tool.getStorage("openMenu")) {
    if (Tool.getStorage("openMenu")[0] != store.state.openMenu[0]) {
      store.dispatch("setOpenMenu", Tool.getStorage("openMenu"));
    }
  }
  next();
});
// router.beforeEach((to, from, next) => {
//     if (Tool.getStorage('module_id') && Tool.getStorage('module_id') != 'undefined') {
//         store.dispatch('setModuleId', Tool.getStorage('module_id'))
//     }
//     if (Tool.getStorage('sliderActiveIndex')) {
//         store.dispatch('setActiveIndex', Tool.getStorage('sliderActiveIndex'))
//     }
//     if (Tool.getStorage('openMenu')) {
//         if (Tool.getStorage('openMenu')[0] != store.state.openMenu[0]) {
//             store.dispatch('setOpenMenu', Tool.getStorage('openMenu'))
//         }
//     }
//     next()
// })

let loading; //定义loading变量
let time = 0,
  count = 0,
  timer = null;
// 超时时间

axios.defaults.timeout = 60000;

function startLoading() {
  //使用Element loading-start 方法
  if (count == 0) {
    loading = Loading.service({
      lock: true,
      text: i18n.t("easx.src.main.521jgst8l3k0"),
      background: "rgba(0, 0, 0, 0.5)",
    });
    count++;
    timer = setInterval(() => {
      ++time;
    }, 1000);
  }
}

function endLoading() {
  //使用Element loading-close 方法
  if (count == 1) {
    clearInterval(timer);
    loading.close();
    timer = setTimeout(() => {
      count = 0;
    }, 600);
  }
}
//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0;
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}
export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}

//http response 拦截器
axios.interceptors.response.use(
  (response) => {
    //当返回信息为未登录或者登录失效的时候重定向为登录页面
    tryHideFullScreenLoading();
    if (
      response.data.result &&
      response.data.result.tokeninc &&
      response.data.result.tokeninc == 0
    ) {
      Message.error({
        message: i18n.t("easx.src.main.521jgst8n380"),
      });
      window.localStorage.clear();
      window.location.replace(urls.wpc);
    } else if(response.data.result &&
      response.data.result.is_power === 0) {
        // Message.error(response.data.errortip);
        Tool.setStorage("permissionTip", response.data.errortip)
        store.dispatch("showPermisssionDilaog", true);

      } else {
      return response;
    }
    return response;
  },
  (error) => {
    endLoading();
    Message.error({
      message: i18n.t("easx.src.main.521jgst8ngo0"),
    });
    return Promise.reject(error);
  }
);
//http request 拦截器
axios.interceptors.request.use(
  (config) => {
    if (config.method == "get") {
      !config.params.token && (config.params.token = userDetails.token);
      !config.params.company_id &&
        (config.params.company_id = userDetails.companyId);
      !config.params.staffer_id &&
        (config.params.staffer_id = userDetails.stafferId);
      !config.params.school_id &&
        (config.params.school_id = userDetails.schoolId);
      !config.params.re_postbe_id &&
        (config.params.re_postbe_id = userDetails.re_postbe_id);
      !config.params.dataequity &&
        (config.params.dataequity = userDetails.dataequity);
      !config.params.account_class &&
        (config.params.account_class = userDetails.account_class);
      !config.params.language_type &&
        (config.params.language_type = userDetails.language_type);
    } else if (config.method == "post") {
      config.data.indexOf("token=") < 0 &&
        (config.data = `${config.data}&token=${userDetails.token}`);
      config.data.indexOf("company_id=") < 0 &&
        (config.data = `${config.data}&company_id=${userDetails.companyId}`);
      config.data.indexOf("staffer_id=") < 0 &&
        (config.data = `${config.data}&staffer_id=${userDetails.stafferId}`);
      config.data.indexOf("school_id=") < 0 &&
        (config.data = `${config.data}&school_id=${userDetails.schoolId}`);
      config.data.indexOf("re_postbe_id=") < 0 &&
        (config.data = `${config.data}&re_postbe_id=${userDetails.re_postbe_id}`);
      config.data.indexOf("dataequity=") < 0 &&
        (config.data = `${config.data}&dataequity=${userDetails.dataequity}`);
      config.data.indexOf("account_class=") < 0 &&
        (config.data = `${config.data}&account_class=${userDetails.account_class}`);
      config.data.indexOf("language_type=") < 0 &&
        (config.data = `${config.data}&language_type=${userDetails.language_type}`);
    }
    showFullScreenLoading();
    return config;
  },
  (error) => {
    endLoading();
    Message.error({
      message: i18n.t("easx.src.main.521jgst8ngo0"),
    });
    return Promise.reject(error);
  }
);
// 动态添加类名
if (store.state.isSchoolAffairs) {
  document.getElementsByTagName("body")[0].className = "app-school";
} else {
  document.getElementsByTagName("body")[0].className = "app-graden";
}

Vue.prototype.$Tool = Tool;
Vue.prototype.$Common = Common;
Vue.prototype.$http = httpService;

Vue.prototype.resetSetItem = function(key, newVal) {
  if (key === "teachplan_class" || key === "hour_name") {
    // 创建一个StorageEvent事件
    var newStorageEvent = document.createEvent("StorageEvent");
    const storage = {
      setItem: function(k, val) {
        localStorage.setItem(k, val);

        // 初始化创建的事件
        newStorageEvent.initStorageEvent(
          "setItem",
          false,
          false,
          k,
          null,
          val,
          null,
          null
        );

        // 派发对象
        window.dispatchEvent(newStorageEvent);
      },
    };
    return storage.setItem(key, newVal);
  }
};

// Vue.prototype.$store = store;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
