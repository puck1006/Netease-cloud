import axios from 'axios'
// import qs from 'qs'
import rootApi from '../../../routerUrl'
const smcRoot = rootApi.smcApiUrl;
const url = {
  getSchool: smcRoot + '/Common/getSchoolApi',
  getDistrict: smcRoot + '/Common/getDistrictApi',
  getProvince: smcRoot + '/Common/getProvinceApi',
  getCity: smcRoot + '/Common/getCityApi',
  getSchooOrganizel: smcRoot + '/Common/getSchooOrganizelApi',
}

export default {
  // 选择筛选学校
  getSchool(params) {
    return axios.get(url.getSchool, {
      params
    })
  },
  //大区域 -- 筛选区域 
  getDistrict(params) {
    return axios.get(url.getDistrict, {
      params
    })
  },
  //获取省份
  getProvince(params) {
    return axios.get(url.getProvince, {
      params
    })
  },
  //获取城市
  getCity(params) {
    return axios.get(url.getCity, {
      params
    })
  },
  //筛选职工所属学校组织
  getSchooOrganizel(params) {
    return axios.get(url.getSchooOrganizel, {
      params
    })
  },

}