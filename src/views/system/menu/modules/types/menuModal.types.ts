import type { IMenuRow } from '@/services/menu/types/index.types'

export interface IEmits {
  (e: 'success', value?: IMenuRow): void
}
