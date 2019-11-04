<template>
  <div style="background: #fafafa;">
    <NavMeun titleOrSearch="招来宝通宝支付"></NavMeun>
    <van-row class="waveInfo" style="padding-top: 1.2rem;">
      <van-col span="24"><label>订单名称：</label><span>{{orderName}}</span></van-col>
      <van-col span="24"><label>订单金额：</label><span>{{orderPrice}}</span></van-col>
      <van-col span="24"><label>我的通宝：</label><span>{{orderIntegral}}</span><img src="../../assets/images/gold-ingot.png" class="goldImg" /></van-col>
    </van-row>

    <!--手机号-->
    <van-cell>
      <van-row type="flex" justify="center">
        <van-col span="6">
          <div class="loginlabel">手机号</div>
        </van-col>
        <van-col span="18">
          <van-field type="tel" readonly placeholder="请输入手机号" clearable v-model="phoneVal" oninput="value=value.replace(/[^\d]/g,'')" :error-message="errPhone" />
        </van-col>
      </van-row>
    </van-cell>
    <!--<van-number-keyboard-->
      <!--v-model="phoneVal"-->
      <!--:show="phoneShow"-->
      <!--:maxlength="11"-->
      <!--@blur="phoneShow = false"-->
    <!--/>-->

    <!--短信验证-->
    <van-cell>
      <van-row type="flex" justify="center">
        <van-col span="6">
          <div class="loginlabel">验证码</div>
        </van-col>
        <van-col span="12">
          <van-field type="tel" placeholder="请输入短信验证码" clearable v-model="smsVal" oninput="value=value.replace(/[^\d]/g,'');if(value.length>6)value=value.slice(0,6)" :error-message="errSms" />
        </van-col>
        <van-col span="6">
          <div class="codebtnbor" @click="iphoneCode">{{btnTimeSend}}</div>
        </van-col>
      </van-row>
    </van-cell>

    <div class="phone-button">
      <van-button type="danger" size="large" style="border-radius: 0.2rem;" @click="payIphoneBtn">确定支付</van-button>
    </div>

  </div>
</template>

<script>
import { Row, Col, Cell, CellGroup, Field, NumberKeyboard, Button, Toast } from 'vant'
import NavMeun from '../../components/NavMeun'
import Cookie from 'js-cookie'

export default {
  name: 'PayIphoneType',
  components: {
    NavMeun,
    [Row.name]: Row,
    [Col.name]: Col,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [NumberKeyboard.name]: NumberKeyboard,
    [Button.name]: Button,
    [Toast.name]: Toast
  },
  data () {
    return {
      orderName: this.$route.query.orderName,
      orderPrice: this.$route.query.orderPrice,
      orderIntegral: this.$route.query.orderIntegral.creditBalance,
      phoneVal: '',
      phoneShow: false,
      errPhone: '',
      smsVal: '',
      errSms: '',
      btnTimeSend: '获取验证码'
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let iphone = JSON.parse(Cookie.get('userInfo'))
      this.phoneVal = iphone.memberName
    },
    // 获取手机验证码
    iphoneCode () {
      let params = {
        currStr: this.$store.getters.GET_LOGIN.memberName
      }
      if (!/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.phoneVal)) { this.errPhone = '手机号格式不正确！！'; return }

      if (this.isOvertime) {
        return false
      }
      let time = 60
      this.sendTimer = setInterval(() => {
        this.isOvertime = true
        time--
        this.btnTimeSend = time + ' s'
        if (time <= 0) {
          this.isOvertime = false
          clearInterval(this.sendTimer)
          this.btnTimeSend = '获取验证码'
        }
      }, 1000)

      this.postRequest('zlbgroup-front/getSelfSmsCode', params).then(res => {
        if (res.data.success === true) {
          Toast(res.data.msg)
        }
      })
    },
    // 确定支付
    payIphoneBtn () {
      if (!/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.phoneVal)) { this.errPhone = '手机号格式不正确！！'; return } else { this.errPhone = '' }
      if (!this.smsVal) { this.errSms = '请输入短信验证码！！'; return } else { this.errSms = '' }

      this.postRequest('zlbgroup-front/orderpay/orderJfPay?paySn=' + this.$route.query.paySn + '&paymentCode=' + this.$route.query.paymentCode + '&paymentId=' + this.$route.query.paymentCode + '&mobileCode=' + this.smsVal + '&onSaleBank=' + this.$route.query.onSaleBank).then(res => {
        if (res.data.success === true) {
          this.$router.replace({
            name: 'payInfo',
            query: {
              payResult: res.data.payStatus,
              payMoney: res.data.payJfAmount,
              onSaleBank: this.$route.query.onSaleBank
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .waveInfo label{font-size: 0.4rem;font-weight: bold;}
  .waveInfo span{font-size: 0.36rem;}
  .loginlabel{font-size: 14px;color: #333333;letter-spacing: -0.39px;font-weight: bold;text-align: center;margin-top: 10px;}
  .phone-button{width: 90%;margin: 0.8rem auto;}
  .codebtnbor{border: 1px solid #2397DF;text-align: center;border-radius: 4px;color: #2397DF;margin-top: 0.2rem;}
  .goldImg{width: 0.3rem;height: 0.3rem;vertical-align: middle;margin: 0 0 0.1rem 0.1rem;}
</style>
