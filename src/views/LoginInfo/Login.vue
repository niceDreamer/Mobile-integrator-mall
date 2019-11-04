<template>
  <div class="login">
    <van-row type="flex" justify="center">
      <van-col class="login-logo">
        <img src="../../assets/images/login_img.jpg" />
      </van-col>
    </van-row>

    <!--手机号-->
    <van-cell style="width: 96%;">
      <van-row type="flex" justify="center">
        <van-col span="6">
          <div class="login-label">手机号</div>
        </van-col>
        <van-col span="18">
          <van-field type="tel" placeholder="请输入手机号" clearable v-model="phoneVal" oninput="value=value.replace(/[^\d]/g,'');if(value.length>11)value=value.slice(0,11)" :error-message="errPhone" />
        </van-col>
      </van-row>
    </van-cell>

    <!--验证码验证 oninput="value=value.replace(/[^\w\.\/]/ig,'');if(value.length>4)value=value.slice(0,4)" -->
    <van-cell>
      <van-row type="flex" justify="center">
        <van-col span="17">
          <van-field placeholder="请输入图形验证码" clearable v-model.trim="imgCodeVal" :error-message="errImg" />
        </van-col>
        <van-col span="6">
          <van-button size="small" class="code-imgDiv" @click="imgCodeClick">
            <img :src="imgCodeSrc" />
          </van-button>
        </van-col>
      </van-row>
    </van-cell>

    <!--短信验证-->
    <van-cell style="width: 96%;">
      <van-row type="flex" justify="center">
        <van-col span="6">
          <div class="login-label">验证码</div>
        </van-col>
        <van-col span="12">
          <van-field type="tel" placeholder="请输入短信验证码" clearable v-model="smsVal" oninput="value=value.replace(/[^\d]/g,'');if(value.length>6)value=value.slice(0,6)" :error-message="errSms" />
        </van-col>
        <van-col span="6">
          <div class="code-btnBor" @click="iphoneCode">{{btnTimeSend}}</div>
        </van-col>
      </van-row>
    </van-cell>

    <van-row type="flex" justify="center" class="margin-top-40">
      <van-col span="20">
        <van-button size="large" class="primary-heiBtn" @click="loginGo">登陆</van-button>
      </van-col>
    </van-row>
    <van-row type="flex" justify="center" class="margin-top-10">
      <van-col span="20">
        <van-button size="large" style="border: none;color: #2397DF;" @click="goRegister">注册</van-button>
      </van-col>
    </van-row>

  </div>
</template>

<script>
import { Row, Col, Cell, CellGroup, Field, Button, Popup, Toast, Loading, NavBar, Icon, NumberKeyboard } from 'vant'
import Cookies from 'js-cookie'

export default {
  name: 'login',
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    [Loading.name]: Loading,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [NumberKeyboard.name]: NumberKeyboard
  },
  data () {
    return {
      phoneVal: '',
      phoneShow: false,
      errPhone: '',

      smsVal: '',
      errSms: '',
      btnTimeSend: '获取验证码',
      isOvertime: false,
      sendTimer: '',

      imgCodeVal: '',
      imgCodeSrc: '',
      errImg: ''
    }
  },
  created () {
    this.imgCodeClick()
  },
  methods: {
    // 获取图片验证码
    imgCodeClick () {
      this.imgCodeSrc = 'zlbgroup-front/m/generateImage?t=' + Math.random()
    },
    goRegister () {
      this.$router.push({
        name: 'loginRegister',
        query: {
          onSaleBank: this.$route.query.onSaleBank
        }
      })
    },
    // 获取手机验证码
    iphoneCode () {
      let params = {
        mobile: this.phoneVal,
        captcha: this.imgCodeVal
      }
      if (!/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.phoneVal)) { this.errPhone = '手机号格式不正确！！'; return } else { this.errPhone = '' }
      if (!this.imgCodeVal) { this.errImg = '请输入图形验证码！'; return } else { this.errImg = '' }

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
          window.clearInterval(this.sendTimer)
          this.btnTimeSend = '获取验证码'
        }
      }, 1000)

      this.postRequest('zlbgroup-front/sendMobileCode', params).then(res => {
        if (res.data.success === true) {
          Toast(res.data.msg)
          this.imgCodeClick()
        } else {
          window.clearInterval(this.sendTimer)
          Toast(res.data.msg)
        }
      })
    },
    // 登陆
    loginGo () {
      if (!/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.phoneVal)) { this.errPhone = '手机号格式不正确！！'; return } else { this.errPhone = '' }
      if (!this.imgCodeVal) { this.errImg = '请输入图形验证码！'; return } else { this.errImg = '' }
      if (!this.smsVal) { this.errSms = '请输入短信验证码！！'; return } else { this.errSms = '' }
      let params = {
        mobile: this.phoneVal,
        mobileCode: this.smsVal,
        onSaleBank: this.$route.query.onSaleBank
      }
      this.postRequest('zlbgroup-front/m/loginCheckForMobile', params).then(res => {
        if (res.data.success === true) {
          Toast('登陆成功，即将跳转...')
          Cookies.set('memberId', res.data.memberId)
          setTimeout(() => {
            this.$router.push({
              name: 'index',
              query: {
                onSaleBank: this.$route.query.onSaleBank
              }
            })
          }, 3000)
        }
      })
    }
  }
}
</script>

<style scoped>
  .login{background-color: #fff;height: 100vh;}
  .login-label{font-size: 14px;color: #333333;letter-spacing: -0.39px;font-weight: bold;text-align: center;margin-top: 10px;}
  .login-logo{width: 100%;height: 5rem;display: flex;}
  .login-logo img{justify-self: center;align-self: center;margin: 0 auto;}
  .code-btnBor{border: 1px solid #2397DF;text-align: center;border-radius: 4px;color: #2397DF;margin-top: 0.2rem;}
  .code-imgDiv img{width: 80px;height: 30px;}
  .primary-heiBtn{background-image: linear-gradient(-270deg, #56BDFF 3%, #2397DF 100%);border-radius: 4px;color: #fff !important;margin: 40px 0 20px 0;}
</style>
