/**
 * @file 字典接口
 * 
 * @date 2024/06/05
 */
import { proxyApis, apiV1 } from '@/apis/config'

/**
 * 基础路径
 */
export const basePath = `${proxyApis.server}${apiV1}`

export default {
  /**
   * 字典列表
   */
  list: `${basePath}dict/list`,
  /**
   * 新增字典
   */
  add: `${basePath}dict/add`,
  /**
   * 更新字典
   */
  update: `${basePath}dict/update`,
  /**
   * 删除字典
   */
  del: `${basePath}dict/del`,

  /**
   * 字典项列表
   */
  listRow: `${basePath}dict/listRow`,
  /**
   * 新增字典项
   */
  addRow: `${basePath}dict/addRow`,
  /**
   * 更新字典项
   */
  updateRow: `${basePath}dict/updateRow`,
  /**
   * 删除字典项
   */
  delRow: `${basePath}dict/delRow`,
  /**
   * 通过 code 查询字典列表
   */
  getDictListByCode: `${basePath}dict/getDictListByCode`,
}
