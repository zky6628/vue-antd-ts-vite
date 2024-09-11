/**
 * @file 角色接口
 * 
 * @date 2024/05/22
 */
import { proxyApis, apiV1 } from '@/apis/config'

/**
 * 基础路径
 */
export const basePath = `${proxyApis.server}${apiV1}`

export default {
  /**
   * 角色列表
   */
  list: `${basePath}role/list`,
  /**
   * 新增角色
   */
  add: `${basePath}role/add`,
  /**
   * 更新角色
   */
  update: `${basePath}role/update`,
  /**
   * 删除角色
   */
  del: `${basePath}role/del`,
}
