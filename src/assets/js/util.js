import { Toast } from 'vant'
import wx from 'weixin-js-sdk'

let util = {
  // 根据当前时间后推date月数
  getMonthDate (date) {
    let now = new Date()
    let year = now.getFullYear()
    let month = now.getMonth() + 1 // 0-11表示1-12月
    let day = now.getDate()
    let dateObj = {}
    if (parseInt(month) < 10) {
      month = '0' + month
    }
    if (parseInt(day) < 10) {
      day = '0' + day
    }

    dateObj.now = year + '-' + month + '-' + day

    if (parseInt(month) === 1) { // 如果是1月份，则取上一年的10月份
      dateObj.last = (parseInt(year) - 1) + '-10-' + day
      return dateObj
    }
    if (parseInt(month) === 2) { // 如果是2月份，则取上一年的11月份
      dateObj.last = (parseInt(year) - 1) + '-11-' + day
      return dateObj
    }
    if (parseInt(month) === 3) { // 如果是3月份，则取上一年的12月份
      dateObj.last = (parseInt(year) - 1) + '-12-' + day
      return dateObj
    }

    let preSize = new Date(year, parseInt(month) - date, 0).getDate() // 开始时间所在月的总天数
    if (preSize < parseInt(day)) {
      // 开始时间所在月的总天数<本月总天数，比如当前是5月30日，在2月中没有30，则取下个月的第一天(3月1日)为开始时间
      let resultMonth = parseInt(month) - 2 < 10 ? ('0' + parseInt(month) - 2) : (parseInt(month) - 2)
      dateObj.last = year + '-' + resultMonth + '-01'
      return dateObj
    }

    if (parseInt(month) <= 10) {
      dateObj.last = year + '-0' + (parseInt(month) - date) + '-' + day
      return dateObj
    } else {
      dateObj.last = year + '-' + (parseInt(month) - date) + '-' + day
      return dateObj
    }
  },
  // 订单状态
  orderState (state) {
    let stateName
    switch (state) {
      case 0:
        stateName = '已取消'
        break
      case 10:
        stateName = '待付款'
        break
      case 20:
        stateName = '待发货'
        break
      case 30:
        stateName = '待收货'
        break
      case 40:
        stateName = '已完成'
        break
      case 50:
        stateName = '已提交'
        break
      case 60:
        stateName = '已确认'
        break
      case 88:
        stateName = '等待人工处理'
        break
    }
    return stateName
  },

  // 格式化时间
  dateFormater (value) {
    let date = new Date(value)
    let y = date.getFullYear()
    let MM = date.getMonth() + 1
    MM = MM < 10 ? ('0' + MM) : MM
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    let h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    let m = date.getMinutes()
    m = m < 10 ? ('0' + m) : m
    let s = date.getSeconds()
    s = s < 10 ? ('0' + s) : s
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
  },

  // 去除数组中的空值
  trimNull (array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === '' || typeof (array[i]) === 'undefined') {
        array.splice(i, 1)
        i = i - 1
      }
    }
    return array
  },

  // weChat支付
  wexinPay (data, cb, errorCb) {
    // 获取后台传入的数据
    let appId = data.appId
    let timestamp = data.timeStamp
    let nonceStr = data.nonceStr
    let signature = data.signature
    let packages = data.package
    let paySign = data.paySign
    let signType = data.signType
    console.log('发起微信支付')
    // 下面要发起微信支付了
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: appId, // 必填，公众号的唯一标识
      timestamp: timestamp, // 必填，生成签名的时间戳
      nonceStr: nonceStr, // 必填，生成签名的随机串
      signature: signature, // 必填，签名，见附录1
      jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
    wx.ready(function () {
      wx.chooseWXPay({
        timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
        package: packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: paySign, // 支付签名
        success: function (res) {
          // 支付成功后的回调函数
          cb(res)
        },
        fail: function (res) {
          // 失败回调函数
          errorCb(res)
        }
      })
    })
    wx.error(function (res) {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      Toast('验证失败')
    })
  },

  // 节流函数(指定时间间隔内只会执行一次任务。)
  throttle (fn) {
    // 4、通过闭包保存一个标记
    let canRun = true
    return function () {
      // 5、在函数开头判断标志是否为 true，不为 true 则中断函数
      if (!canRun) {
        return
      }
      // 6、将 canRun 设置为 false，防止执行之前再被执行
      canRun = false
      // 7、定时器
      setTimeout(() => {
        fn.call(this, arguments)
        // 8、执行完事件（比如调用完接口）之后，重新将这个标志设置为 true
        canRun = true
      }, 1000)
    }
  },

  // 防抖函数(任务频繁触发的情况下，只有任务触发的间隔超过指定间隔的时候，任务才会执行。)
  debounce (fn) {
    // 4、创建一个标记用来存放定时器的返回值
    let timeout = null
    return function () {
      // 5、每次当用户点击/输入的时候，把前一个定时器清除
      clearTimeout(timeout)
      // 6、然后创建一个新的 setTimeout，
      // 这样就能保证点击按钮后的 interval 间隔内
      // 如果用户还点击了的话，就不会执行 fn 函数
      timeout = setTimeout(() => {
        fn.call(this, arguments)
      }, 30000)
    }
  }
}

export default util
