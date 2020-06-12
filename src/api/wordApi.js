import {api} from './index'
import {axios} from '@/utils/request'


/**
 *  查询单词
 * @param parameter
 * @returns {*}
 */
export function queryWordList(parameter) {
  return axios({
    url: api.GetWordList,
    method: 'get',
    data: parameter
  })
}

