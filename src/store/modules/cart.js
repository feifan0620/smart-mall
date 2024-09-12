import { getCartList } from '@/api/cart'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    setCartList (state, newCartList) {
      state.cartList = newCartList
    },
    setCartItemChecked (state, goodsId) {
      const item = state.cartList.find(item => item.goods_id === goodsId)
      item.isChecked = !item.isChecked
    },
    setCartItemCheckedALL (state, checkedALL) {
      state.cartList.forEach(item => {
        item.isChecked = !checkedALL
      })
    },
    setCartItemCount (state, payload) {
      const goods = state.cartList.find(item => item.goods_id === payload.goodsId)
      goods.goods_num = payload.goodsNum
    }
  },
  actions: {
    async getCartListAsync (context) {
      const { data } = await getCartList()
      data.list.forEach(item => {
        item.isChecked = false
      })
      context.commit('setCartList', data.list)
    }
  },
  getters: {
    totalCount (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    totalCheckedCount (state) {
      return state.cartList.reduce((sum, item) => {
        if (item.isChecked) {
          return sum + item.goods_num
        } else {
          return sum
        }
      }, 0)
    },
    totalPrice (state) {
      return state.cartList.reduce((sum, item) => {
        if (item.isChecked) {
          return sum + item.goods_num * item.goods.goods_price_max
        } else {
          return sum
        }
      }, 0)
    }
  }
}
