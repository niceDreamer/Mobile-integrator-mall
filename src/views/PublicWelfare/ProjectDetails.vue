<template>
  <div style="background: #fafafa;height: 100vh;">
    <NavMeun titleOrSearch="项目详情"></NavMeun>

    <div style="padding-top: 1.2rem;">
      <div class="pro-iconImg">
        <div class="pro-status">
          <img src="../../assets/images/prosta1.png"/>
        </div>
        <img src="https://gy.cmbbao.com/uploadfile/project/13/640x244.jpg"/>
        <img src="../../assets/images/projMask.png" class="pro-position"/>
        <div class="pro-label">
          <div class="pro-labelLeft">爱心包裹（第二季）</div>
          <div class="pro-labelRight">2018-11-19上线</div>
        </div>
      </div>
      <div class="pro-info">
        <div style="font-size: 0.34rem;">爱心接力，让更多的孩子看到儿童剧</div>
        <div style="margin: 0.4rem 0;">
          <van-progress inactive :percentage="50" />
        </div>
        <div class="nav-div">
          <div class="nav-li">
            <div>目标</div>
            <div><label class="pro-infoLabel">4000</label>元</div>
            <span></span>
          </div>
          <div class="nav-li">
            <div>已筹</div>
            <div><label class="pro-infoLabel">1296.78</label>元</div>
            <span></span>
          </div>
          <div class="nav-li">
            <router-link style="color: #333;" :to="{path:'/fundContributions', query:{onSaleBank: onSaleBank}}"><div>参与人数(查看)</div></router-link>
            <div><label class="pro-infoLabel">328</label>人</div>
          </div>
        </div>
      </div>
      <div>
        <van-tabs swipeable>
          <van-tab title="项目详情">
            1
          </van-tab>
          <van-tab :title="'项目进展('+ num +')'">
            <van-steps direction="vertical" active-color>
              <van-step>
                <p>2016-07-11 10:00</p>
                <div class="progress">
                  <i></i>
                  8月20日，几位爱心人士专程来到安徽省希望工程办公室，为“爱心圆梦大学”项目进行捐款。这其中，小朋友捐出了自己平时积攒的零用钱，老年人捐出了自己点滴省下的生活费，他们作为代表共同参与到“爱心圆梦大学（第三季）”项目中来，用爱心为更多的贫困学子圆梦。安徽省希望工程办公室向他们表达了真诚的感谢，也为他们颁发了荣誉证书。
                </div>
                <div class="pro-imgFlex">
                  <div class="pro-imgLi"><img src="https://gy.cmbbao.com/uploadfile/project/14/190820_170x170_2.jpg"/></div>
                  <div class="pro-imgLi"><img src="https://gy.cmbbao.com/uploadfile/project/14/190820_170x170_2.jpg"/></div>
                  <div class="pro-imgLi"><img src="https://gy.cmbbao.com/uploadfile/project/14/190820_170x170_2.jpg"/></div>
                  <div class="pro-imgLi"><img src="https://gy.cmbbao.com/uploadfile/project/14/190820_170x170_2.jpg"/></div>
                  <div class="pro-imgLi"><img src="https://gy.cmbbao.com/uploadfile/project/14/190820_170x170_2.jpg"/></div>
                  <div class="pro-imgLi"><img src="https://gy.cmbbao.com/uploadfile/project/14/190820_170x170_2.jpg"/></div>
                </div>
              </van-step>
              <van-step>
                <p>2016-07-10 09:30</p>
              </van-step>
            </van-steps>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { Progress, Tab, Tabs, Step, Steps } from 'vant'
import NavMeun from '../../components/NavMeun'

export default {
  name: 'ProjectDetails',
  components: {
    NavMeun,
    [Progress.name]: Progress,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Step.name]: Step,
    [Steps.name]: Steps
  },
  data () {
    return {
      onSaleBank: this.$route.query.onSaleBank,
      num: 2
    }
  }
}
</script>

<style scoped>
.pro-iconImg{width: 100%;height: 4rem;position: relative;color: #fff;}
.pro-status{width: 1.6rem;height: 1.6rem;position: absolute;top: 0;right: 0;}
.pro-position{position: absolute;left: 0;bottom: 0;height: 2rem;}
.pro-label{width:100%;position: absolute;bottom: 0;display: flex;font-weight: bold;}
.pro-labelLeft{font-size: 0.48rem;flex: 1;padding: 0 0 0.2rem 0.3rem;}
.pro-labelRight{font-size: 0.38rem;padding-right: 0.3rem;}

.pro-info{margin: 0.2rem 0 0.3rem 0;background: #fff;padding: 0.2rem;}
.pro-infoLabel{font-size: 0.5rem;color: #ff330f;font-weight: bold;}

.nav-div{display: flex;transform: translate3d(0,0,0);width: 100%;overflow: hidden;text-align: center;}
.nav-li{flex: 1;font-size: 0.3rem;padding: 0.1rem 0;position: relative;}
.nav-li span{position: absolute;top: 0;right: 0;width: 0;height: 1.2rem;background: #f0efed;border-left: 1px solid #f0efed;border-right: 1px solid #f0efed;}

.progress{position: relative;background: #f3f2f1;border-radius: 0.2rem;color: #3d4245;font-size: 0.34rem;padding: 0.2rem;}
.progress i{position: absolute;top: 0.4rem;left: -0.6rem;display: block;width: 0;height: 0;overflow: hidden;border: 0.3rem solid #fff;border-right: 0.3rem solid #f3f2f1;}

.pro-imgFlex{display: flex;flex-wrap: wrap;}
.pro-imgLi{width: 2.5rem;height: 2rem;margin: 0.2rem;}
</style>
