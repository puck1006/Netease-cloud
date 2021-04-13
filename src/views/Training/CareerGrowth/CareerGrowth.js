import axios from 'axios'
import qs from 'qs'
import rootApi from '../../../routerUrl'
const root = rootApi.easxApiUrl;
const url = {
    Home: `${root}/Training/Home`,
    AtOnceStudy: `${root}/Training/AtOnceStudy`,
    ExamInfo: `${root}/Training/ExamInfo`,
    getTestpaperQuestion: `${root}/Training/getTestpaperQuestion`,
    getSubjects: `${root}/Training/getSubjects`,
    getQuestion: `${root}/Training/getQuestion`,
    getScore: `${root}/Training/getScore`,
    ExamRecord: `${root}/Training/ExamRecord`,
    LookAnswer: `${root}/Training/LookAnswer`,
    SeeCourse: `${root}/Training/SeeCourse`,
    CourseCollectAction: `${root}/Training/CourseCollectAction`,
    AddCourseCollectAction: `${root}/Training/AddCourseCollectAction`,
    WatchVideo: `${root}/Training/WatchVideo`,
    AddWatchVideoInfoAction: `${root}/Training/AddWatchVideoInfoAction`,
    WatchVideoCompleteAction: `${root}/Training/WatchVideoCompleteAction`,
    OpenCourse: `${root}/Training/OpenCourse`,
    PersonNoteAction: `${root}/Training/PersonNoteAction`,
    PostTotalTrainReport: `${root}/Training/PostTotalTrainReport`,
    getCareer: `${root}/Training/getCareer`,
    TeacherReport: `${root}/Training/TeacherReport`,
    OpenClassReport: `${root}/Training/OpenClassReport`,
}

export default {
    Home(params) {
        return axios.get(url.Home, {
            params
        })
    },
    OpenClassReport(params) {
        return axios.get(url.OpenClassReport, {
            params
        })
    },
    TeacherReport(params) {
        return axios.get(url.TeacherReport, {
            params
        })
    },
    getCareer(params) {
        return axios.get(url.getCareer, {
            params
        })
    },
    AtOnceStudy(params) {
        return axios.get(url.AtOnceStudy, {
            params
        })
    },
    ExamInfo(params) {
        return axios.get(url.ExamInfo, {
            params
        })
    },
    getTestpaperQuestion(params) {
        return axios.get(url.getTestpaperQuestion, {
            params
        })
    },
    getSubjects(params) {
        return axios.get(url.getSubjects, {
            params
        })
    },
    getQuestion(params) {
        return axios.get(url.getQuestion, {
            params
        })
    },
    ExamRecord(params) {
        return axios.get(url.ExamRecord, {
            params
        })
    },
    LookAnswer(params) {
        return axios.get(url.LookAnswer, {
            params
        })
    },
    SeeCourse(params) {
        return axios.get(url.SeeCourse, {
            params
        })
    },
    WatchVideo(params) {
        return axios.get(url.WatchVideo, {
            params
        })
    },
    OpenCourse(params) {
        return axios.get(url.OpenCourse, {
            params
        })
    },
    PostTotalTrainReport(params) {
        return axios.get(url.PostTotalTrainReport, {
            params
        })
    },
    getScore(params) {
        return axios.post(url.getScore, qs.stringify(params));
    },
    CourseCollectAction(params) {
        return axios.post(url.CourseCollectAction, qs.stringify(params));
    },
    AddCourseCollectAction(params) {
        return axios.post(url.AddCourseCollectAction, qs.stringify(params));
    },
    AddWatchVideoInfoAction(params) {
        return axios.post(url.AddWatchVideoInfoAction, qs.stringify(params));
    },
    WatchVideoCompleteAction(params) {
        return axios.post(url.WatchVideoCompleteAction, qs.stringify(params));
    },
    PersonNoteAction(params) {
        return axios.post(url.PersonNoteAction, qs.stringify(params));
    },

}