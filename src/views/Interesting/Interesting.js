import axios from "axios";
import qs from "qs";
import rootApi from "../../routerUrl";
const root = rootApi.easxApiUrl;
const url = {
  CoursewareHome: `${root}/Courseware/Home`, //备课->我的班级
  getClasshour: `${root}/Courseware/getClasshour`, //备课->卡片模式->选择课时 -- wgh
  PrepareLesson: `${root}/Courseware?c=PrepareLesson`, //备课->备课信息创建 -- wgh
  getLessonPlan: `${root}/Courseware/getLessonPlan`, //备课->获取教案信息 -- wgh
  getTeachpics: `${root}/Courseware/getTeachpics`, //备课->课件模式->展开课件目录 -- wgh
  EditLessonPlan: `${root}/Courseware/EditLessonPlan`, //备课->在线编辑教案信息页面 -- wgh
  PersonLessonPlan: `${root}/Courseware/PersonLessonPlan`, //备课->个性化教案 -- wgh
  getCourseware: `${root}/Courseware/getCourseware`, //备课->教案信息->预览批注/预览教案 -- wgh
  PersonPostilAction: `${root}/Courseware/PersonPostilAction`, //备课->添加个人批注 -- wgh
  getExcellentPostilVideo: `${root}/Courseware/getExcellentPostil`, //备课->获取优秀批注/视频 -- wgh
  getExcellentPostilVideoFinal: `${root}/Courseware/getExcellentPostilVideo`, //备课->获取优秀批注/视频 -- wgh
  UploadVideoAction: `${root}/Courseware/UploadVideoAction`, //备课->上传个人教学视频 -- wgh
  PrepareMarkAction: `${root}/Courseware/PrepareMarkAction`, //备课->添加备课标记 -- wgh
  CourseMaterials: `${root}/Courseware/CourseMaterials`, //备课->获取课程信息 -- wgh
  getDownload: `${root}/Courseware/getDownload`, //备课->课程资料下载 -- wgh
  AddCollectAction: `${root}/Courseware/AddCollectAction`, //备课->添加收藏信息 -- wgh
  AddCancelCollectAction: `${root}/Courseware/AddCancelCollectAction`, //备课->添加/取消收藏 -- wgh
  AddPraiseAction: `${root}/Courseware/AddPraiseAction`, //备课->添加点赞信息 -- wgh
  AddLessonPlanInfoAction: `${root}/Courseware/AddLessonPlanInfoAction`, //备课->教案备案信息创建 -- wgh
  AddCancelPraiseAction: `${root}/Courseware/AddCancelPraiseAction`, //备课->添加/取消点赞 -- wgh
  ProcessAction: `${root}/Courseware/ProcessAction`, //备课->教案备案进程 -- wgh
  EditLessonPlanAction: `${root}/Courseware/EditLessonPlanAction`, //备课->在线编辑教案信息 -- wgh
  Statistic: `${root}/Index/Statistic`, //首页->备上课时统计 -- wgh
  LessonReminder: `${root}/Index/LessonReminder`, //首页->备课提醒 -- wgh
  indexHome: `${root}/Index/Home`, //首页->备课提醒 -- wgh
  MarkReadAction: `${root}/Index/MarkReadAction`, //首页->备课提醒->标记阅读状态 -- wgh
  LessonTotal: `${root}/Index/LessonTotal`, //首页->备上课课程表  -- wgh
  SchoolReport: `${root}/ReportForms/SchoolReport`, //报表->校园统计报表 -- wgh
  SchoolExport: `${root}/ReportForms/SchoolExport`, //报表->校园统计报表导出 -- wgh
  StafferReport: `${root}/ReportForms/StafferReport`, //报表->教师统计报表---- wgh
  StafferExport: `${root}/ReportForms/StafferExport`, //报表->教师统计报表--导出 -- wgh
  ClassHourTotal: `${root}/ReportForms/ClassHourTotal`, //报表->班级课时统计 -- wgh
  ClassHourExport: `${root}/ReportForms/ClassHourExport`, //报表->班级课时统计--导出 -- wgh
  AddCancelWatchAction: `${root}/Courseware/AddCancelWatchAction`, //备课->添加视频观看记录 -- wgh
  getExcellentPostil: `${root}/Courseware/getExcellentPostil`, //备课->添加视频观看记录 -- wgh
  AddTeachplanAction: `${root}/Courseware/AddTeachplanAction`,

  // 备课 班组 班种 课程别 下拉
  getCoursetype: `${root}/Courseware/getCoursetype`, // 班组
  getCoursecat: `${root}/Courseware/getCoursecat`, // 班种
  getCourse: `${root}/Courseware/getCourse`, // 课程别
};

export default {
  //备课->我的班级
  CoursewareHome(params) {
    return axios.get(url.CoursewareHome, {
      params,
    });
  },
  getExcellentPostil(params) {
    return axios.get(url.getExcellentPostil, {
      params,
    });
  },
  //备课->卡片模式->选择课时 -- wgh
  getClasshour(params) {
    return axios.get(url.getClasshour, {
      params,
    });
  },
  //备课->获取教案信息 -- wgh
  getLessonPlan(params) {
    return axios.get(url.getLessonPlan, {
      params,
    });
  },
  //备课->课件模式->展开课件目录 -- wgh
  getTeachpics(params) {
    return axios.get(url.getTeachpics, {
      params,
    });
  },
  // 备课->在线编辑教案信息页面 -- wgh
  EditLessonPlan(params) {
    return axios.get(url.EditLessonPlan, {
      params,
    });
  },
  //备课->个性化教案 -- wgh
  PersonLessonPlan(params) {
    return axios.get(url.PersonLessonPlan, {
      params,
    });
  },
  //备课->教案信息->预览批注/预览教案 -- wgh
  getCourseware(params) {
    return axios.get(url.getCourseware, {
      params,
    });
  },
  //备课->获取优秀批注/视频 -- wgh
  getExcellentPostilVideo(params) {
    return axios.get(url.getExcellentPostilVideo, {
      params,
    });
  },
  getExcellentPostilVideoFinal(params) {
    return axios.get(url.getExcellentPostilVideoFinal, {
      params,
    });
  },
  //备课->获取课程信息 -- wgh
  CourseMaterials(params) {
    return axios.get(url.CourseMaterials, {
      params,
    });
  },
  // 首页->备上课时统计 -- wgh
  Statistic(params) {
    return axios.get(url.Statistic, {
      params,
    });
  },
  //首页->备课提醒 -- wgh
  LessonReminder(params) {
    return axios.get(url.LessonReminder, {
      params,
    });
  },
  // 首页->备课提醒列表 -- wgh
  indexHome(params) {
    return axios.get(url.indexHome, {
      params,
    });
  },
  // 报表->校园统计报表 -- wgh
  SchoolReport(params) {
    return axios.get(url.SchoolReport, {
      params,
    });
  },
  // 报表->校园统计报表 -- wgh-----导出
  SchoolExport() {
    return url.SchoolExport;
  },
  // 报表->教师统计报表-- wgh
  StafferReport(params) {
    return axios.get(url.StafferReport, {
      params,
    });
  },
  // 报表->教师统计报表 -- wgh-----导出
  StafferExport() {
    return url.StafferExport;
  },
  // 报表->班级课时统计 -- wgh
  ClassHourTotal(params) {
    return axios.get(url.ClassHourTotal, {
      params,
    });
  },
  // 报表->班级课时统计 -- wgh-----导出
  ClassHourExport() {
    return url.ClassHourExport;
  },
  //首页->备上课课程表  -- wgh
  LessonTotal(params) {
    return axios.get(url.LessonTotal, {
      params,
    });
  },
  //备课->课程资料下载 -- wgh
  getDownload() {
    return url.getDownload;
  },
  //备课->备课信息创建 -- wgh
  PrepareLesson(params) {
    return axios.post(url.PrepareLesson, qs.stringify(params));
  },
  AddTeachplanAction(params) {
    return axios.post(url.AddTeachplanAction, qs.stringify(params));
  },
  //备课->添加个人批注 -- wgh
  PersonPostilAction(params) {
    return axios.post(url.PersonPostilAction, qs.stringify(params));
  },
  //备课->上传个人教学视频 -- wgh
  UploadVideoAction(params) {
    return axios.post(url.UploadVideoAction, qs.stringify(params));
  },
  //备课->添加备课标记 -- wgh
  PrepareMarkAction(params) {
    return axios.post(url.PrepareMarkAction, qs.stringify(params));
  },
  //备课->添加收藏信息 -- wgh
  AddCollectAction(params) {
    return axios.post(url.AddCollectAction, qs.stringify(params));
  },
  //备课->添加/取消收藏 -- wgh
  AddCancelCollectAction(params) {
    return axios.post(url.AddCancelCollectAction, qs.stringify(params));
  },
  //备课->添加点赞信息 -- wgh
  AddPraiseAction(params) {
    return axios.post(url.AddPraiseAction, qs.stringify(params));
  },
  //备课->添加/取消点赞 -- wgh
  AddCancelPraiseAction(params) {
    return axios.post(url.AddCancelPraiseAction, qs.stringify(params));
  },
  // 备课->教案备案信息创建 -- wgh
  AddLessonPlanInfoAction(params) {
    return axios.post(url.AddLessonPlanInfoAction, qs.stringify(params));
  },
  // 备课->教案备案进程 -- wgh
  ProcessAction(params) {
    return axios.post(url.ProcessAction, qs.stringify(params));
  },
  // 备课->在线编辑教案信息 -- wgh
  EditLessonPlanAction(params) {
    return axios.post(url.EditLessonPlanAction, qs.stringify(params));
  },
  //首页->备课提醒->标记阅读状态 -- wgh
  MarkReadAction(params) {
    return axios.post(url.MarkReadAction, qs.stringify(params));
  },
  // 备课->添加视频观看记录 -- wgh
  AddCancelWatchAction(params) {
    return axios.post(url.AddCancelWatchAction, qs.stringify(params));
  },

  // 备课 班组 班种 课程别 下拉
  getCoursetype(params) {
    return axios.get(url.getCoursetype, {
      params,
    });
  },
  getCoursecat(params) {
    return axios.get(url.getCoursecat, {
      params,
    });
  },
  getCourse(params) {
    return axios.get(url.getCourse, {
      params,
    });
  },
};
