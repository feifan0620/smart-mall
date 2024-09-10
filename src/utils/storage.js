const INFO_KEY = 'smart_mall_info'

// 获取用户信息
export const getInfo = () => {
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : { token: '', userId: '' }
}

// 存储用户信息
export const setInfo = (userInfo) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(userInfo))
}

// 移除用户信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}
