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
 * 根据组别id获得问题
 * @param parma
 * @returns {AxiosPromise}
 */
export function getCurrentQuestions(parma) {
  return axios({
    url: reading.GetCurrentReadings,
    method: 'post',
    data: parma
  })
}