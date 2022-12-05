import Cookies from 'js-cookie';

const TokenKey = 'token'
const UserINfoKey = 'UserINfo'

export function getToken() {
  return Cookies.get(TokenKey) || ''
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token || '')
}

export function removeToken() {
  Cookies.remove(TokenKey)
}

export function setUserINfo(UserINfo: object) {
  return Cookies.set(UserINfoKey, JSON.stringify(UserINfo) || '')
}

export function getUserINfo() {
  return Cookies.get(UserINfoKey) || ''
}

export function removeUserinfo() {
  Cookies.remove(UserINfoKey)
}
