import axios from 'axios'

import {
  getToken,
  getTokenNumber,
  removeUserLogin
} from './auth'

// 处理app&小程序
axios.defaults.adapter = function(config) {
  return new Promise((resolve, reject) => {
      console.log({ config })
      var settle = require('axios/lib/core/settle');
      var buildURL = require('axios/lib/helpers/buildURL');
      uni.request({
          method: config.method.toUpperCase(),
          url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
          header: config.headers,
          data: config.data,
          dataType: config.dataType,
          responseType: config.responseType,
          sslVerify: config.sslVerify,
          complete: function complete(response) {
              response = {
                  data: response.data,
                  status: response.statusCode,
                  errMsg: response.errMsg,
                  header: response.header,
                  config: config
              };

              settle(resolve, reject, response);
          }
      })
  })
}

const service = axios.create({
  baseURL: '',
  timeout: 15000
})

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
    console.log({ response })
    const { data, status } = response
    if (status >= 200 && status < 300) {
      return data
    } else {
      // ❌ 错误处理
      let errMsg = data?.message || 'Error'
      // if ([501, 504, 505].includes(data.code)) {
      //   handleAuthError()
      //   if (!errMsg) errMsg = '无效的登录状态, 请重新登录'
      // }       
      uni.showToast({ title: errMsg })
      return Promise.reject(errMsg)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
