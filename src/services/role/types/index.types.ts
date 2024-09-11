export interface IRoleListParams {
  roleName?: string
  code?: string
  pageNum?: number
  pageSize?: number
}

export interface IRoleRow {
  code: string
  createdTime: string
  desc?: string
  roleName: string
  updatedTime: string
  id: string
}

export interface IFormState {
  code?: string
  desc?: string
  roleName?: string
  id?: string
}

export interface IRoleListRes {
  list: Array<IRoleRow>
  pageNum: number
  pageSize: number
  total: number
}

export interface IDelParams {
  id: string
}
