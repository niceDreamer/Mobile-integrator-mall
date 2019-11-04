<template>
  <div style="background: #fafafa;overflow: hidden;height: 100vh;">
    <NavMeun titleOrSearch="收货地址"></NavMeun>

    <div style="overflow-y: auto;padding-top: 1.2rem;">
      <van-address-list
        v-if="!isData"
        v-model="chosenAddressId"
        :list="newList"
        @add="onAdd"
        @edit="onEdit"
      />
      <div v-if="isData" style="text-align: center;font-size: 0.4rem;margin-top: 1rem;">
        <div style="width: 90%;margin: 0 auto;">
          <router-link :to="{path: '/inputAddress', query: {memberId: memberId, flag: '0'}}">
            <van-button type="danger" size="large" style="border-radius: 0.2rem;margin-top: 0.2rem;">新增地址</van-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AddressList, Toast, Button } from 'vant'
import NavMeun from '../../components/NavMeun'
import Cookies from 'js-cookie'

export default {
  name: 'SelectAddress',
  components: {
    NavMeun,
    [AddressList.name]: AddressList,
    [Toast.name]: Toast,
    [Button.name]: Button
  },
  data () {
    return {
      height: 0,
      isData: true,
      chosenAddressId: '',
      newList: [],
      memberId: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let member = JSON.parse(Cookies.get('userInfo'))
      this.memberId = member.memberId
      this.postRequest('zlbgroup-front/m/authc/buyer/getUserReceiptAddress2').then(res => {
        if (res.data.success === true) {
          let listData = res.data.addressList
          if (listData.length > 0) {
            this.isData = false
            for (let i = 0; i < listData.length; i++) {
              this.newList.push({
                id: listData[i].addressId,
                name: listData[i].trueName,
                tel: listData[i].mobPhone,
                address: listData[i].address,
                memberId: listData[i].memberId,
                data: listData[i]
              })
            }
            this.chosenAddressId = this.newList[0].id
            this.memberId = this.newList[0].memberId
          } else {
            this.isData = true
          }
        }
      })
    },
    onAdd () {
      this.$router.push({
        name: 'inputAddress',
        query: {
          memberId: this.memberId,
          flag: '0'
        }
      })
    },
    onEdit (item, index) {
      this.$router.push({
        name: 'inputAddress',
        query: {
          memberId: item.memberId,
          addressId: item.id,
          data: JSON.stringify(item.data),
          flag: '1'
        }
      })
    }
  }
}
</script>

<style>
  .van-radio__icon {
    font-size: 0.53333rem !important;
  }
</style>
