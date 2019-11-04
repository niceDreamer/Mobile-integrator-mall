<template>
  <div style="background: #fafafa;">
    <NavMeun titleOrSearch="通宝兑换"></NavMeun>

    <div style="padding-top: 1.2rem;">
      <van-row class="waveInfo">
        <van-col span="24"><label>我的通宝：</label><span style="font-size: 0.38rem;">{{tongBao.creditBalance}}</span><img src="../../assets/images/gold-ingot.png" class="goldImg" /></van-col>
        <van-col span="24"><span style="font-size: 0.34rem;">爱心卡，积分卡均可兑换通宝，通宝永不过期。</span></van-col>
      </van-row>

      <!--卡号-->
      <van-cell>
        <van-row type="flex" justify="center">
          <van-col span="6">
            <div class="loginlabel">卡号</div>
          </van-col>
          <van-col span="18">
            <van-field type="tel" placeholder="请输入卡号" clearable v-model="cardNumVal" oninput="value=value.replace(/[^\d]/g,'')" :error-message="errCardNum" />
          </van-col>
        </van-row>
      </van-cell>

      <!--卡密-->
      <van-cell>
        <van-row type="flex" justify="center">
          <van-col span="6">
            <div class="loginlabel">密码</div>
          </van-col>
          <van-col span="18">
            <van-field type="tel" placeholder="请输入密码" clearable v-model="pwdVal" oninput="value=value.replace(/[^\d]/g,'')" :error-message="errPwd" />
          </van-col>
        </van-row>
      </van-cell>

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
            <div class="codebtnbor" @click="exchangeCode">{{btnTimeSend}}</div>
          </van-col>
        </van-row>
      </van-cell>

      <div class="phone-button">
        <van-button type="danger" size="large" style="border-radius: 0.2rem;" @click="exchangeBtn">确定</van-button>
      </div>
    </div>

  </div>
</template>

<script>
import { Row, Col, Cell, CellGroup, Field, NumberKeyboard, Button, Toast } from 'vant'
import NavMeun from '../../components/NavMeun'

export default {
  name: 'ExchangeLoveCard',
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
      tongBao: 0,
      cardNumVal: '',
      cardNumShow: false,
      errCardNum: '',

      pwdVal: '',
      pwdShow: false,
      errPwd: '',

      smsVal: '',
      errSms: '',
      btnTimeSend: '获取验证码'
    }
  },
  created () {
    this.init()
  },
  methods: {
    // 查询积分
    init () {
      this.getRequest('zlbgroup-front/m/point/queryPoint').then(res => {
        if (res.data.success === true) {
          let status = res.data.jfBalance
          for (let i = 0; i < status.length; i++) {
            if (status[i].creditTypeId === '1') {
              this.tongBao = status[i]
            }
          }
        }
      })
      this.cardNumVal = ''
      this.pwdVal = ''
      this.smsVal = ''
      this.isOvertime = false
      clearInterval(this.sendTimer)
      this.btnTimeSend = '获取验证码'
    },
    // 短信验证码
    exchangeCode () {
      let params = {
        currStr: this.$store.getters.GET_LOGIN.memberName
      }

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
    // 确定
    exchangeBtn () {
      if (!this.cardNumVal) { this.errCardNum = '卡号不能为空！'; return } else { this.errCardNum = '' }
      if (!this.pwdVal) { this.errPwd = '密码不能为空！'; return } else { this.errPwd = '' }
      if (!this.smsVal) { this.errSms = '验证码不能为空！'; return } else { this.errSms = '' }

      let params = {
        cardNo: this.cardNumVal,
        cardPassword: this.pwdVal,
        mobileCode: this.smsVal
      }
      this.postRequest('zlbgroup-front/m/point/zlbTopup', params).then(res => {
        if (res.data.success === true) {
          Toast(res.data.msg)
          this.init()
        }
      })
    }
  }
}
</script>

<style scoped>
  .waveInfo{padding-top: 0.4rem;}
  .waveInfo label{font-size: 0.4rem;font-weight: bold;}
  .loginlabel{font-size: 14px;color: #333333;letter-spacing: -0.39px;font-weight: bold;text-align: center;margin-top: 10px;}
  .phone-button{width: 90%;margin: 0.8rem auto;}
  .codebtnbor{border: 1px solid #2397DF;text-align: center;border-radius: 4px;color: #2397DF;margin-top: 0.2rem;}
  .goldImg{width: 0.3rem;height: 0.3rem;vertical-align: middle;margin: 0 0 0.1rem 0.1rem;}
</style>
