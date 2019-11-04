<template>
  <div style="height: 100vh;background: #fafafa;">
    <NavMeun v-on:searchClick="searchClick"></NavMeun>

    <div class="clear" style="padding-top: 1.2rem;background: #fafafa;"> <!--加上可避免切换时图片晃-->
        <div class="goods-search">
          <div class="goods-nav">
            <div class="goods-one" @click="defaultSort">默认排序</div>
            <div class="goods-two" @click="salesPriority">销量优先</div>
            <div class="goods-three" @click="priceSort">价格<van-icon :name="priceIcon" size="0.5rem" /></div>
            <!--<div class="goods-four"><van-icon name="bars" size="0.8rem" /></div>-->
          </div>
        </div>

        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="loadMore"
          :style="{height: height}"
          style="margin-top: 1.5rem;"
        >
          <div class="hm-list cm-flex" style="flex-wrap:wrap">
            <div class="goods-lists" v-for="(item, index) in dataList" :key="index">
              <router-link :to="{path:'/commodityInfo', query:{specId: item.specId, onSaleBank: onSaleBank}}">
                <div style="padding:0">
                  <div style="height: 4.6rem;"><img v-lazy="item.goodsFrom == 'JD' ? item.goodsImage : imgServer + item.goodsImage"></div>
                  <div  class="goods-listsInfo">
                    <div class="goods-name aui-ellipsis-2 goods-title"><span v-html="item.goodsName"></span></div>
                    <div class="hm-list-price cm-flex">
                      <div class="goods-font">
                        <span style="font-size: 0.4rem;">{{item.bankJfPrice}}{{item.jfUnit}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </van-list>
    </div>

  </div>
</template>

<script>
import { Icon, Lazyload, List } from 'vant'
import NavMeun from '../../components/NavMeun'
import util from '../../assets/js/util'

export default {
  name: 'GoodsList',
  components: {
    NavMeun,
    [Icon.name]: Icon,
    [Lazyload.name]: Lazyload,
    [List.name]: List
  },
  data () {
    return {
      height: 0,
      onSaleBank: this.$route.query.onSaleBank,
      dataList: [],
      loading: false,
      finished: false,
      pageNo: 0,
      priceIcon: 'ascending',
      imgServer: '',
      searchVal: '',
      sortField: '',
      sortOrder: '',
      createTime: ''
    }
  },
  created () {
    this.height = window.innerHeight - 206 + 'px'
  },
  mounted () {
    // 监听窗口改变重置高度
    window.addEventListener('resize', () => {
      this.height = window.innerHeight - 206 + 'px'
    })
  },
  methods: {
    loadMore () {
      this.pageNo += 1
      this.initList()
    },
    initList () {
      this.getRequest('zlbgroup-front/search/appGoodsSearch?pageNoIn=' + this.pageNo + '&pageSizeIn=20&searchType=' + (this.$route.query.searchType ? this.$route.query.searchType : 'allSearch') + '&keyword=' + (this.searchVal ? this.searchVal : this.$route.query.keyword) + '&goodsClassId=' + (this.$route.query.goodClassId ? this.$route.query.goodClassId : '') + '&onSaleBank=' + this.$route.query.onSaleBank + '&priorityType=&sortField=' + this.sortField + '&sortOrder=' + this.sortOrder).then(res => {
        if (res.data.success === true) {
          if (res.data.resultList.length > 0) {
            this.dataList.push(...res.data.resultList)
          } else {
            // 数据全部加载完成
            this.finished = true
          }
          this.imgServer = res.data.imgServer
          // 加载状态结束
          this.loading = false
        }
      })
    },
    // 点击搜索
    searchClick (val) {
      this.searchVal = val
      util.debounce(this.initList())
    },
    // 默认排序
    defaultSort () {
      this.sortField = 'createTime'
      this.dataList = []
      this.sortOrder = ''
      this.initList()
    },
    // 销量优先
    salesPriority () {
      this.sortField = 'salenum'
      this.dataList = []
      this.sortOrder = ''
      this.initList()
    },
    // 价格
    priceSort () {
      this.sortField = 'goodsPrice'
      if (this.priceIcon === 'ascending') {
        this.priceIcon = 'descending'
        this.dataList = []
        this.sortOrder = 'desc'
        this.initList()
      } else {
        this.priceIcon = 'ascending'
        this.dataList = []
        this.sortOrder = 'asc'
        this.initList()
      }
    }
  }
}
</script>

<style lang="less">
.goods-search{width:100%;position: fixed;background: #f9f9f9;z-index: 99;text-align: center;}
.goods-nav{width:100%;display: flex;border-bottom: 1px solid #ccc;padding-top: 0.2rem;}
.goods-one{flex: 1;font-size: 0.4rem;line-height: 1rem;margin: 0.1rem;}
.goods-two{flex: 1;font-size: 0.4rem;line-height: 1rem;border-left: 1px solid #dbdbdb;border-right: 1px solid #dbdbdb;margin: 0.1rem;}
.goods-three{flex: 1;font-size: 0.4rem;line-height: 1rem;margin: 0.1rem;}
.goods-three i{vertical-align: middle;margin-bottom: 0.1rem;}
.goods-four{border-left: 1px solid #dbdbdb;width: 1.4rem;display: flex;justify-content: center;align-items: center;}
.goods-lists{width: 46%;margin:2%;background: #fff;box-shadow: 2px 0px 6px #cecece;border-radius: 0.2rem;}
.goods-lists img{width: 100%;height:100%;border-top-left-radius: 0.2rem;border-top-right-radius: 0.2rem;}
.goods-listsInfo{padding:.13rem .08rem .13rem .08rem;}
.goods-title{height:1.17rem; line-height:.59rem; font-size:.37rem; color:#333;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;}
.goods-font{color: #ee2e3a;font-weight: 700;}
</style>
