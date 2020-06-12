import { writing } from './index'
import {axios, AxiosPromise} from '@/utils/request'


/**
 * 获得题库的所有题目
 * @returns {AxiosPromise}
 */
export function getAllCompositions() {
  return axios({
    url: writing.getAllCompositions,
    method: 'get',
  })
}

/**
 * 获得题库的所有题目
 * @param params
 * @returns {AxiosPromise}
 * @constructor
 */
export function addCompositionAndCount(params) {
  console.log("传给后台的mycpt：： "+params.params.mycpt)
  return axios({
    url: writing.addCompositionAndCount +'/'+params.cpt_id+'/'+params.cpt_reference,
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
 * @param params
 * @returns {AxiosPromise}
 */
export function deleteMyCompositionById(params) {
  return axios({
    url: writing.deleteMyCompositionById,
    method: 'post',
    data: params
  })
}

/**
 *查询一篇我的作文
 * @param params
 * @returns {AxiosPromise}
 */
export function getAnExistingComposition(params) {
  // console.log('++++++++++++++++++++'+params.mycpt_id);
  return axios({
    url: writing.getAnExistingComposition,
    method: 'post',
    data: params
  })
}

/**
 *修改作文
 * @param params
 * @returns {AxiosPromise}
 */
export function updateMyComposition(params) {
  // console.log('++++++++++++++++++++'+params.mycpt_id);
  return axios({
    url: writing.updateMyComposition,
    method: 'post',
    data: params
  })
}

/**
 * 通过关键字搜索作文题目和要求
 * @param params
 * @returns {AxiosPromise}
 */
export  function getCompositionQuestionByKeyword(params) {
  console.log('传到后台的参数： '+JSON.stringify(params));
  return axios({
    url: writing.getCompositionQuestionByKeyword,
    method: 'post',
    data: params
  })

}