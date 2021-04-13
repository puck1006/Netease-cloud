//趣备课---首页路由******列表
const OpenClass = [
    // 首页
    {
        path: "/Training/OpenClass",
        name: "index",
        redirect:'/Training/OpenClass/AllCourseware',
        component: () =>
            import("@/views/Training/OpenClass/OpenClass.vue"),
        children: [ // 全部课件
            {
                path: "/Training/OpenClass/AllCourseware",
                name: "AllCourseware",
                component: () =>
                    import("@/views/Training/OpenClass/AllCourseware.vue"),
            },
            // 学科通识课
            {
                path: "/Training/OpenClass/OpenCourse",
                name: "OpenCourse",
                component: () =>
                    import("@/views/Training/OpenClass/OpenCourse.vue"),
            },
            // 校长培训
            {
                path: "/Training/OpenClass/PrincipalTraining",
                name: "PrincipalTraining",
                component: () =>
                    import("@/views/Training/OpenClass/PrincipalTraining.vue"),
            },
        ]
    },

]

module.exports = OpenClass