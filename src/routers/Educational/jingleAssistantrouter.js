import noticeManageRouters from "./jingleAssistant/noticeManage";
import myClasslistRouters from "./jingleAssistant/myClasslist";

//教务管理---d叮铛助教路由******列表
const JingleAssistantrouter = [
  {
    path: "/Educational/JingleAssistant/myClass",
    component: () => import("@/views/Educational/JingleAssistant/myClass.vue")
  },
  // 教务工作
  {
    path: "/Educational/JingleAssistant/educationWork",
    redirect: "/Educational/JingleAssistant/educationWork/classReviews",
    component: () =>
      import("@/views/Educational/JingleAssistant/educationWork.vue"),
    children: [
      {
        path: "classReviews",
        name: "classReviews",
        component: () =>
          import(
            "@/views/Educational/JingleAssistant/educationBox/classReviews.vue"
          )
      },
      {
        path: "publishWork",
        name: "publishWork",
        component: () =>
          import(
            "@/views/Educational/JingleAssistant/educationBox/publishWork.vue"
          ),
        redirect:
          "/Educational/JingleAssistant/educationWork/publishWork/sendWork",
        children: [
          {
            path: "sendWork",
            name: "sendWork",
            component: () =>
              import(
                "@/views/Educational/JingleAssistant/educationBox/workBox/sendWork.vue"
              )
          },
          {
            path: "alreadyWork",
            name: "alreadyWork",
            component: () =>
              import(
                "@/views/Educational/JingleAssistant/educationBox/workBox/alreadyWork.vue"
              )
          }
        ]
      },
      {
        path: "communicate",
        name: "communicate",
        component: () =>
          import(
            "@/views/Educational/JingleAssistant/educationBox/communicate.vue"
          )
      },
      {
        path: "noticeManage",
        name: "noticeManage",
        component: () =>
          import(
            "@/views/Educational/JingleAssistant/educationBox/noticeManage.vue"
          ),
        redirect:
          "/Educational/JingleAssistant/educationWork/noticeManage/sendNotice",
        children: [
          {
            path: "sendNotice",
            name: "sendNotice",
            component: () =>
              import(
                "@/views/Educational/JingleAssistant/educationBox/communicateBox/sendNotice.vue"
              )
          },
          {
            path: "noticeList",
            name: "noticeList",
            component: () =>
              import(
                "@/views/Educational/JingleAssistant/educationBox/communicateBox/noticeList.vue"
              )
          }
        ]
      }
    ]
  },
  // 消息查询
  {
    path: "/Educational/JingleAssistant/inforQuery",
    redirect: "/Educational/JingleAssistant/inforQuery/PerInformation",
    component: () =>
      import("@/views/Educational/JingleAssistant/inforQuery.vue"),
    children: [
      {
        path: "PerInformation",
        name: "PerInformation",
        component: () =>
          import(
            "@/views/Educational/JingleAssistant/inforQuery/PerInformation.vue"
          )
      },
      {
        path: "GroupNews",
        name: "GroupNews",
        redirect:
          "/Educational/JingleAssistant/inforQuery/GroupNews/MessageQuery",
        component: () =>
          import(
            "@/views/Educational/JingleAssistant/inforQuery/GroupNews.vue"
          ),
        children: [
          {
            path: "MessageQuery",
            name: "MessageQuery",
            component: () =>
              import(
                "@/views/Educational/JingleAssistant/inforQuery/MessageQuery.vue"
              )
          },
          {
            path: "groupManagement",
            name: "groupManagement",
            component: () =>
              import(
                "@/views/Educational/JingleAssistant/inforQuery/groupManagement.vue"
              )
          }
        ]
      }
    ]
  },
  // 作业管理
  {
    path: "/Educational/JingleAssistant/homeworkManage",
    redirect: "/Educational/JingleAssistant/homeworkManage/jobQuery",
    name: "homeworkManage",
    component: () =>
      import("@/views/Educational/JingleAssistant/homeworkManage.vue"),
    children: [
      {
        path: "jobQuery",
        name: "jobQuery",
        component: () =>
          import("@/views/Educational/JingleAssistant/homeWorkBox/jobQuery.vue")
      },
      {
        path: "jobStatis",
        name: "jobStatis",
        component: () =>
          import(
            "@/views/Educational/JingleAssistant/homeWorkBox/jobStatis.vue"
          )
      }
    ]
  },
  // 通知管理
  ...noticeManageRouters,
  // 我的班级
  ...myClasslistRouters,
  // 老师评价学生
  {
    path: "/Educational/JingleAssistant/teacherAssess",
    redirect: "/Educational/JingleAssistant/teacherAssess/StatisticsClass",
    name: "teacherAssess",
    component: () =>
      import("@/views/Educational/JingleAssistant/teacherAssess.vue"),
    children: [
      {
        path: "StatisticsClass",
        name: "StatisticsClass",
        component: () =>
          import(
            "@/views/Educational/JingleAssistant/teachersEvaluateStudents/StatisticsClass.vue"
          )
      },
      {
        path: "StatisticsTeacher",
        name: "StatisticsTeacher",
        component: () =>
          import(
            "@/views/Educational/JingleAssistant/teachersEvaluateStudents/StatisticsTeacher.vue"
          )
      },
      {
        path: "StatisticsStudent",
        name: "StatisticsStudent",
        component: () =>
          import(
            "@/views/Educational/JingleAssistant/teachersEvaluateStudents/StatisticsStudent.vue"
          )
      }
    ]
  },
  // 家长评价老师
  {
    path: "/Educational/JingleAssistant/parentAssess",
    redirect: "/Educational/JingleAssistant/parentAssess/assessQuery",
    name: "parentAssess",
    component: () =>
      import("@/views/Educational/JingleAssistant/parentAssess.vue"),
    children: [
      {
        path: "assessQuery",
        name: "assessQuery",
        component: () =>
          import(
            "@/views/Educational/JingleAssistant/parentBox/assessQuery.vue"
          )
      },
      {
        path: "teacherCheck",
        name: "teacherCheck",
        redirect:
          "/Educational/JingleAssistant/parentAssess/teacherCheck/onlyTeacher",
        component: () =>
          import(
            "@/views/Educational/JingleAssistant/parentBox/teacherCheck.vue"
          ),
        children: [
          {
            path: "onlyTeacher",
            name: "onlyTeacher",
            component: () =>
              import(
                "@/views/Educational/JingleAssistant/parentBox/checkBox/onlyTeacher.vue"
              )
          },
          {
            path: "teacherClass",
            name: "teacherClass",
            component: () =>
              import(
                "@/views/Educational/JingleAssistant/parentBox/checkBox/teacherClass.vue"
              )
          }
        ]
      }
    ]
  },
  // 投诉与建议
  {
    path: "/Educational/JingleAssistant/complaint",
    redirect: "/Educational/JingleAssistant/complaint/schoolComplaint",
    name: "complaint",
    component: () =>
      import("@/views/Educational/JingleAssistant/complaint.vue"),
    children: [
      {
        path: "schoolComplaint",
        name: "schoolComplaint",
        component: () =>
          import(
            "@/views/Educational/JingleAssistant/complaintBox/schoolComplaint.vue"
          )
      },
      {
        path: "teacherComplaint",
        name: "teacherComplaint",
        component: () =>
          import(
            "@/views/Educational/JingleAssistant/complaintBox/teacherComplaint.vue"
          )
      }
    ]
  }
];
export default JingleAssistantrouter;
