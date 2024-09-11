import type { IDictRow } from "@/services/dict/types/index.types"

export interface IEmits {
  (e: 'success', value?: IDictRow): void
}
