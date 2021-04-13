//教务管理---首页路由******列表
const courseManagement = [
 // 课务管理--课程表
 {
  path: "/Educational/classSchedule",
  name: "classSchedule",
  // redirect: "/CourseManagement/classSchedule/classclassSchedule",
  component: () =>
    import("@/views/Educational/CourseManagement/classSchedule/classScheduleBox.vue"),
  children: [
    {
      path: "teacherSchedule",
      name: "classSchedule-teacherSchedule",
      meta:{
        isShowBack:true,//是否显示返回上一页
      },
      component: () =>
        import(
          "@/views/Educational/CourseManagement/classSchedule/classScheduleChild/teacherSchedule.vue"
        )
    },
    {
      path: "classDetails",
      name: "classSchedule-classDetails",
      meta:{
        isShowBack:true,//是否显示返回上一页
      },
      component: () =>
        import(
          "@/views/Educational/CourseManagement/classSchedule/classScheduleChild/classDetails.vue"
        )
    },
    // 报表
    {
      path: "report",
      name: "classSchedule-report",
      meta:{
        isShowBack:true,//是否显示返回上一页
      },
      component: () =>
        import(
          "@/views/Educational/CourseManagement/classSchedule/classScheduleChild/report.vue"
        )
    }
  ]
}
]
module.exports = courseManagement