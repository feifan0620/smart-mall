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
  actions: {},
  getters: {}
}
