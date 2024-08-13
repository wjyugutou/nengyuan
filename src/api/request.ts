import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import router from '@/router'

export const baseURL = import.meta.env.VITE_BASE_URL
export const uploadURL = `${baseURL}/file/upload`

const request = axios.create({
  baseURL, // url = base url + request url
  timeout: import.meta.env.DEV ? 1000 : 5000, // request timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

let loadingMap: Record<string, ReturnType<typeof ElLoading.service>> = {}

request.interceptors.request.use(
  (config) => {
    if (!config.url?.includes('upload') && !(config.data instanceof FormData)) {
      config.data = {
        // @ts-expect-error reqHdr
        reqHdr: config.reqHdr ?? {},
        reqBody: config.data,
      }
    }

    // @ts-expect-error loading存在
    if (config.loading !== false) {
      loadingMap = {
        [config.url!]: ElLoading.service({ fullscreen: true }),
      }
    }
    return config
  },
  (error) => {
    console.error(error)

    return Promise.resolve(error)
  },
)

request.interceptors.response.use(
  (response) => {
    const res = response.data

    loadingMap[response.config.url!]?.close()

    if (res instanceof Blob) {
      return response.data
    }
    else {
      if (res.resHdr.resCode === '0000') {
        // @ts-expect-error message存在
        if (response.config.message !== false) {
          ElMessage.success(res.resHdr.resMsg)
        }
      }
      else {
        ElMessage.error(res.resHdr.resMsg || '')

        console.error(res)
        if (res.resHdr.resCode === '9990_10') {
          console.error(res)
          console.log(router)
          router.replace('/login')
        }
      }
      return {
        resCode: res.resHdr.resCode,
        resMsg: res.resHdr.resMsg,
        result: res.resBody ?? {},
      }
    }
  },
  (error) => {
    console.error({ error })

    for (const iterator in loadingMap) {
      loadingMap[iterator].close()
    }

    ElMessage.error(`${error.message} 服务器错误，请重试`)
    return Promise.resolve({
      resCode: error.code,
      resMsg: error.message,
      result: {},
    })
  },
)

export interface Result<T> {
  resCode: string
  resMsg: string
  result: T
}

export interface RequestConfig {
  message?: boolean
  loading?: boolean
  reqHdr?: Record<string, any>
}

export function get<T = never>(url: string, config?: AxiosRequestConfig & RequestConfig): Promise<Result<T>> {
  return request.get(url, config)
}

export function post<T = never>(url: string, data?: any, config?: AxiosRequestConfig & RequestConfig): Promise<Result<T>> {
  return request.post(url, data, config)
}

export function put<T = never>(url: string, data?: any, config?: AxiosRequestConfig & RequestConfig): Promise<Result<T>> {
  return request.put(url, data, config)
}

export function deleteReq<T = never>(url: string, config?: AxiosRequestConfig & RequestConfig): Promise<Result<T>> {
  return request.delete(url, config)
}

export default request
