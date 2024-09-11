export interface IDictListParams {
  name?: string
  code?: string
  pageNum?: number
  pageSize?: number
}

export interface IDictRow {
  code: string
  createdTime: string
  desc?: string
  name: string
  updatedTime: string
  id: string
}

export interface IFormState {
  code?: string
  desc?: string
  name?: string
  id?: string
}

export interface IDictListRes {
  list: Array<IDictRow>
  pageNum: number
  pageSize: number
  total: number
}

export interface IDelParams {
  id: string
}

export interface IGetDictListParams {
  code: string
}