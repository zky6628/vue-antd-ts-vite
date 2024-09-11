/**
 * @file API配置
 * 
 * @date 2024/04/24
 */

import type { ApiServers } from './types/config.types'

/**
 * 所有服务的地址
 */
const servers: ApiServers = {
  DEV: {
    server: 'http://localhost:3000/'
  },
  QAS: {
    server: 'http://localhost:3000/'
  },
  UAT: {
    server: 'http://localhost:3000/'
  },
  PRD: {
    server: 'http://localhost:3000/'
  }
}

export const proxyApis = servers[import.meta.env.VITE_API]

/**
 * 第一版接口基础路径
 */
export const apiV1 = 'v1/'
// 更多版本接口基础路径...
