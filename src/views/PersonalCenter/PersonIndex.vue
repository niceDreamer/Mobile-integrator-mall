<template>
    <div>
      <NavMeun titleOrSearch="个人中心" leftArrow="false"></NavMeun>
      <div class="bg-col" ref="height" style="padding-top: 1.2rem;">
        <div class="person_bg">
          <div class="person_name">{{name}}，您好！</div>
          <div class="person_num">我的通宝: {{number}}</div>
          <van-button type="default" size="small" class="person_btn" @click="goOut" v-if="status == 1">退出登录</van-button>
          <van-button type="default" size="small" class="person_btn" @click="goLogin" v-if="status == 0">立即登录</van-button>
        </div>

        <van-cell-group class="margin-top-10">
          <router-link :to="{path: '/', query: {onSaleBank: onSaleBank}}">
            <van-cell title="返回首页" icon="wap-home" is-link />
          </router-link>
          <router-link :to="{path: '/OrderList', query: {onSaleBank: onSaleBank}}">
            <van-cell title="我的订单" icon="balance-list-o" is-link />
          </router-link>
          <router-link :to="{path: '/cart', query: {onSaleBank: onSaleBank}}">
            <van-cell title="购物车" icon="cart-o" is-link />
          </router-link>
          <router-link :to="{path: '/InterworkingIndex', query: {onSaleBank: onSaleBank}}">
            <van-cell title="积分互通" icon="refund-o" is-link />
          </router-link>
          <router-link :to="{path: '/myIntegral', query: {onSaleBank: onSaleBank}}">
            <van-cell title="我的积分钱包" icon="bill-o" is-link />
          </router-link>
          <router-link :to="{path: '/selectAddress', query: {onSaleBank: onSaleBank}}">
            <van-cell title="地址管理" icon="description" is-link />
          </router-link>
          <van-cell title="联系我们" icon="manager-o" value="400-665-4818" @click="callPhone" />
        </van-cell-group>
      </div>
    </div>
</template>

<script>
import { Button, Cell, CellGroup } from 'vant'
import NavMeun from '../../components/NavMeun'
import Cookie from 'js-cookie'

export default {
  name: 'PersonIndex',
  components: {
    NavMeun,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  data () {
    return {
      name: '亲爱的',
      number: '0',
      status: '0',
      onSaleBank: this.$route.query.onSaleBank
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (Cookie.get('userInfo')) {
        let userInfo = JSON.parse(Cookie.get('userInfo'))
        this.name = userInfo.memberName
        this.status = '1'
        this.postRequest('zlbgroup-front/m/point/queryPoint').then(res => {
          if (res.data.success === true) {
            let status = res.data.jfBalance
            for (let i = 0; i < status.length; i++) {
              if (status[i].creditTypeId === '1') {
                this.number = status[i].creditBalance
              }
            }
          }
        })
      } else {
        this.status = '0'
      }
    },
    // 重新登陆
    goLogin () {
      // 跳转登陆页
      this.$router.replace({
        name: 'login',
        query: {
          onSaleBank: this.$route.query.onSaleBank
        }
      })
    },
    // 退出账号
    goOut () {
      this.postRequest('zlbgroup-front/m/logoutApp').then(res => {
        if (res.data.success === true) {
          // 退出登陆清除用户信息
          Cookie.remove('userInfo')
          this.$router.push({
            name: 'index',
            query: {
              onSaleBank: this.$route.query.onSaleBank
            }
          })
        }
      })
    },
    // 拨打电话
    callPhone () {
      window.location.href = 'tel://400-665-4818'
    }
  }
}
</script>

<style scoped>
.person_bg{width: 100%;height: 3rem;background: url('../../assets/images/swiper01.png') no-repeat;background-size: cover;background-position: 100%;color: #fff;text-align: center;}
.person_name{font-size: 0.6rem;font-weight: bold;padding-top: 0.4rem;}
.person_num{font-size: 0.4rem;}
.person_btn{float:right;margin-right: 0.4rem;color: #666;}
</style>
