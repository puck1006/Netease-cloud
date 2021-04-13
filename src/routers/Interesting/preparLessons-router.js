//趣备课---备课路由******列表
const Interesting = [
  // 我的班级
  {
    path: "/Interesting/prepareLessons",
    redirect: "/Interesting/prepareLessons/processing",
    name: "myClass",
    component: () => import("@/views/Interesting/prepareLessons/myClass.vue"),
    children: [
      {
        path: "/Interesting/prepareLessons/processing",
        name: "processing",
        component: () =>
          import(
            "@/views/Interesting/prepareLessons/myClassBox/processing.vue"
          ),
      },
      {
        path: "/Interesting/prepareLessons/noStart",
        name: "noStart",
        component: () =>
          import("@/views/Interesting/prepareLessons/myClassBox/noStart.vue"),
      },
      {
        path: "/Interesting/prepareLessons/total",
        name: "total",
        component: () =>
          import("@/views/Interesting/prepareLessons/myClassBox/total.vue"),
      },
    ],
  },
  // 备课
  {
    path: "/Interesting/prepareLessons/preLessonDetais",
    redirect: "/Interesting/prepareLessons/preLessonDetais/courseWare",
    name: "preLessonDetais",
    component: () =>
      import("@/views/Interesting/prepareLessons/preLessonDetais.vue"),
    children: [
      {
        path: "/Interesting/prepareLessons/preLessonDetais/courseWare",
        name: "courseWare",
        component: () =>
          import(
            "@/views/Interesting/prepareLessons/preLessonDetaisBox/courseWare.vue"
          ),
      },
      {
        path: "/Interesting/prepareLessons/preLessonDetais/editLessonPlans",
        name: "editLessonPlans",
        component: () =>
          import(
            "@/views/Interesting/prepareLessons/preLessonDetaisBox/editLessonPlans.vue"
          ),
      },
      {
        path: "/Interesting/prepareLessons/preLessonDetais/lessonPlan",
        name: "lessonPlan",
        component: () =>
          import(
            "@/views/Interesting/prepareLessons/preLessonDetaisBox/lessonPlan.vue"
          ),
      },
      {
        path: "/Interesting/prepareLessons/preLessonDetais/materials",
        name: "materials",
        component: () =>
          import(
            "@/views/Interesting/prepareLessons/preLessonDetaisBox/materials.vue"
          ),
      },
    ],
  },
  // 优质批注推荐
  {
    path: "/Interesting/prepareLessons/highRecommend",
    name: "highRecommend",
    component: () =>
      import("@/views/Interesting/prepareLessons/highRecommend.vue"),
  },
  // 优质视频
  {
    path: "/Interesting/prepareLessons/highVideo",
    name: "highVideo",
    component: () => import("@/views/Interesting/prepareLessons/highVideo.vue"),
  },
  // 优质作品
  // {
  //     path: "/Interesting/prepareLessons/highWork",
  //     redirect: "/Interesting/prepareLessons/highWork/highVideo",
  //     name: "preLessonDetais",
  //     component: () =>
  //         import("@/views/Interesting/prepareLessons/highWork.vue"),
  //     children: [
  //         {
  //             path: "/Interesting/prepareLessons/highWork/highVideo",
  //             name: "highVideo",
  //             component: () =>
  //                 import("@/views/Interesting/prepareLessons/highWorkBox/highVideo.vue")
  //         },
  //         {
  //             path: "/Interesting/prepareLessons/highWork/highLesson",
  //             name: "highLesson",
  //             component: () =>
  //                 import("@/views/Interesting/prepareLessons/highWorkBox/highLesson.vue")
  //         },

  //     ]
  // },
  {
    path: "/Interesting/prepareLessons/highWork",
    name: "highVideo",
    component: () => import("@/views/Interesting/prepareLessons/highWorkBox/highVideo.vue"),
  },
  // 所有优质作品
  {
    path: "/Interesting/prepareLessons/allWork",
    name: "allWork",
    component: () => import("@/views/Interesting/prepareLessons/allWork.vue"),
  },
  //预览批注/预览教案
  {
    path: "/Interesting/prepareLessons/previewCont",
    name: "previewCont",
    component: () =>
      import("@/views/Interesting/prepareLessons/previewCont.vue"),
  },
];

module.exports = Interesting;
