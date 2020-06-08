import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import {VueAxios} from './axios'
import {ACCESS_TOKEN, SESSION_ID} from '@/store/mutation-types'
import router from '@/router'
// 创建 axios 实例
const service = axios.create({
  withCredentials: true,  //允许cookie
  // baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 6000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN);
    if (error.response.status === 403) {
      notification.error({
        message: '禁止访问',
        description: data.message
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          router.push({path: "/user"});
          console.log("注销");
        })
      }
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.destroy();
      notification.error({
        message: '无访问权限',
        description: '请先登录，再进行访问'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          router.push({path: "/user"});
          console.log("注销");
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  const session = Vue.ls.get(SESSION_ID)
  if (token) {
    config.headers['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  if (session) {
    config.headers['Session_Id'] = session // 让每个请求携带自定义 session_id 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  const {code, message} = response.data;
  if (parseInt(code) !== 100) {
    notification.error({
      message: '错误',
      description: message || '请求出现错误，请稍后再试',
      duration: 4
    })
    return {};
  } else {
    return response.data
  }

}, err)

const installer = {
  vm: {},
  install(Vue) {
    service.defaults.withCredentials = true;
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
