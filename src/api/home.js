import request from '@/utils/request'

/**
 * @description 获取首页数据
 * @returns Promise
 */
export const getHomeData = () => {
  return request.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
}
