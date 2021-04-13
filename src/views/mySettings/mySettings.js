import axios from 'axios'
import qs from 'qs'
import rootApi from '../../routerUrl'
const root = rootApi.easxApiUrl;

const url = {
    // 个人信息
    getStafferInfo: root + "/Index/getStafferInfo", // 主页->获取教师信息
    updateStafferInfoAction: root + "/PersonalCenter/updateStafferInfoAction", // 个人中心->修改个人信息
    User: root + "/PersonalCenter/User", // 个人中心->获取账号信息
    updatePassAction: root + "/PersonalCenter/updatePassAction", // 个人中心->修改密码


}

const acountHttp = {
    // 个人信息
    getStafferInfo(params) {
        return axios.get(url.getStafferInfo, {
            params
        })
    },
    updateStafferInfoAction(params) {
        return axios.post(url.updateStafferInfoAction, qs.stringify(params))
    },
    User(params) {
        return axios.get(url.User, {
            params
        })
    },
    updatePassAction(params) {
        return axios.post(url.updatePassAction, qs.stringify(params))
    },

}
export default acountHttp
