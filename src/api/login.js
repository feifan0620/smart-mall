// 导入自定义 axios 请求实例
import request from '@/utils/request'

/**
 * @description 获取图形验证码
 * @returns Promise
 */
export const getPicCode = () => {
  return request.get('/captcha/image')
}

/**
 * @description 获取短信验证码
 * @returns Promise
 */
export const getSmsCode = (captchaCode, captchaKey, mobile) => {
  return request.get('/captcha/sendSmsCaptcha', {
    captchaCode,
    captchaKey,
    mobile
  })
}
