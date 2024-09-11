import type { IUser } from "@/services/user/types/index.types"

export interface IFormState extends IUser {
  rePassword?: string
}