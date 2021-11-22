import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000
});

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
});

axios.interceptors.response.use((response: AxiosResponse) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
}, (error: AxiosError) => {
  console.log('axios error:', error);
});

export default axios;
