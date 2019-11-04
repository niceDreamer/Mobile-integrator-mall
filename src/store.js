import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    LOADING: false,
    userInfo: '' // 用户信息
  },
  getters: {
    // 获取用户信息
    GET_LOGIN (state) {
      return state.userInfo ? state.userInfo : JSON.parse(Cookie.get('userInfo'))
    }
  },
  mutations: {
    showLoading (state) {
      state.LOADING = true
    },
    hideLoading (state) {
      state.LOADING = false
    },
    // 存取商户信息
    SET_LOGIN (state, platform) {
      state.userInfo = platform
    }
  },
  actions: {
    // 写入商户信息
    setLogin ({ commit }, platform) {
      commit('SET_LOGIN', platform)
    }
  }
})
