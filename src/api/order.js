import request from '@/utils/request'

/**
 * @description 订单结算
 * @param {*} mode 结算模式（buyNow立即购买 cart购物车）
 * @param {*} cartIds 购物车ID集
 * @returns Promise
 */
export const checkoutOrder = (mode, cartIds) => {
  return request.get('/checkout/order', {
    params: {
      mode, // 结算模式（buyNow立即购买 cart购物车）
      cartIds, // 购物车ID集
      delivery: 10, // 10 快递运输 20 到店自提
      shopId: 0, // 不到店自提
      couponId: 0, // 不使用优惠券
      isUsePoints: 0 // 不使用积分
    }
  })
}
