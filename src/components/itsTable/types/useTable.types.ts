export interface IPgntn {
  pageSize: number
  current: number
}

export interface ITableRes {
  list: Array<any>
  total: number
}

export interface IDelParams {
  id: string
}

export interface ITableOptions {
  /**
   * 默认参数
   */
  defaultParams?: any
  /**
   * 列表接口请求方法
   * @param query 查询参数
   * @returns
   */
  listApi: (query: any) => Promise<ITableRes>
  /**
   * 删除接口请求方法
   * @param query 查询参数
   * @returns
   */
  delApi?: (query: IDelParams) => Promise<any>
}
