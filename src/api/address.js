import request from '@/utils/request'

/**
 * @description 获取收货地址列表
 * @returns Promise
 */
export const getAddressList = () => {
  return request.get('/address/list')
}
