/**
 * @file 菜单相关服务
 * 
 * @date 2024/05/22
 */
import { menuApis } from '@/apis'
import { get, post, patch, del } from '@/plugins/axios'
import type { IDelParams, IFormState, IMenuListParams, IMenuListRes, IMenuRow } from './types/index.types'

export const fetchMenuList = (params?: IMenuListParams): Promise<IMenuListRes> => {
  if (params) {
    Reflect.deleteProperty(params, 'pageNum')
    Reflect.deleteProperty(params, 'pageSize')
  }
  return get(menuApis.list, { params })
}

export const fetchMenuAdd = (params: IFormState): Promise<IMenuRow> => {
  return post(menuApis.add, params)
}

export const fetchMenuUpdate = (params: IFormState): Promise<IMenuRow> => {
  return patch(menuApis.update, params)
}

export const fetchMenuDel = (params: IDelParams) => {
  return del(menuApis.del, { params })
}
