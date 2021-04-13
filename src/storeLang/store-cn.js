module.exports = {
  //趣备课
  Slider: [{
      title: "首页",
      icon: "icon-sy",
      activeIndex: "0",
      url: "/Interesting/index",
      children: []
    },
    {
      title: "备课",
      icon: "icon-bk",
      activeIndex: "1",
      url: "/Interesting/prepareLessons",
      children: []
    },
    {
      title: "报表",
      icon: "icon-baobiao",
      activeIndex: "2",
      url: "/Interesting/report",
      children: []
    }
  ],
  //培训
  SliderTwo: [{
      title: "职业成长",
      icon: "icon-zycz",
      activeIndex: "0",
      url: "/Training/CareerGrowth",
      children: []
    },
    {
      title: "通识课",
      icon: "icon-gkk",
      activeIndex: "1",
      url: "/Training/OpenClass",
      children: []
    },
    {
      title: "报表",
      icon: "icon-baobiao",
      activeIndex: "2",
      url: "/Training/ReportForm",
      children: []
    }
  ],
  //叮铛助教
  SliderThree: [{
      title: "首页",
      icon: "icon-sy",
      activeIndex: "0",
      url: "/Educational/index",
      children: []
    },
    {
      title: "叮铛助教",
      icon: "icon-zycz",
      activeIndex: "1",
      children: [{
          title: "教务工作",
          activeIndex: "1",
          url: "/Educational/JingleAssistant/myClasslist",
        },
        {
          title: "消息查询",
          activeIndex: "2",
          url: "/Educational/JingleAssistant/inforQuery"
        },
        {
          title: "作业管理",
          activeIndex: "3",
          url: "/Educational/JingleAssistant/homeworkManage"
        },
        {
          title: "通知管理",
          activeIndex: "4",
          url: "/Educational/JingleAssistant/noticeManage"
        },
        {
          title: "老师评价学生",
          activeIndex: "5",
          url: "/Educational/JingleAssistant/teacherAssess"
          // /JingleAssistant/teacherAssess/StatisticsClass

        },
        {
          title: "家长评价老师",
          activeIndex: "6",
          url: "/Educational/JingleAssistant/parentAssess"
        },
        {
          title: "投诉与建议",
          activeIndex: "7",
          url: "/Educational/JingleAssistant/complaint"
        }
      ]
    },
    {
      title: "课表",
      icon: "icon-zycz",
      activeIndex: "2",
      url: "/Educational/classSchedule/teacherSchedule",
      children: [
      ]
    },
  ],
  //教务管理
  SliderFour: [
    {
      title: "我的课表",
      icon: "icon-rl",
      activeIndex: "0",
      url: "/Educational/mySchedule",
      children: []
    },
    {
      title: "我的班级",
      icon: "icon-xiaoxhdj",
      activeIndex: "1",
      url: "/Educational/myClass",
      children: []
    },
    {
      title: "教务检核",
      icon: "icon-jwjhzk",
      activeIndex: "2",
      url: "/Educational/checkStatus",
      children: []
    },
    {
      title: "报表",
      icon: "icon-baobiao",
      activeIndex: "3",
      // url: "/Educational/report",
      children: [{
          title: "班级教师统计报表",
          activeIndex: "1",
          url: "/Educational/report/classTeacherReport",
        },
        {
          title: "中心基地总表",
          activeIndex: "2",
          url: "/Educational/report/schoolCenterReport"
        },
        {
          title: "教务工作报表",
          activeIndex: "3",
          url: "/Educational/report/eduWorkReport"
        },
      ]
    }
  ],
  //个人中心
  SliderFive: [{
      title: "我的班级",
      icon: "icon-wdbj",
      activeIndex: "0",
      url: "/myCenter/myClass",
      children: []
    },
    {
      title: "在学课程",
      icon: "icon-zxkc",
      activeIndex: "1",
      url: "/myCenter/currentCourse",
      children: []
    },
    {
      title: "我的批注",
      icon: "icon-wdpz",
      activeIndex: "2",
      url: "/myCenter/myComment",
      children: []
    },
    {
      title: "我的笔记",
      icon: "icon-wdbiji",
      activeIndex: "3",
      url: "/myCenter/myNote",
      children: []
    },
    {
      title: "我的教学视频",
      icon: "icon-wdjxsp",
      activeIndex: "4",
      url: "/myCenter/myVideo",
      children: []
    },
    {
      title: "我的收藏",
      icon: "icon-wdsc",
      activeIndex: "5",
      url: "/myCenter/myCollect",
      children: []
    }
  ],
  //个人设置
  SliderSix: [{
      title: "个人信息",
      icon: "icon-grxinxi",
      activeIndex: "0",
      url: "/mySettings/myInfo",
      children: []
    },
    {
      title: "账号信息",
      icon: "icon-zhxinxi",
      activeIndex: "1",
      url: "/mySettings/accoutInfo",
      children: []
    }
  ]
};