<template>
  <div style="background: #fafafa;height: 100vh;">
    <van-nav-bar
      title="我的订单"
      left-arrow
      @click-left="onClickLeft"
      style="width:100%;position: fixed;top: 0;"
    />

    <div style="margin-top: 1.2rem;">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="loadMore"
        style="font-size: 0.2rem"
        :style="{height: height}"
      >
        <div class="orderDiv" v-for="(item, index) in dataList" :key="index">
          <div class="orderNum">订单号：{{item.orderSn}}</div>
          <router-link style="color: #333;" :to="{path:'/orderListInfo', query:{orderId: item.orderId, orderSn: item.orderSn, onSaleBank: onSaleBank}}">
            <div class="orderInfo" v-for="(itemChil, index) in item.orderGoodsList" :key="index">
              <div style="display: flex;">
                <div class="orderInfoImg">
                  <img v-lazy="itemChil.goodsForm == 'JD' ? itemChil.goodsImage : imgServer + itemChil.goodsImage"/>
                </div>
                <div class="flex-one">
                  <div class="orderInfoTit beyond-two">
                    {{itemChil.goodsName}}
                  </div>
                </div>
                <div class="orderInfoType">
                  <div>{{item.totalJfAmount}} {{item.jfUnit}}</div>
                  <div>x{{itemChil.goodsNum}}</div>
                  <div>{{utils.orderState(item.orderState)}}</div>
                </div>
              </div>
            </div>
          </router-link>
          <div class="orderInfoSum">
            <span style="font-size: 0.34rem;">积分：</span>
            <label>{{item.totalJfAmount}}</label>
            <label style="margin-left: 0.2rem;" v-if="item.orderState == 10">
              <van-button type="danger" round plain hairline size="small" @click="purchaseCli(item)">继续支付</van-button>
            </label>
          </div>
        </div>
      </van-list>

    </div>

  </div>
</template>

<script>
import { Lazyload, List, Button, NavBar } from 'vant'
import util from '../../assets/js/util'

export default {
  name: 'OrderList',
  components: {
    [Lazyload.name]: Lazyload,
    [List.name]: List,
    [Button.name]: Button,
    [NavBar.name]: NavBar
  },
  data () {
    return {
      height: 0,
      loading: false,
      finished: false,
      pageNo: 0,
      limit: 10,
      dataList: [],
      imgServer: '',
      utils: '',
      onSaleBank: this.$route.query.onSaleBank
    }
  },
  created () {
    this.height = window.innerHeight - 60 + 'px'
    this.utils = util
  },
  mounted () {
    // 监听窗口改变重置高度
    window.addEventListener('resize', () => {
      this.height = window.innerHeight - 60 + 'px'
    })
  },
  methods: {
    onClickLeft () {
      this.$router.replace({
        name: 'personIndex',
        query: {
          onSaleBank: this.$route.query.onSaleBank
        }
      })
    },
    loadMore () {
      this.pageNo += 1
      this.init()
    },
    init () {
      this.postRequest('zlbgroup-front/orderapi/qryOrderList?orderSn=&startTime=' + util.getMonthDate(3).last + '&endTime=' + util.getMonthDate(3).now + '&pageNo=' + this.pageNo + '&pageSize=' + this.limit + '&orderState=&orderType=&statereturd=&evaluationStatus=&lockState=').then(res => {
        if (res.data.success === true) {
          if (res.data.orderList.length > 0) {
            this.dataList.push(...res.data.orderList)
          } else {
            // 数据全部加载完成
            this.finished = true
          }
          this.imgServer = res.data.imgServer
          // 加载状态结束
          this.loading = false
        }
      })
    },
    // 立即购买
    purchaseCli (item) {
      this.$router.push({
        name: 'payMentType',
        query: {
          paySn: item.paySn,
          buyerId: item.buyerId,
          onSaleBank: this.$route.query.onSaleBank
        }
      })
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
.orderDiv{width: 100%;border-top: 1px solid #ebedf0;border-bottom: 1px solid #ebedf0;padding: 0.2rem 0;margin: 0.4rem 0;background: #fff;}
.orderNum{margin: 0.2rem 0.2rem 0.2rem 0.4rem;font-weight: 400;font-size: 0.36rem;}
.orderInfo{width: 100%;background: #f8f8f8;border-bottom: 1px dashed #ebedf0;}
.orderInfoImg{width: 2.4rem;height: 1.6rem;margin: 0.2rem;}
.orderInfoTit{padding: 0.2rem 0 0 0.2rem;font-size: 0.34rem;}
.orderInfoType{width: 2rem;text-align:center;line-height: 0.5rem;padding-top: 0.2rem;font-size: 0.34rem;}
.orderInfoSum{text-align: right;padding: 0.2rem 0.3rem 0.2rem 0.2rem;font-size: 0.3rem;}
.orderInfoSum label{color: #ff5300;font-weight: bold;font-size: 0.34rem;}
</style>
