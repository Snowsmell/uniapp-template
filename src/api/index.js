import { request, userService } from '@/api/config.js'

// export const getApplictions = (params = { application_type_string: 0, project_id: 1408 }) => {
// 	return request.get(`${userService}/app/application/list/`, { params })
// }

// export const getBanners = () => {
// 	return request.get(`${userService}/unsigned/banner/banners/1/`)
// }
export const getApplictions = (params = { application_type_string: 0, project_id: 1408 }) => {
	return request({
    url: `${userService}/app/application/list/`,
    method: 'get',
    params
  })
}

export const getBanners = () => {
	return request({
    url: `${userService}/unsigned/banner/banners/1/`,
    method: 'get'
  })
}
