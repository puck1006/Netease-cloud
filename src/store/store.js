import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isSchoolAffairs: true, //是否为校务教务系统
        module_id: "",
        navActiveIndex: "1", //导航栏模块选择
        permisssionDilaog: false, 
        sliderActiveIndex: "0", //导航栏模块选择
        openMenu: ["0"],
        IS_ADMIN: false,
        IS_CHANGE: false,
        OLD_TOKEN: "", //old_token
        USER_TOKEN: "", //token
        STAFFER_ID: "", //staffer_id
        COMPANY_ID: "", //company_id
        SCHOOL_ID: "", //school_id
        USER_INFO: null, //用户信息
        isLessonPlan: false, //是否有个性化教案
        //趣备课
        Slider: [{
                title: "首页",
                icon: "icon-sy",
                activeIndex: "0",
                url: "/Interesting/index",
                children: []
            },
            {
                title: "备课",
                icon: "icon-bk",
                activeIndex: "1",
                url: "/Interesting/prepareLessons",
                children: []
            },
            {
                title: "报表",
                icon: "icon-baobiao",
                activeIndex: "2",
                url: "/Interesting/report",
                children: []
            }
        ],
        //培训
        SliderTwo: [{
                title: "职业成长",
                icon: "icon-zycz",
                activeIndex: "0",
                url: "/Training/CareerGrowth",
                children: []
            },
            {
                title: "通识课",
                icon: "icon-gkk",
                activeIndex: "1",
                url: "/Training/OpenClass",
                children: []
            },
            {
                title: "报表",
                icon: "icon-baobiao",
                activeIndex: "2",
                url: "/Training/ReportForm",
                children: []
            }
        ],
        //教务管理
        SliderThree: [{
                title: "首页",
                icon: "icon-sy",
                activeIndex: "0",
                url: "/Educational/index",
                children: []
            },
            {
                title: "我的课表",
                icon: "icon-rl",
                activeIndex: "1",
                url: "/Educational/mySchedule",
                children: []
            },
            {
                title: "我的班级",
                icon: "icon-xiaoxhdj",
                activeIndex: "2",
                url: "/Educational/myClass",
                children: []
            },
            {
                title: "教务检核",
                icon: "icon-jwjhzk",
                activeIndex: "3",
                url: "/Educational/checkStatus",
                children: []
            },
            {
                title: "叮铛助教",
                icon: "icon-zycz",
                activeIndex: "4",
                children: [
                    {
                        title: "教务工作",
                        activeIndex: "1",
                        url: "/Educational/JingleAssistant/myClasslist",
                    },
                    {
                        title: "消息查询",
                        activeIndex: "2",
                        url: "/Educational/JingleAssistant/inforQuery"
                    },
                    {
                        title: "作业管理",
                        activeIndex: "3",
                        url: "/Educational/JingleAssistant/homeworkManage"
                    },
                    {
                        title: "通知管理",
                        activeIndex: "4",
                        url: "/Educational/JingleAssistant/noticeManage"
                    },
                    {
                        title: "老师评价学生",
                        activeIndex: "5",
                        url: "/Educational/JingleAssistant/teacherAssess"
                        // /JingleAssistant/teacherAssess/StatisticsClass
                        
                    },
                    {
                        title: "家长评价老师",
                        activeIndex: "6",
                        url: "/Educational/JingleAssistant/parentAssess"
                    },
                    {
                        title: "投诉与建议",
                        activeIndex: "7",
                        url: "/Educational/JingleAssistant/complaint"
                    }
                ]
            },
            {
                title: "课表",
                icon: "icon-zycz",
                activeIndex: "4",
                url: "/Educational/classSchedule/teacherSchedule",
                children: [
                    // {
                    //     title: "教务工作",
                    //     activeIndex: "1",
                    //     url: "/Educational/JingleAssistant/myClasslist",
                    // },
                    // {
                    //     title: "消息查询",
                    //     activeIndex: "2",
                    //     url: "/Educational/JingleAssistant/inforQuery"
                    // }
                ]
            },
            {
                title: "报表",
                icon: "icon-baobiao",
                activeIndex: "5",
                // url: "/Educational/report",
                children: [
                    {
                        title: "班级教师统计报表",
                        activeIndex: "1",
                        url: "/Educational/report/classTeacherReport",
                    },
                    {
                        title: "中心基地总表",
                        activeIndex: "2",
                        url: "/Educational/report/schoolCenterReport"
                    },
                    {
                        title: "教务工作报表",
                        activeIndex: "3",
                        url: "/Educational/report/eduWorkReport"
                    },
                ]
            }
        ],
        //个人中心
        SliderFour: [{
                title: "我的班级",
                icon: "icon-wdbj",
                activeIndex: "0",
                url: "/myCenter/myClass",
                children: []
            },
            {
                title: "在学课程",
                icon: "icon-zxkc",
                activeIndex: "1",
                url: "/myCenter/currentCourse",
                children: []
            },
            {
                title: "我的批注",
                icon: "icon-wdpz",
                activeIndex: "2",
                url: "/myCenter/myComment",
                children: []
            },
            {
                title: "我的笔记",
                icon: "icon-wdbiji",
                activeIndex: "3",
                url: "/myCenter/myNote",
                children: []
            },
            {
                title: "我的教学视频",
                icon: "icon-wdjxsp",
                activeIndex: "4",
                url: "/myCenter/myVideo",
                children: []
            },
            {
                title: "我的收藏",
                icon: "icon-wdsc",
                activeIndex: "5",
                url: "/myCenter/myCollect",
                children: []
            }
        ],
        //个人设置
        SliderFive: [{
                title: "个人信息",
                icon: "icon-grxinxi",
                activeIndex: "0",
                url: "/mySettings/myInfo",
                children: []
            },
            {
                title: "账号信息",
                icon: "icon-zhxinxi",
                activeIndex: "1",
                url: "/mySettings/accoutInfo",
                children: []
            }
        ]
    },
    mutations: {
        setIsSchoolAffairs(state, isSchoolAffairs) {
            state.isSchoolAffairs = isSchoolAffairs;
        },
        setModuleId(state, id) {
            state.module_id = id;
        },
        showPermisssionDilaog(state, i) {
            state.permisssionDilaog = i;
        },
        setNavActiveIndex(state, index) {
            state.navActiveIndex = index;
        },
        setActiveIndex(state, index) {
            state.sliderActiveIndex = index;
        },
        setOpenMenu(state, open) {
            state.openMenu = open;
        },
        setIsAdmin(state, isadmin) {
            state.IS_ADMIN = isadmin;
        },
        setIsChange(state, ischange) {
            state.IS_CHANGE = ischange;
        },
        setSlider(state, slider) {
            state.Slider = slider;
        },
        setInnerSlider(state, slider) {
            state.INNER_SLIDER = slider;
        },

        setOldToken(state, old_token) {
            state.OLD_TOKEN = old_token;
        },
        setToken(state, token) {
            state.USER_TOKEN = token;
        },
        setStaffer_id(state, staffer_id) {
            state.STAFFER_ID = staffer_id;
        },
        setCompany_id(state, company_id) {
            state.COMPANY_ID = company_id;
        },
        setSchool_id(state, school_id) {
            state.school_id = school_id;
        },
        SET_LOGO(state, logoSrc) {
            state.LOGO_IMG = logoSrc;
            console.log(state.LOGO_IMG);
        },
        setUserInfo(state, user_info) {
            state.USER_INFO = user_info;
        },
        setIsLessonPlan(state, isLessonPlan) {
            state.isLessonPlan = isLessonPlan;
        }
    },
    actions: {
        setIsSchoolAffairs(context, isSchoolAffairs) {
            context.commit("setIsSchoolAffairs", isSchoolAffairs);
        },
        setModuleId(context, id) {
            context.commit("setModuleId", id);
        },
        setActiveIndex(context, index) {
            context.commit("setActiveIndex", index);
        },
        showPermisssionDilaog(context, i) {
            context.commit("showPermisssionDilaog", i);
        },
        setNavActiveIndex(context, index) {
            context.commit("setNavActiveIndex", index);
        },
        setOpenMenu(context, open) {
            context.commit("setOpenMenu", open);
        },
        setIsAdmin(context, isadmin) {
            context.commit("setIsAdmin", isadmin);
        },
        setIsChange(context, ischange) {
            context.commit("setIsChange", ischange);
        },
        setSlider(context, slider) {
            context.commit("setSlider", slider);
        },
        setInnerSlider(context, slider) {
            context.commit("setInnerSlider", slider);
        },
        setOldToken(context, old_token) {
            context.commit("setOldToken", old_token);
        },
        setToken(context, token) {
            context.commit("setToken", token);
        },
        setStaffer_id(context, staffer_id) {
            context.commit("setStaffer_id", staffer_id);
        },
        setCompany_id(context, company_id) {
            context.commit("setCompany_id", company_id);
        },
        setSchool_id(context, school_id) {
            context.commit("setSchool_id", school_id);
        },
        SET_LOGO(context, logoSrc) {
            context.commit("SET_LOGO", logoSrc);
        },
        setUserInfo(context, user_info) {
            context.commit("setUserInfo", user_info);
        },
        setIsLessonPlan(context, isLessonPlan) {
            context.commit("setIsLessonPlan", isLessonPlan);
        }
    }
});