<template>
    <div style="background: #fafafa;">
      <NavMeun titleOrSearch="走进公益"></NavMeun>

      <div style="overflow-y: auto;padding-top: 1.2rem;">
        <div class="welfare">
          <div class="wel-div">
            <div class="flex-two">
              <label class="wel-num" v-for="(item, index) in myWelfare" :key="index">{{item}}</label>
              <label>人次参与</label>
            </div>
            <div style="display: flex;">
              <div class="wel-icon">
                <img src="../../assets/images/welfareimg.png"/>
              </div>
              <div>我的公益</div>
            </div>
          </div>
          <div class="wel-big">
            <img src="https://gy.cmbbao.com/uploadfile/crop/gzgy_161116.jpg"/>
          </div>
        </div>

        <div class="wel-border">
          <div class="wel-div wel-margin">
            <div class="flex-two">
              <div style="font-size: 0.4rem;font-weight: bold;">安徽希望工程·招来宝公益基金</div>
            </div>
            <div>
              <router-link :to="{path:'/welfareFund', query:{onSaleBank: onSaleBank}}">
                <div style="color: #999;">查看详情</div>
              </router-link>
            </div>
          </div>
          <router-link :to="{path:'/welfareFund', query:{onSaleBank: onSaleBank}}" style="color:#333;">
            <div class="wel-div" style="margin-top: 0.4rem;">
              <div class="flex-two">
                <label class="wel-num" v-for="(item, index) in myWelfare" :key="index">{{item}}</label>
                <label>人次参与</label>
              </div>
              <div style="display: flex;">
                <div>共筹得 <label style="color: #ff330f;">32323.33</label> 元（查看）</div>
              </div>
            </div>
            <div class="wel-small">
              <img src="https://gy.cmbbao.com/uploadfile/crop/gyFund.jpg"/>
            </div>
          </router-link>
        </div>

        <div class="wel-border">
          <div class="wel-div wel-margin">
            <div class="flex-two">
              <div style="font-size: 0.4rem;font-weight: bold;">公益项目</div>
            </div>
            <div>
              <div style="color: #666;">让爱温暖人心</div>
            </div>
          </div>
          <div class="wel-list">
            <router-link :to="{path:'/projectDetails', query:{onSaleBank: onSaleBank}}">
              <van-row type="flex" justify="center" style="margin-bottom: 0.4rem;">
                <van-col span="8" class="wel-list-img">
                  <img src="https://gy.cmbbao.com/uploadfile/project/11/170x130.jpg" />
                  <div style="position: absolute;top: 0;left: 0;">
                    <img src="../../assets/images/projSta2_58.png" />
                  </div>
                </van-col>
                <van-col span="16" style="margin-left: 0.4rem;">
                  <div class="wel-list-tit">我运动 我快乐（第一季）</div>
                  <div class="wel-list-desc">向农村青少年捐赠体育用品</div>
                  <div class="wel-love">
                    <i></i>
                    <div>共筹得 <label style="color: #ff330f;">32323.33</label> 元</div>
                  </div>
                </van-col>
              </van-row>
            </router-link>
          </div>
          <div class="wel-list">
            <van-row type="flex" justify="center" style="margin-bottom: 0.4rem;">
              <van-col span="8" class="wel-list-img">
                <img src="https://gy.cmbbao.com/uploadfile/project/11/170x130.jpg" />
                <div style="position: absolute;top: 0;left: 0;">
                  <img src="../../assets/images/projSta2_58.png" />
                </div>
              </van-col>
              <van-col span="16" style="margin-left: 0.4rem;">
                <div class="wel-list-tit">我运动 我快乐（第一季）</div>
                <div class="wel-list-desc">向农村青少年捐赠体育用品</div>
                <div class="wel-love">
                  <i></i>
                  <div>共筹得 <label style="color: #ff330f;">32323.33</label> 元</div>
                </div>
              </van-col>
            </van-row>
          </div>
          <div class="wel-list">
            <van-row type="flex" justify="center" style="margin-bottom: 0.4rem;">
              <van-col span="8" class="wel-list-img">
                <img src="https://gy.cmbbao.com/uploadfile/project/11/170x130.jpg" />
              </van-col>
              <van-col span="16" style="margin-left: 0.4rem;">
                <div class="wel-list-tit">我运动 我快乐（第一季）</div>
                <div class="wel-list-desc">向农村青少年捐赠体育用品</div>
                <div class="wel-love">
                  <i></i>
                  <div>共筹得 <label style="color: #ff330f;">32323.33</label> 元</div>
                </div>
              </van-col>
            </van-row>
          </div>
        </div>

        <div class="wel-txt">公益说明：“小积分 微公益 大希望”项目由安徽省希望工程办公室、招来宝积分平台等多家省内媒体共同发起、组织、运行。通过各类有效积分的便捷参与、有效转化，实现公益活动的“社会化、普及化、平民化”。</div>
        <div class="wel-text">善款发起：安徽希望工程·招来宝公益基金<div class="wel-txtImg"><img src="../../assets/images/xiwang.png"/></div></div>
      </div>
    </div>
</template>

<script>
import { Row, Col } from 'vant'
import NavMeun from '../../components/NavMeun'

export default {
  name: 'WelfareList',
  components: {
    NavMeun,
    [Row.name]: Row,
    [Col.name]: Col
  },
  data () {
    return {
      height: 0,
      onSaleBank: this.$route.query.onSaleBank,
      myWelfare: [ 5, 3, 2, 3, 3, 4, 2 ]
    }
  },
  created () {
    // this.init()
  },
  methods: {
    init () {
      this.postRequest('zlbgroup-front/subject/querySubject').then(res => {
        if (res.data.success === true) {
          console.log(res)
        }
      })
    }
  }
}
</script>

<style scoped>
.welfare{background: #fff;font-size: 0.34rem;margin-bottom: 0.4rem;color: #666;}
.wel-div{width:90%;margin: 0.2rem auto;display: flex;font-size: 0.34rem;}
.wel-num{padding: 0 0.04rem;background: black;margin-right: 0.1rem;color: #fff;}
.wel-icon{width: 0.5rem;height: 0.5rem;margin-right: 0.1rem;}
.wel-big{width: 100%;height: 4rem;}
.wel-border{background: #fff;border-top: 1px solid #dfdfdf;border-bottom: 1px solid #dfdfdf;margin-bottom: 0.4rem;}
.wel-small{width: 90%;height:3rem;margin: 0.5rem auto;border-radius: 0.2rem;overflow: hidden;}
.wel-margin{border-bottom: 1px solid #dfdfdf;margin-bottom: 0.3rem;}
.wel-list{width: 90%;margin: 0.4rem auto;border-bottom: 1px solid #eaeaea;}
.wel-list-img{width: 3rem;height: 2rem;border-radius: 0.1rem;overflow: hidden;position: relative;}
.wel-list-tit{font-weight: bold;color: #333;font-size: 0.45rem;}
.wel-list-desc{color: #999;font-size: 0.34rem;}
.wel-love{color: #999;font-size: 0.34rem;display: flex;margin-top: 0.4rem;}
.wel-love i{background: url("../../assets/images/loveimg.png") no-repeat;width:0.34rem;height: 0.3rem;margin: 0.1rem;display: block;background-size: cover;}
.wel-txt{width: 90%;margin: 0 auto;border-bottom: 1px dashed #ccc;color: #b6b6b6;padding-bottom: 0.3rem;font-size: 0.36rem;}
.wel-text{width: 100%;color: #b6b6b6;text-align: center;margin-top: 0.5rem;font-size: 0.36rem;}
.wel-txtImg{width: 0.8rem;height: 0.6rem;margin: 0.2rem auto;}
</style>
