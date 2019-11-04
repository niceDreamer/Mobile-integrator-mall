<template>
  <div style="background: #fafafa;">
    <NavMeun titleOrSearch="广发积分兑换"></NavMeun>

    <van-row class="waveInfo">
      <van-col span="24"><label>我的通宝：</label><span>{{tongBao}}</span><img src="../../assets/images/gold-ingot.png" class="goldImg" /></van-col>
      <van-col span="24"><label>我的广发银行积分：</label><span>{{guangFa}}</span></van-col>
      <van-col span="24"><span>广发银行积分兑换通宝比例为：1:{{proportion}}</span></van-col>
    </van-row>

    <!--卡号-->
    <van-cell>
      <van-row type="flex" justify="center">
        <van-col span="6">
          <div class="loginlabel">积分</div>
        </van-col>
        <van-col span="18">
          <van-field type="tel" placeholder="请输入广发积分" clearable readonly :value="integralVal" @touchstart.native.stop="integralShow = true" :error-message="errIntegral" />
        </van-col>
      </van-row>
    </van-cell>
    <van-number-keyboard
      v-model="integralVal"
      :show="integralShow"
      theme="custom"
      close-button-text="完成"
      :maxlength="11"
      @blur="integralShow = false"
      @input="inputProportion"
      @delete="delProportion"
    />

    <!--通宝-->
    <van-cell>
      <van-row type="flex" justify="center">
        <van-col span="6">
          <div class="loginlabel">兑换通宝</div>
        </van-col>
        <van-col span="18">
          <van-field disabled v-model="exchangeVal" />
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
</template>

<script>
import { Row, Col, Cell, CellGroup, Field, NumberKeyboard, Button, Toast } from 'vant'
import NavMeun from '../../components/NavMeun'

export default {
  name: 'ExchangeGuangFa',
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
      guangFa: 0,
      proportion: 1,
      integralVal: '',
      integralShow: false,
      errIntegral: '',
      exchangeVal: 0,
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
          let rate = res.data.rate
          this.proportion = rate.split(':')[1]
          for (let i = 0; i < status.length; i++) {
            if (status[i].creditTypeId === '1') {
              this.tongBao = status[i].creditBalance
            } else if (status[i].creditTypeId === '3') {
              this.guangFa = status[i].creditBalance
            }
          }
        }
      })
    },
    // 比例换算
    inputProportion (value) {
      if (parseInt(this.integralVal + value) > this.guangFa.creditBalance) {
        this.integralShow = false
        this.errIntegral = '已超出现有积分'
        this.exchangeVal = ''
      } else {
        this.exchangeVal = parseInt(this.integralVal + value) * this.proportion
      }
    },
    delProportion () {
      this.errIntegral = ''
      this.exchangeVal = (parseInt(this.integralVal.slice(0, this.integralVal.length - 1)) ? parseInt(this.integralVal.slice(0, this.integralVal.length - 1)) : 0) * this.proportion
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
      if (!this.integralVal) { this.errIntegral = '积分不能为空！'; return } else { this.errIntegral = '' }
      if (!this.smsVal) { this.smsVal = '验证码不能为空！'; return } else { this.errSms = '' }

      let params = {
        transferAmt: this.integralVal,
        accountTypeFrom: 'GFB',
        mobileCode: this.smsVal
      }
      this.postRequest('zlbgroup-front/m/point/transfer', params).then(res => {
        if (res.data.success === true) {
          Toast(res.data.msg)
          this.init()
        }
      })
    }
  }
}
</script>

<style>
  .waveInfo{padding-top: 1.4rem;}
  .waveInfo label{font-size: 0.4rem;font-weight: bold;}
  .waveInfo span{font-size: 0.38rem;}
  .loginlabel{font-size: 14px;color: #333333;letter-spacing: -0.39px;font-weight: bold;text-align: center;margin-top: 10px;}
  .codebtnbor{border: 1px solid #2397DF;text-align: center;border-radius: 4px;color: #2397DF;margin-top: 0.2rem;}
  .phone-button{width: 90%;margin: 0.8rem auto;}
  .goldImg{width: 0.3rem;height: 0.3rem;vertical-align: middle;margin: 0 0 0.1rem 0.1rem;}
  .van-field__control:disabled {
    color: #323232;
  }
</style>
