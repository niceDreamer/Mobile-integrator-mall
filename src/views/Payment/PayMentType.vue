<template>
    <div style="background: #fafafa;">
      <van-nav-bar
        title="支付方式"
        left-arrow
        @click-left="onClickLeft"
      />
      <van-row class="waveInfo">
        <van-col span="24"><label>订单名称：</label><span>{{orderName}}</span></van-col>
        <van-col span="24"><label>订单金额：</label><span>{{orderPrice}} {{jfUnit}}</span></van-col>
        <van-col span="24"><label>我的通宝：</label><span>{{orderIntegral.creditBalance}}</span><img src="../../assets/images/gold-ingot.png" class="goldImg" /></van-col>
      </van-row>

      <!--<van-cell-group>-->
        <!--<van-cell title="请选择支付方式：" />-->
        <!--<van-cell v-for="(item, index) in payType" :key="index">-->
          <!--<template slot="title">-->
            <!--<div style="display: flex;">-->
              <!--<div style="width: 1.6rem;height: 1.2rem;margin: 0 0.4rem 0 0.2rem;">-->
                <!--<img :src="payTypeImg + item.paymentLogo" />-->
              <!--</div>-->
              <!--<div class="flex-one">-->
                <!--<div style="font-size: 0.4rem;font-weight: bold;">{{item.paymentName}}</div>-->
                <!--<div style="font-size: 0.3rem;color: #908f8f;">详情</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</template>-->
        <!--</van-cell>-->
      <!--</van-cell-group>-->

      <van-radio-group v-model="payRadio">
        <van-cell-group>
          <van-cell title="请选择支付方式：" />
          <van-cell v-for="(item, index) in payType" :key="index" clickable @click="payRadioFn(item.paymentCode, item.paymentId)">
              <template slot="title">
                <div style="display: flex;">
                  <div style="width: 1.6rem;height: 1.2rem;margin: 0 0.4rem 0 0.2rem;">
                    <img :src="payTypeImg + item.paymentLogo" />
                  </div>
                  <div class="flex-one">
                    <div style="font-size: 0.4rem;font-weight: bold;">{{item.paymentName}}</div>
                    <div style="font-size: 0.3rem;color: #908f8f;">{{item.paychannelTip}}</div>
                  </div>
                </div>
              </template>
            <van-radio slot="right-icon" :name="index" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>

      <div style="width: 90%;margin: 0.8rem auto;">
        <van-button type="danger" size="large" style="border-radius: 0.2rem;" @click="PayBtnClick">立即支付</van-button>
      </div>

      <van-popup v-model="popupShow" position="bottom" class="widthheight">
        <div class="payimg" @click="popupShow = false">
          <img src="../../assets/images/paymoney.png" style="height: 100vh;" />
        </div>
      </van-popup>
    </div>
</template>

<script>
import { Row, Col, Cell, CellGroup, Button, RadioGroup, Radio, Popup, Toast, NavBar, Dialog } from 'vant'
import { baseUrl } from '../../assets/js/env'

export default {
  name: 'PayMentType',
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    [NavBar.name]: NavBar,
    [Dialog.name]: Dialog
  },
  data () {
    return {
      orderName: '',
      orderPrice: '',
      jfUnit: '',
      orderIntegral: '',
      payTypeImg: '',
      payType: [],
      payRadio: '',
      paymentCode: '',
      paymentId: '',
      popupShow: false,
      orderList: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    onClickLeft () {
      Dialog.confirm({
        title: '确认要离开收银台',
        message: '您的订单在0小时29分钟内未支付将被取消,请尽快完成支付。',
        confirmButtonText: '继续支付',
        cancelButtonText: '确认离开'
      }).then(() => {
        // on confirm
      }).catch(() => {
        this.$router.replace({
          name: 'orderList',
          query: {
            onSaleBank: this.$route.query.onSaleBank
          }
        })
      })
    },
    init () {
      this.getRequest('zlbgroup-front/orderpay/orderToPay?paySn=' + this.$route.query.paySn + '&payType=1&memberId=' + this.$route.query.buyerId + '&onSaleBank=' + this.$route.query.onSaleBank).then(res => {
        if (res.data.success === true) {
          this.orderName = res.data.goodsNames
          this.orderPrice = res.data.totalJfAmount
          this.jfUnit = res.data.jfUnit
          this.payTypeImg = res.data.imgServer
          this.payType = res.data.paymentlist
          let account = res.data.paymentlist
          for (let i = 0; i < account.length; i++) {
            if (account[i].paymentId === '2') {
              this.orderIntegral = account[i].creditAccount
            }
          }
          this.orderList = res.data.orderList
        }
      })
    },
    payRadioFn (payCode, payId) {
      this.paymentCode = payCode
      this.paymentId = payId
    },
    PayBtnClick () {
      if (this.paymentId === '2') {
        this.$router.push({
          name: 'payIphoneType',
          query: {
            orderName: this.orderName,
            orderPrice: this.orderPrice,
            orderIntegral: this.orderIntegral,
            paySn: this.orderList[0].paySn,
            paymentCode: this.orderList[0].paymentCode,
            paymentId: this.orderList[0].paymentId,
            onSaleBank: this.$route.query.onSaleBank
          }
        })
      } else if (this.paymentId === '5') {
        // 支付宝支付
        let ua = navigator.userAgent.toLowerCase()
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          // 微信
          this.popupShow = true
        } else {
          // 浏览器
          let params = {
            paySn: this.$route.query.paySn,
            backUrl: 'http://m.zcjbpay.com'
          }
          this.postRequest('zlbgroup-front/alipayh5mentnew/topay', params).then(res => {
            if (res.data.success === true) {
              let routerData = this.$router.resolve({
                path: './applyPay',
                query: {
                  html: JSON.stringify(res.data.payInfo)
                }
              })
              this.htmls = res.data.payInfo
              // 打开新页面
              window.open(routerData.href, '_blank')
              const div = document.createElement('div')
              div.innerHTML = this.htmls
              document.body.appendChild(div)
              document.forms[0].submit()
              window.open(res.data.payInfo)
              this.popupShow = false
            }
          })
        }
      } else if (this.paymentId === '9') {
        console.log('weiChat')
        window.location.href = baseUrl + 'zlbgroup-front/wechatPayH5/submitOrder?paySn=' + this.$route.query.paySn
      } else if (this.paymentId === '1') {
        console.log('广发积分')
      }
    }
  }
}
</script>

<style scoped>
  .van-nav-bar .van-icon{
    color: #999 !important;
  }
  .van-nav-bar__arrow{
    font-size: 0.6rem !important;
  }
  .waveInfo{padding-top: 0;}
  .waveInfo label{font-size: 0.4rem;font-weight: bold;}
  .waveInfo span{font-size: 0.36rem;}
  .goldImg{width: 0.3rem;height: 0.3rem;vertical-align: middle;margin: 0 0 0.1rem 0.1rem;}
</style>
