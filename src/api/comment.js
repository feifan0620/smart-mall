import requsert from '@/utils/request'

/**
 * @description 获取商品评论
 * @param {*} goodsId 商品id
 * @param {*} limit 获取评论数量
 * @returns Promise
 */
export const getCommentList = (goodsId) => {
  return requsert.get('/comment/list', {
    params: {
      goodsId,
      limit: 3
    }
  })
}
