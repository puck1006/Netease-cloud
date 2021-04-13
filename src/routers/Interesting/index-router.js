//趣备课---首页路由******列表
const Interesting = [
    // 首页
    {
        path: "/Interesting/index",
        name: "index",
        component: () =>
            import("@/views/Interesting/Index/index.vue"),
    },
    // 备课提醒
    {
        path: "/Interesting/classReminder",
        redirect: "/Interesting/classReminder/pendClass",
        name: "classReminder",
        component: () =>
            import("@/views/Interesting/Index/classReminder.vue"),
        children: [
            {
                path: "/Interesting/classReminder/total",
                name: "total",
                component: () =>
                    import("@/views/Interesting/Index/classReminderBox/total.vue")
            },
            {
                path: "/Interesting/classReminder/pendClass",
                name: "pendClass",
                component: () =>
                    import("@/views/Interesting/Index/classReminderBox/pendClass.vue")
            },
            {
                path: "/Interesting/classReminder/lessonDelay",
                name: "lessonDelay",
                component: () =>
                    import("@/views/Interesting/Index/classReminderBox/lessonDelay.vue")
            },
            {
                path: "/Interesting/classReminder/class",
                name: "class",
                component: () =>
                    import("@/views/Interesting/Index/classReminderBox/class.vue")
            }
        ]
    }
]

module.exports = Interesting