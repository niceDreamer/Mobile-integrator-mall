<template>
  <div class="bg-col">
    <NavMeun titleOrSearch="购物车"></NavMeun>

    <div ref="wrapper" style="padding: 1.4rem 0;" v-if="goodsList.length > 0">
      <div class="content">
        <van-swipe-cell v-for="(item, index) in goodsList" :key="index">
          <div style="background: #fff;margin-top: 0.2rem;">
            <div style="font-size: 0.3rem;padding: 0.3rem 0 0 0.4rem;">{{item.storeName}}</div>
              <div style="display: flex;">
                <div style="width: 1rem;background: #fff;">
                  <van-checkbox-group class="card-goods" v-model="checkedGoods">
                    <van-checkbox
                      class="card-goods__item"
                      :key="item.cartId"
                      :name="item.cartId"
                      style="width: 1rem;"></van-checkbox>
                  </van-checkbox-group>
                </div>
                <div class="flex-one">
                  <van-card
                    :price="item.goodsJfPrice"
                    :currency="item.jfUnit"
                    :thumb="(item.goodsFrom == 'JD' ? item.goodsImages : imgServer + item.goodsImages)"
                    style="background-color: #fff;">
                    <div slot="title">
                      <router-link :to="{path:'/commodityInfo', query:{specId: item.specId, onSaleBank: onSaleBank}}"  style="font-size: 0.34rem;font-weight: bold;color: #333;">
                        <div class="beyond-two">{{item.goodsName}}</div>
                      </router-link>
                    </div>
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
          </div>
          <template slot="right">
            <van-button square type="danger" style="height: 3.7rem;" text="删除" @click="delGoods(item.goodsId, item.specId)" />
          </template>
        </van-swipe-cell>
      </div>
    </div>
    <div class="card-null" v-if="goodsList.length <= 0">
      <div class="card-auto">
        <div class="card-div">
          <img src="../../assets/images/card_img.png"/>
        </div>
        <div class="card-text">您的购物车没有商品</div>
      </div>
    </div>

    <van-submit-bar
      :price="totalPrice"
      :label="company"
      currency=""
      :disabled="!checkedGoods.length"
      :button-text="submitBarText"
      @submit="onSubmit"
      style="font-size: 0.4rem;"
    />
  </div>
</template>

<script>
import { Checkbox, CheckboxGroup, Card, SubmitBar, SwipeCell, Button, Stepper, Toast } from 'vant'
import NavMeun from '../../components/NavMeun'
import BScroll from 'better-scroll'

export default {
  name: 'ShoppingCart',
  components: {
    NavMeun,
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup,
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button,
    [Stepper.name]: Stepper,
    [Toast.name]: Toast
  },
  data () {
    return {
      checkedGoods: [],
      goodsList: [],
      stepperNum: '',
      imgServer: '',
      company: '',
      onSaleBank: this.$route.query.onSaleBank
    }
  },
  computed: {
    submitBarText () {
      const count = this.checkedGoods.length
      return '结算' + (count ? `(${count})` : '')
    },
    totalPrice () {
      return this.goodsList.reduce((total, item) => total + (
        this.checkedGoods.indexOf(item.cartId) !== -1 ? (item.goodsJfPrice * item.goodsNum * 100) : 0
      ), 0)
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.postRequest('zlbgroup-front/cart/cart?onSaleBank=' + this.$route.query.onSaleBank).then(res => {
        if (res.data.success === true) {
          this.goodsList = res.data.result.list
          this.imgServer = res.data.imgServer
          if (res.data.result.list.length > 0) {
            this.company = (res.data.result.jfUnit ? res.data.result.jfUnit : '合计') + '：'
            this.$nextTick(() => {
              this._initScroll()
            })
          }
        }
      })
    },
    // 截取2位
    formatPrice (price) {
      return (price / 100).toFixed(2)
    },
    // 删除商品
    delGoods (goodsid, specid) {
      this.postRequest('zlbgroup-front/cart/deleteCart?goodsId=' + goodsid + '&specId=' + specid + '&onSaleBank=' + this.$route.query.onSaleBank).then(res => {
        if (res.data.success === true) {
          Toast('删除成功')
          let that = this
          setTimeout(() => {
            that.init()
          }, 2000)
        }
      })
    },
    // 更新商品数量+加
    increaseInt (cartId, count, specId, goodsId) {
      this.postRequest('zlbgroup-front/cart/updateCartCount?cartId=' + cartId + '&count=' + (count + 1) + '&specId=' + specId + '&goodsId=' + goodsId + '&onSaleBank=' + this.$route.query.onSaleBank).then(res => {
        if (res.data.success === true) {
          console.log(res.data)
        }
      })
    },
    // 更新商品数量-减
    reduceInt (cartId, count, specId, goodsId) {
      this.postRequest('zlbgroup-front/cart/updateCartCount?cartId=' + cartId + '&count=' + (count - 1) + '&specId=' + specId + '&goodsId=' + goodsId + '&onSaleBank=' + this.$route.query.onSaleBank).then(res => {
        if (res.data.success === true) {
          console.log(res.data)
        }
      })
    },
    // 点击结算
    onSubmit () {
      this.postRequest('zlbgroup-front/cart/orderVal?cartIds=' + this.checkedGoods.join(',')).then(res => {
        if (res.data.success === true) {
          this.$router.push({
            name: 'commodityFillOrder',
            query: {
              cartId: this.checkedGoods.join(','),
              onSaleBank: this.$route.query.onSaleBank
            }
          })
        }
      })
    },
    _initScroll () {
      this.leftScroll = new BScroll(this.$refs['wrapper'], {
        click: true
      })
    }
  }
}
</script>

<style lang="less">
  .card-goods {
    background-color: #fff;
    overflow-y: auto;
    &__item {
      background-color: #fff;
      .van-checkbox__label {
        width: 100%;
        height: auto; // temp
        padding: 0 10px 0 15px;
        box-sizing: border-box;
      }
      .van-checkbox__icon {
        top: 50%;
        left: 10px;
        z-index: 1;
        position: absolute;
        margin-top: -10px;
      }
      .van-card__price {
        color: #f44;
      }
    }
  }
  .card-null{width: 100%;height: 100vh;display: flex;justify-content: center;align-items: center;}
  .card-auto{width: 3rem;height: 3rem;text-align: center;}
  .card-div{width: 2rem;height: 2rem;margin: 0 auto;}
  .card-text{font-size: 0.3rem;margin-top: 0.4rem;color: #969696;}
  .van-submit-bar__text span {
    display: initial;
  }
</style>
