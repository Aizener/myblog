import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'ip'

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
  return Promise.reject(error)
})

export default instance
