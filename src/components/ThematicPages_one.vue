<template>
    <div v-lazy:background-image="topImgBg" class="page-div">
      <img v-lazy="topImgOne" >
      <img v-lazy="topImgTwo" >
      <div onclick="javascript:history.back()">
        <van-icon name="arrow-left" class="icon" />
      </div>
      <div class="hotMain" style="width: 100%;margin: 0.8rem auto;">
        <div v-for="(item, index) in listInfo" :key="index" style="margin: 1.6rem 0;">
          <router-link :to="{path:'/commodityInfo', query:{goodsId: item.goodsId}}">
            <img v-lazy="item.goodsImage" :alt="item.goodsName">
            <h4>{{item.goodsTitle}}</h4>
            <span>{{item.goodsUnit}}：<i>{{item.goodsStorePrice}}</i></span>
            <button>立即兑换</button>
          </router-link>
        </div>
      </div>
      <img v-lazy="BottomImg" >
    </div>
</template>

<script>
import { Icon, Lazyload } from 'vant'

export default {
  name: 'ThematicPages_one',
  components: {
    [Icon.name]: Icon,
    [Lazyload.name]: Lazyload
  },
  data () {
    return {
      topImgOne: '',
      topImgTwo: '',
      topImgBg: '',
      listInfo: '',
      BottomImg: ''
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
          this.topImgOne = list.floorList[0].advPosition[0].advList[0].resUrl
          this.topImgTwo = list.floorList[0].advPosition[0].advList[1].resUrl
          this.topImgBg = list.floorList[1].advPosition[0].advList[0].resUrl
          this.listInfo = list.floorList[1].productPosition[0].advList
          this.BottomImg = list.floorList[2].advPosition[0].advList[0].resUrl
        }
      })
    }
  }
}
</script>

<style scoped>
.icon {
  position: fixed;
  margin: -14.8rem 0 0 0.2rem;
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  background: rgba(0,0,0,0.5);
  border-radius: 50%;
  font-size: 0.6rem;
  color: #fff;
  text-align: center;
}
.page-div{
  background-size: cover;
}
.page-div a{
  display: block;
  margin: 0 auto;
  margin-bottom: 0.2rem;
  border: 1px solid #fff;
  border-radius: 0.2rem;
  width: 90%;
  padding: 0.2rem 0;
  box-shadow:  0rem 0rem 0.2rem #cff1ea;
}
.page-div a img{
  float:left;
  width: 4.2rem;
  height: 4.2rem;
  border-radius: 0.2rem;
  border: #257cb6 0.1rem solid;
  box-shadow: #cff1ea 0rem 0.1rem 0.3rem 0;
  margin: -0.5rem 0.6rem 0px -0.2rem;
  background: #fff;
}
.page-div a h4{
  margin: 0.4rem 0 0 0;
  font-size: 0.4rem;
  font-weight: normal;
  color: #fff;
  line-height: 0.4rem;
}
.page-div a span{
  font-size: 0.4rem;
  color: #00ffee;
  margin: 0.4rem 0 0 0;
  float: left;
}
.page-div a i{
  font-family: arial;
  font-style: normal;
  font-size: 0.4rem;
}
.page-div a button{
  display: block;
  width: 3rem;
  height: 0.8rem;
  color: #fff;
  font-size: 0.4rem;
  font-weight: normal;
  line-height: 0.4rem;
  border: 1px solid #fff;
  border-radius: 0.4rem;
  margin: 1.4rem 0 0 0;
  background: none;
}
</style>
