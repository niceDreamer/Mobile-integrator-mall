import router from '../../router'
import axios from 'axios'
import store from '../../store'
import { baseUrl } from '../../assets/js/env'
import { Toast } from 'vant'
import Cookit from 'js-cookie'

axios.defaults.timeout = 10000 // 设置请求时间
axios.defaults.baseURL = baseUrl // 设置默认接口地址
axios.defaults.withCredentials = true

axios.interceptors.request.use(config => {
  store.commit('showLoading')
  return config
}, err => {
  store.commit('hideLoading')
  Toast.fail('请求超时!')
  return Promise.resolve(err)
})
axios.interceptors.response.use(data => {
  store.commit('hideLoading')
  if (data.status && data.status === 200) {
    if (data.data.success === false || data.data.success === 'false') {
      Toast.fail(data.data.msg)
    } else if (data.data.result === 0) {
      Toast.fail('检测到您还未登录,请登录后操作！')
      // 跳转登陆页
      setTimeout(() => {
        router.push({
          path: '/login',
          query: Cookit.get('onSaleBank')
        })
      }, 2000)
    }
  }
  return data
}, err => {
  store.commit('hideLoading')
  if (err.response.status === 504 || err.response.status === 404) {
    Toast.fail('服务器链接失败！')
  } else {
    Toast.fail('未知错误!')
  }
  return Promise.resolve(err)
})

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: url,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: url,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: url,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: url
  })
}
export const getRequest = (url) => {
  return axios({
    method: 'get',
    url: url
  })
}
