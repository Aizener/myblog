import request from '../request'

export const login = (params?: any) => {
  return request.post('/login', params)
}

export const getUserInfo = (params?: any) => {
  return request.post('/getUserInfo', params)
}