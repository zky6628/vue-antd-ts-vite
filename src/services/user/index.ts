/**
 * @file 用户相关服务
 * 
 * @date 2024/05/21
 */
import { userApis } from '@/apis'
import { post, get, del, patch } from '@/plugins/axios'
import type { IDelParams, ILoginParams, IUser, IUserListParams, IUserListRes } from './types/index.types'

export const login = (payload: ILoginParams): Promise<IUser> => {
  return post(userApis.login, payload)
}

export const register = (payload: IUser): Promise<IUser> => {
  return post(userApis.register, payload)
}

export const fetchUserAdd = (payload: IUser): Promise<IUser> => {
  return post(userApis.add, payload)
}

export const fetchUserUpdate = (payload: IUser): Promise<IUser> => {
  return patch(userApis.update, payload)
}

export const fetchUserList = (params: IUserListParams): Promise<IUserListRes> => {
  return get(userApis.list, { params })
}

export const fetchUserDel = (params: IDelParams) => {
  return del(userApis.del, { params })
}