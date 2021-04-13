export default class Verify {
    // 验证为空
    static isnull(str) {
            return str.length === 0 || str == null || str === ''
        }
        // 验证手机号
    static isPhone(str) {
        return /^13(\d{9})$|^15(\d{9})$|^14(\d{9})$|^17(\d{9})$|^18(\d{9})$/.test(str)
    }

    static isPhoneTips(phone) {
        const reg = /^13(\d{9})$|^15(\d{9})$|^14(\d{9})$|^17(\d{9})$|^18(\d{9})$/
        if (this.isnull(phone)) {
            return '手机号不能为空'
        } else if (!reg.test(phone)) {
            return '手机号格式不正确'
        }
    }

    static isPwd(str) {
        return /^[\w]{6,12}$/.test(str)
    }

    static isPwdTips(pwd, tips) {
        const reg = /^[\w]{6,12}$/
        if (this.isnull(pwd)) {
            return tips + '不能为空'
        } else if (!reg.test(pwd)) {
            return tips + '格式不正确'
        }
    }

    // 验证身份证
    static isSFZ(sfz) {
            return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(sfz)
        }
        // 验证银行卡
    static isYHK(yhk) {
        return /^([\d]{4})([\d]{4})([\d]{4})([\d]{4})([\d]{0,})?/.test(yhk)
    }

    static isEmail(email) {
            return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email)
        }
        // 获取localstorage
    static getStorage(key) {
            return JSON.parse(window.localStorage.getItem(key))
        }
        // 设置localstorage
    static setStorage(key, v) {
            window.localStorage.setItem(key, JSON.stringify(v))
        }
        // 添加新key到localstorage
    static addStorage(key, addedV) {
            let oldVal = this.getStorage(key)
            let newVal = Object.assign(oldVal, addedV)
            this.setStorage(key, newVal)
        }
        // 移除localstorage
    static removeStorage(key) {
        window.localStorage.removeItem(key)
    }

    static isNull(form, vue) {
        var flag = true
        vue.$refs[form].validate((valid) => {
            if (valid || valid === 0 || valid === '0') {
                flag = true
            } else {
                flag = false
                vue.$message.error('必填项为空或格式不正确');
            }
        })
        return flag
    }

    static isNull1(form, vue) {
        var flag = true
        vue.$refs[form][0].validate((valid) => {
            if (valid || valid === 0 || valid === '0') {
                flag = true
            } else {
                flag = false
                vue.$message.error('必填项为空或格式不正确');
            }
        })
        return flag
    }

    static vailNull(form, arr, vue) {
        var flag = true
        for (let i = 0; i < arr.length; i++) {
            if (!arr[i].prop) {
                flag = false
                vue.$message.error(arr[i].tips + '不能为空！');
                vue.$refs[form].validate()
                return;
            }
        }
        return flag
    }
    static doHandleMonth(month) {
            var m = month;
            if (month.toString().length == 1) {
                m = '0' + month;
            }
            return m;
        }
        // 获某天的日期
    static getDay(day) {
        var today = new Date();
        var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
        today.setTime(targetday_milliseconds); // 注意，这行是关键代码
        var tYear = today.getFullYear();
        var tMonth = today.getMonth();
        var tDate = today.getDate();
        tMonth = this.doHandleMonth(tMonth + 1);
        tDate = this.doHandleMonth(tDate);
        return tYear + '-' + tMonth + '-' + tDate;
    }

    // 获取本周、上周、本月、上月 的开始日期和结束日期 年-月-日
    // optType: 1 获取周、 2 获取月
    // optPageNum: 0 本周/本月； 上周/月 1 , 1+n
    static getMonthDays(nowYear, myMonth) {
        let monthStartDate = new Date(nowYear, myMonth, 1);
        let monthEndDate = new Date(nowYear, myMonth + 1, 1);
        let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
        return days;
    }
    static formatDateFn(date) {
        let myyear = date.getFullYear();
        let mymonth = date.getMonth() + 1;
        let myweekday = date.getDate();
        if (mymonth < 10) {
            mymonth = '0' + mymonth;
        }
        if (myweekday < 10) {
            myweekday = '0' + myweekday;
        }
        return myyear + '-' + mymonth + '-' + myweekday;
    }
    static getAppointedDate(optType, optPageNum) {
            let now = new Date(); // 当前日期
            let nowDayOfWeek = now.getDay(); // 今天本周的第几天
            let nowDay = now.getDate(); // 当前日
            let nowMonth = now.getMonth(); // 当前月
            let nowYear = now.getFullYear(); // 当前年
            let lastMonth = nowMonth - 1;
            let startDate = '';
            let endDate = '';
            if (optType == 1) {
                startDate = this.formatDateFn(
                    new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1 - 7 * optPageNum)
                );
                endDate = this.formatDateFn(
                    new Date(nowYear, nowMonth, nowDay + 7 - nowDayOfWeek - 7 * optPageNum)
                );
            } else if (optType == 2) {
                startDate = this.formatDateFn(
                    new Date(nowYear, lastMonth + 1 - 1 * optPageNum, 1)
                );
                endDate = this.formatDateFn(
                    new Date(
                        nowYear,
                        lastMonth + 1 - 1 * optPageNum,
                        this.getMonthDays(nowYear, lastMonth + 1 - 1 * optPageNum)
                    )
                );
            }
            return { startDate: startDate, endDate: endDate };
        }
        // 获取当前日期yy-mm-dd
        // date 为时间对象
    static getDateStr3(date) {
            var year = '';
            var month = '';
            var day = '';
            var now = date;
            year = '' + now.getFullYear();
            if (now.getMonth() + 1 < 10) {
                month = '0' + (now.getMonth() + 1);
            } else {
                month = '' + (now.getMonth() + 1);
            }
            if (now.getDate() < 10) {
                day = '0' + now.getDate();
            } else {
                day = '' + now.getDate();
            }
            return year + '-' + month + '-' + day;
        }
        /**
         * 获得相对当前周AddWeekCount个周的起止日期
         * AddWeekCount为0代表当前周 为-1代表上一个周   为1代表下一个周以此类推
         *
         **/
    static getWeekStartAndEnd(AddWeekCount) {
            // 起止日期数组
            var startStop = new Array();
            // 一天的毫秒数
            var millisecond = 1000 * 60 * 60 * 24;
            // 获取当前时间
            var currentDate = new Date();
            // 相对于当前日期AddWeekCount个周的日期
            currentDate = new Date(
                currentDate.getTime() + millisecond * 7 * AddWeekCount
            );
            // 返回date是一周中的某一天
            var week = currentDate.getDay();
            // 返回date是一个月中的某一天
            var month = currentDate.getDate();
            console.log(month);
            // 减去的天数
            var minusDay = week != 0 ? week - 1 : 6;
            // 获得当前周的第一天
            var currentWeekFirstDay = new Date(
                currentDate.getTime() - millisecond * minusDay
            );
            // 获得当前周的最后一天
            var currentWeekLastDay = new Date(
                currentWeekFirstDay.getTime() + millisecond * 6
            );
            // 添加至数组
            startStop.push(this.getDateStr3(currentWeekFirstDay));
            startStop.push(this.getDateStr3(currentWeekLastDay));

            return startStop;
        }
        /**
         * 获得相对当月AddMonthCount个月的起止日期
         * AddMonthCount为0 代表当月 为-1代表上一个月  为1代表下一个月 以此类推
         * ***/
    static getMonthStartAndEnd(AddMonthCount) {
        // 起止日期数组
        var startStop = new Array();
        // 获取当前时间
        var currentDate = new Date();
        var month = currentDate.getMonth() + AddMonthCount;
        if (month < 0) {
            var n = parseInt(-month / 12);
            month += n * 12;
            currentDate.setFullYear(currentDate.getFullYear() - n);
        }
        currentDate = new Date(currentDate.setMonth(month));
        // 获得当前月份0-11
        var currentMonth = currentDate.getMonth();
        // 获得当前年份4位年
        var currentYear = currentDate.getFullYear();
        // 获得上一个月的第一天
        var currentMonthFirstDay = new Date(currentYear, currentMonth, 1);
        // 获得上一月的最后一天
        var currentMonthLastDay = new Date(currentYear, currentMonth + 1, 0);
        // 添加至数组
        startStop.push(this.getDateStr3(currentMonthFirstDay));
        startStop.push(this.getDateStr3(currentMonthLastDay));
        // 返回
        return startStop;
    }

    static getCurrMonth(){
        return new Date().getFullYear() + '-' + (new Date().getMonth()+1)
    }

    // 获取表格高度
    static getTableHeight(num) {
        var clientHeight = 0
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
        } else {
            clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
        }
        return clientHeight - num
    }
    static getParameter(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
}