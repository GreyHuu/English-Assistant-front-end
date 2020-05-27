import api from './index'
import { axios } from '@/utils/request'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return axios({
    url: '/auth/login',
    method: 'post',
    data: parameter
  })
}

/**
 * 测试后台跨域处理的测试接口
 * @returns {AxiosPromise}
 */
export function getAllUsers() {
  return axios({
    url: 'http://localhost:8888/users/get-all-users',
    method: 'get',
  })
}