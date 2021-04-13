import axios from 'axios'
import qs from 'qs'
import rootApi from '../../routerUrl'
const root = rootApi.easxApiUrl;
const url = {
    PersonalCenterHome: `${root}/PersonalCenter/Home`,//个人中心->我的班级 -- wgh
    InlearnCourse: `${root}/PersonalCenter/InlearnCourse`,//个人中心->在学课程 -- wgh
    getPostil: `${root}/PersonalCenter/getPostil`,//个人中心->我的批注-- wgh
    SeePostil: `${root}/PersonalCenter/SeePostil`,//个人中心->我的批注->查看批注-- wgh
    getVideo: `${root}/PersonalCenter/getVideo`,//个人中心->我的视频-- wgh
    TrainingHome: `${root}/Training/Home`,//个人中心->我的笔记 -- wgh
    SeeOnePostil: `${root}/PersonalCenter/SeeOnePostil`,//个人中心->查看编辑单个批注页面-- wgh
    LookNote: `${root}/PersonalCenter/LookNote`,//个人中心->查看笔记-- wgh
    LookOneNote: `${root}/PersonalCenter/LookOneNote`,//个人中心->查看编辑单个笔记页面-- wgh
    getCollection: `${root}/PersonalCenter/getCollection`,//个人中心->我的收藏-- wgh
    PersonNoteAction: `${root}/Training/PersonNoteAction`,//培训->添加个人笔记 -- wgh
    PersonPostilAction: `${root}/Courseware/PersonPostilAction`,//备课->添加个人批注 -- wgh
}

export default {
    //个人中心->我的班级 -- wgh
    PersonalCenterHome(params) {
        return axios.get(url.PersonalCenterHome, {
            params
        })
    },
    //个人中心->在学课程 -- wgh
    InlearnCourse(params) {
        return axios.get(url.InlearnCourse, {
            params
        })
    },
    //个人中心->我的批注-- wgh
    getPostil(params) {
        return axios.get(url.getPostil, {
            params
        })
    },
    // 个人中心->我的批注->查看批注-- wgh
    SeePostil(params) {
        return axios.get(url.SeePostil, {
            params
        })
    },
    //个人中心->查看编辑单个批注页面-- wgh
    SeeOnePostil(params) {
        return axios.get(url.SeeOnePostil, {
            params
        })
    },
    // 个人中心->我的视频-- wgh
    getVideo(params) {
        return axios.get(url.getVideo, {
            params
        })
    },
    // 个人中心->我的笔记 -- wgh
    TrainingHome(params) {
        return axios.get(url.TrainingHome, {
            params
        })
    },
    // 个人中心->查看笔记-- wgh
    LookNote(params) {
        return axios.get(url.LookNote, {
            params
        })
    },
    // 个人中心->查看编辑单个笔记页面-- wgh
    LookOneNote(params) {
        return axios.get(url.LookOneNote, {
            params
        })
    },
    // 个人中心->我的收藏-- wgh
    getCollection(params) {
        return axios.get(url.getCollection, {
            params
        })
    },
    //培训->添加个人笔记 -- wgh
    PersonNoteAction(params) {
        return axios.post(url.PersonNoteAction, qs.stringify(params));
    },
    //备课->添加个人批注 -- wgh
    PersonPostilAction(params) {
        return axios.post(url.PersonPostilAction, qs.stringify(params));
    },

}