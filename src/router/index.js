import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import indexCategory from '@/components/indexCategory'
import indexTags from '@/components/indexTags'
import indexBlog from '@/components/indexBlog'
import login from '@/components/login'
import register from '@/components/register'
import resetPassword from '@/components/resetPassword'
import home from '@/components/home'
import homeUserInfoEdit from '@/components/homeUserInfoEdit'
import homeUserSafeEdit from '@/components/homeUserSafeEdit'
import homeBlogEditHtml from '@/components/homeBlogEditHtml'
import homeBlogListState from '@/components/homeBlogListState'
import homeAdminUserList from '@/components/homeAdminUserList'

Vue.use(Router)

export default new Router({
  routes: [
    // index
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
    // login
    {
      path: '/login',
      name: 'login',
      component: login
    },
    // register
    {
      path: '/register',
      name: 'register',
      component: register
    },
    // resetPassword
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: resetPassword
    },
    // home
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        isLogin: true // 需要登录
      }
    },
    // homeUser
    {
      path: '/home',
      name: 'homeUser',
      component: home,
      meta: {
        isLogin: true // 需要登录
      },
      children: [
        {
          path: 'user/info/edit',
          name: 'homeUserInfoEdit',
          component: homeUserInfoEdit,
          meta: {
            isLogin: true, // 需要登录
            keepAlive: false
          }
        },
        {
          path: 'user/safe/edit',
          name: 'homeUserSafeEdit',
          component: homeUserSafeEdit,
          meta: {
            isLogin: true, // 需要登录
            keepAlive: false
          }
        }
      ]
    },
    // homeBlog
    {
      path: '/home',
      name: 'homeBlog',
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
    },
    // homeAdminUser
    {
      path: '/home',
      name: 'homeAdminUser',
      component: home,
      meta: {
        isLogin: true // 需要登录
      },
      children: [
        {
          path: 'admin/userList',
          name: 'homeAdminUserList',
          component: homeAdminUserList,
          meta: {
            isLogin: true, // 需要登录
            keepAlive: false
          }
        }
      ]
    }
  ]
})
