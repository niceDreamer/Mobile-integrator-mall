<template>
  <div style="background: #fafafa;">
    <NavMeun titleOrSearch="招来宝通宝支付"></NavMeun>
    <van-row class="waveInfo" style="padding-top: 1.4rem;">
      <van-col span="12"><label>我的通宝<img src="../../assets/images/gold-ingot.png" class="goldImg" />：</label><span style="font-size: 0.38rem;">{{tongBao.creditBalance}}</span></van-col>
      <van-col span="12" style="text-align: right;">
        <router-link to="/ExchangeList" style="color: #2c3e50;">
          <span style="font-size: 0.3rem;">查询兑换记录</span>
        </router-link>
      </van-col>
    </van-row>

    <div style="background: #fff;">
      <div style="display: flex;flex-wrap: wrap;">
        <router-link class="interListDiv" to="/ExchangeLoveCard">
          <div class="interList">
            <img v-lazy="loveImg"/>
          </div>
          <div class="interListTit beyond-one">爱心卡/积分卡</div>
        </router-link>
        <router-link class="interListDiv" to="/ExchangeGuangFa">
          <div class="interList">
            <img v-lazy="guangFaImg"/>
          </div>
          <div class="interListTit beyond-one">广发银行积分</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Row, Col, Loading } from 'vant'
import NavMeun from '../../components/NavMeun'

export default {
  name: 'InterworkingIndex',
  components: {
    NavMeun,
    [Row.name]: Row,
    [Col.name]: Col,
    [Loading.name]: Loading
  },
  data () {
    return {
      tongBao: 0,
      loveImg: require('../../assets/images/recharge_card.jpg'),
      guangFaImg: require('../../assets/images/cgbpay.jpg')
    }
  },
  created () {
    this.init()
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>
  .waveInfo label{font-size: 0.4rem;font-weight: bold;}
  .interList{width: 2rem;height: 2rem;border-radius: 50%;overflow: hidden;border: 1px solid #cecece;margin: 0.4rem auto;}
  .interListDiv{width: 33.2%;text-align: center;font-size: 0.3rem;color: #333;}
  .goldImg{width: 0.3rem;height: 0.3rem;vertical-align: middle;margin: 0 0 0.1rem 0.1rem;}
</style>
