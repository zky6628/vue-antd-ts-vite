/**
 * @file 字典相关服务
 * 
 * @date 2024/06/05
 */
import { dictApis } from '@/apis'
import { get, post, patch, del } from '@/plugins/axios'
import type {
  IDelParams,
  IFormState,
  IDictListParams,
  IDictListRes,
  IDictRow,
  IGetDictListParams
} from './types/index.types'
import type { IDictRowRow } from './types/dictRow.types'
export * from './dictRow'

export const fetchDictList = (params: IDictListParams): Promise<IDictListRes> => {
  return get(dictApis.list, { params })
}

export const fetchDictAdd = (params: IFormState): Promise<IDictRow> => {
  return post(dictApis.add, params)
}

export const fetchDictUpdate = (params: IFormState): Promise<IDictRow> => {
  return patch(dictApis.update, params)
}

export const fetchDictDel = (params: IDelParams) => {
  return del(dictApis.del, { params })
}

export const fetchDictListByCode = (params: IGetDictListParams): Promise<Array<IDictRowRow>> => {
  return get(dictApis.getDictListByCode, { params })
}
