//教务管理---首页路由******列表
const MySchedule = [
    // 我的课表
    {
        path: "/Educational/mySchedule",
        name: "mySchedule",
        component: () =>
            import("@/views/Educational/MySchedule/mySchedule.vue"),
    }
]
module.exports = MySchedule