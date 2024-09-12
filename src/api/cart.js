import request from '@/utils/request'

/**
 * @description 添加商品到购物车
 * @param {*} goodsId 商品ID
 * @param {*} goodsNum 商品数量
 * @param {*} goodsSkuId 商品SKUID
 * @returns Promise
 */
export const addToCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

/**
 * @description 获取购物车商品列表
 * @returns Promise
 */
export const getCartList = () => {
  return request.get('/cart/list')
}
