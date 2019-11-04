<template>
    <div>
      <NavMeun titleOrSearch="话费流量"></NavMeun>
      <div style="padding-top: 1.2rem;">
        <van-tabs @click="tabTit">
          <van-tab title="充话费">
            <div class="phone-input">
              <van-cell-group class="phone-cell">
                <van-field
                  readonly
                  clickable
                  :value="tel.telValue"
                  right-icon="contact"
                  @touchstart.native.stop="tel.telShow = true"
                  placeholder="请输入手机号"
                  style="border-radius: 0.2rem;">
                </van-field>
              </van-cell-group>
              <div class="phone-name" v-if="tel.telProvince">
                {{tel.telProvince}}
              </div>
              <div class="phone-name" style="color: #f44;" v-if="!tel.telProvince">
                {{tel.telErrorValue}}
              </div>
            </div>

            <div class="phone-list">
              <div class="phone-flex">
                <div class="phone-flex-li" v-for="(item, index) in tel.telSpecs" :key="index" :class="{'active': index == tel.telCheckIndex}">
                  <div @click="telIndexOf(item.goodsSpecId, index)">
                    <div class="phone-li-money">{{item.specValue}}</div>
                    <div class="phone-li-num">{{item.specGoodsJfPrice}}{{item.jfUnit}}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="phone-button">
              <van-button type="danger" size="large" style="border-radius: 0.2rem;" @click="telBtnClick">立即充值</van-button>
            </div>

            <van-number-keyboard
              v-model="tel.telValue"
              :show="tel.telShow"
              theme="custom"
              :maxlength="11"
              close-button-text="完成"
              @blur="tel.telShow = false"
              @hide="onTelHide"
            />
          </van-tab>
          <van-tab title="充流量">
            <div class="phone-input">
              <van-cell-group class="phone-cell">
                <van-field
                  readonly
                  clickable
                  :value="flow.flowValue"
                  right-icon="contact"
                  @touchstart.native.stop="flow.flowShow = true"
                  placeholder="请输入手机号"
                  style="border-radius: 0.2rem;">
                </van-field>
              </van-cell-group>
              <div class="phone-name" v-if="flow.flowProvince">
                {{flow.flowProvince}}
              </div>
              <div class="phone-name" style="color: #f44;" v-if="!flow.flowProvince">
                {{flow.flowErrorValue}}
              </div>
            </div>

            <div class="phone-list">
              <div class="phone-flex">
                <div class="phone-flex-li" v-for="(item, index) in flow.flowSpecs" :key="index" :class="{'active': index == flow.flowCheckIndex}">
                  <div @click="flowIndexOf(item.goodsSpecId, index)">
                    <div class="phone-li-money">{{item.specValue}}</div>
                    <div class="phone-li-num">{{item.specGoodsJfPrice}}{{item.jfUnit}}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="phone-button">
              <van-button type="danger" size="large" style="border-radius: 0.2rem;" @click="flowBtnClick">立即充值</van-button>
            </div>

            <van-number-keyboard
              v-model="flow.flowValue"
              :show="flow.flowShow"
              theme="custom"
              :maxlength="11"
              close-button-text="完成"
              @blur="flow.flowShow = false"
              @hide="onFlowHide"
            />
          </van-tab>
        </van-tabs>
      </div>
    </div>
</template>

<script>
import { Tab, Tabs, CellGroup, Field, Icon, Button, NumberKeyboard, Toast } from 'vant'
import NavMeun from '../../components/NavMeun'
import Cookie from 'js-cookie'

export default {
  name: 'TelephoneFlow',
  components: {
    NavMeun,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [NumberKeyboard.name]: NumberKeyboard,
    [Toast.name]: Toast
  },
  data () {
    return {
      tel: {
        telShow: false,
        telValue: '',
        telErrorValue: '',
        telProvince: '',
        telSpecs: [],
        telSpecsVal: '',
        telCheckIndex: ''
      },
      flow: {
        flowShow: false,
        flowValue: '',
        flowErrorValue: '',
        flowProvince: '',
        flowSpecs: [],
        flowSpecsVal: '',
        flowCheckIndex: ''
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (!Cookie.get('userInfo')) {
        Toast('检测到您还未登录,请登录后操作！')
        // 跳转登陆页
        setTimeout(() => {
          this.$router.push({
            path: '/login',
            query: this.$route.query.onSaleBank
          })
        }, 2000)
      }
      let iphone = JSON.parse(Cookie.get('userInfo'))
      this.tel.telValue = iphone.memberName
      this.onTelHide()
    },
    // 切换
    tabTit (name, title) {
      if (title === '充话费') {
        this.init()
      } else {
        let iphone = JSON.parse(Cookie.get('userInfo'))
        this.flow.flowValue = iphone.memberName
        this.onFlowHide()
      }
    },
    // 充话费
    onTelHide () {
      if (!this.tel.telValue) { this.tel.telErrorValue = '请输入手机号！'; return false }
      if (!/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.tel.telValue)) { this.tel.telErrorValue = '手机号格式不正确！'; return false }
      this.tel.telErrorValue = ''
      // 获取号码归属地及充值额度
      this.getRequest('zlbgroup-front/virprod/qryProdPrice?goodsId=d37ceda6ddba4bb0b72b95a4aec086de&onSaleBank=' + this.$route.query.onSaleBank + '&mobile=' + this.tel.telValue).then(res => {
        this.tel.telProvince = res.data.province + ' - ' + res.data.isp
        this.tel.telSpecs = res.data.virtualGoodsSpecList
        this.tel.telSpecsVal = res.data.virtualGoodsSpecList[0].goodsSpecId
      })
    },
    telIndexOf (num, index) {
      this.tel.telCheckIndex = index
      this.tel.telSpecsVal = num
    },
    telBtnClick () {
      if (!this.tel.telValue) { this.tel.telErrorValue = '请输入手机号！'; return false }
      if (!/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.tel.telValue)) { this.tel.telErrorValue = '手机号格式不正确！'; return false }
      // 充话费
      this.getRequest('zlbgroup-front/cart/virtualBuyNow?specId=' + this.tel.telSpecsVal + '&virCardNo=' + this.tel.telValue + '&virCardType=MPTP&paytype=1&onSaleBank=' + this.$route.query.onSaleBank).then(res => {
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
    },
    // 充流量
    onFlowHide () {
      if (!this.flow.flowValue) { this.flow.flowErrorValue = '请输入手机号！'; return false }
      if (!/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.flow.flowValue)) { this.flow.flowErrorValue = '手机号格式不正确！'; return false }
      this.flow.flowErrorValue = ''
      // 获取号码归属地及充值额度
      this.getRequest('zlbgroup-front/virprod/qryProdPrice?goodsId=31ccc6e8d80e43bca4d4f3f14d30cca6&onSaleBank=' + this.$route.query.onSaleBank + '&mobile=' + this.flow.flowValue).then(res => {
        this.flow.flowProvince = res.data.province + ' - ' + res.data.isp
        this.flow.flowSpecs = res.data.virtualGoodsSpecList
        this.flow.flowSpecsVal = res.data.virtualGoodsSpecList[0].goodsSpecId
      })
    },
    flowIndexOf (num, index) {
      this.flow.flowCheckIndex = index
      this.flow.flowSpecsVal = num
    },
    flowBtnClick () {
      if (!this.flow.flowValue) { this.flow.flowErrorValue = '请输入手机号！'; return false }
      if (!/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.flow.flowValue)) { this.flow.flowErrorValue = '手机号格式不正确！'; return false }
      this.flow.flowErrorValue = ''
      // 充流量
      this.getRequest('zlbgroup-front/cart/virtualBuyNow?specId=' + this.flow.flowSpecsVal + '&virCardNo=' + this.flow.flowValue + '&virCardType=MPDTTP&paytype=1&onSaleBank=' + this.$route.query.onSaleBank).then(res => {
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
.phone-input{width: 100%;border-bottom: 2px solid #ebedf0;margin-top: 0.8rem;}
.phone-cell{width: 90%;border: 1px solid #ebedf0;border-radius: 0.2rem;margin: 0 auto;}
.phone-name{text-align: left;color: #777;font-size: 0.3rem;margin: 0.2rem 0 0.2rem 0.5rem;height: 0.4rem;}
.phone-list{width: 100%;border-bottom: 2px solid #ebedf0;padding: 0.8rem 0}
.phone-flex{display:flex;overflow: hidden;flex-wrap:wrap;}
.phone-flex-li{width: 28%;border: 1px solid #ebedf0;border-radius: 0.2rem; margin: 0 0.2rem 0.4rem 0.2rem;text-align: center;}
.phone-li-money{font-size: 0.5rem;font-weight: bold;color: #333;}
.phone-li-num{font-size: 0.3rem;color: #999;}
.phone-button{width: 90%;margin: 0.8rem auto;}
.active{background: #dfdfdf;}
</style>
