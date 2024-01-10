import { request, deviceService, baseService } from '@/api/config.js'

// 获取烟感设备列表
export const getSmokeList = data => {
  return request({
    userLogin: true,
    method: 'GET',
    url: `${deviceService}/app/smoke/device/list/`,
    data
  })
}

// 车辆冲洗抓拍-冲洗记录
export const vehicleWashListItem = (params) => {
  let url = `${deviceService}/app/vehicle-wash/?`
  for (let key in params) {
    if (params[key]) {
      url += `${key}=${params[key]}&`
    }
  }
  url = url.slice(0, url.length - 1)
  return request({ url, method: 'GET' })
}

/**
 * 获取预警列表
 * @param {Object} params 过滤条件 { page, page_size }
 * @param {Object} params.deal_flag 预警状态 {0:未处理, 1:已处理}
 * @param {Object} params.warning_levels 预警等级 [1, 2, 3]
 * @param {Object} params.start_time_long 开始时间
 * @param {Object} params.end_time_long 结束时间
 * @param {Object} params.company_id 公司id
 * @param {Object} params.project_id 项目id
 * @param {Object} params.device_id 设备id
 * @param {Object} params.device_types 设备类型
 * @param {Object} params.install_place_id 安装区域id
 * @param {Object} params.national_code 区域code
 * @param {Object} params.area_type 区域类型 { 1:省, 2:市, 3:区 }
 */
export const getWarnList = (params) => {
  let url = `${deviceService}/app/warn/message/?`
  for (let key in params) {
    if (params[key]) {
      url += `${key}=${params[key]}&`
    }
  }
  url = url.slice(0, url.length - 1)
  return request({ url, method: 'GET' })
}

/**
 *  环境监测设备列表
 */
export const getEnvironmentList = params => {
  return request({
    url: `${deviceService}/app/environment/list/`,
    method: 'get',
    params
  })
}

/**
 *  环境监测 pm10差值统计
 */
export const getPanelData = params => {
  return request({
    url: `${deviceService}/app/environment/pm/`,
    method: 'GET',
    params
  })
}

/**
 *  环境监测实时数据
 */
export const getEnvironmentRealData = params => {
  return request({
    url: `${deviceService}/app/environment/real-data/`,
    method: 'GET',
    params
  })
}

/**
 *  环境排名详情
 */
export const getEnvironmentRankDetail = params => {
  return request({
    url: `${deviceService}/app/environment/rank/detail/`,
    method: 'GET',
    params
  })
}

/**
 *  环境监测扬尘数据
 */
export const getEnvironmentDustStatis = params => {
  return request({
    url: `${deviceService}/app/environment/dust/statistics/`,
    method: 'GET',
    params
  })
}

/**
 *  环境监测噪音数据
 */
export const getEnvironmentNoiseStatis = params => {
  return request({
    url: `${deviceService}/app/environment/noise/statistics/`,
    method: 'GET',
    params
  })
}

/**
 *  立即喷淋列表
 */
export const getSparyList = (params) => {
  return request({
    url: `${deviceService}/app/spray/list/`,
    method: 'GET',
    params
  })
}

// 立即喷淋操作
export const sparyNow = (data) => {
  return request({
    url: `${deviceService}/app/spray/now/time/`,
    method: 'POST',
    data
  })
}

// 结束喷淋操作
export const sparyOver = (params) => {
  return request({
    url: `${deviceService}/spray/end/`,
    method: 'GET',
    params
  })
}

// 喷淋时长列表
export const getSparyTimeList = () => {
  return request({
    url: `${baseService}/unsigned/data-dictionary/spray-config/spray-config/`,
    method: 'GET'
  })
}


/**
 *  新增或者编辑定时喷淋配置
 */
export const updateSparyConfiguration = (data) => {
  return request({
    url: `${deviceService}/app/spray/fixed/time/`,
    method: 'POST',
    data
  })
}

/**
 * 获取定时喷淋设置列表
 * @param {[number]} project_id 
 */
export const getSparyConfigList = params => {
  return request({
    url: `${deviceService}/app/spray/configuration/list/`,
    method: 'GET',
    params
  })
}

/**
 * 删除定时喷淋设置
 * @param {[number]} id 配置id 
 */
export const deleteSprayConfig = id => {
  return request({
    url: `${deviceService}/app/spray/fixed/time/${id}/`,
    method: 'delete'
  })
}

// 电表设备列表
export const getElectricList = params => {
  return request({
    method: 'GET',
    url: `${deviceService}/unsigned/elect-meter/device/list/`,
    params
  })
}

// 电表设备详情
export const getElectricDetail = id => {
  return request({
    method: 'GET',
    url: `${deviceService}/app/elect-meter/device/?device_id=${id}`
  })
}

// 电表设备监测
export const getElectricMonitor = params => {
  return request({
    method: 'GET',
    url: `${deviceService}/app/elect-meter/monitor/`,
    params
  })
}

// 电表电量使用统计
export const getElectricStatistics = params => {
  return request({
    method: 'GET',
    url: `${deviceService}/app/elect-meter/statistics/`,
    params
  })
}

// 水表设备列表
export const getWaterMeterList = params => {
  return request({
    method: 'GET',
    url: `${deviceService}/unsigned/water-meter/device/list/`,
    params
  })
}

// 水表用水监测
export const getWaterMeterMonitor = params => {
  return request({
    method: 'GET',
    url: `${deviceService}/app/water-meter/monitoring/`,
    params
  })
}

// 水表用水统计
export const getWaterMeterStatistics = params => {
  return request({
    method: 'GET',
    url: `${deviceService}/app/water-meter/water/statistics/`,
    params
  })
}

// 压力变送器设备列表
export const getPressureList = params => {
  return request({
    method: 'GET',
    url: `${deviceService}/app/pressure-transmitter/device/list/`,
    params
  })
}

// 压力变送器设备详情
export const getPressureInfo = params => {
  return request({
    method: 'GET',
    url: `${deviceService}/app/pressure-transmitter/device/info/`,
    params
  })
}

// 压力变送器设备历史数据
export const getPressureHistory = params => {
  return request({
    method: 'GET',
    url: `${deviceService}/app/pressure-transmitter/device/statistics/`,
    params
  })
}


