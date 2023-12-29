import Request from 'luch-request'

import {
  getToken,
  getTokenNumber,
  removeUserLogin
} from './auth'

const service = new Request()

service.interceptors.request.use(
	config=> {
    const unsignRegExp = /\/api\/\w+\/unsigned\//
    // const token = getToken()
		// const tokenNumber = getTokenNumber()
		const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3NrZXkiOiJ4dWtlMDQiLCJwaG9uZW51bWJlciI6IjE4NTE2MDA4MzUzIiwiaWQiOjM3NTUsInR5cGUiOjEwLCJpc3MiOiJwaW5lYXBwbGUiLCJleHAiOjE3MDUzOTY4OTd9.eXpqN1-TD_suqqJLu8Sg87-hLBjN-Qa04peLjUHeZ68'
    const tokenNumber = 1060971415353692160		
    if (!unsignRegExp.test(config.url) && !config.noRequiresAuth && token && tokenNumber) {
      config.header['Authorization'] = token
      config.header['X-Serial-Number-Id'] = tokenNumber
    }
		return config
	},
	config => {
		return Promise.reject(config)
	}
)

service.interceptors.response.use(
  response => {
    const { data, statusCode } = response
    if (statusCode >= 200 && statusCode < 300) {
      return data
    } else {
      // ❌ 错误处理
      let errMsg = data?.message || 'Error'
      // if ([501, 504, 505].includes(data.code)) {
      //   handleAuthError()
      //   if (!errMsg) errMsg = '无效的登录状态, 请重新登录'
      // }       
      uni.showToast({ title: errMsg })
      return Promise.reject(new Error(errMsg))
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service