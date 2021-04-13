//趣备课---首页路由******列表
const ReportForm = [
    // 首页
    {
        path: "/Training/ReportForm",
        name: "index",
        redirect:'/Training/ReportForm/TrainingReport',
        component: () =>
            import("@/views/Training/ReportForm/ReportForm.vue"),
        children: [{
            path: "/Training/ReportForm/TrainingReport",
            name: "inTrainingReportdex",
            component: () =>
                import("@/views/Training/ReportForm/TrainingReport.vue"),
        }, {
            path: "/Training/ReportForm/JobStatistics",
            name: "JobStatistics",
            component: () =>
                import("@/views/Training/ReportForm/JobStatistics.vue"),
        }, {
            path: "/Training/ReportForm/TeachersReport",
            name: "TeachersReport",
            component: () =>
                import("@/views/Training/ReportForm/TeachersReport.vue"),
        }, {
            path: "/Training/ReportForm/OpenCourseReport",
            name: "OpenCourseReport",
            component: () =>
                import("@/views/Training/ReportForm/OpenCourseReport.vue"),
        }, ]
    },
]

module.exports = ReportForm