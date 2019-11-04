<template>
  <div>
    <NavMeun v-on:searchClick="searchClick"></NavMeun>
    <div style="padding-top: 1.5rem;">
      <div style="display: flex;">
        <div class="wrapper leftDiv" ref="leftWrapper" :style="{height:height}">
          <ul class="content">
            <li :class="{'act':currentIndex === index}" v-for="(item, index) in dataList" :key="index" @click="change(index)">
              {{item.gcName}}
            </li>
          </ul>
        </div>
        <div class="wrapper" ref="rightWrapper" :style="{height:height}">
          <!--定义需要滚动的内容区域-->
            <ul class="goods-info-ul">
              <li v-for="(it, index) in dataList" :key="index" ref="rightLiHeight" class="goods-info-li">
                <div v-for="(its, index) in it.classCustomList" :key="index">
                  <div class="goods-info-title">{{its.gcName}}</div>
                  <ul class="content cm-flex" style="flex-wrap:wrap;">
                    <li v-for="(item, index) in its.classCustomList" :key="index" class="goods-info" @click="goGoodsList(item.gcId)">
                      <div>
                        <img v-lazy="imgServer + item.gcPic"/>
                      </div>
                      <label>{{item.gcName}}</label>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Lazyload } from 'vant'
import BScroll from 'better-scroll'
import NavMeun from '../../components/NavMeun'

export default {
  name: 'goodsClassification',
  components: {
    NavMeun,
    [Lazyload.name]: Lazyload
  },
  props: {
    msg: String
  },
  data () {
    return {
      scrollY: 0,
      tops: [],
      height: 0,
      actli: 0,
      dataList: [],
      imgUrl: '',
      leftScroll: ''
    }
  },
  created () {
    this.init()
    this.height = window.innerHeight - 108 + 'px'
  },
  mounted () {
    // 监听窗口改变重置高度
    window.addEventListener('resize', () => {
      this.height = window.innerHeight - 108 + 'px'
    })
  },
  methods: {
    init () {
      this.postRequest('zlbgroup-front/product/getGoodsClassList?parendid=&onSaleBank=' + this.$route.query.onSaleBank).then(res => {
        if (res.data.success === true) {
          this.dataList = res.data.classCustomList
          this.imgServer = res.data.imgServer
          this.$nextTick(() => {
            this._initScroll()
            this._initTops()
          })
        }
      })
    },
    _initScroll () {
      this.leftScroll = new BScroll(this.$refs['leftWrapper'], {
        click: true
      })
      this.rightScroll = new BScroll(this.$refs['rightWrapper'], {
        probeType: 2,
        click: true
      })
      this.rightScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(pos.y)
      })
    },
    _initTops () {
      const tops = []
      let top = 0
      tops.push(top)
      const lis = this.$refs.rightLiHeight
      Array.prototype.slice.call(lis).forEach((li, index) => {
        top += li.clientHeight
        tops.push(top)
      })
      this.tops = tops
    },
    change (index) {
      const top = this.tops[index]
      this.scrollY = top
      this.rightScroll.scrollTo(0, -top, 300)
    },
    goGoodsList (id) {
      this.$router.push({
        path: '/goodsList',
        query: {
          goodClassId: id,
          keyword: '',
          onSaleBank: this.$route.query.onSaleBank
        }
      })
    },
    searchClick (val) {
      this.$router.push({
        path: '/goodsList',
        query: {
          keyword: val,
          onSaleBank: this.$route.query.onSaleBank
        }
      })
    }
  },
  computed: {
    currentIndex () {
      return this.tops.findIndex((top, index) => {
        return this.scrollY >= top && this.scrollY < this.tops[index + 1]
      })
    }
  }
}
</script>

<style scoped lang="less">
  .wrapper{
    position: relative;
    width: 100%;
    background: #fafafa;
    overflow: hidden;
    .content{
      li{
        text-align: center;
        font-size: 0.32rem;
        color: #333333;
      }
    }
  }
  .last{
    border-bottom: none;
  }
  .leftDiv{width: 2.6rem;background: #fafafa;}
  .leftDiv ul li{width: 100%;height: 1.4rem;display: flex;justify-content: center;align-items: center;background: #f5f5f5;}
  .leftDiv ul li.act{background: #fff;}
  .goods-info-ul{width: 96%;margin: 0.2rem auto;}
  .goods-info-li{background: #fff;border-radius: 0.2rem;margin-bottom: 0.2rem;}
  .goods-info-title{text-align: left;padding: 0.3rem;font-size: 0.3rem;font-weight: 700;color: #555;}
  .goods-info{width: 1.7rem;margin: 0 0.1rem;}
  .goods-info div{width: 1.2rem;height: 1.2rem;margin: 0 auto;}
  .goods-info label{text-align: center;font-size: 0.3rem;display: inline-block;margin: 0.2rem 0;}
</style>
