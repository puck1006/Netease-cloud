//教务管理---教务检核路由******列表
const checkStatus = [
    // 我的班级
    {
        path: "/Educational/checkStatus",
        redirect: "/Educational/checkStatus/onProgress",
        name: "checkStatus",
        component: () =>
            import("@/views/Educational/CheckStatus/checkStatus.vue"),
        children: [
            {
                path: "/Educational/checkStatus/onProgress",
                name: "onProgress",
                component: () =>
                    import("@/views/Educational/CheckStatus/checkBox/onProgress.vue")
            },
            {
                path: "/Educational/checkStatus/notStarted",
                name: "notStarted",
                component: () =>
                    import("@/views/Educational/CheckStatus/checkBox/notStarted.vue")
            },
            {
                path: "/Educational/checkStatus/total",
                name: "total",
                component: () =>
                    import("@/views/Educational/CheckStatus/checkBox/total.vue")
            }
        ]
    },
    // 查看检核状况
    {
        path: "/Educational/viewCheckStatus",
        name: "viewCheckStatus",
        component: () =>
            import("@/views/Educational/CheckStatus/viewCheckStatus.vue"),
    },
    // 查看教务检核详情
    {
        path: "/Educational/viewCheckDetails",
        name: "viewCheckDetails",
        redirect: "/Educational/viewCheckDetails/classTeaching",
        component: () =>
            import("@/views/Educational/CheckStatus/viewCheckDetails.vue"),
        children: [
            {
                path: "/Educational/viewCheckDetails/classTeaching",
                name: "classTeaching",
                component: () =>
                    import("@/views/Educational/CheckStatus/viewBox/classTeaching.vue")
            },
            {
                path: "/Educational/viewCheckDetails/commonTeaching",
                name: "commonTeaching",
                component: () =>
                    import("@/views/Educational/CheckStatus/viewBox/commonTeaching.vue")
            }
        ]
    },
]

module.exports = checkStatus