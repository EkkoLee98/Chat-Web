import axios, { type AxiosResponse } from 'axios'
import { useAuthStore } from '@/store'
import axiosRetry from 'axios-retry';
const service = axios.create({
  // 填入你的服务器ip
  baseURL: 'https://enenzy.club:3006/api'
})
export const service2 = axios.create({
  // 填入你的服务器ip
  baseURL: 'https://enenzy.club:3006/api'
})
axiosRetry(service, { retries: 3, retryDelay: () => 500 });
axiosRetry(service2, { retries: 3, retryDelay: () => 500 });
export const changeService = (api: string) => {
  // 更改 baseURL 并进行请求
  service2.defaults.baseURL = api
}
service.interceptors.request.use(
  (config) => {
    const token = useAuthStore().token
    if (token)
      config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.status === 200)
      return response

    throw new Error(response.status.toString())
  },
  (error) => {
    return Promise.reject(error)
  },
)
service2.interceptors.request.use(
  (config) => {
    const token = useAuthStore().token
    if (token)
      config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  },
)

service2.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.status === 200)
      return response

    throw new Error(response.status.toString())
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default service
