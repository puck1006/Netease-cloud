//教务管理---首页路由******列表
const EducationalIndex = [
  // 首页
  {
    path: "/Educational/index",
    name: "index",
    component: () => import("@/views/Educational/Index/index.vue"),
    meta: {
      keepAlive: true,
    },
  },
  // 全部待办事项
  {
    path: "/Educational/allTodo",
    name: "allTodo",
    component: () => import("@/views/Educational/Index/allTodo.vue"),
  },
];
module.exports = EducationalIndex;
