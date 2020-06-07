import { writing } from './index'
import {axios} from '@/utils/request'


/**
 * 获得题库的所有题目
 * @returns {AxiosPromise}
 */
export function GetAllCompositions() {
  return axios({
    url: writing.GetAllCompositions,
    method: 'get',
  })
}