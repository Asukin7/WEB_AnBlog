import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import indexCategory from '@/components/indexCategory'
import indexTags from '@/components/indexTags'
import indexBlog from '@/components/indexBlog'
import login from '@/components/login'
import home from '@/components/home'
import homeBlogEditHtml from '@/components/homeBlogEditHtml'
import homeBlogListState from '@/components/homeBlogListState'

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
        },
        {
          path: 'indexBlog/:id',
          name: '博客',
          component: indexBlog
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
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        isLogin: true // 需要登录
      },
      children: [
        {
          path: 'blog/edit/html',
          name: 'homeBlogEditHtmlInsert',
          component: homeBlogEditHtml,
          meta: {
            isLogin: true, // 需要登录
            keepAlive: false
          }
        },
        {
          path: 'blog/edit/html/:id',
          name: 'homeBlogEditHtmlUpdate',
          component: homeBlogEditHtml,
          meta: {
            isLogin: true, // 需要登录
            keepAlive: false
          }
        },
        {
          path: 'blogList/state/0',
          name: 'homeBlogListState0',
          component: homeBlogListState,
          meta: {
            isLogin: true, // 需要登录
            keepAlive: false
          }
        },
        {
          path: 'blogList/state/1',
          name: 'homeBlogListState1',
          component: homeBlogListState,
          meta: {
            isLogin: true, // 需要登录
            keepAlive: false
          }
        },
        {
          path: 'blogList/state/2',
          name: 'homeBlogListState2',
          component: homeBlogListState,
          meta: {
            isLogin: true, // 需要登录
            keepAlive: false
          }
        }
      ]
    }
  ]
})
