//趣备课---报表路由******列表
const Interesting = [
    // 报表
    {
        path: "/Interesting/report",
        redirect: "/Interesting/report/campusReport",
        name: "report",
        component: () =>
            import("@/views/Interesting/Report/report.vue"),
        children: [
            {
                path: "/Interesting/report/campusReport",
                name: "campusReport",
                component: () =>
                    import("@/views/Interesting/Report/reportBox/campusReport.vue")
            },
            {
                path: "/Interesting/report/teacherReport",
                name: "teacherReport",
                component: () =>
                    import("@/views/Interesting/Report/reportBox/teacherReport.vue")
            },
        ]
    },
    // 班级统计报表
    {
        path: "/Interesting/report/classReport",
        name: "classReport",
        component: () =>
            import("@/views/Interesting/Report/classReport.vue"),
    },
]

module.exports = Interesting