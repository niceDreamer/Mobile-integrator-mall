<template>
    <div>
      <NavMeun titleOrSearch="油卡充值"></NavMeun>
        <div class="phone-input">
          <van-cell-group class="phone-cell">
            <van-field
              readonly
              clickable
              :value="oilValue"
              right-icon="credit-pay"
              @touchstart.native.stop="oilShow = true"
              placeholder="请输入加油卡卡号"
              style="border-radius: 0.2rem;">
            </van-field>
          </van-cell-group>
          <div class="phone-name" v-if="oilProvince">
            {{oilProvince}}
          </div>
          <div class="phone-name" style="color: #f44;" v-if="!oilProvince">
            {{oilErrorValue}}
          </div>
        </div>

        <div class="phone-list">
          <div class="phone-flex">
            <div class="phone-flex-li" v-for="(item, index) in oilSpecs" :key="index" :class="{'active': index == oilCheckIndex}">
              <div @click="oilIndexOf(item.goodsSpecId, index)">
                <div class="phone-li-money">{{item.specValue}}</div>
                <div class="phone-li-num">{{item.specGoodsJfPrice}}{{item.jfUnit}}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="phone-button">
          <van-button type="danger" size="large" style="border-radius: 0.2rem;" @click="oilBtnClick">立即充值</van-button>
        </div>

        <div class="cautions">
          <div class="title">注意事项 / Cautions</div>
          <b style="font-size:0.14rem; color:red">中石油系统维护中，暂停充值，恢复后将于第一时间通知</b><br>
          <!--<b style="font-size:0.14rem; color:red">中石油加油卡暂停充值，开放时间注意公告。</b><br>-->
          <!--<b style="font-size:0.14rem; color:red">中石化、中石油加油卡已恢复充值，可正常下单。</b><br>-->
          <b>【中石化加油卡】充值注意事项：</b><br>
          1、中石化官方每日22:50-00:50为其系统对账时间，此段时间订单会延迟处理。<br>
          2、所有加油卡主卡都可在线充值，含记名主卡、不记名主卡、企业主卡。副卡、挂失卡、卡号不存在无法充值。<br>
          3、订单充值成功，一般10分钟内即可到帐，用户需在加油站完成圈存方可使用。<br>
          4、同一时间同一卡号提交多笔，可能会被石化系统限制，导致充值失败，不同省份超限限制不同。<br>
          5、订单充值成功，如超过24小时仍未到帐，为中石化官方系统数据传输问题，请您尽快通过客服热线与我们或中石化官方联系。<br>
          6、油卡充值积分已包含10%的税费以及服务手续费。<br>
          7、中石化官方客服热线：区号+95105888/91505988。<br><br>
          <b>【中石油加油卡】充值注意事项：</b><br>
          1、暂只支持个人卡记名卡（卡号以90开头），不支持车队卡（卡号以91开头）。<br>
          2、中石油官方客服热线：95504
        </div>

        <van-number-keyboard
          v-model="oilValue"
          :show="oilShow"
          theme="custom"
          :maxlength="19"
          close-button-text="完成"
          @blur="oilShow = false"
          @hide="onOilHide"
        />
    </div>
</template>

<script>
import { Tab, Tabs, CellGroup, Field, Icon, Button, NumberKeyboard } from 'vant'
import NavMeun from '../../components/NavMeun'

export default {
  name: 'OilCard',
  components: {
    NavMeun,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [NumberKeyboard.name]: NumberKeyboard
  },
  data () {
    return {
      oilShow: false,
      oilValue: '',
      oilErrorValue: '',
      oilProvince: '中石化以100011开头--中石油以90开头',
      oilSpecs: [],
      oilSpecsVal: '',
      oilCheckIndex: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      // 获取充值额度
      this.getRequest('zlbgroup-front/virprod/queryProductDetial?goodsId=c1261cbbf0634520ae28a04023952c42&&onSaleBank=' + this.$route.query.onSaleBank).then(res => {
        this.oilSpecs = res.data.virtualGoodsSpecList
        this.oilSpecsVal = res.data.virtualGoodsSpecList[0].goodsSpecId
      })
    },
    // 充油卡
    onOilHide () {
      this.oilProvince = ''
      let oilVal = this.oilValue
      if (oilVal.length === 19 && oilVal.substring(0, 6) === '100011') {
        // 中石化 19位 100011开头
        this.oilProvince = '中石化'
      } else if (oilVal.length === 16 && oilVal.substring(0, 2) === '90') {
        // 中石油 16位 90开头
        this.oilProvince = '中石油'
      } else {
        this.oilProvince = '请输入正确的卡号'
      }
    },
    oilIndexOf (num, index) {
      this.oilCheckIndex = index
      this.oilSpecsVal = num
    },
    oilBtnClick () {
      if (!this.oilValue) { this.oilErrorValue = '请输入油卡！'; return false }
      // 充油卡
      this.getRequest('zlbgroup-front/cart/virtualBuyNow?specId=' + this.oilSpecsVal + '&virCardNo=' + this.oilValue + '&virCardType=FUAL&paytype=1&onSaleBank=' + this.$route.query.onSaleBank).then(res => {
        if (res.data.success === true || res.data.success === 'true') {
          this.$router.push({
            name: 'payMentType',
            query: {
              paySn: res.data.addOrderReturnPaySn.paySn,
              buyerId: res.data.addOrderReturnPaySn.buyerId,
              onSaleBank: this.$route.query.onSaleBank
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.phone-input{width: 100%;border-bottom: 2px solid #ebedf0;padding-top: 2.2rem;}
.phone-cell{width: 90%;border: 1px solid #ebedf0;border-radius: 0.2rem;margin: 0 auto;}
.phone-name{text-align: left;color: #777;font-size: 0.3rem;margin: 0.2rem 0 0.2rem 0.5rem;height: 0.4rem;}
.phone-list{width: 100%;border-bottom: 2px solid #ebedf0;padding: 0.8rem 0}
.phone-flex{display:flex;overflow: hidden;flex-wrap:wrap;}
.phone-flex-li{width: 28%;border: 1px solid #ebedf0;border-radius: 0.2rem; margin: 0 0.2rem 0.4rem 0.2rem;text-align: center;}
.phone-li-money{font-size: 0.5rem;font-weight: bold;color: #333;}
.phone-li-num{font-size: 0.3rem;color: #999;}
.phone-button{width: 90%;margin: 0.8rem auto;}
.active{background: #dfdfdf;}
.cautions {
  box-sizing: border-box;
  width: 100%;
  padding: 0.2rem;
  margin: 0.2rem auto 0;
  border-top: 0.2rem solid #eee;
  font-size: 0.14rem;
  line-height: 0.6rem;
  color: #666;
}
.cautions .title {
  font-size: 0.2rem;
  line-height: 0.5rem;
  color: #333;
}
</style>
