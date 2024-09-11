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
  const myHeaders = new Headers()
  myHeaders.append('User-Agent', 'Apifox/1.0.0 (https://apifox.com)')
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Accept', '*/*')
  myHeaders.append('Host', 'smart-shop.itheima.net')
  myHeaders.append('Connection', 'keep-alive')
  myHeaders.append('Cookie', 'acw_tc=1a0c399c17260602826967593e0037f5142f0e19b69916e55a5cf1bc8c80a3')

  const raw = JSON.stringify({
    form: {
      smsCode,
      mobile,
      isParty: false,
      partyData: {}
    }
  })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  // 返回一个Promise
  return fetch('http://smart-shop.itheima.net/index.php?s=/api/passport/login', requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return response.text()
    })
    .then(result => {
      return JSON.parse(result)
    })
    .catch(error => {
      console.error('Fetch request failed:', error)
      throw error
    })
}
