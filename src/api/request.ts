import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

export const baseURL = ''
export const uploadURL = `${baseURL}/file/upload`

const request = axios.create({
  baseURL,
  timeout: import.meta.env.DEV ? 1000 : 5000, // request timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

request.interceptors.request.use(
  (config) => {
    if (!config.url?.includes('upload') && !(config.data instanceof FormData)) {
      config.data = {
        reqBody: config.data,
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

    if (res instanceof Blob) {
      return response.data
    }
    else {
      if (res.resHdr.resCode === '0000') {
        // @ts-expect-error message存在
        if (response.config.message !== false) {
          // ElMessage.success(res.resHdr.resMsg)
        }
      }
      else {
        console.error(res)
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
