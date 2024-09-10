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
 * @param {*} captchaCode 图形验证码
 * @param {*} captchaKey 图形验证码key
 * @param {*} mobile 接收验证码手机
 * @returns Promise
 */
export const getSmsCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    captchaCode,
    captchaKey,
    mobile
  })
}

/**
 * @description 手机验证码登录
 * @param {*} mobile 手机号
 * @param {*} smsCode 短信验证码， 测试环境验证码为：246810
 * @returns Promise
 */
export const mobileCodeLogin = (mobile, smsCode) => {
  return request.post('https://apifoxmock.com/m1/4928016-4585237-default/data', {
    isParty: false,
    mobile,
    smsCode
  })
}
