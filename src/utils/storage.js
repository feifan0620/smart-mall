const INFO_KEY = 'smart_mall_info'
const HISTORY_KEY = 'smart_mall_search_history'

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

// 获取搜索历史
export const getSearchHistory = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}

// 设置搜索历史
export const setSearchHistory = (history) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}
