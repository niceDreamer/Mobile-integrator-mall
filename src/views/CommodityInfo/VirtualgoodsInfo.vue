<template>
  <div style="background: #fafafa;height: 100vh;">
    <NavMeun titleOrSearch="商品详情"></NavMeun>

    <div style="padding-top: 1.2rem;">
      <div style="background: #fff;">
        <van-swipe :autoplay="3000" style="height: 5rem;border-bottom: 1px solid #e3e3e5;">
          <van-swipe-item v-for="(image, index) in imgMove" :key="index">
            <img v-lazy="imgServer + image" />
          </van-swipe-item>
        </van-swipe>
        <div style="margin-top: 0.4rem;padding: 0 0 0.3rem 0.4rem;">
          <div style="font-size: 0.4rem;font-weight: bold;">{{goodName}}</div>
          <div style="font-size: 0.34rem;color: #999;">{{goodNum}}</div>
        </div>
        <div>
          <p v-html="commodity"></p>
        </div>
      </div>
      <van-goods-action style="z-index: 999;">
        <van-goods-action-button type="danger" @click="skuModel = true">
          立即兑换
        </van-goods-action-button>
      </van-goods-action>

      <van-popup
        v-model="skuModel"
        position="bottom"
      >
        <van-cell-group>
          <van-cell>
            <div style="display: flex;">
              <div class="sku-img">
                <img v-lazy="imgServer + goodsInfoImg"/>
              </div>
              <div class="sku-info">
                <div class="sku-price">{{goodPrice}}</div>
              </div>
            </div>
          </van-cell>

          <van-cell>
            <div style="display: flex; flex-wrap: wrap;">
              <div class="sku-rectangle" v-for="(item, index) in goodList" :key="index" :class="{'sku-active': index === specActive}" @click="skuTypeCli(index, item)">
                <div style="font-weight: bold;">{{item.specValue}}</div>
                <div style="font-size: 0.3rem;">{{item.specGoodsJfPrice}} {{item.jfUnit}}</div>
              </div>
            </div>
          </van-cell>

          <van-cell>
            <div style="color: #323233;display: flex;">
              <div class="flex-one">购买数量</div>
              <van-stepper integer v-model="stepperVal" />
            </div>
          </van-cell>
        </van-cell-group>

        <div class="phone-button">
          <van-button type="danger" size="large" style="border-radius: 0.2rem;" @click="virtualClick">确定</van-button>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { Cell, CellGroup, Swipe, SwipeItem, GoodsAction, GoodsActionIcon, GoodsActionButton, Stepper, Button, Popup } from 'vant'
import NavMeun from '../../components/NavMeun'
import util from '../../assets/js/util'

export default {
  name: 'VirtualgoodsInfo',
  components: {
    NavMeun,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [Stepper.name]: Stepper,
    [Button.name]: Button,
    [Popup.name]: Popup
  },
  data () {
    return {
      imgMove: [],
      imgServer: '',
      goodName: '',
      goodNum: 0,
      skuModel: false,
      goodList: [],
      goodsInfoImg: '',
      stepperVal: '',
      specActive: '',
      goodPrice: '',
      goodsId: '',
      goodSpecId: '',
      commodity: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getRequest('zlbgroup-front/virprod/queryProductDetial?goodsId=' + this.$route.query.goodsId + '&onSaleBank=' + this.$route.query.onSaleBank).then(res => {
        if (res.data.success === true) {
          console.log(res)
          this.imgServer = res.data.imgServer
          let goodImg = res.data.virtualGoods.goodsImagesMore.split(',')
          this.imgMove = util.trimNull(goodImg)
          this.goodName = res.data.virtualGoods.goodsName
          this.commodity = res.data.virtualGoods.goodsBody
          this.goodList = res.data.virtualGoodsSpecList
          this.goodNum = res.data.virtualGoodsSpecList[0].specValue
          this.goodPrice = res.data.virtualGoodsSpecList[0].specValue
          this.goodsInfoImg = res.data.virtualGoods.goodsImages

          // 选中active
          let item = {
            goodsId: this.goodList[0].goodsId,
            goodsSpecId: this.goodList[0].goodsSpecId,
            specGoodsJfPrice: this.goodList[0].specGoodsJfPrice,
            specValue: this.goodList[0].specValue,
            jfUnit: this.goodList[0].jfUnit
          }
          this.skuTypeCli(0, item)
        }
      })
    },
    // 规格选择
    skuTypeCli (index, item) {
      this.specActive = index
      console.log(item)
      this.goodPrice = item.specValue
      this.goodsId = item.goodsId
      this.goodSpecId = item.goodsSpecId
    },
    // 确定
    virtualClick () {
      let params = {
        goodsId: this.goodsId,
        count: this.stepperVal,
        specId: this.goodSpecId,
        onSaleBank: this.$route.query.onSaleBank
      }
      this.postRequest('zlbgroup-front/cart/buyNow', params).then(res => {
        if (res.data.success === true) {
          this.$router.push({
            name: 'commodityFillOrder',
            query: {
              cartId: res.data.cartIds,
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
.sku-img{width: 2.6rem;height: 2.6rem;background: #f8f8f8;}
.sku-info{margin-left: 0.5rem;color: #969799;font-size: 0.3rem;}
.sku-price{font-size: 0.6rem;font-weight: bold;color: #f44;}
.sku-active{color: #f44;background: #ff00000d !important;}
.sku-rectangle{padding:0 0.2rem;margin: 0 12px 12px 0;overflow: hidden;min-width: 2.3rem;border-radius: 0.1rem;background: #f7f8fa;text-align: center;}
.phone-button{width: 90%;margin: 0.8rem auto;}
</style>
