//消息中心---路由******列表
const message = [

    // 消息中心列表
    {
        path: "/message",
        redirect: "/message/total",
        name: "message",
        component: () =>
            import("@/views/Message/message.vue"),
        children: [
            // 全部消息
            {
                path: "/message/total",
                name: "total",
                component: () =>
                    import("@/views/Message/messageBox/total.vue")
            },
            // 系统消息
            {
                path: "/message/system",
                name: "system",
                component: () =>
                    import("@/views/Message/messageBox/system.vue")
            },
            // 通知消息
            {
                path: "/message/notice",
                name: "notice",
                component: () =>
                    import("@/views/Message/messageBox/notice.vue")
            }
        ]
    },
    // 消息详情
    {
        path: "/message/messageDetail",
        name: "messageDetail",
        component: () =>
            import("@/views/Message/messageDetail.vue"),
    },
]

module.exports = message