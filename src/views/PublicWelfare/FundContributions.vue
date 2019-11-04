<template>
   <div style="background: #fafafa;height: 100vh;">
     <NavMeun titleOrSearch="基金捐赠记录"></NavMeun>

     <div style="padding-top: 1.3rem;">
       <div class="fund-sumNum">
         共汇聚<span style="color: #ff330f;">{{sumNum}}</span>位爱心人士捐赠善款
       </div>
       <div class="fund-list">
         <van-list
           v-model="loading"
           :finished="finished"
           finished-text="没有更多了"
           @load="onLoad"
         >
           <van-cell-group>
             <van-cell
               v-for="item in list"
               :key="item"
               :title="item + '2019-09-09'"
             >
               <template slot="label">
                 <div>
                   <label>1398283728</label>
                   <label style="margin-left: 0.4rem;">捐赠10000元</label>
                 </div>
               </template>
               <template slot="default">
                 <div class="fund-img">
                   <img src="https://gy.cmbbao.com/uploadfile/loveLeague/1_x50.png"/>
                 </div>
                 <div class="custom-title">捐赠10000元</div>
               </template>
             </van-cell>
           </van-cell-group>
         </van-list>
       </div>
     </div>
   </div>
</template>

<script>
import { List, Cell, CellGroup } from 'vant'
import NavMeun from '../../components/NavMeun'

export default {
  name: 'FundContributions',
  components: {
    NavMeun,
    [List.name]: List,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  data () {
    return {
      sumNum: 449,
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 20; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style scoped>
.fund-sumNum{height: 1rem;line-height:1rem;padding-left: 0.6rem;font-size: 0.4rem;background: #fff;}
.fund-list{margin-top: 0.6rem;background: #fff;}
.fund-img{width: 2rem;height: 0.8rem;margin: 0 0 0 auto;}
</style>
