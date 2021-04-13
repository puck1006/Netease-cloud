import axios from 'axios'
import qs from 'qs'
import rootApi from "../../../../routerUrl";
// import urls from '../../../routerUrl'
//将所有的主机名和端口 一起设置
// axios.defaults.baseURL = "crmapi.kidcastle.org";
const root = rootApi.easxApiUrl;

//首页数据请求
const url = {
  // 侯小草添加-----开始
  getTeacTimetable: root + "/Timetable/getTeacTimetable",
  getClassroomList: root + "/Timetable/getClassroomList",//课程管理->课表->获取教室
  classCourseOneApi: root + "/Timetable/classCourseOneApi",//课务管理->班级课表->课程详情
  stafferTimeTable: root + "/Timetable/stafferTimeTable",//-教学教务->课表->教师详情课表-lujing
  getStafferTeachingTime: root + "/Timetable/getStafferTeachingTime",//-教学教务->教师空闲时间段
  getCompanyTeaPostApi: root + "/Timetable/getCompanyTeaPostApi",//教学教务->课表->获取集团职务-lujing
}
const storeclassSchedule = {
  //课务管理->获取学校老师的课表-
  getTeacTimetable(params) {
    return axios.get(url.getTeacTimetable, { params })
  },
  //课务管理->获取班级的周课表
  getClassroomList(params) {
    return axios.get(url.getClassroomList, { params })
  },
  //课务管理->班级课表->课程详情
  classCourseOneApi(params) {
    return axios.get(url.classCourseOneApi, { params })
  },
  //-教学教务->课表->教师详情课表-lujing
  stafferTimeTable(params) {
    return axios.get(url.stafferTimeTable, { params })
  },
  //-教学教务->教师空闲时间段
  getStafferTeachingTime(params) {
    return axios.get(url.getStafferTeachingTime, { params })
  },
  //教学教务->课表->获取集团职务-lujing
  getCompanyTeaPostApi(params) {
    return axios.get(url.getCompanyTeaPostApi, { params })
  },

  //-----------侯小草结束
}

export default storeclassSchedule;