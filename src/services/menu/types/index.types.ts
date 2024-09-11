export interface IMenuListParams {
  name?: string
  pageNum?: number
  pageSize?: number
  parentId?: string
}

export type TMenuType = '1' | '2' | '3'

export interface IMenuRow {
  children?: Array<IMenuRow>
  componentName: string
  componentUrl: string
  createdTime: string
  enable: boolean
  icon: string
  keepAlive: boolean
  menuType: TMenuType
  name: string
  openType: number
  parentId: string
  redirectUrl: string
  route: boolean
  sort: number
  updatedTime: string
  url: string
  id: string
}
export interface IFormState {
  componentName?: string
  componentUrl?: string
  enable?: boolean
  icon?: string
  keepAlive?: boolean
  menuType?: TMenuType
  name?: string
  openType?: string
  parentId?: string
  redirectUrl?: string
  route?: boolean
  sort?: number
  url?: string
  id?: string
}

export interface IMenuListRes {
  list: Array<IMenuRow>
  pageNum: number
  pageSize: number
  total: number
}

export interface IDelParams {
  id: string
}
