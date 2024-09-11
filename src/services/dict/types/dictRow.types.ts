export type TStatus = '1' | '2'

export interface IDictRowListParams {
  dictId?: string
  dictCode?: string
  label?: string
  value?: string
  status?: TStatus
}

export interface IDictRowListRes {
  list: Array<IDictRowRow>
  pageNum: number
  pageSize: number
  total: number
}

export interface IDictRowRow {
  dictId: string
  label: string
  value: string
  color?: string
  desc?: string
  sort?: number
  status: TStatus
  createdTime: string
  updatedTime: string
  id: string
}

export interface IFormState {
  dictId?: string
  label?: string
  value?: string
  color?: string
  desc?: string
  sort?: string
  status?: TStatus
  id?: string
}

export interface IDelParams {
  id: string
}
