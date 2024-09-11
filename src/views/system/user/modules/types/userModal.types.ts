import type { IUser } from "@/services/user/types/index.types"

export interface IEmits {
  (e: 'success', value?: IUser): void
}