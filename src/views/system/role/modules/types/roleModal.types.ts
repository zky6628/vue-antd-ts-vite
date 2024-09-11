import type { IRoleRow } from "@/services/role/types/index.types"

export interface IEmits {
  (e: 'success', value?: IRoleRow): void
}