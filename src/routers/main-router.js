import Vue from "vue";
import Router from "vue-router";
import interestingIndex from "./Interesting/index-router"; //趣备课---首页
import preparLessons from "./Interesting/preparLessons-router"; //趣备课---备课
import interestingReport from "./Interesting/report-router"; //趣备课---报表

import careerGrowth from "./Training/careerGrowth-router"; //培训---职业成长
import publicClass from "./Training/publicClass-router"; //培训---通识课
import trainingReport from "./Training/report-router"; //培训---报表

import educationalIndex from "./Educational/index-router"; //教务管理---首页
import mySchedule from "./Educational/mySchedule-router"; //教务管理---我的课表
import circulateRegistrat from "./Educational/circulateRegistrat-router"; //教务管理---小循环登记
import checkStatusrouter from "./Educational/checkStatusrouter"; //教务管理---教务检核状况
import jingleAssistantrouter from "./Educational/jingleAssistantrouter"; //教务管理---叮铛助教
import educationalReport from "./Educational/report-router"; //教务管理---报表
import courseManagement from "./Educational/courseManagement";

import myCenter from "./Personal/myCenter-router"; //个人中心
import mySetting from "./Personal/mySetting-router"; //个人设置
import myMessage from "./Personal/message-router"; //消息中心

// function addKeepAlive(val) {}

Vue.use(Router);
const routes = [
  {
    path: "/",
    name: "index",
    redirect: "/Educational/index",
    meta: {
      keepAlive: true,
    },
  },

  // 以下为模板文件
  {
    path: "/nomalTable",
    name: "nomalTable",
    component: () => import("@/views/tableTemp/nomalTable.vue"),
  },
  {
    path: "/noborderTable",
    name: "noborderTable",
    component: () => import("@/views/tableTemp/noborderTable.vue"),
  },
  {
    path: "/switchTable",
    name: "switchTable",
    component: () => import("@/views/tableTemp/switchTable.vue"),
  },
  {
    path: "/imgTable",
    name: "imgTable",
    component: () => import("@/views/tableTemp/imgTable.vue"),
  },
  {
    path: "/levelTable",
    name: "levelTable",
    component: () => import("@/views/tableTemp/levelTable.vue"),
  },
  {
    path: "/tipsTable",
    name: "tipsTable",
    component: () => import("@/views/tableTemp/tipsTable.vue"),
  },
  {
    path: "/progressTable",
    name: "progressTable",
    component: () => import("@/views/tableTemp/progressTable.vue"),
  },
  {
    path: "/templates",
    name: "templates",
    component: () => import("@/views/templates.vue"),
  },

  //页面路由
  //趣备课模块-------------start
  ...interestingIndex, //趣备课---首页
  ...preparLessons, //趣备课---备课
  ...interestingReport, //趣备课---报表
  //趣备课模块-------------end

  //培训模块-------------start
  ...careerGrowth, //培训---职业成长
  ...publicClass, //培训---通识课
  ...trainingReport, //培训---报表
  //培训模块-------------end

  //教务管理模块-------------start
  ...educationalIndex, //教务管理--首页
  ...mySchedule, //教务管理--我的课表
  ...circulateRegistrat, //教务管理---小循环登记
  ...checkStatusrouter, //教务管理---教务检核状况
  ...jingleAssistantrouter, //教务管理---叮铛助教
  ...educationalReport, //教务管理---报表
  ...courseManagement, //教务管理---课表
  //教务管理模块-------------end

  //个人中心/个人设置模块-------------start
  ...myCenter, //个人中心
  ...mySetting, //个人设置
  ...myMessage, //消息中心
  //个人中心/个人设置模块-------------end

  // 权限验证
  // 有权限
  {
    path: "/havePermission",
    name: "havePermission",
    component: () => import("@/views/Permission/havePermission.vue"),
  },
  // 无权限
  {
    path: "/noPermission",
    name: "noPermission",
    component: () => import("@/views/Permission/noPermission.vue"),
  },

  //正在建设中
  {
    path: "/Websitebuilding",
    name: "Websitebuilding",
    component: () => import("@/views/websiteBuilding/Websitebuilding.vue"),
  },
];

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes,
});
