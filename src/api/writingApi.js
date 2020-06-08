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

/**
 * 获得题库的所有题目
 * @returns {AxiosPromise}
 */
export function AddCompositionAndCount(params) {
  console.log(params)
  return axios({
    url: writing.AddCompositionAndCount,
    headers:{
      'Content-type': 'application/json'
    },
    method: 'post',
    data: params
  })
}