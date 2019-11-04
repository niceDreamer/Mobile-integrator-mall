<template>
  <div>
    <NavMeun titleOrSearch="兑换记录"></NavMeun>

    <div style="background: #fafafa;overflow-y: auto;padding-top: 1.2rem;">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :style="{height: height}"
      >
        <van-cell-group>
          <van-cell :title="item.transferDate" :value="item.referenceId" :label="'通宝卡充值'+item.transferValue+'积分'" v-for="(item, index) in list" :key="index" />
        </van-cell-group>
      </van-list>
    </div>

  </div>
</template>

<script>
import { Cell, CellGroup, List } from 'vant'
import NavMeun from '../../components/NavMeun'

export default {
  name: 'ExchangeList',
  components: {
    NavMeun,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [List.name]: List
  },
  data () {
    return {
      height: 0,
      list: [],
      loading: false,
      finished: false
    }
  },
  created () {
    this.height = window.innerHeight - 98 + 'px'
  },
  mounted () {
    // 监听窗口改变重置高度
    window.addEventListener('resize', () => {
      this.height = window.innerHeight - 206 + 'px'
    })
  },
  methods: {
    onLoad () {
      this.postRequest('zlbgroup-front/m/point/transferQuery?pageNum=1&pageSize=10').then(res => {
        if (res.data.success === true) {
          if (res.data.accountBalance.length > 0) {
            this.list.push(...res.data.accountBalance)
          } else {
            // 数据全部加载完成
            this.finished = true
          }
          // 加载状态结束
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
