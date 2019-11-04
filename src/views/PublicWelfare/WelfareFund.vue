<template>
  <div style="background: #fafafa;">
    <NavMeun titleOrSearch="公益基金"></NavMeun>

    <div style="overflow-y: auto;margin-bottom: 1.4rem;padding-top: 1.2rem;">
      <div class="wel-border">
        <div class="welfare">
          <div class="wel-div">
            <div class="flex-two">
              <label class="wel-num" v-for="(item, index) in myWelfare" :key="index">{{item}}</label>
              <label>人次参与</label>
            </div>
            <div style="display: flex;">
              <div>共筹得 <label style="color: #ff330f;">32323.33</label> 元
                <router-link style="color: #333;" :to="{path:'/fundContributions', query:{onSaleBank: onSaleBank}}">（查看）</router-link>
              </div>
            </div>
          </div>
          <div class="wel-big">
            <img src="https://gy.cmbbao.com/uploadfile/crop/fund_1.jpg?_=161108"/>
          </div>
        </div>
      </div>

      <div class="wel-border">
        <div class="wel-div wel-margin">
          <div class="flex-two">
            <div style="font-size: 0.4rem;font-weight: bold;">公益基金说明</div>
          </div>
          <div>
            <router-link :to="{path:'/fundStatement', query:{onSaleBank: onSaleBank}}">
              <div style="color: #999;">查看详情</div>
            </router-link>
          </div>
        </div>
        <router-link :to="{path:'/fundStatement', query:{onSaleBank: onSaleBank}}" style="color:#333;">
          <div class="wel-des">
            <div class="wel-desImg">
              <img src="https://gy.cmbbao.com/uploadfile/crop/authorization_s.jpg" />
            </div>
            <div class="flex-two beyond-two wel-desTxt">
              安徽省希望工程办公室联合招来宝积分兑换平台，共同打造“安徽省希望工程·招来宝公益基金”，活动募集所有款项均进入该基金。由安徽省希望工程办公室对项目公室对项目公室对项目
            </div>
          </div>
        </router-link>
      </div>

      <div class="wel-border">
        <div class="wel-div wel-margin">
          <div class="flex-two">
            <div style="font-size: 0.4rem;font-weight: bold;">公益基金合作伙伴</div>
          </div>
          <div>
            <div style="color: #999;">回馈社会</div>
          </div>
        </div>
        <van-swipe :autoplay="3000">
          <van-swipe-item>
            <div style="display: flex;margin: 0 auto;justify-content: center;height: 2rem;">
              <div style="width: 2rem;height: 2rem;margin: 0 0.4rem;">
                <img src="https://gy.cmbbao.com/uploadfile/partner/buick.png" />
              </div>
              <div style="width: 2rem;height: 2rem;margin: 0 0.4rem;">
                <img src="https://gy.cmbbao.com/uploadfile/partner/buick.png" />
              </div>
              <div style="width: 2rem;height: 2rem;margin: 0 0.4rem;">
                <img src="https://gy.cmbbao.com/uploadfile/partner/buick.png" />
              </div>
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <div style="display: flex;margin: 0 auto;justify-content: center;height: 2rem;">
              <div style="width: 2rem;height: 2rem;margin: 0 0.4rem;">
                <img src="https://gy.cmbbao.com/uploadfile/partner/buick.png" />
              </div>
              <div style="width: 2rem;height: 2rem;margin: 0 0.4rem;">
                <img src="https://gy.cmbbao.com/uploadfile/partner/buick.png" />
              </div>
              <div style="width: 2rem;height: 2rem;margin: 0 0.4rem;">
                <img src="https://gy.cmbbao.com/uploadfile/partner/buick.png" />
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>

      <div class="wel-border">
        <div class="wel-div wel-margin">
          <div class="flex-two">
            <div style="font-size: 0.4rem;font-weight: bold;">基金动态</div>
          </div>
          <div>
            <div style="color: #999;">公开透明</div>
          </div>
        </div>
        <router-link :to="{path:'/fundDynamics', query:{onSaleBank: onSaleBank}}" style="color:#333;">
          <div class="wel-des">
            <div class="wel-desImg">
              <img src="https://gy.cmbbao.com/uploadfile/article/thumbnail/1.jpg" />
            </div>
            <div class="flex-two wel-desTxt">
              <div style="font-size: 0.44rem; font-weight: bold;color: #333;">小积分·微公益·慈善助学自驾游</div>
              <div>合肥瑞杰集团与招来宝集团携手举办公益捐赠活动</div>
            </div>
          </div>
        </router-link>
      </div>

      <div class="wel-txt">温馨提示：本基金提供平台服务和接收用户捐赠的善款，并定期公布募捐以及使用情况。</div>
      <div class="wel-text">善款发起：安徽希望工程·招来宝公益基金<div class="wel-txtImg"><img src="../../assets/images/xiwang.png"/></div></div>
    </div>

    <div class="phone-button">
      <van-button type="danger" size="large" square @click="donaShow = true">立即捐赠</van-button>
    </div>
    <van-action-sheet v-model="donaShow" title="选择捐赠方式">
      <div class="type-div">
        <div class="type-ul">
          <div class="type-li">
            <img src="https://gy.cmbbao.com/images/donateType_ct.jpg"/>电信积分
          </div>
          <div class="type-li active">
            <img src="https://gy.cmbbao.com/images/donateType_ct.jpg"/>电信积分
          </div>
          <div class="type-li">
            <img src="https://gy.cmbbao.com/images/donateType_ct.jpg"/>电信积分
          </div>
          <div class="type-li">
            <img src="https://gy.cmbbao.com/images/donateType_ct.jpg"/>电信积分
          </div>
          <div class="type-li">
            <img src="https://gy.cmbbao.com/images/donateType_ct.jpg"/>电信积分
          </div>
        </div>
        <div>
          <van-row>
            <van-col span="20">
              <van-field type="number" placeholder="请输入捐赠数额" class="btn-input" />
            </van-col>
            <van-col span="3" class="btn-label">积分</van-col>
          </van-row>
          <van-row>
            <van-col span="20" class="btn-labels">
              广发银行用户使用
            </van-col>
          </van-row>
        </div>
      </div>
      <van-button type="danger" size="large" square>确定</van-button>
    </van-action-sheet>

  </div>
</template>

<script>
import { Swipe, SwipeItem, Button, ActionSheet, Row, Col, Field } from 'vant'
import NavMeun from '../../components/NavMeun'

export default {
  name: 'WelfareFund',
  components: {
    NavMeun,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Button.name]: Button,
    [ActionSheet.name]: ActionSheet,
    [Row.name]: Row,
    [Col.name]: Col,
    [Field.name]: Field
  },
  data () {
    return {
      height: 0,
      onSaleBank: this.$route.query.onSaleBank,
      myWelfare: [ 5, 3, 2, 3, 3, 4, 2 ],
      donaShow: false
    }
  },
  methods: {
    // 立即捐赠
    donationClick () {

    }
  }
}
</script>

<style scoped>
.wel-div{width:90%;margin: 0.3rem auto;display: flex;font-size: 0.34rem;}
.wel-num{padding: 0 0.04rem;background: black;margin-right: 0.1rem;color: #fff;}
.wel-border{background: #fff;border-top: 1px solid #dfdfdf;border-bottom: 1px solid #dfdfdf;margin-bottom: 0.4rem;}
.wel-des{display: flex;width: 92%;border-top: 2px solid #dfdfdf;padding: 0.4rem;}
.wel-desImg{width: 2.4rem;height: 2rem;border: 1px solid #cecece;border-radius: 0.1rem;overflow: hidden;}
.wel-desTxt{padding-left: 0.3rem;line-height: 0.52rem;-webkit-line-clamp:4;color: #666;font-size: 0.3rem;}
.wel-txt{width: 90%;margin: 0 auto;border-bottom: 1px dashed #ccc;color: #b6b6b6;padding-bottom: 0.3rem;font-size: 0.36rem;}
.wel-text{width: 100%;color: #b6b6b6;text-align: center;margin-top: 0.5rem;font-size: 0.36rem;}
.wel-txtImg{width: 0.8rem;height: 0.6rem;margin: 0.2rem auto;}
.phone-button{position: fixed;bottom: 0;width: 100%;}
.type-div{padding: 0.3rem;background: #fafafa;}
.type-ul{display: flex;flex-wrap: wrap;margin: 0.2rem 0;}
.type-li{width: 2.6rem;height: 1rem;font-size: 0.4rem;border: 1px solid #ccc;border-radius: 0.2rem;background: #fff;display:flex;justify-content: center;align-items: center;margin: 0.2rem;}
.type-li img{width: 0.5rem;height: 0.5rem;}
.type-li.active{border: 1px solid #ff330f}
.btn-input{border: 1px solid #d8d8d8;border-radius: 0.2rem;}
.btn-label{font-size: 0.4rem;margin: 0.4rem 0 0 0.2rem;}
.btn-labels{font-size: 0.3rem;color: #aeaeae;margin-top: 0.3rem;}
</style>
