import axios from "axios";
import qs from "qs";
import rootApi from "../../routerUrl";
const root = rootApi.easxApiUrl;

const url = {
  // 教务管理 --> 小循环登记
  getStaClassList: root + "/Education/getStaClassList", // 教学教务->获取教师带班班级
  getClassHourList: root + "/Education/getClassHourList", // 教学教务->获取班级的课时
  getStudyStudentListApi: root + "/Education/getStudyStudentList", // 教学教务->获取班级在读学生
  fillStuWorkScoreAction: root + "/Education/fillStuWorkScoreAction", // 教学教务->填写学生的分数,网课,补课信息
  addStuCatitrackAction: root + "/Education/addStuCatitrackAction", // 教学教务->新增学生访谈记录
  getCatitrackCodeApi: root + "/Education/getCatitrackCodeApi", // 教学教务->获取沟通对像
  getCatitrackApi: root + "/Education/getCatitrackApi", // 教学教务->获取访谈记录
  getHourcheckOneApi: root + "/Education/getHourcheckOneApi", // 教学教务-->报表->查看课时详情
  getComtempApi: root + "/Education/getComtempApi", // 教学教务-->模版
  getStudentCatitrackList: root + "/Education/getStudentCatitrackList", // 教学教务-->电访管理
  getCatitrackReport: root + "/Education/getCatitrackReport", // 教学教务-->电访管理

  // 教务管理 --> 报表
  getStaClassReport: root + "/Education/getStaClassReport", // 教学教务->报表->班级统计报表
  getClassHourReport: root + "/Education/getClassHourReport", // 教学教务->报表->课时统计
  getStuCatitrack: root + "/Education/getStuCatitrack", // 教学教务->报表->电访记录
  schoolTeaacher: root + "/Education/schoolTeaacher", // 教学教务->报表->教师统计
  getCommodeApi: root + "/Education/getCommodeApi", // 教学教务->获取沟通类型
  getTemplateApi: root + "/Education/getTemplateApi", // 教学教务->查看沟通模板

  // 侯小草 添加
  timetableDayListApi: root + "/Timetable/timetableDayListApi", // 获取教师所有课程

  // 叮铛助教接口
  CevaluateState: root + "/Evaluate/CevaluateState", // 老师评价学生->后台PC->班级（查看评价状况） -- wgh
  StudentList: root + "/Evaluate/StudentList", // 老师评价学生->后台PC->学员统计列表 -- wgh
  StafferList: root + "/Evaluate/StafferList", // 老师评价学生->后台PC->教师统计列表 -- wgh
  EvaluateHome: root + "/Evaluate/Home", // 老师评价学生->后台PC->班级统计列表 -- wgh

  EvaluateQuery: root + "/Evaluate/EvaluateQuery", // 家长评价老师->后台PC->评价查询 -- wgh
  ScoreTotal: root + "/Evaluate/ScoreTotal", // 家长评价老师->后台PC->老师得分统计 -- wgh
  Attendance: root + "/Evaluate/Attendance", // 家长评价老师->后台PC->出勤学员评价详情 -- wgh
  ScoreTotalTwo: root + "/Evaluate/ScoreTotalTwo", // 家长评价老师->后台PC->老师+班级评价统计 -- wgh

  homeworkAllListApi: root + "/Homework/homeworkAllListApi", //后台PC->已发布作业 作业列表-97
  delHomeworkReceiveOneApi: root + "/Homework/delHomeworkReceiveOneApi", // 后台PC->已发布作业 删除一个作业接受人-97
  timetableOneApi: root + "/Timetable/timetableOneApi", // 后台PC->发布作业 单个班级的信息 - 97
  homeworkTeacherStatisApi: root + "/Homework/homeworkTeacherStatisApi", // 后台PC->作业统计 按老师 - 97
  homeworkClassStatisApi: root + "/Homework/homeworkClassStatisApi", // 后台PC->作业统计 按班级 - 97
  homeworkStuStatePCApi: root + "/Homework/homeworkStuStatePCApi", //后台PC->作业查询 作业学生状态- 97
  homeworkTeaListPCApi: root + "/Homework/homeworkTeaListPCApi", // 后台PC->作业查询 老师列表- 97
  homeworkClassListPCApi: root + "/Homework/homeworkClassListPCApi", // 后台PC->作业查询 班级列表- 97
  homeworkSchListPCApi: root + "/Homework/homeworkSchListPCApi", // 后台PC->作业查询 学校列表- 97
  homeworkListPCApi: root + "/Homework/homeworkListPCApi", // 后台PC->作业查询 管理列表 -- 97
  submitHomeworkAction: root + "/Homework/submitHomeworkAction", // 作业->发布作业-（适用后台PC-97）-zjb
  classStuListApi: root + "/Homework/classStuListApi", // 作业->班级对应学生列表-（适用后台PC-97）-zjb
  homeworkReceiveInfoApi: root + "/Homework/homeworkReceiveInfoApi", // 获取教师所有课程
  homeworkItemApi: root + "/Homework/homeworkItemApi", //作业->家庭作业详情-（适用后台PC-97）-zjb
  timetableListApi: root + "/Timetable/timetableListApi", // 课表->获取教师所有课程-（适用后台PC-97）-zjb
  ReadSituation: root + "/Message/ReadSituation", // 后台PC->查看阅读情况-qyh
  GetClassInfo: root + "/Message/GetClassInfo", //后台PC->获取班级信息-qyh
  MessageDetail: root + "/Message/MessageDetail", //班级通知（后台PC）->班级通知详情-qyh
  PcClassMessage: root + "/Message/PcClassMessage", //后台PC->班级通知列表-qyh
  PcNoticeMessage: root + "/Message/PcNoticeMessage", //后台PC->公告列表-qyh
  getSchoolApi: root + "/Message/getSchoolApi", //后台PC->学校下拉-qyh
  MessageClassListPCApi: root + "/Message/MessageClassListPCApi", //后台PC->班级下拉-qyh
  MessageTeaListPCApi: root + "/Message/MessageTeaListPCApi", //后台PC->教师下拉-qyh
  delMessageAction: root + "/Message/delMessageAction", //后台PC->删除通知/公告-qyh
  updateMessageAction: root + "/Message/updateMessageAction", //后台PC->编辑公告-qyh
  createMessageAction: root + "/Message/createMessageAction", //后台PC->发布公告-qyh

  getCourse: root + "/Courseware/getCourse", //课程别
  getTeacher: root + "/Courseware/getTeacher", //教师
  SevaluateState: root + "/Evaluate/SevaluateState", //教师
  EvaluateDetail: root + "/Evaluate/EvaluateDetail", //教师
  getClass: root + "/Courseware/getClass", //教师

  //教务工作 - 沟通管理->后台PC
  getStudyStudentListE: root + "/Evaluate/getStudyStudentList",
  getCatitrackApiE: root + "/Evaluate/getCatitrackApi",
  addStuCatitrackActionE: root + "/Evaluate/addStuCatitrackAction",
  getTemplateApiE: root + "/Evaluate/getTemplateApi",

  //教务工作 - 发布通知
  ChoiceSelecterStudent: root + "/Message/ChoiceSelecterStudent",
  SendMessageAction: root + "/Message/SendMessageAction",
  TotalStatistics: root + "/Home/TotalStatistics", // 后台PC->首页统计-qyh

  // 教务工作--上课点评
  getHourStudent: `${root}/Classhour/getHourStudent`, // 101->上课点名->获取能够点评的学生列表-lujing
  getStuHourRemarkOne: `${root}/Classhour/getStuHourRemarkOne`, //上课点名-查看点评详情-lujing
  getStudentApi: `${root}/Classhour/getStudentApi`, //上课点评->获取学生信息-lujing
  getRemarkTempStart: `${root}/Classhour/getRemarkTempStart`, // 102->上课点名->获取评星模板->lujing
  getRemarkTemp: `${root}/Classhour/getRemarkTemp`, // 103->上课点名->获取点名的评论模板-lujing
  updateHourContentAction: `${root}/Timetable/updateHourContentAction`, // 课表->新增或修改课时内容(网课通用)-zjb
  hourContentApi: `${root}/Timetable/hourContentApi`, // 课表->获取课时内容(网课通用)-zjb
  withdrawStuHourRemarkAction: `${root}/Classhour/withdrawStuHourRemarkAction`, //上课点名->撤回点评-lujing
  submitHourRemarkAction: `${root}/Classhour/submitHourRemarkAction`, // 104->上课点名->提交点名-lujing
  AgentList: `${root}/Home/AgentList`, // 后台PC->首页代办项列表-qyh

  // 家长评价老师 -- wgh
  EvaluateSchListPCApi: `${root}/Evaluate/EvaluateSchListPCApi`, //家长评价老师->后台PC->获取学校
  EvaluateClassListPCApi: `${root}/Evaluate/EvaluateClassListPCApi`, //家长评价老师->后台PC->获取班级
  EvaluateTeaListPCApi: `${root}/Evaluate/EvaluateTeaListPCApi`, //家长评价老师->后台PC->获取教师

  // 教务管理 -- 新加报表
  getComOrganize: `${root}/StuReport/getComOrganize`, // 教学教务->报表->获取集团下的组织架构-lujing
  getOrgnizeSchool: `${root}/StuReport/getOrgnizeSchool`, // 教学教务->报表->获取组织下学校-lujing
  getSchoolTaskRate: `${root}/StuReport/getSchoolTaskRate`, // 教学教务->报表->获取学校的任务完成状况-lujing
  getSchoolTaskRateExport: `${root}/StuReport/getSchoolTaskRate`, // 教学教务->报表->获取学校的任务完成状况-lujing
  getClassTaskRate: `${root}/StuReport/getClassTaskRate`, // 教学教务->报表->获取班级的任务完成状况-lujing
  delHomeworkOneApi: `${root}/Homework/delHomeworkOneApi`, // 教学教务->报表->获取班级的任务完成状况-lujing
  getComOrganizeClass: `${root}/StuReport/getComOrganizeClass`, // 教学教务->报表->获取集团组织架构模式-lujing
  getEasWorkReportApi: `${root}/Education/getEasWorkReportApi`, // 教学教务->报表->教务工作报表-lujing
  getEasWorkOneApi: `${root}/Education/getEasWorkOneApi`, // 教学教务->报表->班级教务工作明细-lujing
  getCompanyTaskRate: `${root}/StuReport/getCompanyTaskRate`, // 教学教务->报表->获取学校任务完成率的平均值-lujing
  getClassOneApi: `${root}/Classhour/getClassOneApi`, // 教学教务->获取班级的基本信息-lujing
  fillClassHourNetstatusAction: `${root}/Education/fillClassHourNetstatusAction`, // 教务教务->一键登记(课一键参与 补课一键无补课) -lujing

  // 学员分班转班
  getStudentListApi: `${root}/Education/getStudentListApi`, // 教学教务->小循环登记->学员管理 -- wgh
  getSeparateClassApi: `${root}/Education/getSeparateClassApi`, // 教学教务->小循环登记->学员管理->分/转班下拉 -- wgh
  separateClassAction: `${root}/Education/separateClassAction`, // 教学教务->小循环登记->学员管理->分班操作 -- wgh
  toSeparateClassAction: `${root}/Education/toSeparateClassAction`, // 教学教务->小循环登记->学员管理->转班操作 -- wgh

  // 针对教务管理的下拉
  getCourseEdu: `${root}/Education/getCourse`, // 课程别
  getCoursecatEdu: `${root}/Education/getCoursecat`, // 班种
  getTeacherEdu: `${root}/Education/getTeacher`, // 教师
  getClassroomEdu: `${root}/Education/getClassroom`, // 教室
  getCatitrackScReport: `${root}/Education/getCatitrackScReport`, // 教室

  // 教务管理 -- 中心基地总表 -- 校总表下拉
  getCoursecatSchool: `${root}/StuReport/getCoursecat`, // 班种
  getCourseSchool: `${root}/StuReport/getCourse`, // 课程别

  // 针对叮当助教的特殊接口
  getSchoolJingle: `${root}/Home/getSchool`, // 校园下拉
  getCourseJingle: `${root}/Home/getCourse`, // 课程别下拉
  getTeacherJingle: `${root}/Home/getTeacher`, // 教师下拉
  getClassroomJingle: `${root}/Home/getClassroom`, // 教室下拉
  getStaClassListJingle: `${root}/Home/getStaClassList`, // 我的班级
  getClassJingle: `${root}/Home/getClass`, //班级下拉
};

const educationHttp = {
  // 教务管理 --> 小循环登记
  getStaClassList(params) {
    return axios.get(url.getStaClassList, {
      params,
    });
  },
  getCatitrackScReport(params) {
    return axios.get(url.getCatitrackScReport, {
      params,
    });
  },
  getCatitrackReport(params) {
    return axios.get(url.getCatitrackReport, {
      params,
    });
  },
  getClass(params) {
    return axios.get(url.getClass, {
      params,
    });
  },
  EvaluateDetail(params) {
    return axios.get(url.EvaluateDetail, {
      params,
    });
  },
  SevaluateState(params) {
    return axios.get(url.SevaluateState, {
      params,
    });
  },
  getTeacher(params) {
    return axios.get(url.getTeacher, {
      params,
    });
  },
  getCourse(params) {
    return axios.get(url.getCourse, {
      params,
    });
  },
  getClassHourList(params) {
    return axios.get(url.getClassHourList, {
      params,
    });
  },
  getStudyStudentListApi(params) {
    return axios.get(url.getStudyStudentListApi, {
      params,
    });
  },
  fillStuWorkScoreAction(params) {
    return axios.post(url.fillStuWorkScoreAction, qs.stringify(params));
  },
  addStuCatitrackAction(params) {
    return axios.post(url.addStuCatitrackAction, qs.stringify(params));
  },
  getCatitrackCodeApi(params) {
    return axios.get(url.getCatitrackCodeApi, {
      params,
    });
  },
  getCatitrackApi(params) {
    return axios.get(url.getCatitrackApi, {
      params,
    });
  },
  getHourcheckOneApi(params) {
    return axios.get(url.getHourcheckOneApi, {
      params,
    });
  },
  getComtempApi(params) {
    return axios.get(url.getComtempApi, {
      params,
    });
  },
  getStudentCatitrackList(params) {
    return axios.get(url.getStudentCatitrackList, {
      params,
    });
  },

  // 教务管理 --> 报表
  getStaClassReport(params) {
    return axios.get(url.getStaClassReport, {
      params,
    });
  },
  getClassHourReport(params) {
    return axios.get(url.getClassHourReport, {
      params,
    });
  },
  getClassHourReportUrl() {
    return url.getClassHourReport;
  },
  getStuCatitrack(params) {
    return axios.get(url.getStuCatitrack, {
      params,
    });
  },
  getStuCatitrackUrl() {
    return url.getStuCatitrack;
  },
  schoolTeaacher(params) {
    return axios.get(url.schoolTeaacher, {
      params,
    });
  },
  getCommodeApi(params) {
    return axios.get(url.getCommodeApi, {
      params,
    });
  },
  getTemplateApi(params) {
    return axios.get(url.getTemplateApi, {
      params,
    });
  },
  // 课表->获取教师所有课程
  timetableDayListApi(params) {
    return axios.get(url.timetableDayListApi, {
      params,
    });
  },

  // 叮铛助教接口
  // 老师评价学生->后台PC->班级（查看评价状况） -- wgh
  CevaluateState(params) {
    return axios.get(url.CevaluateState, {
      params,
    });
  },
  // 老师评价学生->后台PC->学员统计列表 -- wgh
  StudentList(params) {
    return axios.get(url.StudentList, {
      params,
    });
  },
  // 老师评价学生->后台PC->教师统计列表 -- wgh
  StafferList(params) {
    return axios.get(url.StafferList, {
      params,
    });
  },
  // 老师评价学生->后台PC->班级统计列表 -- wgh
  EvaluateHome(params) {
    return axios.get(url.EvaluateHome, {
      params,
    });
  },

  //家长评价老师->后台PC->评价查询 -- wgh
  EvaluateQuery(params) {
    return axios.get(url.EvaluateQuery, {
      params,
    });
  },
  //家长评价老师->后台PC->老师得分统计 -- wgh
  ScoreTotal(params) {
    return axios.get(url.ScoreTotal, {
      params,
    });
  },
  //家长评价老师->后台PC->出勤学员评价详情 -- wgh
  Attendance(params) {
    return axios.get(url.Attendance, {
      params,
    });
  },
  //家长评价老师->后台PC->老师+班级评价统计 -- wgh
  ScoreTotalTwo(params) {
    return axios.get(url.ScoreTotalTwo, {
      params,
    });
  },

  // 后台PC->已发布作业 作业列表-97
  homeworkAllListApi(params) {
    return axios.get(url.homeworkAllListApi, {
      params,
    });
  },
  // 后台PC->已发布作业 删除一个作业接受人-97
  delHomeworkReceiveOneApi(params) {
    return axios.get(url.delHomeworkReceiveOneApi, {
      params,
    });
  },
  // 后台PC->发布作业 单个班级的信息 - 97
  timetableOneApi(params) {
    return axios.get(url.timetableOneApi, {
      params,
    });
  },
  // 后台PC->作业统计 按老师 - 97
  homeworkTeacherStatisApi(params) {
    return axios.get(url.homeworkTeacherStatisApi, {
      params,
    });
  },
  //后台PC->作业统计 按老师 - 97---导出
  homeworkTeacherStatisApi1() {
    return url.homeworkTeacherStatisApi;
  },
  // 后台PC->作业统计 按班级 - 97
  homeworkClassStatisApi(params) {
    return axios.get(url.homeworkClassStatisApi, {
      params,
    });
  },
  //后台PC->作业统计 按班级 - 97---导出
  homeworkClassStatisApi1() {
    return url.homeworkClassStatisApi;
  },
  //后台PC->作业查询 作业学生状态- 97
  homeworkStuStatePCApi(params) {
    return axios.get(url.homeworkStuStatePCApi, {
      params,
    });
  },
  //后台PC->作业查询 老师列表- 97
  homeworkTeaListPCApi(params) {
    return axios.get(url.homeworkTeaListPCApi, {
      params,
    });
  },
  //后台PC->作业查询 班级列表- 97
  homeworkClassListPCApi(params) {
    return axios.get(url.homeworkClassListPCApi, {
      params,
    });
  },
  //后台PC->作业查询 学校列表- 97
  homeworkSchListPCApi(params) {
    return axios.get(url.homeworkSchListPCApi, {
      params,
    });
  },
  //后台PC->作业查询 管理列表 -- 97
  homeworkListPCApi(params) {
    return axios.get(url.homeworkListPCApi, {
      params,
    });
  },
  //后台PC->作业查询 管理列表 -- 97---导出
  homeworkListPCApi1() {
    return url.homeworkListPCApi;
  },
  // 后台PC->作业查询 删除一个作业- 97
  delHomeworkOneApi(params) {
    return axios.post(url.delHomeworkOneApi, qs.stringify(params));
  },
  // 作业->发布作业-（适用后台PC-97）-zjb
  submitHomeworkAction(params) {
    return axios.post(url.submitHomeworkAction, qs.stringify(params));
  },
  // 作业->班级对应学生列表-（适用后台PC-97）-zjb
  classStuListApi(params) {
    return axios.get(url.classStuListApi, {
      params,
    });
  },
  // 作业->家庭作业接收人详情-（适用后台PC-97）-zjb
  homeworkReceiveInfoApi(params) {
    return axios.get(url.homeworkReceiveInfoApi, {
      params,
    });
  },
  // 作业->家庭作业详情-（适用后台PC-97）-zjb
  homeworkItemApi(params) {
    return axios.get(url.homeworkItemApi, {
      params,
    });
  },
  // 课表->获取教师所有课程-（适用后台PC-97）-zjb
  timetableListApi(params) {
    return axios.get(url.timetableListApi, {
      params,
    });
  },
  // 后台PC->查看阅读情况-qyh
  ReadSituation(params) {
    return axios.get(url.ReadSituation, {
      params,
    });
  },
  //后台PC->获取班级信息-qyh
  GetClassInfo(params) {
    return axios.get(url.GetClassInfo, {
      params,
    });
  },
  //班级通知（后台PC）->班级通知详情-qyh
  MessageDetail(params) {
    return axios.get(url.MessageDetail, {
      params,
    });
  },
  //后台PC->班级通知列表-qyh
  PcClassMessage(params) {
    return axios.get(url.PcClassMessage, {
      params,
    });
  },
  //后台PC->班级通知列表-qyh---导出
  PcClassMessage1() {
    return url.PcClassMessage;
  },
  //后台PC->公告列表-qyh
  PcNoticeMessage(params) {
    return axios.get(url.PcNoticeMessage, {
      params,
    });
  },
  //后台PC->学校下拉-qyh
  getSchoolApi(params) {
    return axios.get(url.getSchoolApi, {
      params,
    });
  },
  //后台PC->班级下拉-qyh
  MessageClassListPCApi(params) {
    return axios.get(url.MessageClassListPCApi, {
      params,
    });
  },
  //后台PC->教师下拉-qyh
  MessageTeaListPCApi(params) {
    return axios.get(url.MessageTeaListPCApi, {
      params,
    });
  },
  // 后台PC->删除通知/公告-qyh
  delMessageAction(params) {
    return axios.post(url.delMessageAction, qs.stringify(params));
  },
  // 后台PC->编辑公告-qyh
  updateMessageAction(params) {
    return axios.post(url.updateMessageAction, qs.stringify(params));
  },
  // 后台PC->发布公告-qyh
  createMessageAction(params) {
    return axios.post(url.createMessageAction, qs.stringify(params));
  },
  //沟通管理->后台PC
  getStudyStudentListE(params) {
    return axios.get(url.getStudyStudentListE, {
      params,
    });
  },
  getCatitrackApiE(params) {
    return axios.get(url.getCatitrackApiE, {
      params,
    });
  },
  addStuCatitrackActionE(params) {
    return axios.post(url.addStuCatitrackActionE, qs.stringify(params));
  },
  getTemplateApiE(params) {
    return axios.get(url.getTemplateApiE, {
      params,
    });
  },
  ChoiceSelecterStudent(params) {
    return axios.get(url.ChoiceSelecterStudent, {
      params,
    });
  },
  SendMessageAction(params) {
    return axios.post(url.SendMessageAction, qs.stringify(params));
  },
  // 后台PC->首页统计-qyh
  TotalStatistics(params) {
    return axios.get(url.TotalStatistics, {
      params,
    });
  },

  // 教务工作--上课点评
  // 101->上课点名->获取能够点评的学生列表-lujing
  getHourStudent(params) {
    return axios.get(url.getHourStudent, {
      params,
    });
  },
  //上课点名-查看点评详情-lujing
  getStuHourRemarkOne(params) {
    return axios.get(url.getStuHourRemarkOne, {
      params,
    });
  },
  //上课点评->获取学生信息-lujing
  getStudentApi(params) {
    return axios.get(url.getStudentApi, {
      params,
    });
  },
  // 102->上课点名->获取评星模板->lujing
  getRemarkTempStart(params) {
    return axios.get(url.getRemarkTempStart, {
      params,
    });
  },
  // 103->上课点名->获取点名的评论模板-lujing
  getRemarkTemp(params) {
    return axios.get(url.getRemarkTemp, {
      params,
    });
  },
  //课表->获取课时内容(网课通用)-zjb
  hourContentApi(params) {
    return axios.get(url.hourContentApi, {
      params,
    });
  },
  //课表->新增或修改课时内容(网课通用)-zjb
  updateHourContentAction(params) {
    return axios.post(url.updateHourContentAction, qs.stringify(params));
  },
  //上课点名->撤回点评-lujing
  withdrawStuHourRemarkAction(params) {
    return axios.post(url.withdrawStuHourRemarkAction, qs.stringify(params));
  },
  // 104->上课点名->提交点名-lujing
  submitHourRemarkAction(params) {
    return axios.post(url.submitHourRemarkAction, qs.stringify(params));
  },
  //后台PC->首页代办项列表-qyh
  AgentList(params) {
    return axios.get(url.AgentList, {
      params,
    });
  },
  //家长评价老师->后台PC->获取学校 -- wgh
  EvaluateSchListPCApi(params) {
    return axios.get(url.EvaluateSchListPCApi, {
      params,
    });
  },
  //家长评价老师->后台PC->获取班级 -- wgh
  EvaluateClassListPCApi(params) {
    return axios.get(url.EvaluateClassListPCApi, {
      params,
    });
  },
  //家长评价老师->后台PC->获取教师 -- wgh
  EvaluateTeaListPCApi(params) {
    return axios.get(url.EvaluateTeaListPCApi, {
      params,
    });
  },

  // 新加报表
  getComOrganize(params) {
    return axios.get(url.getComOrganize, {
      params,
    });
  },
  getOrgnizeSchool(params) {
    return axios.get(url.getOrgnizeSchool, {
      params,
    });
  },
  getSchoolTaskRate(params) {
    return axios.get(url.getSchoolTaskRate, {
      params,
    });
  },
  getSchoolTaskRateExport() {
    return url.getSchoolTaskRateExport;
  },
  getClassTaskRate(params) {
    return axios.get(url.getClassTaskRate, {
      params,
    });
  },
  getComOrganizeClass(params) {
    return axios.get(url.getComOrganizeClass, {
      params,
    });
  },
  getEasWorkReportApi(params) {
    return axios.get(url.getEasWorkReportApi, {
      params,
    });
  },
  getEasWorkOneApi(params) {
    return axios.get(url.getEasWorkOneApi, {
      params,
    });
  },
  getEasWorkOneApiUrl() {
    return url.getEasWorkOneApi;
  },
  getCompanyTaskRate(params) {
    return axios.get(url.getCompanyTaskRate, {
      params,
    });
  },
  getClassOneApi(params) {
    return axios.get(url.getClassOneApi, {
      params,
    });
  },
  fillClassHourNetstatusAction(params) {
    return axios.post(url.fillClassHourNetstatusAction, qs.stringify(params));
  },
  getStudentListApi(params) {
    return axios.get(url.getStudentListApi, {
      params,
    });
  },
  getSeparateClassApi(params) {
    return axios.get(url.getSeparateClassApi, {
      params,
    });
  },
  separateClassAction(params) {
    return axios.post(url.separateClassAction, qs.stringify(params));
  },
  toSeparateClassAction(params) {
    return axios.post(url.toSeparateClassAction, qs.stringify(params));
  },

  // 针对教务系统的下拉
  getCourseEdu(params) {
    return axios.get(url.getCourseEdu, {
      params,
    });
  },
  getCoursecatEdu(params) {
    return axios.get(url.getCoursecatEdu, {
      params,
    });
  },
  getTeacherEdu(params) {
    return axios.get(url.getTeacherEdu, {
      params,
    });
  },
  getClassroomEdu(params) {
    return axios.get(url.getClassroomEdu, {
      params,
    });
  },
  getCourseSchool(params) {
    return axios.get(url.getCourseSchool, {
      params,
    });
  },
  getCoursecatSchool(params) {
    return axios.get(url.getCoursecatSchool, {
      params,
    });
  },
  // 针对叮当助教的特殊接口
  getSchoolJingle(params) {
    return axios.get(url.getSchoolJingle, {
      params,
    });
  },
  getCourseJingle(params) {
    return axios.get(url.getCourseJingle, {
      params,
    });
  },
  getTeacherJingle(params) {
    return axios.get(url.getTeacherJingle, {
      params,
    });
  },
  getClassroomJingle(params) {
    return axios.get(url.getClassroomJingle, {
      params,
    });
  },
  getStaClassListJingle(params) {
    return axios.get(url.getStaClassListJingle, {
      params,
    });
  },
  getClassJingle(params) {
    return axios.get(url.getClassJingle, {
      params,
    });
  },
};
export default educationHttp;
