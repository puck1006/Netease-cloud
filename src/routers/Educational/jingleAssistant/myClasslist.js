const myClasslistRouters = [
  // 我的班级
  {
    path: "/Educational/JingleAssistant/myClasslist",
    redirect: "/Educational/JingleAssistant/myClasslist/onProgress",
    name: "myClasslist",
    component: () => import("@/views/Educational/JingleAssistant/myClasslist.vue"),
    children: [
      {
        path: "/Educational/JingleAssistant/myClasslist/onProgress",
        name: "onProgress",
        component: () =>
          import("@/views/Educational/JingleAssistant/myClasslist/onProgress.vue")
      },
      {
        path: "/Educational/JingleAssistant/myClasslist/notStarted",
        name: "notStarted",
        component: () =>
          import("@/views/Educational/JingleAssistant/myClasslist/notStarted.vue")
      },
      {
        path: "/Educational/JingleAssistant/myClasslist/total",
        name: "total",
        component: () =>
          import("@/views/Educational/JingleAssistant/myClasslist/total.vue")
      }
    ]
  }
];

export default myClasslistRouters;
