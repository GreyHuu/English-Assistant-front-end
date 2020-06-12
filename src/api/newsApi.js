import {api} from './index'
import {axios} from '@/utils/request'

/**
 * 获取全部的新闻数据
 * @returns {AxiosPromise}
 */
export function getAllNews() {
    return axios({
      url: api.GetAllNews,
      method: 'get',
    })

  }