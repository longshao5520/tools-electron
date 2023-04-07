import { defineStore } from 'pinia'

export const useQrCodeStore = defineStore({
  id: 'qrCode',
  state: () => ({
    list: [] as string[]
  }),
  actions: {
    addQrCode(url: string) {
      this.list.push(url)
    }
  }
})
