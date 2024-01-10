// 系统环境变量
const APP_ENV = 'production'
// build模式
const APP_MODE = 'production'
// 运行时环境
const APP_RUNTIME = 'app'
// 企业平台
const APP_PLATFORM = 'zaiont'
// ! [注:]以上常量暂未使用, 仅备注

// Java接口
const APP_BASE_API = {
  development: 'http://test-material-api.zaiont.com',
  staging: 'http://uat-material-api.zaiont.com',
  production: 'http://material-api.zaiont.com'
}
// python接口
const APP_STAFF_API = {
  development: 'http://test-facegate-api.zaiont.com',
  staging: 'http://uat-facegate-api.zaiont.com',
  production: 'http://facegate-api.zaiont.com'
}

// 平台环境 url
const APP_MANAGE_URL = {
  development: 'http://test-material-manage.zaiont.com',
  production: 'http://material-manage.zaiont.com'
}
const APP_BUSINESS_URL = {
  development: 'http://test-material-business.zaiont.com',
  production: 'http://material-business.zaiont.com'
}
const APP_DATAV_URL = {
  development: 'http://test-datav.zaiont.com',
  production: 'http://datav.zaiont.com'
}
const APP_MOBILE_URL = {
  development: 'http://test-material-app.zaiont.com',
  staging: 'http://uat-material-api.zaiont.com',
  production: 'http://material-app.zaiont.com'
}
const APP_H5_URL = {
  development: 'http://test-material-h5.zaiont.com',
  production: 'http://material-h5.zaiont.com'
}

// 文件预览
const APP_FILE_VIEW_URL = 'http://static.zaiont.com/app/WebViewer/view.html'
// 监控播放器
const APP_MONITOR_DOMAIN = 'http://www.zaiont.com'

/*****************************************************************************
 * 无锡新吴 (公众号)
*/
const APP_XINWU_API = {
  development: 'http://47.110.95.13:30099',
  production: 'http://116.62.56.9:30099'
}

/*****************************************************************************
 * 移动信息港 (智荟筑)
*/
const APP_BASE_API_ydxxg = {
  development: 'http://118.31.32.153:8000/gateway',
  production: 'http://118.31.32.153:8000/gateway'
}
const APP_STAFF_API_ydxxg = {
  development: 'http://118.31.32.153:8000/rms',
  production: 'http://118.31.32.153:8000/rms'
}
const APP_MANAGE_URL_ydxxg = {
  development: 'http://118.31.32.153:8000/manage',
  production: 'http://118.31.32.153:8000/manage'
}
const APP_BUSINESS_URL_ydxxg = {
  development: 'http://118.31.32.153:8000/business',
  production: 'http://118.31.32.153:8000/business'
}
const APP_DATAV_URL_ydxxg = {
  development: 'http://118.31.32.153:8000/datav',
  production: 'http://118.31.32.153:8000/datav'
}
const APP_MOBILE_URL_ydxxg = {
  development: 'http://118.31.32.153:8080',
  production: 'http://118.31.32.153:8080'
}
const APP_H5_URL_ydxxg = {
  development: 'http://118.31.32.153:8000/h5',
  production: 'http://118.31.32.153:8000/h5'
}

// export
module.exports = {
  APP_ENV,
  APP_MODE,
  APP_RUNTIME,
  APP_PLATFORM,
  APP_FILE_VIEW_URL,
  APP_MONITOR_DOMAIN,
  APP_BASE_API,
  APP_STAFF_API,
  APP_MANAGE_URL,
  APP_BUSINESS_URL,
  APP_DATAV_URL,
  APP_MOBILE_URL,
  APP_H5_URL,

  APP_XINWU_API,
  
  APP_BASE_API_ydxxg,
  APP_STAFF_API_ydxxg,
  APP_MANAGE_URL_ydxxg,
  APP_BUSINESS_URL_ydxxg,
  APP_DATAV_URL_ydxxg,
  APP_MOBILE_URL_ydxxg,
  APP_H5_URL_ydxxg
}
