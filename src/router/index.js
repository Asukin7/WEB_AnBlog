import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import indexCategory from '@/components/indexCategory'
import indexTags from '@/components/indexTags'
import login from '@/components/login'
import home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: index,
      children: [
        {
          path: '',
          name: '首页',
          component: indexCategory
        },
        {
          path: 'indexTags',
          name: '标签',
          component: indexTags
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        isLogin: true // 需要登录
      }
    }
  ]
})
