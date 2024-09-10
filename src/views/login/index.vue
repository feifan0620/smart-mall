<template>
  <div class="login">
    <van-nav-bar
      title="会员登录"
      left-arrow
    />

    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="phone" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" @click="getPicCode" :src="picUrl" alt="">
        </div>
        <div class="form-item">
          <input class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getSmsCode">{{ seconds === totalSeconds ? "获取验证码" : seconds + "秒后再次获取" }}</button>
        </div>
      </div>

      <div class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getSmsCode } from '@/api/login'

export default {
  name: 'LoginIndex',
  data () {
    return {
      picCode: '', // 用户输入的验证码
      picKey: '', // 图片验证码的唯一标识，用于验证用户输入的验证码是否正确
      picUrl: '', // 图片验证码的 url 地址
      phone: '', // 用户输入的手机号
      totalSeconds: 60, // 总秒数
      seconds: 60, // 当前秒数
      timer: null // 验证码再次获取计时器
    }
  },
  async created () {
    this.getPicCode()
  },
  methods: {
    // 获取图形验证码
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picKey = key // 存储唯一标识
      this.picUrl = base64 // 存储验证码图片地址
    },

    validFn () {
      const phoneReg = /^1[3456789]\d{9}$/
      const codeReg = /^\w{4}$/
      if (!phoneReg.test(this.phone)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!codeReg.test(this.picCode)) {
        this.$toast('请输入正确的验证码')
        return false
      }
      return true
    },
    // 获取短信验证码
    async getSmsCode () {
      if (!this.validFn()) {
        return
      }
      if (this.timer === null && this.totalSeconds === this.seconds) {
        const res = await getSmsCode(this.picCode, this.picKey, this.phone)
        if (res.status === 200) {
          this.$toast('验证码发送成功')
        } else {
          this.$toast('验证码发送失败')
          return
        }
        this.timer = setInterval(() => {
          this.seconds--
          if (this.seconds <= 0) {
            clearInterval(this.timer) // 清空计时器
            this.timer = null // 清空计时器 id
            this.seconds = this.totalSeconds // 归位
          }
        }, 1000)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
