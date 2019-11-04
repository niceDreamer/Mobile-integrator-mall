<template>
  <div style="background: #fafafa;height: 100vh;">
    <van-row type="flex" justify="center" style="padding-top: 2rem;">
      <van-col>
        <div style="width: 3rem;height: 3rem;">
          <img src="../../assets/images/successinfoimg.png" v-if="successInfo" />
          <img src="../../assets/images/errorinfoimg.png" v-if="errorInfo" />
          <img src="../../assets/images/warninfoimg.png" v-if="warnInfo" />
        </div>
      </van-col>
    </van-row>

    <van-row type="flex" justify="center" style="padding-top: 2.4rem;">
      <van-col class="orderlabel1">{{typeLabel}}</van-col>
    </van-row>

    <van-row type="flex" justify="center">
      <van-col class="orderlabel2">￥{{payMoney}}</van-col>
    </van-row>

    <van-row type="flex" justify="center" style="padding-top: 1.4rem;">
      <van-col span="20">
        <van-button type="info" size="large"  @click="outOrder">查看订单</van-button>
      </van-col>
    </van-row>
    <van-row type="flex" justify="center" style="padding-top: 0.4rem;">
      <van-col span="20">
        <van-button type="default" size="large" @click="outIndex">返回首页</van-button>
      </van-col>
    </van-row>

  </div>
</template>

<script>
import { Row, Col, Button, NavBar } from 'vant'

export default {
  name: 'PayInfo',
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [NavBar.name]: NavBar
  },
  data () {
    return {
      successInfo: false,
      errorInfo: false,
      warnInfo: false,
      typeLabel: '',
      payMoney: ''
    }
  },
  created () {
    this.payInfoInit()
  },
  methods: {
    payInfoInit () {
      // (SUCC.支付成功，FAIL.支付失败，PROC.支付中)
      let type = this.$route.query.payResult
      this.payMoney = this.$route.query.payMoney
      if (type === 'SUCC') {
        this.successInfo = true
        this.typeLabel = '支付成功'
      } else if (type === 'FAIL') {
        this.errorInfo = true
        this.typeLabel = '支付失败'
      } else if (type === 'PROC') {
        this.warnInfo = true
        this.typeLabel = '支付中'
      }
    },
    outOrder () {
      this.$router.replace({
        name: 'orderList',
        query: {
          onSaleBank: this.$route.query.onSaleBank
        }
      })
    },
    outIndex () {
      this.$router.replace({
        name: 'index',
        query: {
          onSaleBank: this.$route.query.onSaleBank
        }
      })
    }
  }
}
</script>

<style scoped>
  .orderlabel1{font-size: 0.6rem;color: #333333;letter-spacing: -0.37px;font-weight: bold;}
  .orderlabel2{font-size: 0.48rem;color: #666666;letter-spacing: -0.98px;margin-top: 10px;}
</style>
