import {reading} from './index'
import {axios} from '@/utils/request'


/**
 * 获得前全部的练习组
 * @returns {AxiosPromise}
 */
export function getAllGroup() {
  return axios({
    url: reading.GetAllReadingGroup,
    method: 'get',
  })
}

/**
 * 根据组别id获得文章
 * @param parma
 * @returns {AxiosPromise}
 */
export function getCurrentContents(parma) {
  return axios({
    url: reading.GetCurrentReadings,
    method: 'post',
    data: parma
  })
}

/**
 * 获得响应文章的问题
 * @param parma
 * @returns {AxiosPromise}
 */
export function getCurrentReadingQuestions(parma) {
  return axios({
    url: reading.GetCurrentReadingQuestions,
    method: 'post',
    data: parma
  })
}

/**
 * 比较答案
 * @param parma
 * @returns {AxiosPromise}
 */
export function compareGroupAnswers(parma) {
  return axios({
    url: reading.CompareGroupAnswers,
    method: 'post',
    data: parma
  })
}

/**
 * 搜索题目组
 * @param parma
 * @returns {AxiosPromise}
 */
export function searchGroupByTitle(parma) {
  return axios({
    url: reading.SearchGroupsByTitle,
    method: 'post',
    data: parma
  })
}

/**
 * 删除题目组
 * @param parma
 * @returns {AxiosPromise}
 */
export function deleteGroupById(parma) {
  return axios({
    url: reading.DeleteGroup,
    method: 'post',
    data: parma
  })
}

/**
 * 插入历史记录
 * @param parma
 * @returns {AxiosPromise}
 */
export function insertHistory(parma) {
  return axios({
    url: reading.InsertHistory,
    method: 'post',
    data: parma
  })
}

/**
 * 获得用户的历史记录
 * @param parma
 * @returns {AxiosPromise}
 */
export function getHistory(parma) {
  return axios({
    url: reading.GetAllReadingList,
    method: 'post',
    data: parma
  })
}

/**
 * 获得list 的分析
 * @param parma
 * @returns {AxiosPromise}
 */
export function getHistoryData(parma) {
  return axios({
    url: reading.GetAllReadingListData,
    method: 'post',
    data: parma
  })
}

/**
 * 搜索题目组
 * @param parma
 * @returns {AxiosPromise}
 * @constructor
 */
export function searchReadingListData(parma) {
  return axios({
    url: reading.SearchReadingListData,
    method: 'post',
    data: parma
  })
}

/**
 * 删除历史记录
 * @param parma
 * @returns {AxiosPromise}
 */
export function deleteReadingList(parma) {
  return axios({
    url: reading.DeleteReadingList,
    method: 'post',
    data: parma
  })
}