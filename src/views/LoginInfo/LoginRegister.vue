<template>
  <div class="login">
    <van-row type="flex" justify="center">
      <van-col class="loginlogo">
        <img src="../../assets/images/login_img.jpg" />
      </van-col>
    </van-row>

    <!--手机号-->
    <van-cell style="width: 96%;">
      <van-row type="flex" justify="center">
        <van-col span="6">
          <div class="loginlabel">手机号</div>
        </van-col>
        <van-col span="18">
          <van-field type="tel" placeholder="请输入手机号" clearable v-model="phoneVal" oninput="value=value.replace(/[^\d]/g,'');if(value.length>11)value=value.slice(0,11)" :error-message="errPhone" />
        </van-col>
      </van-row>
    </van-cell>

    <!--验证码验证-->
    <van-cell>
      <van-row type="flex" justify="center">
        <van-col span="17">
          <van-field placeholder="请输入图形验证码" clearable oninput="value=value.replace(/[\W]/g,'');if(value.length>4)value=value.slice(0,4)" v-model.trim="imgCodeVal" :error-message="errImg" />
        </van-col>
        <van-col span="6">
          <van-button size="small" class="codeimgdiv" @click="imgCodeClick">
            <img :src="imgCodeSrc" />
          </van-button>
        </van-col>
      </van-row>
    </van-cell>

    <!--短信验证-->
    <van-cell style="width: 96%;">
      <van-row type="flex" justify="center">
        <van-col span="6">
          <div class="loginlabel">验证码</div>
        </van-col>
        <van-col span="12">
          <van-field type="tel" placeholder="请输入短信验证码" readonly clearable v-model="smsVal" oninput="value=value.replace(/[^\d]/g,'');if(value.length>6)value=value.slice(0,6)" :error-message="errSms" />
        </van-col>
        <van-col span="6">
          <div class="codebtnbor" @click="iphoneCode">{{btnTimeSend}}</div>
        </van-col>
      </van-row>
    </van-cell>

    <van-row type="flex" justify="center" class="margin-top-40">
      <van-col span="20">
        <van-button size="large" class="primaryheibtn" @click="clickRegister">注册</van-button>
      </van-col>
    </van-row>
    <van-row type="flex" justify="center" class="margin-top-10">
      <van-col span="20">
        <van-button size="large" style="border: none;color: #2397DF;" @click="goLogin">返回</van-button>
      </van-col>
    </van-row>

  </div>
</template>

<script>
import { Row, Col, Cell, CellGroup, Field, Button, Popup, Toast, Loading, NavBar, Icon, NumberKeyboard } from 'vant'

export default {
  name: 'LoginRegister',
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
    // 获取手机验证码
    iphoneCode () {
      let params = {
        mobile: this.phoneVal,
        captcha: this.imgCodeVal
      }
      if (!/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.phoneVal)) { this.errPhone = '手机号格式不正确！！'; return }
      if (!this.imgCodeVal) { this.errImg = '请输入图形验证码！'; return }

      if (this.isOvertime) {
        return false
      }
      let time = 60
      let sendTimer = setInterval(() => {
        this.isOvertime = true
        time--
        this.btnTimeSend = time + ' s'
        if (time <= 0) {
          this.isOvertime = false
          clearInterval(sendTimer)
          this.btnTimeSend = '获取验证码'
        }
      }, 1000)

      this.postRequest('zlbgroup-front/sendMobileCode', params).then(res => {
        if (res.data.success === true) {
          Toast(res.data.msg)
          this.imgCodeClick()
        } else {
          Toast(res.data.msg)
          clearInterval(this.sendTimer)
        }
      })
    },
    // 注册
    clickRegister () {
      if (!/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.phoneVal)) { this.errPhone = '手机号格式不正确！！'; return } else { this.errPhone = '' }
      if (!this.imgCodeVal) { this.errImg = '请输入图形验证码！'; return } else { this.errImg = '' }
      if (!this.smsVal) { this.errSms = '请输入短信验证码！！'; return } else { this.errSms = '' }

      this.getRequest('zlbgroup-front/moblieRegisterForMobilCode?mobile=' + this.phoneVal + '&mobileCode=' + this.smsVal).then(res => {
        if (res.data.success === true) {
          Toast('注册成功！即将跳转到登陆页面。')
          setTimeout(() => {
            this.$router.push('/login')
          }, 3000)
        }
      })
    },
    goLogin () {
      this.$router.push({
        name: 'login',
        query: {
          onSaleBank: this.$route.query.onSaleBank
        }
      })
    }
  }
}
</script>

<style scoped>
  .login{background-color: #fff;height: 100vh;}
  .loginlabel{font-size: 14px;color: #333333;letter-spacing: -0.39px;font-weight: bold;text-align: center;margin-top: 10px;}
  .loginlogo{width: 100%;height: 5rem;display: flex;}
  .loginlogo img{justify-self: center;align-self: center;margin: 0 auto;}
  .codebtnbor{border: 1px solid #2397DF;text-align: center;border-radius: 4px;color: #2397DF;margin-top: 0.2rem;}
  .codeimgdiv img{width: 80px;height: 30px;}
  .primaryheibtn{background-image: linear-gradient(-270deg, #56BDFF 3%, #2397DF 100%);border-radius: 4px;color: #fff !important;margin: 40px 0 20px 0;}
</style>
