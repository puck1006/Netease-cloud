import axios from 'axios'
import qs from 'qs'
import rootApi from '../routerUrl'
const root = rootApi.easxApiUrl;
const url = {
  addStafferSchoolAction: `${root}/Api/addStafferSchoolAction`,
  getStafferInfo: `${root}/Index/getStafferInfo`,//获取教师信息 -- wgh
  getSchool: `${root}/Courseware/getSchool`,//备课->下拉->选择校园 -- wgh
  getCourse: `${root}/Courseware/getCourse`,//备课->下拉->选择课程别 -- wgh
  getClassroom: `${root}/Courseware/getClassroom`,//备课->下拉->选择教室 -- wgh
  getTeacher: `${root}/Courseware/getTeacher`,//备课->下拉->选择教师 -- wgh
  getClass: `${root}/Courseware/getClass`,//首页->备课提醒->选择班级 -- wgh
  GetCompanyImg: `${root}/Index/GetCompanyImg`,// 后台PC->获取企业logo
}

export default {
  //获取教师信息 -- wgh
  getStafferInfo(params) {
    return axios.get(url.getStafferInfo, {
      params
    })
  },
  addStafferSchoolAction(params) {
    return axios.post(url.addStafferSchoolAction, qs.stringify(params))
  },
  //备课->下拉->选择校园 -- wgh
  getSchool(params) {
    return axios.get(url.getSchool, {
      params
    })
  },
  //备课->下拉->选择课程别 -- wgh
  getCourse(params) {
    return axios.get(url.getCourse, {
      params
    })
  },
  //备课->下拉->选择教室 -- wgh
  getClassroom(params) {
    return axios.get(url.getClassroom, {
      params
    })
  },
  //备课->下拉->选择教师 -- wgh
  getTeacher(params) {
    return axios.get(url.getTeacher, {
      params
    })
  },
  // 首页->备课提醒->选择班级 -- wgh
  getClass(params) {
    return axios.get(url.getClass, {
      params
    })
  },
  // 后台PC->获取企业logo
  GetCompanyImg(params) {
    return axios.get(url.GetCompanyImg, {
      params
    })
  },
}