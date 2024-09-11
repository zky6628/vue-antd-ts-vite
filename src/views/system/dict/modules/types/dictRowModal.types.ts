import type { IDictRowRow } from "@/services/dict/types/dictRow.types"

export interface IEmits {
  (e: 'success', value?: IDictRowRow): void
}
