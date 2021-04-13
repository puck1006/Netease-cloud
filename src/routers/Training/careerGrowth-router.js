//趣备课---首页路由******列表
const CareerGrowth = [
    // 首页
    {
        path: "/Training/CareerGrowth",
        name: "CareerGrowth",
        component: () =>
            import("@/views/Training/CareerGrowth/CareerGrowth.vue"),
    },
    // 立即学习
    {
        path: "/Training/LearningOnce",
        name: "LearningOnce",
        component: () =>
            import("@/views/Training/CareerGrowth/LearningOnce.vue"),
    },
    // 学习阶段列表
    {
        path: "/Training/LearningStages",
        name: "LearningStages",
        component: () =>
            import("@/views/Training/CareerGrowth/LearningStages.vue"),
    },
    // 考核
    {
        path: "/Training/Assessment",
        name: "Assessment",
        component: () =>
            import("@/views/Training/CareerGrowth/Assessment.vue"),
    },
    // 考核2
    {
        path: "/Training/AssessmentNext",
        name: "AssessmentNext",
        component: () =>
            import("@/views/Training/CareerGrowth/AssessmentNext.vue"),
    },
    // 正在考试
    {
        path: "/Training/AssessProgress",
        name: "AssessProgress",
        redirect: '/Training/AssessProgress/InExam',
        component: () =>
            import("@/views/Training/CareerGrowth/AssessProgress.vue"),
        children: [{
                path: "/Training/AssessProgress/InExam",
                name: "InExam",
                component: () =>
                    import("@/views/Training/CareerGrowth/InExam.vue"),
            },
            {
                path: "/Training/AssessProgress/ExaminationRecord",
                name: "ExaminationRecord",
                component: () =>
                    import("@/views/Training/CareerGrowth/ExaminationRecord.vue"),
            },
        ]
    },
    // 查看答案
    {
        path: "/Training/Answer",
        name: "Answer",
        component: () =>
            import("@/views/Training/CareerGrowth/Answer.vue"),
    },
    // 考核
    {
        path: "/Training/ViewCourses",
        name: "ViewCourses",
        component: () =>
            import("@/views/Training/CareerGrowth/ViewCourses.vue"),
    },
    // 观看视频
    {
        path: "/Training/WatchVideo",
        name: "WatchVideo",
        component: () =>
            import("@/views/Training/CareerGrowth/WatchVideo.vue"),
    },
    // 观看音频
    {
        path: "/Training/WatchAudio",
        name: "WatchAudio",
        component: () =>
            import("@/views/Training/CareerGrowth/WatchAudio.vue"),
    },
    // 观看ppt
    {
        path: "/Training/WatchPPT",
        name: "WatchPPT",
        component: () =>
            import("@/views/Training/CareerGrowth/WatchPPT.vue"),
    },
]

module.exports = CareerGrowth