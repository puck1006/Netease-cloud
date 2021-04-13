//教务管理---报表路由******列表
const educationalReport = [
  // 报表
  {
    path: "/Educational/report/classTeacherReport",
    redirect: "/Educational/report/classTeacherReport/classReport",
    name: "classTeacherReport",
    component: () =>
      import("@/views/Educational/EducationalReport/educationalReport.vue"),
    children: [
      {
        path: "/Educational/report/classTeacherReport/classReport",
        name: "classReport",
        component: () =>
          import(
            "@/views/Educational/EducationalReport/reportBox/classReport.vue"
          ),
      },
      {
        path: "/Educational/report/classTeacherReport/teacherReport",
        name: "teacherReport",
        component: () =>
          import(
            "@/views/Educational/EducationalReport/reportBox/teacherReport.vue"
          ),
      },
      {
        path: "/Educational/report/classTeacherReport/generalStatistics",
        name: "generalStatistics",
        component: () =>
          import(
            "@/views/Educational/EducationalReport/reportBox/generalStatistics.vue"
          ),
      },
    ],
  },
  {
    path: "/Educational/report/schoolCenterReport",
    name: "schoolCenterReport",
    redirect: "/Educational/report/schoolCenterReport/schoolTaskReport",
    component: () =>
      import(
        "@/views/Educational/EducationalReport/reportBox/schoolCenterReport.vue"
      ),
    children: [
      {
        path: "schoolTaskReport",
        name: "schoolTaskReport",
        component: () =>
          import(
            "@/views/Educational/EducationalReport/reportBox/centerBox/schoolTaskReport.vue"
          ),
      },
      {
        path: "averageTaskReport",
        name: "averageTaskReport",
        component: () =>
          import(
            "@/views/Educational/EducationalReport/reportBox/centerBox/averageTaskReport.vue"
          ),
      },
      {
        path: "normalPhone",
        name: "normalPhone",
        component: () =>
          import(
            "@/views/Educational/EducationalReport/reportBox/centerBox/normalPhone.vue"
          ),
      },
    ],
  },
  // 班级教师统计报表
  {
    path: "/Educational/report/eduWorkReport",
    name: "eduWorkReport",
    component: () =>
      import("@/views/Educational/EducationalReport/eduWorkReport.vue"),
  },
  // 班级教师统计报表 -- 查看详情
  {
    path: "/Educational/report/eduWorkReport/eduWorkDetail",
    name: "eduWorkDetail",
    component: () =>
      import("@/views/Educational/EducationalReport/eduWorkDetail.vue"),
  },
  // 查看校总表
  {
    path: "/Educational/report/classTaskReport",
    name: "classTaskReport",
    component: () =>
      import(
        "@/views/Educational/EducationalReport/reportBox/centerBox/classTaskReport.vue"
      ),
  },
  // 课时统计
  {
    path: "/Educational/report/classTeacherReport/classTime",
    name: "classTime",
    component: () =>
      import("@/views/Educational/EducationalReport/classTime.vue"),
  },
  // 电访记录
  {
    path: "/Educational/report/classTeacherReport/callRecord",
    name: "callReport",
    component: () =>
      import("@/views/Educational/EducationalReport/callRecord.vue"),
  },
];

module.exports = educationalReport;
