export { default as request } from './request'

/**
 * 随机生成8位字符串
 * @returns 
 */
export const randomStr = () => Math.floor(Math.random() * Date.now()).toString(36)