import { COLOR_PRIMARY } from '@/assets/ts/constant'
import { local } from '@/plugins/storage'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const colorPrimary: string = local.get(COLOR_PRIMARY, '#1890ff')
  const theme = reactive({
    token: {
      colorPrimary
    }
  })

  const setTheme = (color: string) => {
    const colorPrimary = color || '#1890ff'
    theme.token = {
      colorPrimary 
    }
    local.set(COLOR_PRIMARY, colorPrimary)
  }
  return { theme, setTheme }
})
