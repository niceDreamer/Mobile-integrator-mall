<template>
    <div style="background: #fafafa;height: 100vh;">
      <NavMeun titleOrSearch="物流信息"></NavMeun>

      <div style="padding-top: 1.2rem;">
        <div style="overflow-y: auto;" v-if="isInfo">
          <div class="orderInfo">
            <div class="orderTit">
              <div class="orderName">订单编号：</div>
              <div>{{orderId}}</div>
            </div>
            <div class="orderTit">
              <div class="orderName">国内承运人：</div>
              <div>{{logisticsInfo.carrierCom}}</div>
            </div>
            <div class="orderTit">
              <div class="orderName">承运单号：</div>
              <div>{{logisticsInfo.deliveryOrderId}}</div>
            </div>
          </div>

          <van-steps direction="vertical" :active="0" style="background: #fff;">
            <van-step v-for="(item, index) in logisticsList" :key="index">
              <h3>{{item.content}}</h3>
              <p>{{item.msgTime}}</p>
              <p>{{item.operator}}</p>
            </van-step>
          </van-steps>
        </div>
        <div class="orderToast" :style="{height: height}" v-if="!isInfo">
          <span>暂无物流信息</span>
        </div>
      </div>

    </div>
</template>

<script>
import { Step, Steps } from 'vant'
import NavMeun from '../../components/NavMeun'

export default {
  name: 'OrderLogistics',
  components: {
    NavMeun,
    [Step.name]: Step,
    [Steps.name]: Steps
  },
  data () {
    return {
      height: 0,
      isInfo: '',
      orderId: this.$route.query.orderSn,
      logisticsInfo: '',
      logisticsList: ''
    }
  },
  created () {
    this.LogisticsClick()
  },
  methods: {
    LogisticsClick () {
      this.postRequest('zlbgroup-front/productInfo/logicInfo?orderId=' + this.$route.query.orderSn).then(res => {
        if (res.data.success === true) {
          this.isInfo = res.data.logicInfo
          if (res.data.logicInfo) {
            this.logisticsList = res.data.logicInfo.orderTrackList
            this.logisticsInfo = res.data.logicInfo
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.orderInfo{width: 100%;background: #fff;padding: 0.4rem 0;text-align: center;font-size: 0.4rem;line-height: 0.8rem;border-bottom: 1px solid #ebedf0;margin-bottom: 0.3rem;}
.orderTit{display: flex;padding-left: 0.4rem;}
.orderName{width: 2.5rem;text-align: right;}
.orderToast{background: #fff;text-align: center;font-size: 0.4rem;color: #999;}
.orderToast span{padding-top: 1rem;display: block;}
</style>
