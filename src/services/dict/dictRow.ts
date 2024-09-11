/**
 * @file 字典相关服务
 * 
 * @date 2024/06/05
 */
import { dictApis } from '@/apis'
import { get, post, patch, del } from '@/plugins/axios'
import type { IDelParams, IFormState, IDictRowListParams, IDictRowListRes, IDictRowRow } from './types/dictRow.types'

export const fetchDictRowList = (params: IDictRowListParams): Promise<IDictRowListRes> => {
  return get(dictApis.listRow, { params })
}

export const fetchDictRowAdd = (params: IFormState): Promise<IDictRowRow> => {
  return post(dictApis.addRow, params)
}

export const fetchDictRowUpdate = (params: IFormState): Promise<IDictRowRow> => {
  return patch(dictApis.updateRow, params)
}

export const fetchDictRowDel = (params: IDelParams) => {
  return del(dictApis.delRow, { params })
}
