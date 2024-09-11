import { ref } from 'vue'
import { defineStore } from 'pinia'
import { local } from '@/plugins/storage'
import { USER_STORAGE } from '@/assets/ts/constant'
import type { IUser } from '@/services/types/user.types'

export const useUserStore = defineStore('user', () => {
  // 只会在第一次调用的地方执行一次，后续再有调用也不会重复执行
  const userStorage: IUser | null = local.get(USER_STORAGE)
  const user = ref<IUser>()
  if (userStorage) {
    user.value = userStorage
  }

  function setUser(payload?: IUser) {
    if (payload) {
      user.value = payload
      local.set(USER_STORAGE, payload)
    } else {
      user.value = undefined
      local.remove(USER_STORAGE)
    }
  }

  return { user, setUser }
})
