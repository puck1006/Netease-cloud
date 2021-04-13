module.exports = {
  //趣備課
  Slider: [{
      title: "首頁",
      icon: "icon-sy",
      activeIndex: "0",
      url: "/Interesting/index",
      children: []
    },
    {
      title: "備課",
      icon: "icon-bk",
      activeIndex: "1",
      url: "/Interesting/prepareLessons",
      children: []
    },
    {
      title: "報表",
      icon: "icon-baobiao",
      activeIndex: "2",
      url: "/Interesting/report",
      children: []
    }
  ],
  //培訓
  SliderTwo: [{
      title: "職業成長",
      icon: "icon-zycz",
      activeIndex: "0",
      url: "/Training/CareerGrowth",
      children: []
    },
    {
      title: "通識課",
      icon: "icon-gkk",
      activeIndex: "1",
      url: "/Training/OpenClass",
      children: []
    },
    {
      title: "報表",
      icon: "icon-baobiao",
      activeIndex: "2",
      url: "/Training/ReportForm",
      children: []
    }
  ],
  //叮鐺助教
  SliderThree: [{
      title: "首頁",
      icon: "icon-sy",
      activeIndex: "0",
      url: "/Educational/index",
      children: []
    },
    {
      title: "叮鐺助教",
      icon: "icon-zycz",
      activeIndex: "1",
      children: [{
          title: "教務工作",
          activeIndex: "1",
          url: "/Educational/JingleAssistant/myClasslist",
        },
        {
          title: "消息查詢",
          activeIndex: "2",
          url: "/Educational/JingleAssistant/inforQuery"
        },
        {
          title: "作業管理",
          activeIndex: "3",
          url: "/Educational/JingleAssistant/homeworkManage"
        },
        {
          title: "通知管理",
          activeIndex: "4",
          url: "/Educational/JingleAssistant/noticeManage"
        },
        {
          title: "老師評價學生",
          activeIndex: "5",
          url: "/Educational/JingleAssistant/teacherAssess"
          // /JingleAssistant/teacherAssess/StatisticsClass

        },
        {
          title: "家長評價老師",
          activeIndex: "6",
          url: "/Educational/JingleAssistant/parentAssess"
        },
        {
          title: "投訴與建議",
          activeIndex: "7",
          url: "/Educational/JingleAssistant/complaint"
        }
      ]
    },
    {
      title: "課表",
      icon: "icon-zycz",
      activeIndex: "2",
      url: "/Educational/classSchedule/teacherSchedule",
      children: [
      ]
    },
  ],
  //教務管理
  SliderFour: [
    {
      title: "我的課表",
      icon: "icon-rl",
      activeIndex: "0",
      url: "/Educational/mySchedule",
      children: []
    },
    {
      title: "我的班級",
      icon: "icon-xiaoxhdj",
      activeIndex: "1",
      url: "/Educational/myClass",
      children: []
    },
    {
      title: "教務檢核",
      icon: "icon-jwjhzk",
      activeIndex: "2",
      url: "/Educational/checkStatus",
      children: []
    },
    {
      title: "報表",
      icon: "icon-baobiao",
      activeIndex: "3",
      // url: "/Educational/report",
      children: [{
          title: "班級教師統計報表",
          activeIndex: "1",
          url: "/Educational/report/classTeacherReport",
        },
        {
          title: "中心基地總表",
          activeIndex: "2",
          url: "/Educational/report/schoolCenterReport"
        },
        {
          title: "教務工作報表",
          activeIndex: "3",
          url: "/Educational/report/eduWorkReport"
        },
      ]
    }
  ],
  //個人中心
  SliderFive: [{
      title: "我的班級",
      icon: "icon-wdbj",
      activeIndex: "0",
      url: "/myCenter/myClass",
      children: []
    },
    {
      title: "在學課程",
      icon: "icon-zxkc",
      activeIndex: "1",
      url: "/myCenter/currentCourse",
      children: []
    },
    {
      title: "我的批註",
      icon: "icon-wdpz",
      activeIndex: "2",
      url: "/myCenter/myComment",
      children: []
    },
    {
      title: "我的筆記",
      icon: "icon-wdbiji",
      activeIndex: "3",
      url: "/myCenter/myNote",
      children: []
    },
    {
      title: "我的教學視頻",
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
  //個人設置
  SliderSix: [{
      title: "個人信息",
      icon: "icon-grxinxi",
      activeIndex: "0",
      url: "/mySettings/myInfo",
      children: []
    },
    {
      title: "賬號信息",
      icon: "icon-zhxinxi",
      activeIndex: "1",
      url: "/mySettings/accoutInfo",
      children: []
    }
  ]
};