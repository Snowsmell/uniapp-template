import { request, userService, deviceService } from '@/api/config.js'
export * from '@/api/modules/environment.js'

// 获取应用
export const getApplictions = params => {
	return request({
    url: `${userService}/app/application/list/`,
    method: 'get',
    params
  })
}

// 获取视频监控安装地点

export const getVideoLocation = params => {
  return request({
    url: `${deviceService}/app/video/project/location/list/`,
    method: 'get',
    params
  })
}

export const getVideoLocationDevice = params => {
  return request({
    url: `${deviceService}/app/video/install/location/device/list/`,
    method: 'get',
    params
  })
}

/**
 * 监控信息
 * @param {*} params.device_number
 * @param {*} params.channel_number 
 * @returns 
 */
export function getMonitorDeviceDetail(params) {
  return request({
    url: `${deviceService}/video/live-url/`,
    method: 'get',
    params
  })
}

