import api from './index'
import {axios} from '@/utils/request'

/**
 * 登录
 * parameter: {
 *     phone: '',
 *     password: '',
 * }
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
 * 测试后台跨域处理的测试接口
 * @returns {AxiosPromise}
 */
export function getAllUsers() {
  return axios({
    url: api.GetAllUser,
    method: 'get',
  })
}