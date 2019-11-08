
/*
 公用工具类
 */
import {
    Platform,
    StatusBar,
    Dimensions,
} from 'react-native';
let heightStatus = 0;

// iPhoneX  
const X_WIDTH = 375;
const X_HEIGHT = 812;

// iPhoneXR  
const XR_WIDTH = 414;
const XR_HEIGHT = 896;



// screen  
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class CommonUtil {

    //获取android导航栏高度

    static getStateBarHeight(callback) {
        if (Platform.OS == 'android') {
            // networkManager.getStateBarHeight(callback);
        }

    }

    static getStateBarHeight() {
        let height = 64;
        if (Platform.OS == 'ios') {
            height = 64;
        } else if (Platform.OS == 'android' && Platform.Version > 19) {
            height = 48 + StatusBar.currentHeight;
        } else {
            height = 48;
        }
        return height;
    }

    static expectTimeObject(data) {
        let day = data.day;
        let endTime = data.endTime;
        let intervalTime = data.intervalTime;
        let startTime = data.startTime;

        if (endTime < startTime) {
            return null;
        }
        console.log('intervalTime ' + intervalTime);
        if (intervalTime && intervalTime < 1) {
            intervalTime = 1;
        }
        var overhaulTime = [];

        var currentDate = new Date();

        for (var i = 0; i < day; i++) {

            let expectStartTime = startTime;
            let expectEndTime = startTime + intervalTime;
            while (1) {
                var time = {};

                let dayStr = '今天';
                let dateStr = '';

                if (i == 0) {
                    dayStr = '今天';
                } else if (i == 1) {
                    dayStr = '明天';
                } else if (i == 2) {
                    dayStr = '后天';
                } else {
                    dayStr = this.formatDate(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000 * i), 'yyyy-MM-dd');
                }
                if (i == 0 && expectStartTime < parseInt(currentDate.getHours())) {
                    expectStartTime = expectEndTime;
                    expectEndTime = expectStartTime + intervalTime;
                    continue;
                }
                if (expectEndTime >= endTime) {
                    startHour = expectStartTime - parseInt(currentDate.getHours());
                    endHour = endTime - parseInt(currentDate.getHours());
                    let startDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000 * i + startHour * 60 * 60 * 1000);
                    let endDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000 * i + endHour * 60 * 60 * 1000);
                    time['remark'] = dayStr + ' ' + expectStartTime.toString() + ':00 ~ ' + endTime.toString() + ':00';
                    time['startexpectdate'] = this.formatDate(startDate, 'yyyy-MM-dd hh:00:00');
                    time['endexpectdate'] = this.formatDate(endDate, 'yyyy-MM-dd hh:00:00');
                    time['selected'] = false;
                    overhaulTime.push(time);
                    break;
                } else {
                    startHour = expectStartTime - parseInt(currentDate.getHours());
                    endHour = expectEndTime - parseInt(currentDate.getHours());
                    let endDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000 * i + endHour * 60 * 60 * 1000);
                    let startDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000 * i + startHour * 60 * 60 * 1000);
                    time['remark'] = dayStr + ' ' + expectStartTime.toString() + ':00 ~ ' + expectEndTime.toString() + ':00';
                    time['startexpectdate'] = this.formatDate(startDate, 'yyyy-MM-dd hh:00:00');
                    time['endexpectdate'] = this.formatDate(endDate, 'yyyy-MM-dd hh:00:00');
                    time['selected'] = false;
                    overhaulTime.push(time);
                }

                expectStartTime = expectEndTime;
                expectEndTime = expectStartTime + intervalTime;
            }

        }
        return overhaulTime;
    }

    // timestamp时间戳 formater时间格式
    static formatDate(timestamp, formater) {
        let date = new Date();
        date.setTime(timestamp.getTime());
        formater = (formater != null) ? formater : 'yyyy-MM-dd hh:mm';
        Date.prototype.Format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1, //月
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };

            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
                    (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
            return fmt;
        }
        return date.Format(formater);
    }

    static randomWord(length) {
        var str = "",
            range = length,
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        // 随机产生
        for (var i = 0; i < range; i++) {
            pos = Math.round(Math.random() * (arr.length - 1));
            str += arr[pos];
        }
        return str;
    }

    static uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }

    static isIphoneX() {
        return (
            Platform.OS === 'ios' &&
            (
                ((SCREEN_HEIGHT === X_HEIGHT && SCREEN_WIDTH === X_WIDTH) ||
                (SCREEN_HEIGHT === X_WIDTH && SCREEN_WIDTH === X_HEIGHT))
                ||
                ((SCREEN_HEIGHT === XR_HEIGHT && SCREEN_WIDTH === XR_WIDTH) ||
                (SCREEN_HEIGHT === XR_WIDTH && SCREEN_WIDTH === XR_HEIGHT))
            )
        )
        // if (Platform.OS != 'ios' )return false;
        // networkManager.isPhoneX((error:any, events:any) => {
        //     if (!error) {
        //         if (events == '1') {
                    
        //         } else {
        //         }
        //     }
        // })
    }

    // 判断手机号码格式是否正确
    static isPhoneNumberValid(phoneNumber) {

        if (phoneNumber === null || typeof phoneNumber === 'undefined' || phoneNumber === '') {

            return false;

        }
        const reg = /^[1][34578][0-9]{9}$/;
        const regExp = new RegExp(reg);

        if (!regExp.test(phoneNumber)) {

            return false;

        }
        return true;
    }


}
