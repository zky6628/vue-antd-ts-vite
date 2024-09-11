/**
 * @file 角色相关服务
 * 
 * @date 2024/05/22
 */
import { roleApis } from '@/apis'
import { get, post, patch, del } from '@/plugins/axios'
import type { IDelParams, IFormState, IRoleListParams, IRoleListRes, IRoleRow } from './types/index.types'

export const fetchRoleList = (params: IRoleListParams): Promise<IRoleListRes> => {
  return get(roleApis.list, { params })
}

export const fetchRoleAdd = (params: IFormState): Promise<IRoleRow> => {
  return post(roleApis.add, params)
}

export const fetchRoleUpdate = (params: IFormState): Promise<IRoleRow> => {
  return patch(roleApis.update, params)
}

export const fetchRoleDel = (params: IDelParams) => {
  return del(roleApis.del, { params })
}
