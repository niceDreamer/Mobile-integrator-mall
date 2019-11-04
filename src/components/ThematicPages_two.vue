<template>
    <div class="page-bg">
      <div class="page-top">
        <img v-lazy="topImg" >
        <div onclick="javascript:history.back()">
          <van-icon name="arrow-left" class="icon" />
        </div>
      </div>

      <div style="width: 100%; margin: 0 auto;">
        <div class="page-div">
          <div v-for="(item, index) in goodOne" :key="index">
            <a v-lazy:background-image="goodBgImg">
              <router-link :to="{path:'/commodityInfo', query:{goodsId: item.goodsId}}">
                <img v-lazy="item.goodsImage" :alt="item.goodsName">
                <div class="page-tit beyond-two">{{item.goodsTitle}}</div>
                <div class="page-info">{{item.goodsName}}</div>
                <span>{{item.goodsUnit}}：<i>{{item.goodsPrice}}</i></span>
                <button>立即兑换</button>
              </router-link>
            </a>
          </div>
        </div>
      </div>

      <div class="enjoylife" v-lazy:background-image="goodTwoBg">
        <div v-for="(item, index) in goodTwo" :key="index">
          <router-link :to="{path:'/commodityInfo', query:{goodsId: item.goodsId}}">
            <img v-lazy="item.goodsImage" :alt="item.goodsName">
            <div class="page-tit-t beyond-two">{{item.goodsTitle}}</div>
            <span>{{item.goodsUnit}}：<i>{{item.goodsPrice}}</i></span>
          </router-link>
        </div>
      </div>

      <img class="qualityimg" v-lazy="bottomImg">

      <div style="width: 100%; margin: 0 auto;">
        <div class="page-div">
          <div v-for="(item, index) in goodThree" :key="index">
            <a v-lazy:background-image="goodThreeBg">
              <router-link :to="{path:'/commodityInfo', query:{goodsId: item.goodsId}}">
                <img v-lazy="item.goodsImage" :alt="item.goodsName">
                <div class="page-tit beyond-two">{{item.goodsTitle}}</div>
                <div class="page-info">{{item.goodsName}}</div>
                <span>{{item.goodsUnit}}：<i>{{item.goodsPrice}}</i></span>
                <button>立即兑换</button>
              </router-link>
            </a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { Icon, Lazyload } from 'vant'

export default {
  name: 'ThematicPages_two',
  components: {
    [Icon.name]: Icon,
    [Lazyload.name]: Lazyload
  },
  data () {
    return {
      topImg: '',
      goodBgImg: '',
      goodOne: [],
      goodTwoBg: '',
      goodTwo: [],
      bottomImg: '',
      goodThreeBg: '',
      goodThree: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getRequest('zlbgroup-front/website/page_show/m/details/' + this.$route.query.webTag).then(res => {
        if (res.data.success === true) {
          let list = res.data.data
          this.topImg = list.floorList[0].advPosition[0].advList[0].resUrl
          this.goodBgImg = list.floorList[1].advPosition[0].advList[0].resUrl
          this.goodOne = list.floorList[1].productPosition[0].advList
          this.goodTwoBg = list.floorList[2].advPosition[1].advList[0].resUrl
          this.goodTwo = list.floorList[2].productPosition[0].advList
          this.bottomImg = list.floorList[3].advPosition[0].advList[0].resUrl
          this.goodThreeBg = list.floorList[3].advPosition[1].advList[0].resUrl
          this.goodThree = list.floorList[3].productPosition[0].advList
        }
      })
    }
  }
}
</script>

<style scoped>
  .page-bg{
    height: 100vh;
    overflow-x: hidden;
    background: url(../assets/images/thematic/bg.jpg) repeat;
  }
  .page-top .icon {
    position: absolute;
    margin: -8rem 0 0 0.2rem;
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    background: rgba(0,0,0,0.5);
    border-radius: 50%;
    font-size: 0.6rem;
    color: #fff;
    text-align: center;
  }
  .page-div {
    width: 100%;
    margin: 0 auto;
  }
  .page-div a {
    display: block;
    margin: 0 auto;
    background-size: 100% 100%;
    width: 100%;
    height: 8.8rem;
  }
  .page-div a img {
    float: left;
    width: auto;
    height: 3.8rem;
    margin: 2.3rem 1rem 0 1.2rem;
    border-radius: 0.4rem;
    box-shadow: 0 0.1rem 0.3rem #aaa;
  }
  .page-tit {
    width: 3.2rem;
    font-size: 0.5rem;
    padding: 1.9rem 0 0 0;
    color: #23645b;
  }
  .page-info {
    float: left;
    width: 3rem;
    height: 0.4rem;
    font-size: 0.4rem;
    font-weight: normal;
    color: #2d9383;
    line-height: 0.6rem;
    padding: 0.4rem 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .page-div a span {
    font-size: 0.4rem;
    color: #ffb76b;
    margin: 0.4rem 0 0 0;
    float: left;
  }
  .page-div a span i {
    font-family: arial;
    font-style: normal;
    font-size: 0.4rem;
  }
  .page-div a button {
    width: 2.6rem;
    height: 1rem;
    background: #79b98c;
    color: #fff;
    font-size: 0.4rem;
    border: none;
    border-radius: 0.2rem;
    margin: .046875rem 0 0 0;
  }
  .enjoylife {
    width: 100%;
    height: 13.6rem;
    background-size: 100% 100%;
    margin-top: 0.3rem;
  }
  .enjoylife a {
    float: left;
    display: inline-block;
    height: 5.8rem;
    width: 4rem;
    margin: 0 0 0.2rem 0.2rem;
  }
  .enjoylife img {
    width: 4rem;
    height: 4rem;
    border-radius: 0.4rem;
    box-shadow: 0 0.1rem 0.3rem #aaa;
    margin: 1.2rem 0 0 0.7rem;
   }
  .page-tit-t {
    float: left;
    width: 3.4rem;
    height: 0.7rem;
    padding: 0.2rem 0 0.2rem 1rem;
    font-size: 0.3rem;
    font-weight: bold;
    color: #666;
  }
  .enjoylife span {
    float: left;
    font-size: 0.3rem;
    color: #ed5954;
    line-height: 0.3rem;
    padding: 0 0 0 1rem;
  }
  .enjoylife a span i {
    font-family: arial;
    font-style: normal;
    font-size: 0.3rem;
  }
  .qualityimg {
    display: block;
    width: 100%;
    height: 1.2rem;
    margin-top: 1rem;
  }
</style>
