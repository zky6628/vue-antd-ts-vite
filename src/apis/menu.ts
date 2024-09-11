/**
 * @file 菜单接口
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
   * 菜单列表
   */
  list: `${basePath}menu/list`,
  /**
   * 新增菜单
   */
  add: `${basePath}menu/add`,
  /**
   * 更新菜单
   */
  update: `${basePath}menu/update`,
  /**
   * 删除菜单
   */
  del: `${basePath}menu/del`,
}
