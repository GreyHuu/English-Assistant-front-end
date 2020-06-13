import {api} from './index'
import {axios} from '@/utils/request'

/**
 * 登录
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
  return axios({
    url: api.Login,
    method: 'post',
    data: parameter
  })
}

/**
 * 通过手机验证码登录
 * @param parameter
 * @returns {AxiosPromise}
 */
export function loginByPhone(parameter) {
  return axios({
    url: api.LoginByPhone,
    method: 'post',
    data: parameter
  })
}

/**
 * 发送手机号 获得验证码
 * @param parameter
 * @returns {AxiosPromise}
 */
export function getSmsCaptcha(parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

/**
 * 匹配验证码
 * @param parameter
 * @returns {AxiosPromise}
 */
export function compareCode(parameter) {
  return axios({
    url: api.CompareSms,
    method: 'post',
    data: parameter
  })
}

/**
 * 注册
 * @param paramater
 * @returns {AxiosPromise}
 */
export function register(paramater) {
  return axios({
    url: api.Register,
    method: "post",
    data: paramater
  })
}

/**
 * 注销登录
 * @returns {AxiosPromise}
 */
export function logout() {
  return axios({
    url: api.Logout,
    method: "get"
  })
}

/**
 * 获得当前的用户
 */
export function getCurrentUser() {
  return axios({
    url: api.GetCurrentUser,
    method: 'get',
  })
}


export function updateUser(params) {
  return axios({
    url: api.UpdateUser,
    method: 'post',
    data: params
  })
}

/**
 * 测试后台跨域处理的测试接口
 * @returns {AxiosPromise}
 */
export function getAllUsers() {
  return axios({
    url: api.GetAllUser,
    method: 'get',
  })
}


