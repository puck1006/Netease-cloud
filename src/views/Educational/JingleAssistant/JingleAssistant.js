import axios from "axios";
import qs from "qs";
import rootApi from "../../../routerUrl";
const root = rootApi.easxApiUrl;

const url = {
  SendComplainAction: root + "/Mine/SendComplainAction", // 家长端->我的->发布投诉-qyh
  ScComplainList: root + "/Mine/ScComplainList", // c后台->投诉列表（学校）
  TeaComplainList: root + "/Mine/TeaComplainList", // pc后台->投诉列表（老师）
  ComplainDetail: root + "/Mine/ComplainDetail", //pc后台->投诉详情
  timetableOneApi: root + "/Timetable/timetableOneApi", // 后台PC->发布作业 单个班级的信息 - 97
};

const JingleAssistantHttp = {
  // 家长端->我的->发布投诉-qyh
  SendComplainAction(params) {
    return axios.post(url.SendComplainAction, qs.stringify(params));
  },
  // c后台->投诉列表（学校）
  ScComplainList(params) {
    return axios.get(url.ScComplainList, {
      params
    });
  },
  // pc后台->投诉列表（老师）
  TeaComplainList(params) {
    return axios.get(url.TeaComplainList, {
      params
    });
  },
  // pc后台->投诉详情）
  ComplainDetail(params) {
    return axios.get(url.ComplainDetail, {
      params
    });
  },
  // 后台PC->发布作业 单个班级的信息 - 97
  timetableOneApi(params) {
    return axios.get(url.timetableOneApi, {
      params
    });
  },
};
export default JingleAssistantHttp;
