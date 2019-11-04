<template>
    <div style="background: #fafafa;height: 100vh;">
      <NavMeun titleOrSearch="电子劵"></NavMeun>

      <div style="padding-top: 1.2rem;">
        <van-tabs animated @click="tabClick" color="#dbbe6b" title-active-color="#dbbe6b">
          <van-tab v-for="(item, index) in goodsNavList" :key="index" :title="item.gcName" :name="item.gcId">
            <div :style="{height: height}" style="overflow-y: auto;">
              <div class="virtualTit">--- {{item.gcName}} ---</div>
              <div class="bound" v-for="(item, index) in goodsList" :key="index">
                <div class="virtualImg">
                  <img v-lazy="imgServer + item.goodsImage"/>
                </div>
                <div class="flex-one" style="margin-left: 0.4rem;">
                  <div class="beyond-two virtualName">{{item.goodsName}}</div>
                  <label class="virtualNameInfo">支持全积分抵扣</label>
                </div>
                <div class="virtualBtn">
                  <router-link :to="{path:'/VirtualCardInfo', query:{brandName: item.goodsName, brandId: item.goodsId, onSaleBank: onSaleBank}}">
                    <div class="virtualNum">{{item.jfUnit}}：{{item.bankJfPrice}}</div>
                    <div class="virtualBtnCli">点击购买</div>
                  </router-link>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
</template>

<script>
import { Tab, Tabs, Lazyload } from 'vant'
import NavMeun from '../../components/NavMeun'

export default {
  name: 'VirtualCard',
  components: {
    NavMeun,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Lazyload.name]: Lazyload
  },
  data () {
    return {
      height: 0,
      onSaleBank: this.$route.query.onSaleBank,
      goodsNavList: [],
      imgServer: '',
      goodsList: [],
      listScroll: ''
    }
  },
  created () {
    this.init()
    this.height = window.innerHeight - 180 + 'px'
  },
  mounted () {
    // 监听窗口改变重置高度
    window.addEventListener('resize', () => {
      this.height = window.innerHeight - 180 + 'px'
    })
  },
  methods: {
    init () {
      this.getRequest('zlbgroup-front/product/getGoodsClassList?parendid=595fec96201907210722000000013000&onSaleBank=' + this.$route.query.onSaleBank).then(res => {
        if (res.data.success === true) {
          this.goodsNavList = res.data.classCustomList
          this.tabClick(res.data.classCustomList[0].gcId)
        }
      })
    },
    tabClick (name) {
      this.getRequest('zlbgroup-front/search/appGoodsSearch?pageNoIn=1&pageSizeIn=20&searchType=gcIdSearch&keyword=' + name + '&onSaleBank=' + this.$route.query.onSaleBank).then(res => {
        if (res.data.success === true) {
          this.imgServer = res.data.imgServer
          this.goodsList = res.data.resultList
        }
      })
    }
  }
}
</script>

<style scoped>
  .virtualTit{width: 100%;text-align: center;font-size: 0.4rem;margin: 0.4rem 0;color: #9c9b9e;}
  .virtualImg{width: 2rem; height: 2rem;border-radius: 50%;overflow: hidden;}
  .virtualName{font-size: 0.4rem;font-weight: bold;margin: 0.3rem 0;}
  .virtualNameInfo{padding: 0.1rem; border: 1px solid #666;border-radius: 0.3rem;font-size: 0.24rem;}
  .virtualBtn{width: 2.4rem;border-left: 1px solid #dedede;text-align: center;}
  .virtualNum{color: #d54865;margin-top: 0.3rem;height: 0.4rem;font-size: 0.36rem;}
  .virtualBtnCli{color: #eae36e;font-weight: bold;font-size: 0.4rem;margin-top: 0.3rem;}
  .bound{
    margin: 0.3rem auto;
    background-color: #fff;
    width: 88%;
    padding: 0.4rem 0.2rem;
    display: flex;
    position: relative;
  }
  .bound::before{
    content: "";
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    display: block;
    background: #fafafa;
    position: absolute;
    top: 50%;
    left: -0.4rem;
    transform:translateY(-50%);
  }
  .bound::after{
    content: "";
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    display: block;
    background: #fafafa;
    position: absolute;
    top: 50%;
    right: -0.4rem;
    transform:translateY(-50%);
  }
</style>
