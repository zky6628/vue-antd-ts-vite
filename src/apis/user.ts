/**
 * @file 用户接口
 * 
 * @date 2024/04/24
 */
import { proxyApis, apiV1 } from '@/apis/config'

/**
 * 基础路径
 */
export const basePath = `${proxyApis.server}${apiV1}`

export default {
  /**
   * 登录接口
   */
  login: `${basePath}user/login`,
  /**
   * 用户列表
   */
  list: `${basePath}user/list`,
  /**
   * 用户注册
   */
  register: `${basePath}user/register`,
  /**
   * 新增用户
   */
  add: `${basePath}user/add`,
  /**
   * 更新用户
   */
  update: `${basePath}user/update`,
  /**
   * 删除用户
   */
  del: `${basePath}user/del`,
}
