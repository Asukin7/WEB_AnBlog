import axios from 'axios'
// import qs from 'qs'
import router from '../router'

// 创建axios实例
var instance = axios.create()

instance.defaults.baseURL = 'http://localhost:8081/AnBlog'
// instance.defaults.baseURL = 'https://nnsststt.cn/AnBlog'
instance.defaults.timeout = 60000

// 请求拦截器
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token !== null & token !== '') {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  response => {
    errorHandle(response.data.code, response.data.message)
    return response
  },
  // 请求失败
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

/**
* 请求失败后的错误统一处理
* code 状态码
* message 消息
*/
const errorHandle = (code, message) => {
  // 状态码判断
  switch (code) {
    case 0: { // 请求成功
      break
    }
    case 2: { // 身份验证异常
      logout()
      break
    }
    default: {
      console.log(message)
    }
  }
}

const logout = () => {
  // 注销并删除token
  localStorage.removeItem('token')
  // 跳转登录页面
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

export const getRequest = (url, data) => instance.get(url, data)
export const postRequest = (url, data) => instance.post(url, data)
export const putRequest = (url, data) => instance.put(url, data)
export const deleteRequest = (url, data) => instance.delete(url, data)
