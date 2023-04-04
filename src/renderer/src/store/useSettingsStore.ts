import { BasicColorSchema } from '@vueuse/core'
import { defineStore } from 'pinia'

type Language = 'en' | 'zh-cn'
interface Settings {
  theme: BasicColorSchema
  language: Language
}

export const useSettingsStore = defineStore({
  id: 'settings',
  state: () =>
    ({
      theme: 'auto',
      language: 'zh-cn'
    } as Settings),
  actions: {
    setTheme(theme: BasicColorSchema) {
      this.theme = theme
    },
    setLanguage(language: Language) {
      this.language = language
    }
  },
  persist: true
})
