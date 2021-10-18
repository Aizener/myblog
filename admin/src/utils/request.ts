import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus';

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'ip'

const instance = Axios.create({
  baseURL,
  timeout: 5000
})

interface ResponseType {
  code: number,
  msg: string,
  data: { [propName: string]: any }
}

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  console.log('config:', config)
  return config
})

instance.interceptors.response.use((response: AxiosResponse<ResponseType>): any => {
  const res = response.data
  return res
}, (error: any) => {
  ElMessage.error('服务端错误');
  return Promise.reject(error)
})

export default instance
