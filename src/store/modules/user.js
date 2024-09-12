import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      // 从本地存储获得用户信息
      userInfo: getInfo()
    }
  },
  mutations: {
    setUserInfo (state, payload) {
      state.userInfo = payload
      // 将用户信息存储到本地
      setInfo(payload)
    }
  },
  actions: {
    logout (context) {
      // 清空用户信息
      context.commit('setUserInfo', {})
      // 调用 cart 的方法，清空购物车( 调用其他模块的方法需要设置 root: true )
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {}
}
