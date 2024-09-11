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

/**
 * @description 获取商品详情
 * @param {number} goodsId
 * @returns Promise
 */
export const getGoodsDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}
