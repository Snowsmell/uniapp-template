const TokenKey = 'ZA_USER_TOKEN'
const TokenNumberKey = 'ZA_USER_TOKEN_NUMBER' // token流水号
const LoggedUser = 'ZA_LOGGED_USER'
export const LoginedUserId = 'ZA_LOGINED_USER_ID'

export function setUser(value) {
  uni.setStorageSync(LoggedUser, JSON.stringify(value))
}

export function getUser() {
  return JSON.parse(uni.getStorageSync(LoggedUser))
}

export function getToken() {
  return uni.getStorageSync(TokenKey)
}

export function setToken(token) {
  uni.setStorageSync(TokenKey, token)
}

export function getTokenNumber() {
  return uni.getStorageSync(TokenNumberKey)
}

export function setTokenNumber(token) {
  uni.setStorageSync(TokenNumberKey, token)
}

export function setUserId(value) {
  try {
    uni.setStorageSync(LoginedUserId, value)
  } catch (err) {
    console.error(err)
  }
}
export function getUserId(){
  return uni.getStorageSync(LoginedUserId)
}
export function removeToken() {
  uni.removeStorageSync(TokenKey)
}

export function removeTokenNumber() {
  uni.removeStorageSync(TokenNumberKey)
}

export function removeUser(token) {
  uni.removeStorageSync(LoggedUser)
}

// 存储用户登录信息
export function setUserLogin(user) {
  setUser(user)
  setToken(user.token)
  setTokenNumber(user.serial_token_number)
  setUserId(user.user_id)
}

// 移除用户登录信息
export function removeUserLogin() {
  removeToken()
  removeTokenNumber()
  removeUser()
}

// 密码加密
export function cryptoPassword(str) {
  if (str) {
    return randomString(20) + (window.btoa ? window.btoa(str) : str)
  }
  return null
}

const serviceTel = '4008400709'
export function callServiceTel() {
  uni.makePhoneCall({
    phoneNumber: serviceTel
  })
}

// 随机字符串
export function randomString(length) {
  var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var result = ''
  for (var i = length; i > 0; --i) result += str[Math.floor(Math.random() * str.length)]
  return result
}
