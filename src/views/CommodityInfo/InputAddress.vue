<template>
  <div style="background: #fafafa;overflow: hidden;height: 100vh;">
    <NavMeun titleOrSearch="修改地址"></NavMeun>

    <div style="overflow-y: auto;padding-top: 1.2rem;">
      <van-address-edit
        :area-list="areaList"
        :address-info="AddressInfo"
        show-delete
        show-postal
        show-set-default
        show-search-result
        :detail-maxlength="200"
        @save="onSave"
        @delete="onDelete"
      />
    </div>
  </div>
</template>

<script>
import { AddressEdit, Area, Toast } from 'vant'
import NavMeun from '../../components/NavMeun'
import AreaList from '../../assets/js/area'

export default {
  name: 'InputAddress',
  components: {
    NavMeun,
    [AddressEdit.name]: AddressEdit,
    [Area.name]: Area,
    [Toast.name]: Toast
  },
  data () {
    return {
      height: 0,
      areaList: AreaList,
      AddressInfo: {},
      isDel: ''
    }
  },
  created () {
    this.addressInfo()
  },
  methods: {
    addressInfo () {
      if (this.$route.query.flag === '1') {
        let dataInfo = JSON.parse(this.$route.query.data)
        let addInfo = {
          id: dataInfo.addressId,
          name: dataInfo.trueName,
          tel: dataInfo.mobPhone,
          province: '',
          city: '',
          county: '',
          addressDetail: dataInfo.address,
          areaCode: dataInfo.cityId,
          postalCode: dataInfo.zipCode,
          isDefault: dataInfo.isDefault === '1' ? true : false
        }
        this.AddressInfo = addInfo
      }
    },
    init (data) {
      this.uploadFileRequest('zlbgroup-front/m/authc/buyer/addOrUpdateOrDeleteAddress', data).then(res => {
        if (res.data.success === true) {
          if (this.$route.query.flag === '0') {
            Toast('地址新增成功')
          } else if (this.isDel === 2) {
            Toast('地址删除成功')
          } else {
            Toast('地址编辑成功')
          }
          setTimeout(() => {
            this.$router.push('/selectAddress')
          }, 2000)
        }
      })
    },
    onSave (content) {
      this.params(content)
    },
    onDelete (content) {
      if (this.$route.query.flag === '0') {
        Toast('新增地址不可删除')
      } else {
        this.isDel = 2
        this.params(content)
      }
    },
    params (content) {
      let jsonData = {
        'isDel': 0,
        'trueName': content.name,
        'areaId': content.areaCode,
        'cityId': content.areaCode.substring(0, 4) + '00',
        'areaInfo': content.province + '' + content.city + '' + content.county,
        'address': content.addressDetail,
        'telPhone': '',
        'mobPhone': content.tel,
        'isDefault': content.isDefault === false ? '0' : '1',
        'provinceId': content.areaCode.substring(0, 3) + '000',
        'zipCode': content.postalCode,
        'addressId': this.$route.query.addressId ? this.$route.query.addressId : ''
      }
      let data = new FormData()
      data.append('jsonData', JSON.stringify(jsonData))
      data.append('flag', this.isDel ? this.isDel : this.$route.query.flag)
      data.append('memberId', this.$route.query.memberId)
      data.append('addressId', this.$route.query.addressId ? this.$route.query.addressId : '')

      this.init(data)
    }
  }
}
</script>

<style scoped>

</style>
