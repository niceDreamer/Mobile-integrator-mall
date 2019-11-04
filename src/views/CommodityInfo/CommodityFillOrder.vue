<template>
    <div style="background: #fafafa;overflow: hidden;height: 100vh;overflow-y: auto;">
      <NavMeun titleOrSearch="填写订单"></NavMeun>

      <van-cell v-if="addressData.length <= 0" label="请新增地址" is-link @click="addressModel = true" style="padding-top: 1.4rem;">
        <template slot="title">
          <span class="custom-title"></span>
        </template>
      </van-cell>
      <van-cell v-if="addressData.length > 0" :label="defaultAddress.address" is-link @click="addressModel = true" style="padding-top: 1.4rem;">
        <template slot="title">
          <span class="default-add" v-if="idDefault">默认</span>
          <span class="custom-title">{{defaultAddress.areaInfo}}</span>
        </template>
      </van-cell>
      <van-action-sheet v-model="addressModel" title="选择地址">
        <van-radio-group v-model="addressChoose">
          <van-cell-group>
            <van-cell :title="item.trueName +','+ item.mobPhone" :label="item.areaInfo" clickable v-for="(item, index) in addressData" :key="index">
              <van-radio slot="right-icon" :name="item" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <div class="phone-button">
          <div v-if="addressData.length <= 0">
            <router-link :to="{path: '/inputAddress', query: {memberId: memberId, flag: '0'}}">
              <van-button type="danger" size="large" style="border-radius: 0.2rem;margin-top: 0.2rem;">新增地址</van-button>
            </router-link>
          </div>
          <div v-if="addressData.length > 0">
            <van-button type="danger" size="large" style="border-radius: 0.2rem;" @click="chooseAddress">确定</van-button>
            <router-link to="/selectAddress">
              <van-button type="default" size="large" style="border-radius: 0.2rem;margin-top: 0.2rem;">修改地址</van-button>
            </router-link>
          </div>
        </div>
      </van-action-sheet>

      <div class="panel">
        <div v-for="(item, index) in cartList" :key="index">
          <div style="font-size: 0.3rem;padding-left: 0.4rem;">{{item.storeName}}</div>
          <van-card
            v-for="(item, index) in item.list"
            :key="index"
            :title="item.goodsName"
            currency=""
            :price="item.goodsJfPrice"
            :thumb="(item.goodsFrom == 'JD' ? item.goodsImages : imgServer + item.goodsImages)"
            style="background-color: #fff;">
            <div slot="num">
              <van-stepper
                v-model="item.goodsNum"
                :value="item.goodsNum"
                integer
                @plus="increaseInt(item.cartId, item.goodsNum, item.specId, item.goodsId)"
                @minus="reduceInt(item.cartId, item.goodsNum, item.specId,  item.goodsId)"
                style="margin: 0.4rem 0 0 0.2rem;" />
            </div>
          </van-card>
        </div>
      </div>

      <div class="panel" style="padding: initial;">
        <van-cell>
          <van-row type="flex" justify="space-between">
            <van-col span="12">
              <div>商品积分</div>
            </van-col>
            <van-col span="12">
              <div style="text-align: right;">{{mapInfo.jfUnit}} {{mapInfo.goodsTotalJfPrice}}</div>
            </van-col>
          </van-row>
          <van-row type="flex" justify="space-between">
            <van-col span="12">
              <div>商品数量</div>
            </van-col>
            <van-col span="12">
              <div style="text-align: right;">{{mapInfo.goodsNum}}</div>
            </van-col>
          </van-row>
          <van-row type="flex" justify="space-between">
            <van-col span="12">
              <div>运费</div>
            </van-col>
            <van-col span="12">
              <div style="text-align: right;">{{cartList[0].goodsTotalJfFreight}}</div>
            </van-col>
          </van-row>
        </van-cell>
      </div>

      <van-submit-bar
        :price="goodPrice"
        :label="company"
        currency=""
        button-text="提交订单"
        @submit="submitOrder"
        style="font-size: 0.4rem;"
      />
    </div>
</template>

<script>
import { Row, Col, Cell, CellGroup, ActionSheet, RadioGroup, Radio, Button, Card, Stepper, SubmitBar, Toast } from 'vant'
import NavMeun from '../../components/NavMeun'

export default {
  name: 'CommodityFillOrder',
  components: {
    NavMeun,
    [Row.name]: Row,
    [Col.name]: Col,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [ActionSheet.name]: ActionSheet,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Button.name]: Button,
    [Card.name]: Card,
    [Stepper.name]: Stepper,
    [SubmitBar.name]: SubmitBar,
    [Toast.name]: Toast
  },
  data () {
    return {
      addressModel: false,
      addressChoose: '',
      addressData: [],
      defaultAddress: '',
      idDefault: true,

      imgServer: '',
      cartList: [],
      mapInfo: {},
      goodPrice: 0,
      company: '',
      memberId: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.postRequest('zlbgroup-front/cart/queryCards?cartIds=' + this.$route.query.cartId + '&activityIds=&onSaleBank=' + this.$route.query.onSaleBank).then(res => {
        if (res.data.success === true) {
          this.addressData = res.data.addressList
          let addDefault = res.data.addressList.filter((v) => {
            if (v.isDefault === '0') {
              return v
            }
          })
          this.defaultAddress = addDefault[0]
          this.imgServer = res.data.imgServer
          this.cartList = res.data.cartVoList
          this.mapInfo = res.data.map
          this.company = (res.data.map.jfUnit ? res.data.map.jfUnit : '合计') + '：'
          this.goodPrice = res.data.map.goodsTotalJfPrice * 100

          this.memberId = res.data.member.memberId

          // 查询库存
          this.Querystock()
        }
      })
    },
    chooseAddress () {
      this.defaultAddress = this.addressChoose
      this.addressModel = false
      this.idDefault = false
    },
    // 截取2位
    formatPrice (price) {
      return (price / 100).toFixed(2)
    },
    submitOrder () {
      if (!this.defaultAddress.addressId) {
        Toast('请选择地址')
        return
      }
      this.postRequest('zlbgroup-front/cart/orderVal?cartIds=' + this.$route.query.cartId).then(res => {
        if (res.data.success === true) {
          this.orderCli()
        }
      })
    },
    // 更新商品数量+加
    increaseInt (cartId, count, specId, goodsId) {
      this.postRequest('zlbgroup-front/cart/updateCartCount?cartId=' + cartId + '&count=' + (count + 1) + '&specId=' + specId + '&goodsId=' + goodsId + '&onSaleBank=' + this.$route.query.onSaleBank).then(res => {
        if (res.data.success === true) {
          this.init()
        }
      })
    },
    // 更新商品数量-减
    reduceInt (cartId, count, specId, goodsId) {
      this.postRequest('zlbgroup-front/cart/updateCartCount?cartId=' + cartId + '&count=' + (count - 1) + '&specId=' + specId + '&goodsId=' + goodsId + '&onSaleBank=' + this.$route.query.onSaleBank).then(res => {
        if (res.data.success === true) {
          this.init()
        }
      })
    },
    // 查询库存
    Querystock () {
      let carts = this.cartList
      let infoList = []
      for (let i = 0; i < carts.length; i++) {
        let list = carts[i].list
        for (let j = 0; j < list.length; j++) {
          infoList.push({
            specId: list[j].specId,
            num: list[j].goodsNum
          })
        }
      }
      let params = {
        province: this.defaultAddress.provinceId,
        city: this.defaultAddress.cityId,
        county: this.defaultAddress.areaId,
        town: '',
        goodsInfoList: JSON.stringify(infoList)
      }
      this.postRequest('zlbgroup-front/productInfo/stockQuery', params).then(res => {
        if (res.data.success === true) {
          console.log(res)
        }
      })
    },
    // 提交订单
    orderCli () {
      this.postRequest('zlbgroup-front/cart/addOrder?cartIds=' + this.$route.query.cartId + '&storeId=0&orderMessage=&address_options=' + this.defaultAddress.addressId + '&paytype=1&couponId=&transportType=&isPd=0&activityIds=').then(res => {
        if (res.data.success === true) {
          this.$router.push({
            name: 'payMentType',
            query: {
              paySn: res.data.message,
              buyerId: this.memberId,
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
  .default-add{padding: 0.01rem;background: red;font-size: 0.28rem;color: #fff;border-radius: 0.1rem;margin-right: 0.2rem;}
  .phone-button{width: 90%;margin: 0.8rem auto;}
  .panel{border-radius: 0.3rem;background: #fff;margin: 0.6rem 0;padding: 0.2rem 0;}
  .van-submit-bar__text span {
    display: initial;
  }
</style>
