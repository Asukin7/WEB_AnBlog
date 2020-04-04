import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 属性
  state: {
    // token
    token: null
  },
  // 获取属性
  getters: {
    // 获取token
    token: state => state.token
  },
  // 设置属性
  mutations: {
    // 设置token
    setToken (state, token) {
      state.token = token
      localStorage.setItem('token', token)
    }
  },
  // 应用mutations
  actions: {
    // 登录
    login ({commit}, token) {
      commit('setToken', token)
    },
    // 注销
    logout ({commit}) {
      commit('setToken', null)
    }
  }
})

export default store
