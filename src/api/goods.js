import request from '@/utils/request'

/**
 * @description 搜索商品
 * @param {object} obj
 * @returns Promise
 */
export const getGoodsList = (obj) => {
  const { categoryId, goodsName, page, sortType, sortPrice } = obj
  return request.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page,
      sortType,
      sortPrice
    }
  })
}
