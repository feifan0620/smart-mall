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
 * @description 获取购物车商品总数量
 * @returns Promise
 */
export const CartTotalCount = () => {
  return request.get('/cart/total')
}

/**
 * @description 获取购物车商品列表
 * @returns Promise
 */
export const getCartList = () => {
  return request.get('/cart/list')
}

/**
 * @description 购物车商品更新
 * @param {*} goodsId 商品 id
 * @param {*} goodsNum 商品数量
 * @param {*} goodsSkuId 商品规格 id, 默认值：0
 * @returns Promise
 */
export const updateCartItem = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

/**
 * @description 删除购物车商品
 * @param {*} cartIds
 * @returns Promise
 */
export const deleteCartItem = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
