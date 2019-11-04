<template>
  <div>
    <Ske v-if="skeShow"></Ske>
    <div v-if="!skeShow">
      <van-nav-bar :title="index_nav" v-if="onSaleBank != 'ZLB'">
        <div slot="right">
          <router-link :to="{path:'/goodsList', query:{keyword: '', onSaleBank: onSaleBank}}">
            <van-icon name="search" color="#333" size="0.8rem" />
          </router-link>
        </div>
      </van-nav-bar>
      <van-row type="flex" justify="center" class="nav-title" v-if="onSaleBank == 'ZLB'">
        <van-col span="14" style="text-align: left;">
          <img src="../assets/images/logo-icon.png" style="width: 4rem;height: 1.2rem;"/>
        </van-col>
        <van-col span="8" style="text-align: right;padding-top: 0.2rem;">
          <router-link :to="{path:'/goodsList', query:{keyword: '', onSaleBank: onSaleBank}}">
            <van-icon name="search" color="#fff" size="0.8rem" />
          </router-link>
        </van-col>
      </van-row>
      <div :style="onSaleBank == 'ZLB' ? {paddingTop: '1.2rem'} : ''">

        <div class="wrapper">
          <div class="content">
            <div style="position: relative;">
              <van-swipe :autoplay="3000" style="height: 5rem;">
                <van-swipe-item v-for="(item, index) in index_swipe" :key="index">
                  <router-link :to="{path: item.advUrl, query:{goodsId: item.goodsId}}">
                    <img v-lazy="item.resUrl" />
                  </router-link>
                </van-swipe-item>
              </van-swipe>
              <div class="box-shadowInset" style="display: flex;position: relative;">
                <img src="../assets/images/login_peopleIcon.png" class="login-icon" />
                <span class="login-title" v-if="!username"  @click="loginGo">欢迎来到招来宝商城，请您先登录！</span>
                <span class="login-title" v-if="username">
                  <router-link style="color: #676767;" :to="{path:'/personIndex', query:{onSaleBank: onSaleBank}}">
                    {{username}}
                  <span style="margin-left: 0.3rem;">
                    <span class="border-div"></span>
                      <img src="../assets/images/gold-ingot.png" class="goldImg" />我的通宝：{{integral}}
                  </span>
                  </router-link>
                </span>
                <img src="../assets/images/login_rightIcon.png" class="login-icon" />
              </div>
            </div>

            <!--二级分类列表-->
            <div class="hm-content">
              <ul class="category cm-flex" style="flex-wrap:wrap;">
                <li style="width: 20%;" v-for="(item, index) in index_icon" :key="index">
                  <a v-if="item.sort == 6" :href="item.advUrl" style="color: #333333;">
                    <div>
                      <img v-lazy="item.resUrl" />
                      <span>{{item.advTitle}}</span>
                    </div>
                  </a>
                  <router-link v-if="item.sort != 6" :to="{path:item.advUrl, query: item.sort===1?{searchType: 'gcIdSearch', keyword: '49a12c683d9e462e9a15b2e2bc47a924', onSaleBank: onSaleBank}:{onSaleBank: onSaleBank}}" style="color: #333333;">
                    <div>
                      <img v-lazy="item.resUrl" />
                      <span>{{item.advTitle}}</span>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>

            <!--热门兑换-->
            <div class="comm-middle-hint">
              <!--标题-->
              <div class="comm-div">
                <div class="comm-div-child">
                  <label class="comm-div-child-tit">热门兑换</label>
                  <label class="comm-div-child-label"><i></i>当季上新推荐</label>
                </div>
                <div class="comm-div-child-move">
                  <router-link style="color: #908f8f;" :to="{path:'/goodsList', query:{searchType: 'goodsTagIdsSearch', keyword: 'tag-rmdh', onSaleBank: onSaleBank}}">
                    更多>
                  </router-link>
                </div>
              </div>
              <!--商品-->
              <div class="comm-div-child-activity">
                <!--left-->
                <div class="comm-div-child-activity-left-div">
                  <!--left-top-->
                  <router-link :to="{path:index_hot_one.advUrl}">
                    <div class="comm-div-child-activity-left-top">
                      <div class="comm-left-top">
                        <div class="comm-left-top-left">
                          <div class="comm-div-info-tit">品优生活</div>
                          <div class="comm-div-info-titChild">{{index_hot_one.advTitle}}</div>
                        </div>
                        <div class="comm-div-info-left-img">
                          <img v-lazy="index_hot_one.resUrl" />
                        </div>
                      </div>
                    </div>
                  </router-link>
                  <!--left-bottom-->
                  <div class="comm-div-child-activity-left-bottom">
                    <router-link class="comm-div-child-activity-left-bLeft" :to="{path:index_hot_two.advUrl}">
                      <div class="comm-div-padding">
                        <div class="comm-div-info-tit">运动潮流</div>
                        <div class="comm-div">
                          <div class="comm-div-info-titChilds">{{index_hot_two.advTitle}}</div>
                          <div class="comm-div-info-left-bottom-img">
                            <img v-lazy="index_hot_two.resUrl" />
                          </div>
                        </div>
                      </div>
                    </router-link>
                    <router-link class="comm-div-child-activity-left-bRight" :to="{path:index_hot_three.advUrl}">
                      <div class="comm-div-padding">
                        <div class="comm-div-info-tit">食品饮料</div>
                        <div class="comm-div">
                          <div class="comm-div-info-titChilds">{{index_hot_three.advTitle}}</div>
                          <div class="comm-div-info-left-bottom-img">
                            <img v-lazy="index_hot_three.resUrl" />
                          </div>
                        </div>
                      </div>
                    </router-link>
                  </div>
                </div>
                <!--right-->
                <router-link :to="{path:index_hot_four.advUrl}">
                  <div class="comm-div-child-activity-right-div">
                    <div class="comm-div-info-right-tit">
                      <div class="comm-div-info-tit">宝洁/联合利华</div>
                      <div class="comm-div-info-titChild">{{index_hot_four.advTitle}}</div>
                      <div class="comm-div-info-right-img">
                        <img v-lazy="index_hot_four.resUrl" />
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>

              <div class="comm-justify-div">
                <div class="comm-justify-center" v-for="(item, index) in index_hot_list" :key="index">
                  <div class="comm-justify-img">
                    <img v-lazy="item.goodsImage" />
                  </div>
                  <div class="comm-justify-tit">{{item.goodsName}}</div>
                  <div class="comm-justify-num">{{item.goodsPrice}}</div>
                </div>
              </div>
            </div>

            <!--特惠商品-->
            <div class="comm-middle-hint" v-if="this.index_prefer_swipe && this.index_prefer_swipe.length > 0">
              <!--标题-->
              <div class="comm-div">
                <div class="comm-div-child">
                  <label class="comm-div-child-tit">特惠商品</label>
                  <label class="comm-div-child-label"><i></i>今日限时特卖</label>
                </div>
                <div class="comm-div-child-move">
                  <router-link style="color: #908f8f;" :to="{path:'/goodsList', query:{searchType: 'goodsTagIdsSearch', keyword: 'tag-thsp', onSaleBank: onSaleBank}}">
                    更多>
                  </router-link>
                </div>
              </div>
              <div class="goods-list">
                <div class="comm-swiper-div">
                  <van-swipe :autoplay="3000" style="height: 3rem;">
                    <van-swipe-item v-for="(item, index) in index_prefer_swipe" :key="index">
                      <router-link :to="{path:'/commodityInfo', query:{specId: item.goodsSpecid, onSaleBank: onSaleBank}}">
                        <img v-lazy="item.goodsImage" />
                      </router-link>
                    </van-swipe-item>
                  </van-swipe>
                </div>
              </div>

              <div class="comm-justify-div">
                <div class="comm-justify-center" v-for="(item, index) in index_prefer_list" :key="index">
                  <router-link :to="{path:'/commodityInfo', query:{specId: item.goodsSpecid, onSaleBank: onSaleBank}}">
                    <div class="comm-justify-img">
                      <img v-lazy="item.goodsImage" />
                    </div>
                    <div class="comm-justify-tit beyond-two">{{item.goodsTitle}}</div>
                    <div class="comm-justify-num">{{item.goodsPrice}}{{item.goodsUnit}}</div>
                  </router-link>
                </div>
              </div>
            </div>

            <!--京东优选-->
            <div class="comm-middle-hint" v-if="this.index_jd_swipe && this.index_jd_swipe.length > 0">
              <!--标题-->
              <div class="comm-div">
                <div class="comm-div-child">
                  <label class="comm-div-child-tit">京东优选</label>
                  <label class="comm-div-child-label"><i></i>正品行货</label>
                </div>
                <div class="comm-div-child-move">
                  <router-link style="color: #908f8f;" :to="{path:'/goodsList', query:{searchType: 'goodsTagIdsSearch', keyword: 'tag-jdyx', onSaleBank: onSaleBank}}">
                    更多>
                  </router-link>
                </div>
              </div>
              <div class="goods-list">
                <div class="comm-swiper-div">
                  <van-swipe :autoplay="3000" style="height: 3rem;">
                    <van-swipe-item v-for="(item, index) in index_jd_swipe" :key="index">
                      <router-link :to="{path: item.advUrl, query:{specId: item.goodsSpecid, onSaleBank: onSaleBank}}">
                        <img v-lazy="item.resUrl" />
                      </router-link>
                    </van-swipe-item>
                  </van-swipe>
                </div>
              </div>

              <div class="comm-justify-div">
                <div class="comm-justify-center" v-for="(item, index) in index_jd_list" :key="index">
                  <router-link :to="{path:'/commodityInfo', query:{specId: item.goodsSpecid, onSaleBank: onSaleBank}}">
                    <div class="comm-justify-img">
                      <img v-lazy="item.goodsImage" />
                    </div>
                    <div class="comm-justify-tit beyond-two">{{item.goodsTitle}}</div>
                    <div class="comm-justify-num">{{item.goodsPrice}}{{item.goodsUnit}}</div>
                  </router-link>
                </div>
              </div>
            </div>

            <!--虚拟卡卷-->
            <div class="comm-middle-hint" v-if="this.index_virtual_list && this.index_virtual_list.length > 0">
              <!--标题-->
              <div class="comm-div">
                <div class="comm-div-child">
                  <label class="comm-div-child-tit">虚拟卡卷</label>
                  <label class="comm-div-child-label"><i></i>影音美食生活</label>
                </div>
                <div class="comm-div-child-move">
                  <router-link style="color: #908f8f;" :to="{path:'/VirtualCard', query:{searchType: 'goodsTagIdsSearch', keyword: 'tag-xnkq', onSaleBank: onSaleBank}}">
                    更多>
                  </router-link>
                </div>
              </div>
              <div class="comm-justify-div">
                <div class="comm-justify-center" v-for="(item, index) in index_virtual_list" :key="index">
                  <router-link :to="{path:'/virtualgoodsInfo', query:{goodsId: item.goodsId, onSaleBank: onSaleBank}}">
                    <div class="comm-justify-img">
                      <img v-lazy="item.goodsImage" />
                    </div>
                    <div class="comm-justify-tit beyond-two">{{item.goodsTitle}}</div>
                    <div class="comm-justify-num">{{item.goodsPrice}}{{item.goodsUnit}}</div>
                  </router-link>
                </div>
              </div>
            </div>

            <!--专区分类-->
            <div class="comm-middle-hint" v-if="this.index_specialized_list && this.index_specialized_list.length > 0">
              <!--标题-->
              <div class="comm-div">
                <div class="comm-div-child">
                  <label class="comm-div-child-tit">专区分类</label>
                </div>
              </div>
              <div class="comm-justify-div">
                <div class="comm-justify-center" v-for="(item, index) in index_specialized_list" :key="index">
                  <router-link :to="{path:'/goodsList', query:{searchType: 'priceScopeSearch', keyword: typeStatusFn(index), onSaleBank: onSaleBank}}">
                    <div class="comm-justify-num">{{item.advTitle}}</div>
                    <div class="comm-justify-tit beyond-two">通宝专区></div>
                    <div class="comm-justify-img goods-list">
                      <img v-lazy="item.resUrl" />
                    </div>
                  </router-link>
                </div>
              </div>
            </div>

            <!--更多推荐-->
            <div class="comm-middle-hint">
              <!--标题-->
              <div class="comm-div">
                <div class="comm-div-child">
                  <label class="comm-div-child-tit">更多推荐</label>
                </div>
              </div>
              <div class="goods-list clear"> <!--加上可避免切换时图片晃-->
                <div class="hm-list cm-flex" style="flex-wrap:wrap">
                  <div  style="width: 46%;margin:2%;background: #fff;box-shadow: 2px 0px 6px #cecece;border-radius: 0.2rem;" v-for="(item, index) in index_more_list" :key="index">
                    <router-link :to="{path:'/commodityInfo', query:{specId: item.goodsSpecid, onSaleBank: onSaleBank}}">
                      <div style="padding:0">
                        <img v-lazy="item.goodsImage" class="comm-move-img">
                        <div  class="comm-move-div">
                          <div class="goods-name aui-ellipsis-2 comm-move-title beyond-two">{{item.goodsTitle}}</div>
                          <div class="hm-list-price cm-flex comm-move-num">
                            <div class="comm-move-num-div">
                              <span>{{item.goodsPrice}}{{item.goodsUnit}}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="loading-wrapper"></div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { Row, Col, Swipe, SwipeItem, Lazyload, Icon, NavBar } from 'vant'
import Ske from '../components/Skeleton'
import Cookie from 'js-cookie'

export default {
  name: 'home',
  components: {
    Ske,
    [Row.name]: Row,
    [Col.name]: Col,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Lazyload.name]: Lazyload,
    [Icon.name]: Icon,
    [NavBar.name]: NavBar
  },
  data () {
    return {
      // 骨架屏
      skeShow: false,
      // nav头部
      index_nav: '',
      // "H5_首页-顶部轮播图"
      index_swipe: [],
      // 用户名
      username: '',
      // 通宝
      integral: 0,
      // 商品渠道
      onSaleBank: this.$route.query.onSaleBank ? this.$route.query.onSaleBank : 'ZLB',
      // "H5_首页-ICON"
      index_icon: [],
      // "H5_首页-热门兑换"
      index_hot_one: [],
      index_hot_two: [],
      index_hot_three: [],
      index_hot_four: [],
      index_hot_list: [],
      // "H5_首页-特惠商品"
      index_prefer_swipe: [],
      index_prefer_list: [],
      // "H5_首页-京东优选"
      index_jd_swipe: [],
      index_jd_list: [],
      // "H5_首页-虚拟卡券"
      index_virtual_list: [],
      // "H5_首页-专区分类"
      index_specialized_list: [],
      // "H5_首页-更多推荐"
      index_more_list: [],
      // 分类区间
      typeStatus: ['1,200', '200,500', '500,1000', '1000']
    }
  },
  created () {
    this.init()
    this.loadData()
  },
  methods: {
    // 判断是否登陆
    init () {
      let params = {
        onSaleBank: this.onSaleBank
      }
      this.postRequest('zlbgroup-front/m/userLogin', params).then(res => {
        if (res.data.success === true) {
          this.username = res.data.data.memberName
          this.$store.dispatch('setLogin', res.data.data)
          Cookie.set('userInfo', JSON.stringify(res.data.data))
          Cookie.set('onSaleBank', this.onSaleBank)
        }
      })
      this.payMent()
    },
    payMent () {
      this.postRequest('zlbgroup-front/m/point/queryPoint').then(res => {
        if (res.data.success === true) {
          let status = res.data.jfBalance
          for (let i = 0; i < status.length; i++) {
            if (status[i].creditTypeId === '1') {
              this.integral = status[i].creditBalance
            }
          }
        }
      })
    },
    loginGo () {
      if (!this.username) {
        this.$router.push({
          name: 'login',
          query: {
            onSaleBank: this.onSaleBank
          }
        })
      }
    },
    loadData () {
      this.postRequest('zlbgroup-front/website/page_show/m/details/' + (this.onSaleBank === 'ZLB' ? '' : this.onSaleBank + '_') + 'H5_INDEX').then(res => {
        if (res && res.data.success === true) {
          setTimeout(() => {
            this.skeShow = false
          }, 3000)
          let indexData = res.data.data
          // "H5_首页-顶部轮播图"
          this.index_swipe = indexData.floorList[0].advPosition[0].advList
          // "H5_首页-ICON"
          this.index_icon = indexData.floorList[1].advPosition[0].advList
          // "H5_首页-热门兑换"
          this.index_hot_one = indexData.floorList[2].advPosition[0].advList[0]
          this.index_hot_two = indexData.floorList[2].advPosition[0].advList[1]
          this.index_hot_three = indexData.floorList[2].advPosition[0].advList[2]
          this.index_hot_four = indexData.floorList[2].advPosition[0].advList[3]
          // this.index_hot_list = indexData.floorList[2].goodsPosition[0].goodsList
          // "H5_首页-特惠商品"
          this.index_prefer_swipe = indexData.floorList[3].productPosition[0].advList
          this.index_prefer_list = indexData.floorList[3].productPosition[1].advList
          // "H5_首页-京东优选"
          this.index_jd_swipe = indexData.floorList[4].advPosition[0].advList
          this.index_jd_list = indexData.floorList[4].productPosition[0].advList
          // "H5_首页-虚拟卡券"
          this.index_virtual_list = indexData.floorList[5].productPosition[0].advList
          // "H5_首页-专区分类"
          this.index_specialized_list = indexData.floorList[6].advPosition[0].advList
          // "H5_首页-更多推荐"
          this.index_more_list = indexData.floorList[7].productPosition[0].advList
          // "H5_首页-顶楼"
          this.index_nav = indexData.floorList[8].advPosition[0].advList[0].advTitle
        }
      })
    },
    typeStatusFn (index) {
      return this.typeStatus[index]
    }
  }
}
</script>

<style lang="less">
  /* 商品card */
  .goods-list {
    margin-top: 0.3rem;
  }

  .goods-list .goods-item {
    width: 5rem;
    float: left;
  }

  .goods-list .goods-item .goods-item-image img {
    width: 100%;
  }
  .category {
    overflow: hidden;
    background: #fff;
    padding-bottom:0.27rem;
    li {
      padding: 0.27rem 0 0;
      box-sizing: border-box;
      text-align: center;
      font-size: 0.32rem;
      color: #333333;
    }
    img {
      width: 50%;
      min-width: 1.01rem;
      max-width: 1.92rem;
      display: block;
      margin: 0 auto;
    }
  }
  .search-btn {
    line-height: 1.07rem;
    padding: 0 0.27rem;
    text-align: center;
    display: inline-block;
  }

  .search-btn i {
    font-size: 0.59rem;
    color: #333;
  }
  .nav-title{width:100%;height:1.2rem;background: #e92b32;position: fixed;z-index: 1000;}
  .box-shadowInset{width: 90%;height: 1rem;line-height:1rem;margin: 0 auto;background: #fff;box-shadow: 3px 1px 10px #cecece,inset 1px 0px 16px #cecece;;position: relative;bottom: 10px;z-index: 9;border-radius: 6px;}
  .login-icon{width: 22px;height: 22px;margin: 8px;}
  .login-title{font-size: 0.36rem;text-align:center;flex: 1;color: rgb(103, 103, 103);}
  .comm-middle-hint {background-color: #fff;padding: 0.3rem;height: auto;overflow: hidden;margin-top: 0.27rem;text-align: left;}
  .comm-div{display: flex;}
  .comm-div-padding{padding: 0.2rem;}
  .comm-div-child{width: 50%;}
  .comm-div-child-tit{font-weight: bold;font-size: 0.4rem;}
  .comm-div-child-label{font-size: 0.3rem;color: #908f8f;}
  .comm-div-child-label i{content: '';display: inline-block;width: 6px;height: 6px;background-color: #cecece;vertical-align: middle;margin: 8px;border-radius: 6px;}
  .comm-div-child-move{flex: 1;text-align: right;color: #908f8f;font-size: 0.3rem;padding-top:0.1rem;}
  .comm-div-child-activity{display: flex;margin-top: 0.3rem;}
  .comm-div-child-activity-left-div{flex: 2;}
  .comm-div-child-activity-left-top{width: 100%;height: 2rem;margin-bottom: 0.2rem;border-radius: 6px;background: #fbf9f8;}
  .comm-div-child-activity-left-bottom{width: 100%;height: 2rem;display: flex;}
  .comm-div-child-activity-left-bLeft{flex: 1;margin-right: 0.2rem;border-radius: 6px;background: #fef6f0;}
  .comm-div-child-activity-left-bRight{flex: 1;border-radius: 6px;background: #fcf9e2;}
  .comm-left-top{display: flex;padding: 0.2rem;}
  .comm-left-top-left{flex:1;justify-content:space-between;padding: 0.2rem;}

  .comm-div-info-tit{font-weight: bold;font-size: 0.4rem;color: #2c3e50;}
  .comm-div-info-titChild{color: #908f8f;font-size: 0.3rem;}
  .comm-div-info-titChilds{color: #908f8f;flex: 1;font-size: 0.3rem;}
  .comm-div-info-left-img{width: 1.6rem;height: 1.6rem;}
  .comm-div-info-left-bottom-img{width: 1rem;height: 1rem;margin-top: 0.1rem;}
  .comm-div-info-right-img{width: 2rem;height: 2.4rem;position: absolute;bottom: 0.2rem;right: 0.2rem;}
  .comm-div-info-right-tit{padding: 0.2rem;text-align: right;}

  .comm-justify-div{display: flex;margin-top: 0.3rem;}
  .comm-justify-center{flex: 1;text-align: center;}
  .comm-justify-img{width: 1.4rem;height: 1.6rem;margin: 0 auto;}
  .comm-justify-img img{width: 100%;height: 100%;}
  .comm-justify-tit{font-weight: bold;font-size:0.3rem;color: #605e69;margin-top: 0.2rem;line-height: 0.3rem;height: 0.59rem;}
  .comm-justify-num{color: #ff5839;font-weight: bold;font-size: 0.3rem;margin-top: 0.2rem;}

  .comm-swiper-div{width: 100%;margin: 0 auto;height: 3rem;border-radius:0.2rem;box-shadow: 1px 0px 8px #cecece;}
  .comm-swiper-height{height:3rem;border-radius: 0.2rem;}
  .comm-swiper-height img{background-color:#ffffff; width:100%;height: 100%;}

  .comm-div-child-activity-right-div{height: 4.2rem; flex: 1;margin-left: 0.2rem;border-radius: 6px;background: #f3f8fc;position: relative;}

  .comm-move-img{width: 100%;height:100%;border-top-left-radius: 0.2rem;border-top-right-radius: 0.2rem;}
  .comm-move-div{padding:.13rem .08rem .13rem .08rem;}
  .comm-move-title{height:1.17rem; line-height:.59rem; font-size:.37rem; color:#333;}
  .comm-move-num{margin-top:.07rem;justify-content: space-between;}
  .comm-move-num-div{color: #ee2e3a;font-weight: 700;}
  .comm-move-num-div span{font-size: 0.3rem;}
  .goldImg{width: 0.3rem;height: 0.3rem;vertical-align: middle;margin: 0 0.2rem 0 0.3rem;}
  .border-div{position: absolute;top: 0.2rem;width: 1px;height: 0.6rem;background: #ebedf0;}
</style>
