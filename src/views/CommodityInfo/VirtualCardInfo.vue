<template>
    <div>
      <NavMeun :titleOrSearch="navTitle"></NavMeun>

      <div style="padding-top: 1.6rem;">
        <div class="phone-input" v-if="specInput">
          <van-cell-group class="phone-cell">
            <van-field
              type="tel"
              clickable
              v-model="virtualValue"
              right-icon="contact"
              :placeholder="placeholderText"
              style="border-radius: 0.2rem;">
            </van-field>
          </van-cell-group>
          <div class="phone-name" style="color: #f44;">
            {{virtualErrorValue}}
          </div>
        </div>

        <div class="phone-flex">
          <div class="phone-flex-li" v-for="(item, index) in specList" :key="index" :class="{'active': index == virtualIndex}">
            <div @click="virtualIndexOf(item.goodsSpecId, index)">
              <div class="phone-li-money">{{item.specValue}}</div>
              <div class="phone-li-num">{{item.specGoodsJfPrice}}{{item.jfUnit}}</div>
            </div>
          </div>
        </div>

        <div class="phone-button">
          <van-button type="danger" size="large" style="border-radius: 0.2rem;" @click="oilBtnClick">{{clickTxt}}</van-button>
        </div>

        <!--<van-number-keyboard-->
        <!--v-model="virtualValue"-->
        <!--:show="virtualShow"-->
        <!--theme="custom"-->
        <!--close-button-text="完成"-->
        <!--@blur="virtualShow = false"-->
        <!--@hide="onVirtualHide"-->
        <!--/>-->

        <div style="width: 90%;margin: 0 auto;color: #777;font-size: 0.3rem;">
          <van-icon name="info" color="#0089ec"/>
          此商品为虚拟商品，充值前请仔细确认充值信息，并前往产品官网了解具体权益及终端使用范围，充值成功后将不予退款。
        </div>
      </div>

    </div>
</template>

<script>
import { Tab, Tabs, CellGroup, Field, Icon, Button, NumberKeyboard } from 'vant'
import NavMeun from '../../components/NavMeun'

export default {
  name: 'VirtualCardInfo',
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
      navTitle: this.$route.query.brandName,

      specList: [],
      specInput: true,
      virtualIndex: '',
      virtualChoseVal: '',
      virtualSpecId: '',
      placeholderText: '',
      clickTxt: '立即充值',

      virtualValue: '',
      virtualShow: false,
      virtualErrorValue: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getRequest('zlbgroup-front/virprod/queryProductDetial?goodsId=' + this.$route.query.brandId + '&onSaleBank=' + this.$route.query.onSaleBank).then(res => {
        if (res.data.success === true) {
          this.specList = res.data.virtualGoodsSpecList
          this.virtualChoseVal = res.data.virtualGoodsSpecList[0].goodsSpecId
          let virtualType = res.data.virtualGoods.virtualGoodsType
          if (virtualType === 'MEMCARD' || virtualType === 'GFVOUCH') {
            this.specInput = false
          }
          switch (virtualType) {
            case 'MEMTP_MP':
              this.placeholderText = '请输入手机号'
              break
            case 'MEMTP_QQ':
              this.placeholderText = '请输入QQ号'
              break
            case 'MEMCARD':
              this.clickTxt = '立即购买'
              break
            case 'GFVOUCH':
              this.clickTxt = '立即购买'
              break
            default:
              this.placeholderText = '请输入...'
          }
        }
      })
    },
    virtualIndexOf (id, index) {
      this.virtualChoseVal = id
      this.virtualIndex = index
    },
    oilBtnClick () {
      if (!this.virtualValue) { this.virtualErrorValue = this.placeholderText; return false }
      // if (!/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.virtualValue)) { this.virtualErrorValue = '手机号格式不正确！'; return false }
      this.getRequest('zlbgroup-front/cart/virtualBuyNow?specId=' + this.virtualChoseVal + '&virCardNo=' + this.virtualValue + '&virCardType=GFVOUCH&paytype=1&onSaleBank=' + this.$route.query.onSaleBank).then(res => {
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
  .phone-input{width: 100%;border-bottom: 2px solid #ebedf0;}
  .phone-cell{width: 90%;border: 1px solid #ebedf0;border-radius: 0.2rem;margin: 0 auto;}
  .phone-name{text-align: left;color: #777;font-size: 0.3rem;margin: 0.2rem 0 0.2rem 0.5rem;height: 0.4rem;}
  .phone-list{width: 100%;border-bottom: 2px solid #ebedf0;padding: 0.8rem 0}
  .phone-flex{display:flex;overflow: hidden;flex-wrap:wrap;margin-top: 0.4rem;}
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
