<template>
    <div style="width:100%;background: #f9f9f9;position: fixed;z-index: 99999;">
      <!--标题-->
      <van-nav-bar
        v-if="isSearch"
        :title="titleOrSearch"
        :left-arrow="leftArrows"
        @click-left="onClickLeft"
        @click-right="onClickRight"
        style="box-shadow: 0px 3px 10px #cecece;">
        <van-icon name="wap-nav" slot="right" size="0.6rem" />
      </van-nav-bar>
      <!--搜索框-->
      <div v-if="!isSearch" class="nav-search">
        <div class="nav-search-left" @click="onClickLeft"><van-icon name="arrow-left" size="0.6rem" style="color: #999;" /></div>
        <div style="flex: 1;"><van-search placeholder="请输入搜索关键词" shape="round" onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" @input="onSearch" /></div>
        <div class="nav-search-right" @click="onClickRight"><van-icon name="wap-nav" size="0.6rem" /></div>
      </div>
      <!--菜单-->
      <div class="nav-div" v-show="isNav">
        <div class="nav-li" @click="goIndex">
          <van-icon name="wap-home" size="0.5rem" />
          <div>首页</div>
          <span></span>
        </div>
        <div class="nav-li" @click="goShopCart">
          <van-icon name="shopping-cart-o" size="0.5rem" />
          <div>购物车</div>
          <span></span>
        </div>
        <div class="nav-li" @click="goPerson">
          <van-icon name="contact" size="0.5rem" />
          <div>我的</div>
        </div>
      </div>
    </div>
</template>

<script>
import { NavBar, Icon, Search } from 'vant'
import Cookie from 'js-cookie'

export default {
  name: 'NavMeun',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Search.name]: Search
  },
  props: ['titleOrSearch', 'leftArrow'],
  data () {
    return {
      isNav: false,
      isSearch: true,
      leftArrows: true
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.titleOrSearch) {
        this.isSearch = true
      } else {
        this.isSearch = false
      }
      if (this.leftArrow) {
        this.leftArrows = false
      } else {
        this.leftArrows = true
      }
    },
    // 点击搜索
    onSearch (val) {
      // 判断是否是特殊字符
      let reg = new RegExp('^[A-Za-z0-9\u4e00-\u9fa5]+$')
      if (!reg.test(val)) {
        return false
      } else {
        this.$emit('searchClick', val)
      }
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {
      this.isNav = !this.isNav
    },
    goIndex () {
      // 首页
      this.$router.push({
        name: 'index',
        query: {
          onSaleBank: Cookie.get('onSaleBank')
        }
      })
    },
    goShopCart () {
      // 购物车
      this.$router.push({
        name: 'cart',
        query: {
          onSaleBank: Cookie.get('onSaleBank')
        }
      })
    },
    goPerson () {
      // 个人中心
      this.$router.push({
        name: 'personIndex',
        query: {
          onSaleBank: Cookie.get('onSaleBank')
        }
      })
    }
  }
}
</script>

<style scoped>
.van-nav-bar .van-icon{
  color: #999 !important;
}
.van-nav-bar__arrow{
  font-size: 0.6rem !important;
}
.nav-div{
  display: flex;transform: translate3d(0,0,0);width: 100%;overflow: hidden;background: #404040;text-align: center;
}
.nav-li{
  flex: 1;
  color: #fff;
  font-size: 0.3rem;
  padding: 0.1rem 0;
  position: relative;
}
.nav-li span{
  position: absolute;
  top: 0.3rem;
  right: -1px;
  width: 1px;
  height: 0.6rem;
  background: #404042;
  border-left: 1px solid #363536;
  border-right: 1px solid #595959;
}
.nav-search{display: flex;background: #fff;box-shadow: 0px 3px 10px #cecece;}
.nav-search-left{display: flex;justify-content: center;align-items: center;color: #999;margin-left: 0.4rem;}
.nav-search-right{display: flex;justify-content: center;align-items: center;color: #999;margin-right: 0.4rem;}
</style>
