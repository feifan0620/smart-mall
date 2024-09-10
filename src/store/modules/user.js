export default {
  namespaced: true,
  state () {
    return {
      userInfo: {
        token: '',
        userId: ''
      }
    }
  },
  mutations: {
    setUserInfo (state, payload) {
      state.userInfo = payload
    }
  },
  actions: {},
  getters: {}
}
