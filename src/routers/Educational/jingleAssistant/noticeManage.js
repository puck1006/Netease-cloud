const noticeRouter = [
  {
    name: "noticeManage",
    path: "/Educational/JingleAssistant/noticeManage",
    redirect: "/Educational/JingleAssistant/noticeManage/notification",
    component: () =>
      import("@/views/Educational/JingleAssistant/noticeManage.vue"),
    children: [
      {
        name: 'notice-manage-notification',
        path: 'notification',
        component: () => import("@/views/Educational/JingleAssistant/noticeManage/notification.vue")
      },
      {
        name: 'notice-manage-announcement',
        path: 'announcement',
        component: () => import("@/views/Educational/JingleAssistant/noticeManage/announcement.vue")
      },
    ]
  },
]

export default noticeRouter;