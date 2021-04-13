//个人设置---路由******列表
const mySettings = [
    // 个人信息
    {
        path: "/mySettings/myInfo",
        name: "myInfo",
        component: () =>
            import("@/views/mySettings/myInfo.vue"),
    },
    //账号信息
    {
        path: "/mySettings/accoutInfo",
        name: "accoutInfo",
        component: () =>
            import("@/views/mySettings/accoutInfo.vue"),
    },
]

module.exports = mySettings