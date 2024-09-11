import request from '@/utils/request'

/**
 * @description 获取分类数据
 * @returns Promise
 */
export const getCategoryData = () => {
  return request.get('/category/list')
}
