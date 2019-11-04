<template>
  <div class="goods">
    <NavMeun titleOrSearch="商品详情"></NavMeun>
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="(item, index) in goodsImg" :key="index">
        <img v-lazy="item.indexOf('/n5/') == -1 ? item : item.replace('/n5/', '/n1/')" >
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goodsList.goodsSubtitle }}</div>
        <!--<div class="goods-price">{{ formatPrice(goods.price) }}</div>-->
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">价格：{{ goodsList.zlbJfPrice }}</van-col>
        <van-col span="14" v-if="goodsList.goodsFrom == 'JD'">库存：{{ goodsList.goodsTotalStorage }}</van-col>
      </van-cell>
    </van-cell-group>

    <!--<van-cell-group class="goods-cell-group">-->
      <!--<van-cell title="选择地址" is-link @click="address" />-->
    <!--</van-cell-group>-->
    <div style="width: 100%;">
      <van-tabs @click="tabClick">
        <van-tab title="商品介绍"><p v-html="commodity"></p></van-tab>
        <van-tab title="规格参数">
          <!--<p v-html="parameter"></p>-->
          <div class="parameter-div">
            <div class="parameter-left" v-for="(item, index) in parameter" :key="index">
              {{item}}
            </div>
          </div>
        </van-tab>
        <van-tab title="包装清单" class="packingList-tit">{{packingList}}</van-tab>
      </van-tabs>
    </div>

    <van-goods-action style="z-index: 999;">
      <van-goods-action-button type="warning" @click="addCart">
        加入购物车
      </van-goods-action-button>
      <van-goods-action-button type="danger" @click="addBuy">
        立即购买
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
              <img v-lazy="goodsInfoImg"/>
            </div>
            <div class="sku-info">
              <div class="sku-price">{{specGoodsJfPrice}}</div>
              <div>剩余 {{specGoodsStorage}}件</div>
              <!--<div>选择 颜色，尺寸</div>-->
            </div>
          </div>
        </van-cell>

        <!--<van-cell v-for="(item, index) in specNameId" :key="index">-->
          <!--<div style="color: #323233;">-->
            <!--{{item.name}}-->
          <!--</div>-->
          <!--<div style="display: flex; flex-wrap: wrap;">-->
            <!--<div v-for="(chilItem, chilindex) in specValue[item.id]" :key="chilindex">-->
              <!--<div class="sku-rectangle" @click="skuTypeCli(chilItem.spValueId)" :class="{'sku-active': specActive.indexOf(chilItem.spValueId) > -1}">-->
                <!--{{chilItem.spValueName}}-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</van-cell>-->

        <van-cell>
          <div style="display: flex; flex-wrap: wrap;max-height: 5rem;overflow-y: auto;">
            <div class="sku-rectangle" v-for="(item, index) in goodsPrice" :key="index" :class="{'sku-active': index === specActive}" @click="skuTypeCli(index, item)">
              {{item.specSku}}
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
        <van-button type="danger" :disabled="disabled" size="large" style="border-radius: 0.2rem;" @click="goCartFn">确定</van-button>
      </div>
    </van-popup>

  </div>
</template>

<script>
import { Tag, Col, Icon, Cell, Toast, CellGroup, Swipe, SwipeItem, GoodsAction, GoodsActionIcon, GoodsActionButton, Popup, Stepper, Lazyload, Button, Tab, Tabs } from 'vant'
import NavMeun from '../../components/NavMeun'

export default {
  name: 'CommodityInfo',
  components: {
    NavMeun,
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [Toast.name]: Toast,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [Popup.name]: Popup,
    [Stepper.name]: Stepper,
    [Lazyload.name]: Lazyload,
    [Button.name]: Button,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data () {
    return {
      goodsImg: [],
      goodsInfoImg: '',
      goodsList: {},
      skuModel: false,
      goodsPrice: [],
      specNameId: [],
      specValue: [],
      clickIndex: '',
      stepperVal: '',
      specActive: '',
      specActiveId: '',
      goodSpecId: '',
      goodsPrcs: '',
      specGoodsJfPrice: '',
      specGoodsStorage: '',
      chooseType: '',
      commodity: '',
      parameter: [],
      packingList: '',
      disabled: false
    }
  },
  created () {
    this.init()
    window.scrollTo(0, 1)
  },
  methods: {
    // 获取商品信息
    init () {
      this.getRequest('zlbgroup-front/product/queryProductDetial?specId=' + this.$route.query.specId + '&onSaleBank=' + this.$route.query.onSaleBank).then(res => {
        if (res.data.success === true) {
          this.goodsImg = res.data.imageList
          let goosInfo = res.data.imageList[0]
          this.goodsInfoImg = goosInfo.indexOf('/n5/') === -1 ? goosInfo : goosInfo.replace('/n5/', '/n4/')
          this.goodsList = res.data.goodsSpecAfterMap.goods

          this.goodSpecId = res.data.goodsSpecAfterMap.goods.specId

          this.goodsPrcs = res.data.goodsSpecAfterMap.goodsSpecs
          for (let i = 0; i < this.goodsPrcs.length; i++) {
            this.goodsPrice.push({
              goodsId: this.goodsPrcs[i].goodsId,
              goodsSpecId: this.goodsPrcs[i].goodsSpecId,
              specGoodsJfPrice: this.goodsPrcs[i].specGoodsJfPrice,
              specGoodsStorage: this.goodsPrcs[i].specGoodsStorage,
              specSku: Object.values(JSON.parse(this.goodsPrcs[i].specGoodsSpec)).join('+')
            })
          }

          let key = Object.keys(res.data.goodsSpecAfterMap.specname)
          for (let i = 0; i < key.length; i++) {
            this.specNameId.push({ id: key[i], name: res.data.goodsSpecAfterMap.specname[key[i]] })
          }

          this.specValue = res.data.goodsSpecAfterMap.specvalue

          // 选中active
          let item = {
            goodsId: this.goodsPrcs[0].goodsId,
            goodsSpecId: this.goodsPrcs[0].goodsSpecId,
            specGoodsJfPrice: this.goodsPrcs[0].specGoodsJfPrice,
            specGoodsStorage: this.goodsPrcs[0].specGoodsStorage,
            specSku: Object.values(JSON.parse(this.goodsPrcs[0].specGoodsSpec)).join('+')
          }
          this.sayShop()
          this.skuTypeCli(0, item)
        }
      })
    },
    // 初始化商品介绍
    sayShop () {
      this.commodity = this.goodsList.goodsBody
    },
    // 初始化规格参数
    specification () {
      let spec = Object.values(JSON.parse(this.goodsList.goodsSpec))
      for (let i = 0; i < spec.length; i++) {
        this.parameter = Object.values(JSON.parse(spec[i]))
      }
    },
    // 初始化包装清单
    packing () {
      this.packingList = this.goodsList.afterSale
    },
    // 商品详情
    tabClick (name, title) {
      switch (name) {
        case 0:
          // 商品介绍
          this.sayShop()
          break
        case 1:
          // 规格参数
          this.specification()
          break
        case 2:
          // 包装清单
          this.packing()
          break
      }
    },
    // 保留两位
    formatPrice () {
      return '¥' + (this.goods.price / 100).toFixed(2)
    },
    // 规格选择
    skuTypeCli (index, item) {
      this.specActive = index
      this.goodsId = item.goodsId
      this.specGoodsJfPrice = item.specGoodsJfPrice
      this.specGoodsStorage = item.specGoodsStorage
      this.disabled = item.specGoodsStorage === 0 ? true : false
      this.goodSpecId = item.goodsSpecId
      let skuInfo = this.goodsImg[index]
      if (!skuInfo) { return }
      this.goodsInfoImg = skuInfo.indexOf('/n5/') === -1 ? skuInfo : skuInfo.replace('/n5/', '/n4/')
    },
    // 添加购物车
    addCart () {
      this.skuModel = true
      this.chooseType = '购物车'
    },
    // 立即购买
    addBuy () {
      this.skuModel = true
      this.chooseType = '立即购买'
    },
    // 确定
    goCartFn () {
      let params = {
        goodsId: this.goodsId,
        count: this.stepperVal,
        specId: this.goodSpecId,
        onSaleBank: this.$route.query.onSaleBank
      }
      if (this.chooseType === '购物车') {
        this.postRequest('zlbgroup-front/cart/saveCart', params).then(res => {
          if (res.data.success === true) {
            Toast('已加入购物车')
            this.skuModel = false
          }
        })
      } else {
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
}
</script>

<style lang="less">
  .goods {
    padding-bottom: 50px;
    &-swipe {
      padding-top: 1.2rem;
      height: 10rem;
      img {
        width: 100%;
        display: block;
      }
    }
    &-title {
      font-size: 16px;
    }
    &-price {
      color: #f44;
    }
    &-express {
      color: #999;
      font-size: 12px;
      padding: 5px 15px;
    }
    &-cell-group {
      margin: 15px 0;
      .van-cell__value {
        color: #999;
      }
    }
    &-tag {
      margin-left: 5px;
    }
  }
  .sku-img{width: 2.6rem;height: 2.6rem;background: #f8f8f8;}
  .sku-info{margin-left: 0.5rem;color: #969799;font-size: 0.3rem;}
  .sku-price{font-size: 0.6rem;font-weight: bold;color: #f44;}
  .sku-active{color: #f44;background: #ff00000d !important;}
  .sku-rectangle{padding:0 0.2rem;height: 1rem;margin: 0 12px 12px 0;overflow: hidden;min-width: 1.9444rem;border-radius: 0.1rem;display: inline-flex;justify-content: center;align-items: center;background: #f7f8fa;}
  .phone-button{width: 90%;margin: 0.8rem auto;}
  .parameter-div{width: 90%;margin: 1rem auto;border: 1px solid #dfdfdf;}
  .parameter-left{width: 100%;height: 0.6rem;line-height: 0.6rem;border-bottom: 1px solid #dfdfdf;font-size: 0.3rem;text-align: center;padding: 0.2rem 0;}
  .packingList-tit{font-size: 0.3rem;padding: 0.2rem 0 0.2rem 0.2rem;}
</style>
