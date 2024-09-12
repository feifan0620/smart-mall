import request from '@/utils/request'

/**
 * @description 获取用户信息
 * @returns Promise
 */
export const getUserInfoDetail = () => {
  return request.get('/user/info')
}
