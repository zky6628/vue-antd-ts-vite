/**
 * 1.启用 2.禁用 3.待审核
 */
export type TStatus = '1' | '2' | '3'

export interface ILoginParams {
  username: string
  password: string
}

export interface IUser {
  id?: string
  username: string
  password?: string
  name?: string
  avatar?: string
  email?: string
  address?: string
  roles?: Array<string>
  status?: TStatus
  createdTime?: string
  updatedTime?: string
  token?: string
}

export interface IUserListParams {
  name?: string
  code?: string
  pageNum?: number
  pageSize?: number
}

export interface IUserListRes {
  list: Array<IUser>
  pageNum: number
  pageSize: number
  total: number
}

export interface IDelParams {
  id: string
}