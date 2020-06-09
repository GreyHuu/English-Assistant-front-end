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
  return axios({
    url: writing.AddCompositionAndCount+'/'+params.cpt_id+'/'+params.cpt_reference,
    method: 'post',
    data: params.params
  })
}

/**
 * 获取我的所有作文
 * @returns {AxiosPromise}
 */
export function getAllMyCompositions() {
  return axios({
    url: writing.getAllMyCompositions,
    method: 'get',
  })
}


/**
 * 删除一篇我的作文
 * @returns {AxiosPromise}
 */
export function deleteMyCompositionById(params) {
  return axios({
    url: writing.deleteMyCompositionById,
    method: 'post',
    data: params
  })
}