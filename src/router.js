import Vue from 'vue'
import Router from 'vue-router'
/* 首页 */
import Index from './views/Index.vue'
/* 登陆 */
import Login from '@/views/LoginInfo/Login.vue'
/* 注册 */
import LoginRegister from '@/views/LoginInfo/LoginRegister.vue'
/* 专题页1 */
import ThematicPagesOne from '@/components/ThematicPages_one.vue'
/* 专题页2 */
import ThematicPagesTwo from '@/components/ThematicPages_two.vue'
/* 话费流量 */
import TelephoneFlow from '@/views/CommodityInfo/TelephoneFlow.vue'
/* 油卡充值 */
import OilCard from '@/views/CommodityInfo/OilCard.vue'
/* 虚拟商品 */
import VirtualCard from '@/views/CommodityInfo/VirtualCard.vue'
/* 虚拟商品 */
import VirtualCardInfo from '@/views/CommodityInfo/VirtualCardInfo.vue'
/* 商品详情 */
import CommodityInfo from '@/views/CommodityInfo/CommodityInfo.vue'
/* 虚拟商品详情 */
import VirtualgoodsInfo from '@/views/CommodityInfo/VirtualgoodsInfo.vue'
/* 商品详情->填写订单 */
import CommodityFillOrder from '@/views/CommodityInfo/CommodityFillOrder.vue'
/* 商品购物车 */
import ShoppingCart from '@/views/CommodityInfo/ShoppingCart.vue'
/* 商品分类 */
import GoodsClassification from '@/views/CommodityInfo/GoodsClassification.vue'
/* 输入地址 */
import InputAddress from '@/views/CommodityInfo/InputAddress.vue'
/* 选择地址 */
import SelectAddress from '@/views/CommodityInfo/SelectAddress.vue'
/* 商品列表 */
import GoodsList from '@/views/CommodityInfo/GoodsList.vue'
/* 个人中心 */
import PersonIndex from '@/views/PersonalCenter/PersonIndex.vue'
/* 我的积分 */
import MyIntegral from '@/views/PersonalCenter/MyIntegral.vue'
/* 支付方式 */
import PayMentType from '@/views/Payment/PayMentType.vue'
/* 短信支付方式 */
import PayIphoneType from '@/views/Payment/PayIphoneType.vue'
/* 支付宝支付 */
import ApplyPay from '@/views/Payment/ApplyPay.vue'
/* 支付提示 */
import PayInfo from '@/views/Payment/PayInfo.vue'
/* 订单列表 */
import OrderList from '@/views/Order/OrderList.vue'
/* 订单列表详情 */
import OrderListInfo from '@/views/Order/OrderListInfo.vue'
/* 订单列表详情 */
import OrderLogistics from '@/views/Order/OrderLogistics.vue'
/* 积分互通 */
import InterworkingIndex from '@/views/Interworking/InterworkingIndex.vue'
/* 爱心卡 */
import ExchangeLoveCard from '@/views/Interworking/ExchangeLoveCard.vue'
/* 广发卡 */
import ExchangeGuangFa from '@/views/Interworking/ExchangeGuangFa.vue'
/* 查询兑换记录 */
import ExchangeList from '@/views/Interworking/ExchangeList.vue'
/* 积分公益 */
import WelfareList from '@/views/PublicWelfare/WelfareList.vue'
/* 公益基金 */
import WelfareFund from '@/views/PublicWelfare/WelfareFund.vue'
/* 基金捐赠记录 */
import FundContributions from '@/views/PublicWelfare/FundContributions.vue'
/* 基金说明 */
import FundStatement from '@/views/PublicWelfare/FundStatement.vue'
/* 基金动态 */
import FundDynamics from '@/views/PublicWelfare/FundDynamics.vue'
/* 项目详情 */
import ProjectDetails from '@/views/PublicWelfare/ProjectDetails.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/loginRegister',
      name: 'loginRegister',
      component: LoginRegister
    },
    {
      path: '/thematicPages_one',
      name: 'thematicPages_one',
      component: ThematicPagesOne
    },
    {
      path: '/thematicPages_two',
      name: 'thematicPages_two',
      component: ThematicPagesTwo
    },
    {
      path: '/telephoneFlow',
      name: 'telephoneFlow',
      component: TelephoneFlow,
      meta: {
        type: 'login'
      }
    },
    {
      path: '/oilCard',
      name: 'oilCard',
      component: OilCard
    },
    {
      path: '/virtualCard',
      name: 'virtualCard',
      component: VirtualCard
    },
    {
      path: '/virtualCardInfo',
      name: 'virtualCardInfo',
      component: VirtualCardInfo
    },
    {
      path: '/commodityInfo',
      name: 'commodityInfo',
      component: CommodityInfo
    },
    {
      path: '/virtualgoodsInfo',
      name: 'virtualgoodsInfo',
      component: VirtualgoodsInfo
    },
    {
      path: '/commodityFillOrder',
      name: 'commodityFillOrder',
      component: CommodityFillOrder,
      meta: {
        type: 'login'
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: ShoppingCart,
      meta: {
        type: 'login'
      }
    },
    {
      path: '/goodsClassification',
      name: 'goodsClassification',
      component: GoodsClassification
    },
    {
      path: '/inputAddress',
      name: 'inputAddress',
      component: InputAddress
    },
    {
      path: '/selectAddress',
      name: 'selectAddress',
      component: SelectAddress
    },
    {
      path: '/goodsList',
      name: 'goodsList',
      component: GoodsList
    },
    {
      path: '/personIndex',
      name: 'personIndex',
      component: PersonIndex
    },
    {
      path: '/myIntegral',
      name: 'myIntegral',
      component: MyIntegral
    },
    {
      path: '/payMentType',
      name: 'payMentType',
      component: PayMentType
    },
    {
      path: '/payIphoneType',
      name: 'payIphoneType',
      component: PayIphoneType
    },
    {
      path: '/applyPay',
      name: 'applyPay',
      component: ApplyPay
    },
    {
      path: '/payInfo',
      name: 'payInfo',
      component: PayInfo
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: OrderList,
      meta: {
        type: 'login'
      }
    },
    {
      path: '/orderListInfo',
      name: 'orderListInfo',
      component: OrderListInfo
    },
    {
      path: '/orderLogistics',
      name: 'orderLogistics',
      component: OrderLogistics
    },
    {
      path: '/interworkingIndex',
      name: 'interworkingIndex',
      component: InterworkingIndex
    },
    {
      path: '/exchangeLoveCard',
      name: 'exchangeLoveCard',
      component: ExchangeLoveCard,
      meta: {
        type: 'login'
      }
    },
    {
      path: '/exchangeGuangFa',
      name: 'exchangeGuangFa',
      component: ExchangeGuangFa
    },
    {
      path: '/exchangeList',
      name: 'exchangeList',
      component: ExchangeList
    },
    {
      path: '/welfareList',
      name: 'welfareList',
      component: WelfareList
    },
    {
      path: '/welfareFund',
      name: 'welfareFund',
      component: WelfareFund
    },
    {
      path: '/fundContributions',
      name: 'fundContributions',
      component: FundContributions
    },
    {
      path: '/fundStatement',
      name: 'fundStatement',
      component: FundStatement
    },
    {
      path: '/fundDynamics',
      name: 'fundDynamics',
      component: FundDynamics
    },
    {
      path: '/projectDetails',
      name: 'projectDetails',
      component: ProjectDetails
    }
  ],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
