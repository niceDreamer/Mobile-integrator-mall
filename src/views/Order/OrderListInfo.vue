<template>
    <div style="background: #fafafa;height: 100vh;">
      <NavMeun titleOrSearch="我的订单"></NavMeun>

      <div class="orderInfo">
        <div class="orderTit">
          <div class="orderName">订单编号：</div>
          <div>{{dataList.orderSn}}</div>
        </div>
        <div class="orderTit">
          <div class="orderName">下单时间：</div>
          <div>{{utils.dateFormater(dataList.createTime)}}</div>
        </div>
        <div class="orderTit">
          <div class="orderName">总金额：</div>
          <div>{{dataList.totalJfAmount}}</div>
        </div>
      </div>

      <div class="orderPerson" v-if="addressList">
        <div class="orderPersonDiv">
          <div class="orderPersonDivInfo">
            <div><label style="font-weight: bold;">收货人：</label><label>{{addressList.trueName}}</label></div>
            <div>{{addressList.mobPhone}}</div>
          </div>
          <div style="font-size: 0.35rem;">收货地址：{{addressList.areaInfo}}{{addressList.address}}</div>
        </div>
      </div>

      <!--goodList.virtualType == PHYGOODS-->
      <div class="orderDiv" v-if="!cardPws">
        <div class="orderInfos">
          <div v-for="(item, index) in goodList" :key="index">
            <router-link :to="{path:'/commodityInfo', query:{specId: item.specId, onSaleBank: onSaleBank}}"  style="display: flex;color: #333;">
              <div class="orderInfoImg">
                <img v-lazy="item.goodsForm == 'JD' ? item.goodsImage : imgServer + item.goodsImage"/>
              </div>
              <div class="flex-one">
                <div class="orderInfoTit beyond-two">
                  {{item.goodsName}}
                </div>
              </div>
              <div class="orderInfoType">
                <div>{{item.totalJfAmount}} {{item.jfUnit}}</div>
                <div>x{{item.goodsNum}}</div>
                <div>{{utils.orderState(dataList.orderState)}}</div>
              </div>
            </router-link>
          </div>
        </div>
        <div class="orderInfoSum" v-if="dataList.orderState == '20'">
          <div>运单号：{{dataList.shippingCode}}</div>
          <router-link :to="{path: '/orderLogistics', query: {orderSn: orderSn}}" style="color: #333;">
            <div>查询物流></div>
          </router-link>
        </div>
        <van-row v-if="dataList.orderState == '10'">
          <van-col offset="18" span="6">
            <div class="orderInfoSum">
              <van-button type="danger" round plain hairline size="small" @click="purchaseCliInfo()">继续支付</van-button>
            </div>
          </van-col>
        </van-row>
        <!--<van-row v-if="dataList.orderState == '40'">-->
          <!--<van-col offset="18" span="6">-->
            <!--<div class="orderInfoSum">-->
              <!--<van-button type="danger" round plain hairline size="small" @click="okCliInfo()">再次购买</van-button>-->
            <!--</div>-->
          <!--</van-col>-->
        <!--</van-row>-->
      </div>

      <!--虚拟商品-->
      <!--goodList.virtualType == MEMCARD-->
      <div v-if="cardPws">
        <div class="orderDiv">
          <div class="orderInfos">
            <div style="display: flex;" v-for="(item, index) in goodList" :key="index">
              <div class="orderInfoImg">
                <img v-lazy="item.goodsForm == 'JD' ? item.goodsImage : imgServer + item.goodsImage"/>
              </div>
              <div class="flex-one">
                <div class="orderInfoTit beyond-two">
                  {{item.goodsName}}
                </div>
              </div>
              <div class="orderInfoType">
                <div>{{item.totalJfAmount}} {{item.jfUnit}}</div>
                <div>x{{item.goodsNum}}</div>
                <div>{{utils.orderState(dataList.orderState)}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="orderPwd">
          <div class="orderInfos">
            <div class="orderInfoTit" style="margin-bottom: 0.1rem;">
              卡密
            </div>
          </div>
          <div class="orderInfoSum">
            <div>卡号：{{cardNum}}</div>
            <div>密码：{{cardPwd}}</div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
import { Lazyload, Button, Row, Col } from 'vant'
import NavMeun from '../../components/NavMeun'
import util from '../../assets/js/util'

export default {
  name: 'OrderListInfo',
  components: {
    NavMeun,
    [Lazyload.name]: Lazyload,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col
  },
  data () {
    return {
      dataList: [],
      goodList: [],
      cardPws: '',
      addressList: [],
      imgServer: '',
      utils: '',
      virtualCard: '',
      cardNum: '',
      cardPwd: '无',
      orderSn: this.$route.query.orderSn,
      onSaleBank: this.$route.query.onSaleBank
    }
  },
  created () {
    this.init()
    this.utils = util
  },
  methods: {
    init () {
      this.postRequest('zlbgroup-front/orderapi/orderDetail?orderId=' + this.$route.query.orderId).then(res => {
        if (res.data.success === true) {
          this.dataList = res.data.orderDetail
          this.goodList = res.data.orderDetail.orderGoodsList
          this.cardPws = res.data.orderDetail.orderGoodsList[0].virtualType
          this.addressList = res.data.orderDetail.address
          this.imgServer = res.data.imgServer
          if (this.cardPws) {
            this.card()
          }
        }
      })
    },
    card () {
      this.postRequest('zlbgroup-front/virtualDeposit/virtualCardQuery?orderNo=' + this.$route.query.orderSn).then(res => {
        if (res.data.success === true) {
          this.cardNum = res.data.cardNo
          this.cardPwd = res.data.cardPwd
        }
      })
    },
    purchaseCliInfo () {
      this.$router.push({
        name: 'payMentType',
        query: {
          paySn: this.dataList.paySn,
          buyerId: this.goodList[0].buyerId,
          onSaleBank: this.$route.query.onSaleBank
        }
      })
    }
    // 继续购买
    // okCliInfo () {
    //   let params = {
    //     goodsId: this.goodList[0].goodsId,
    //     count: this.goodList[0].goodsNum,
    //     specId: this.goodList[0].specId,
    //     onSaleBank: this.$route.query.onSaleBank
    //   }
    //   this.postRequest('zlbgroup-front/cart/saveCart', params).then(res => {
    //     if (res.data.success === true) {
    //       this.$router.push({
    //         name: 'cart',
    //         query: {
    //           onSaleBank: this.$route.query.onSaleBank
    //         }
    //       })
    //     }
    //   })
    // }
  }
}
</script>

<style scoped>
.orderInfo{width: 100%;background: #fff;padding: 1.4rem 0 0.4rem 0;text-align: center;font-size: 0.4rem;line-height: 0.8rem;border-bottom: 1px solid #ebedf0;}
.orderTit{display: flex;padding-left: 0.4rem;}
.orderName{width: 2rem;text-align: right;}
.orderPerson{width: 100%;background: #fff;padding: 0.4rem 0;margin: 0.4rem 0;border-top: 1px solid #ebedf0;border-bottom: 1px solid #ebedf0;}
.orderPersonDiv{width: 90%;margin: 0 auto;}
.orderPersonDivInfo{display: flex;justify-content: space-between;margin-bottom: 0.3rem;font-size: 0.4rem;}
.orderDiv{width: 100%;border-top: 1px solid #ebedf0;border-bottom: 1px solid #ebedf0;margin: 0.4rem 0;background: #fff;}
.orderInfos{width: 100%;background: #fff;border-bottom: 1px solid #ebedf0;}
.orderInfoImg{width: 2.4rem;height: 1.6rem;margin: 0.2rem;}
.orderInfoTit{padding: 0.2rem 0 0 0.2rem;font-size: 0.36rem;}
.orderInfoType{width: 2rem;text-align:center;line-height: 0.5rem;padding-top: 0.2rem;font-size: 0.36rem;}
.orderInfoSum{text-align: right;padding: 0.2rem 0.3rem 0.2rem 0.2rem;font-size: 0.3rem;display: flex;justify-content: space-between;}
.orderInfoSum label{color: #ff5300;font-weight: bold;}
.orderPwd{border-top: 1px solid #ebedf0;border-bottom: 1px solid #ebedf0;background: #fff;}
</style>
