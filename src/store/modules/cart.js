import { getCartList, updateCartItem, deleteCartItem } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    // 设置购物车列表
    setCartList (state, newCartList) {
      state.cartList = newCartList
    },
    // 设置购物车商品选中状态
    setCartItemChecked (state, goodsId) {
      const item = state.cartList.find(item => item.goods_id === goodsId)
      item.isChecked = !item.isChecked
    },
    // 设置购物车商品全选状态
    setCartItemCheckedALL (state, allCheckedState) {
      state.cartList.forEach(item => {
        item.isChecked = !allCheckedState
      })
    },
    // 设置购物车商品数量
    setCartItemCount (state, payload) {
      const goods = state.cartList.find(item => item.goods_id === payload.goodsId)
      goods.goods_num = payload.goodsNum
    }
  },
  actions: {
    // 获取购物车列表
    async getCartListAsync (context) {
      const { data } = await getCartList()
      data.list.forEach(item => {
        item.isChecked = false
      })
      context.commit('setCartList', data.list)
    },
    // 设置购物车商品数量
    async setCartItemCountAsync (context, payload) {
      const { id, num, skuId } = payload
      await updateCartItem(id, num, skuId)
      context.commit('setCartItemCount', { goodsId: id, goodsNum: num })
    },
    // 删除购物车商品
    async delCartItemAsync (context) {
      const selGoodsList = context.getters.cartCheckedItemList
      const cartIds = selGoodsList.map(item => item.id)
      await deleteCartItem(cartIds)
      await context.dispatch('getCartListAsync')
      Toast.success('删除成功')
    }
  },
  getters: {
    // 购物车商品总数量
    totalCount (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 购物车选中商品列表
    cartCheckedItemList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 购物车选中商品数量
    totalCheckedCount (state, getters) {
      return getters.cartCheckedItemList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 购物车选中商品总价
    totalPrice (state, getters) {
      return getters.cartCheckedItemList.reduce((sum, item) => {
        return sum + item.goods_num * item.goods.goods_price_max
      }, 0).toFixed(2)
    },
    // 购物车商品全选状态，如果每一个商品都被选中了则为true，否则为false
    isCheckedAll (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
