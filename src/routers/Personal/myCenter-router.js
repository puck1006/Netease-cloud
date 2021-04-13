//个人中心---路由******列表
const myCenter = [
    // 我的班级
    {
        path: "/myCenter/myClass",
        name: "myClass",
        component: () =>
            import("@/views/myCenter/myClass.vue"),
    },
    // 在学课程
    {
        path: "/myCenter/currentCourse",
        redirect: "/myCenter/currentCourse/careerGrowth",
        name: "currentCourse",
        component: () =>
            import("@/views/myCenter/currentCourse.vue"),
        children: [
            // 职业成长
            {
                path: "/myCenter/currentCourse/careerGrowth",
                name: "careerGrowth",
                component: () =>
                    import("@/views/myCenter/currentCourseBox/careerGrowth.vue")
            },
            // 通识课
            {
                path: "/myCenter/currentCourse/publicClass",
                name: "publicClass",
                component: () =>
                    import("@/views/myCenter/currentCourseBox/publicClass.vue")
            }
        ]
    },
    // 我的批注
    {
        path: "/myCenter/myComment",
        name: "myComment",
        component: () =>
            import("@/views/myCenter/myComment.vue"),
    },
    // 查看批注
    {
        path: "/myCenter/seeComment",
        name: "seeComment",
        component: () =>
            import("@/views/myCenter/seeComment.vue"),
    },
    // 预览批注
    {
        path: "/myCenter/previewComment",
        name: "previewComment",
        component: () =>
            import("@/views/myCenter/previewComment.vue"),
    },
    // 我的笔记
    {
        path: "/myCenter/myNote",
        name: "myNote",
        component: () =>
            import("@/views/myCenter/myNote.vue"),
    },
    // 查看笔记
    {
        path: "/myCenter/seeNote",
        name: "seeNote",
        component: () =>
            import("@/views/myCenter/seeNote.vue"),
    },
    // 预览笔记
    {
        path: "/myCenter/previewNote",
        name: "previewNote",
        component: () =>
            import("@/views/myCenter/previewNote.vue"),
    },
    // 我的教学视频
    {
        path: "/myCenter/myVideo",
        name: "myVideo",
        component: () =>
            import("@/views/myCenter/myVideo.vue"),
    },
    // 我的收藏
    {
        path: "/myCenter/myCollect",
        redirect: "/myCenter/myCollect/prepareLesson",
        name: "myCollect",
        component: () =>
            import("@/views/myCenter/myCollect.vue"),
        children: [
            // 备课
            {
                path: "/myCenter/myCollect/prepareLesson",
                name: "prepareLesson",
                component: () =>
                    import("@/views/myCenter/myCollectBox/prepareLesson.vue")
            },
            // 培训
            {
                path: "/myCenter/myCollect/training",
                name: "training",
                component: () =>
                    import("@/views/myCenter/myCollectBox/training.vue")
            }
        ]
    },
]

module.exports = myCenter