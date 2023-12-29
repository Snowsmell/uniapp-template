const HOST = {
  base: {
    'dev': 'http://test-material-api.zaiont.com',
    'sit': 'http://test-material-api.zaiont.com',
    'uat': 'http://uat-material-api.zaiont.com',
    'prod': 'https://material-api.zaiont.com'
  },
  gate: {
    'dev': 'http://test-facegate-api.zaiont.com',
    'sit': 'http://test-facegate-api.zaiont.com',
    'uat': 'http://uat-facegate-api.zaiont.com',
    'prod': 'https://facegate-api.zaiont.com'
  }
}

function getApi(service, host = 'base') {
  const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
  const ApiHost = HOST[host][env]
  return service ? `${ApiHost}/${service}/api/v1` : `${ApiHost}/api/v1`
}

export const baseService = getApi('api-base')
export const userService = getApi('api-user')
export const omsService = getApi('api-oms')
export const tmsService = getApi('api-tms')
export const gpsService = getApi('api-gps')
export const deviceService = getApi('api-device')
export const deviceReportService = getApi('api-device-report')
export const notificationService = getApi('api-notification')
export const mallService = getApi('api-mall')
export const payService = getApi('api-payment')
export const datavService = getApi('api-datav-ws')

export const gateService = getApi(null, 'gate')
export const fileService = getApi('api-file')
export { request } from '@/utils'

// 待删除 ❌
export const apiURL = service => getApi(service)
