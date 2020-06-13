import {api} from './index'
import {axios} from '@/utils/request'
/**
 * 获取全部评论
 * @param parameter
 * @returns {*}
 */
export function getAllComments() {
    return axios({
      url: api.GetAllComments,
      method: 'get'
    })
  }
  /**
 * 获取当前用户评论
 * @returns {AxiosPromise}
 */
export function getTheComments() {
  return axios({
    url: api.GetTheComments,
    method: 'post',
  })
}
/**
 * 删除当前用户的某个评论
 * @returns {AxiosPromise}
 */
export function deleteComments(paramater){
  return axios({
    url: api.DeleteTheComments,
    method: 'post',
    data: paramater
  })
}
/**
 * 用户添加评论
 * @returns {AxiosPromise}
 */
export function insertComment(paramater){
  return axios({
    url: api.InsertTheComments,
    method: 'post',
    data: paramater
  })
}
/**
 * 获得当前用户
 * @param paramater
 * @returns {AxiosPromise}
 */
export function getCurrentUsers() {
  return axios({
    url: api.UserInfo,
    method: 'get',
  })
}
