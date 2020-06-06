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