/**
 * @file axios的封装
 * 
 * @date 2024/04/24
 */
import axios from 'axios'
import { Modal, message } from 'ant-design-vue'
import { useUserStore } from '@/stores/user'

// 用于取消请求
const CancelToken = axios.CancelToken
const source = CancelToken.source()

// 创建 axios 实例
const service = axios.create({
  cancelToken: source.token
})

// 在发送请求之前做某件事(添加请求拦截器)
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const token = userStore.user?.token
    if (token) {
      // 让每个请求默认携带自定义 token，如果请求自己设置有就会覆盖默认的这个， 请根据实际情况自行修改
      config.headers.Authorization = `Bearer ${token}`
    }
    if (config.method === 'get') {
      config.params = {
        _: ((new Date().getTime() / 60) * 1000).toFixed(0), // get方法加时间标识，60秒外防止缓存
        ...config.params
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 返回状态判断(添加响应拦截器)
service.interceptors.response.use(
  (response) => {
    // OK 200 请求数据成功/更新成功
    // Created 201 创建成功
    // No Content 204 删除成功

    const { data } = response
    return data
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response
      switch (status) {
        case 403:
          message.error('拒绝访问')
          break
        case 500:
          message.error('网络似乎有点问题！', 4)
          break
        case 404:
          message.error('很抱歉，资源未找到!', 4)
          break
        case 504:
          message.error('网络超时', 4)
          break
        case 401:
          Modal.error({
            title: '登录已过期',
            content: '很抱歉，登录已过期，请重新登录',
            okText: '重新登录',
            mask: false,
            onOk: () => {
              const userStore = useUserStore()
              userStore.setUser()
              //跳转到登录页面
              window.location.href = '/login'
            }
          })
          source.cancel('登录过期取消所有请求')
          break
        default:
          if (data.errors && data.errors[0] && data.errors[0].msg) {
            message.error(data.errors[0].msg, 4)
          } else {
            message.error('似乎有点问题！', 4)
          }
          break
      }
    }
    return Promise.reject(error)
  }
)
/**
 * 封装过的axios
 */
export const http = service

/**
 * 封装过的axios.get
 */
export const get = service.get

/**
 * 封装过的axios.post
 */
export const post = service.post

/**
 * 封装过的axios.patch
 */
export const patch = service.patch

/**
 * 封装过的axios.delete
 */
export const del = service.delete

export default service
