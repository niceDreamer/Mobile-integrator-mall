import Vue from 'vue'
import { Toast } from 'vant'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import VueLazyload from 'vue-lazyload'
import { getRequest, postRequest, deleteRequest, putRequest, uploadFileRequest } from './assets/js/api'
import Cookies from 'js-cookie'

Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.uploadFileRequest = uploadFileRequest

Vue.config.productionTip = false
Vue.use(VueLazyload)

// 跳转之前
router.beforeEach((to, from, next) => {
  // if (to.meta.title) {
  //   document.title = to.meta.title
  // }
  const type = to.meta.type
  // 判断该路由是否需要登录权限
  if (type === 'login') {
    let userInfo = Cookies.get('userInfo')
    if (userInfo) {
      console.log('登陆中...')
      next()
    } else {
      Toast('检测到您还未登录,请登录后操作！')
      next({
        name: 'login',
        query: {
          onSaleBank: Cookies.get('onSaleBank')
        }
      })
    }
  } else {
    // 确保一定要有next()被调用
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
