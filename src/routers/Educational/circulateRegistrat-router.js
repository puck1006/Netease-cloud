//教务管理---小循环路由******列表
const CirculateRegistrat = [
    // 我的班级
    {
        path: "/Educational/myClass",
        redirect: "/Educational/myClass/onProgress",
        name: "myClass",
        component: () =>
            import("@/views/Educational/CirculateRegistrat/myClass.vue"),
        children: [
            {
                path: "/Educational/myClass/onProgress",
                name: "onProgress",
                component: () =>
                    import("@/views/Educational/CirculateRegistrat/circulateBox/onProgress.vue")
            },
            {
                path: "/Educational/myClass/notStarted",
                name: "notStarted",
                component: () =>
                    import("@/views/Educational/CirculateRegistrat/circulateBox/notStarted.vue")
            },
            {
                path: "/Educational/myClass/total",
                name: "total",
                component: () =>
                    import("@/views/Educational/CirculateRegistrat/circulateBox/total.vue")
            }
        ]
    },
    //小循环
    {
        path: "/Educational/circulateRegistrat",
        redirect: "/Educational/circulateRegistrat/classRecord",
        name: "circulateRegistrat",
        component: () =>
            import("@/views/Educational/CirculateRegistrat/circulateRegistrat.vue"),
        children: [
            {
                path: "/Educational/circulateRegistrat/classRecord",
                name: "classRecord",
                component: () =>
                    import("@/views/Educational/CirculateRegistrat/circulateBox/classRecord.vue"),
                // children: [
                //     {
                //         path: "/Educational/circulateRegistrat/classRecord/offlineRegist",
                //         name: "offlineRegist",
                //         component: () =>
                //             import("@/views/Educational/CirculateRegistrat/circulateBox/recordBox/offlineRegist.vue")
                //     },
                //     {
                //         path: "/Educational/circulateRegistrat/classRecord/onlineClass",
                //         name: "onlineClass",
                //         component: () =>
                //             import("@/views/Educational/CirculateRegistrat/circulateBox/recordBox/onlineClass.vue")
                //     },
                //     {
                //         path: "/Educational/circulateRegistrat/classRecord/missclassRecord",
                //         name: "missclassRecord",
                //         component: () =>
                //             import("@/views/Educational/CirculateRegistrat/circulateBox/recordBox/missclassRecord.vue")
                //     }
                // ]
            },
            {
                path: "/Educational/circulateRegistrat/callManagement",
                name: "callManagement",
                component: () =>
                    import("@/views/Educational/CirculateRegistrat/circulateBox/callManagement.vue")
            },

        ]
    },
    {
        path: "/Educational/studentManage",
        name: "studentManage",
        component: () =>
            import("@/views/Educational/CirculateRegistrat/circulateBox/studentManage.vue")
    }
]

module.exports = CirculateRegistrat