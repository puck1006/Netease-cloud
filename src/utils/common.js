import Vue from "vue";
export default class Common {
  //获取当前时间和之前时间
  static getDate(day) {
    var date1 = new Date(),
      time1 =
        date1.getFullYear() +
        "-" +
        (date1.getMonth() + 1) +
        "-" +
        date1.getDate(); //time1表示当前时间
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + day);
    var year = date2.getFullYear();
    var month = date2.getMonth() + 1;
    var strDate = date2.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var time2 = year + "-" + month + "-" + strDate;
    console.log(time1, time2);
    return time2;
  }
  //获取当前日期yy-mm-dd
  //date 为时间对象
  static getDateStr3(date) {
    var year = "";
    var month = "";
    var day = "";
    var now = date;
    year = "" + now.getFullYear();
    if (now.getMonth() + 1 < 10) {
      month = "0" + (now.getMonth() + 1);
    } else {
      month = "" + (now.getMonth() + 1);
    }
    if (now.getDate() < 10) {
      day = "0" + now.getDate();
    } else {
      day = "" + now.getDate();
    }
    return year + "-" + month + "-" + day;
  }
  /**
   * 获得相对当前周AddWeekCount个周的起止日期
   * AddWeekCount为0代表当前周 为-1代表上一个周   为1代表下一个周以此类推
   *
   **/
  static getWeekStartAndEnd(AddWeekCount) {
    //起止日期数组
    var startStop = new Array();
    //一天的毫秒数
    var millisecond = 1000 * 60 * 60 * 24;
    //获取当前时间
    var currentDate = new Date();
    //相对于当前日期AddWeekCount个周的日期
    currentDate = new Date(
      currentDate.getTime() + millisecond * 7 * AddWeekCount
    );
    //返回date是一周中的某一天
    var week = currentDate.getDay();
    //返回date是一个月中的某一天
    var month = currentDate.getDate();
    console.log(month);
    //减去的天数
    var minusDay = week != 0 ? week - 1 : 6;
    //获得当前周的第一天
    var currentWeekFirstDay = new Date(
      currentDate.getTime() - millisecond * minusDay
    );
    //获得当前周的最后一天
    var currentWeekLastDay = new Date(
      currentWeekFirstDay.getTime() + millisecond * 6
    );
    //添加至数组
    startStop.push(this.getDateStr3(currentWeekFirstDay));
    startStop.push(this.getDateStr3(currentWeekLastDay));

    return startStop;
  }
  /**
   * 获得相对当月AddMonthCount个月的起止日期
   * AddMonthCount为0 代表当月 为-1代表上一个月  为1代表下一个月 以此类推
   * ***/
  static getMonthStartAndEnd(AddMonthCount) {
    //起止日期数组
    var startStop = new Array();
    //获取当前时间
    var currentDate = new Date();
    var month = currentDate.getMonth() + AddMonthCount;
    if (month < 0) {
      var n = parseInt(-month / 12);
      month += n * 12;
      currentDate.setFullYear(currentDate.getFullYear() - n);
    }
    currentDate = new Date(currentDate.setMonth(month));
    //获得当前月份0-11
    var currentMonth = currentDate.getMonth();
    //获得当前年份4位年
    var currentYear = currentDate.getFullYear();
    //获得上一个月的第一天
    var currentMonthFirstDay = new Date(currentYear, currentMonth, 1);
    //获得上一月的最后一天
    var currentMonthLastDay = new Date(currentYear, currentMonth + 1, 0);
    //添加至数组
    startStop.push(this.getDateStr3(currentMonthFirstDay));
    startStop.push(this.getDateStr3(currentMonthLastDay));
    //返回
    return startStop;
  }
  // * 是否为Null  
  // * @param object  
  // * @returns {Boolean}  
  // */    
  static isNull(object) {
    if (object == null || typeof object == "undefined") {
      return true;
    }
    return false;
  }
  /** 
 * 根据日期字符串获取星期几 
 * @param dateString 日期字符串（如：2016-12-29），为空时为用户电脑当前日期 
 * @returns {String} 
 */
  static getWeek(dateString) {
    var date;
    if (dateString == null || typeof dateString == "undefined") {
      date = new Date();
    } else {
      var dateArray = dateString.split("-");
      date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
    }
    var weeks = new Array("0", "1", "2", "3", "4", "5", "6");
    return weeks[date.getDay()];
  }

  // 获取表格高度
  static getTableHeight(num) {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
      clientHeight =
        document.body.clientHeight < document.documentElement.clientHeight
          ? document.body.clientHeight
          : document.documentElement.clientHeight;
    } else {
      clientHeight =
        document.body.clientHeight > document.documentElement.clientHeight
          ? document.body.clientHeight
          : document.documentElement.clientHeight;
    }
    return clientHeight - num;
  }
  //自定编辑列方式*******设置自定义编辑内容展示数据
  static settingOprateData(fieldColumns) {
    var arr = [];
    var arr2 = [];
    var obj = {};
    // fieldColumns//后台传过来的数据列
    fieldColumns.forEach((item, index) => {
      arr.push({
        key: index,
        label: item.fieldname,
        disabled: item.custom == "0"
      });
      if (item.show == "0") {
        arr2.push(index);
      }
    });
    obj.data = arr;
    obj.oprateColumn = arr2;
    return obj;
  }

  //四舍五入保留2位小数（若第二位小数为0，则保留一位小数）
  static keepTwoDecimal(num) {
    var result = parseFloat(num);
    if (isNaN(result)) {
      console.log("传递参数错误，请检查！");
      return false;
    }
    result = Math.round(num * 100) / 100;
    return result;
  }

  // 打印的方法
  static printpage(myDiv) {
    var printHtml = document.getElementById(myDiv).innerHTML;
    var wind = window.open(
      "",
      "newwindow",
      "height=400, width=750, top=200, left=200, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no"
    );
    wind.document.body.innerHTML = printHtml;
    wind.print();
    return false;
  }
}
