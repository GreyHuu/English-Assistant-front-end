import api from './index'
import {axios} from '@/utils/request'

/**
 *  初始化计划
 * @param parameter
 * @returns {*}
 */
export function savePlanDefault(parameter) {
  return axios({
    url: api.savePlanDefault,
    method: 'post',
    data: parameter
  })
}