import Vue from 'vue'
import App from './App'
import router from './router'
import {getRequest, postRequest, putRequest, deleteRequest} from './request'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

Vue.use(ViewUI)
Vue.config.productionTip = false
Vue.prototype.$get = getRequest
Vue.prototype.$post = postRequest
Vue.prototype.$put = putRequest
Vue.prototype.$delete = deleteRequest

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  // 获取token
  let token = localStorage.getItem('token')
  // token 存在且不为空则已登录 不存在或为空则未登录
  if (token !== null && token !== '') { // 已登录
    next()
  } else { // 未登录
    // 用户进入需要登录的页面，则跳转登录界面
    if (to.meta.isLogin) {
      next({
        path: '/login'
      })
      ViewUI.Message.info('请登录')
    // 用户进入无需登录的界面，则继续
    } else {
      next()
    }
  }
})

router.afterEach(route => {
  window.scroll(0, 0)
})
