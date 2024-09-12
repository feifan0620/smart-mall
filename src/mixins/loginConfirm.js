export default {
  methods: {
    loginConfirm () {
      const token = this.$store.getters.token
      // 未登录
      if (!token) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '请登录后再继续操作哦~',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        }).then(() => {
          this.$router.replace({
            path: '/login',
            query: {
              // fullPath 当前路由地址(带查询参数)
              redirectUrl: this.$route.fullPath
            }
          })
        }).catch(() => {})
        return true
      }
      return false
    }
  }
}
