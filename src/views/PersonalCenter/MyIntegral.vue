<template>
  <div style="background: #fafafa;">
    <NavMeun titleOrSearch="我的积分"></NavMeun>
    <van-row class="waveInfo" style="padding-top: 1.4rem;">
      <van-col span="24"><label>我的通宝：</label><span>{{integral}}</span><img src="../../assets/images/gold-ingot.png" class="goldImg" /></van-col>
    </van-row>

  </div>
</template>

<script>
import { Row, Col } from 'vant'
import NavMeun from '../../components/NavMeun'

export default {
  name: 'MyIntegral',
  components: {
    NavMeun,
    [Row.name]: Row,
    [Col.name]: Col
  },
  data () {
    return {
      integral: 0
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
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
    }
  }
}
</script>

<style scoped>
  .goldImg{width: 0.3rem;height: 0.3rem;vertical-align: middle;margin: 0 0 0.1rem 0.1rem;}
</style>
