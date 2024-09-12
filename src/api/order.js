import request from '@/utils/request'

/**
 * @description 订单结算
 * @param {*} mode 结算模式（buyNow立即购买 cart购物车）
 * @param {*} obj 其它参数
 * @returns Promise
 */
export const checkoutOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // 结算模式（buyNow立即购买 cart购物车）
      delivery: 10, // 10 快递运输 20 到店自提
      shopId: 0, // 不到店自提
      couponId: 0, // 不使用优惠券
      isUsePoints: 0, // 不使用积分
      ...obj
    }
  })
}

/**
 * @description 提交订单
 * @param {*} mode 结算模式（buyNow立即购买 cart购物车）
 * @param {*} obj 其它参数
 * @returns Promise
 */
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode, // 结算模式（buyNow立即购买 cart购物车）
    delivery: 10, // 10 快递运输 20 到店自提
    couponId: 0, // 不使用优惠券
    isUsePoints: 0, // 不使用积分
    payType: 10, // 支付方式，10：余额支付
    ...obj
  })
}

/**
 * @description 获取订单列表
 * @param {*} dataType 订单类型，all-全部，payment-待支付，delivery-待发货，received-待收货，comment-待评价
 * @param {*} page 页码
 * @returns Promise
 */
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
