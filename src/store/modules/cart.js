import { getCartList } from '@/api/cart'

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
    }
  },
  getters: {
    // 购物车商品总数量
    totalCount (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 购物车商品选中数量
    totalCheckedCount (state) {
      return state.cartList.reduce((sum, item) => {
        if (item.isChecked) {
          return sum + item.goods_num
        } else {
          return sum
        }
      }, 0)
    },
    // 购物车商品总价
    totalPrice (state) {
      return state.cartList.reduce((sum, item) => {
        if (item.isChecked) {
          return sum + item.goods_num * item.goods.goods_price_max
        } else {
          return sum
        }
      }, 0).toFixed(2)
    },
    // 购物车商品全选状态，如果每一个商品都被选中了则为true，否则为false
    isCheckedAll (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
