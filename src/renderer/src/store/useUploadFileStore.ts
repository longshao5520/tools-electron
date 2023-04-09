import { ElMessage, UploadFile } from 'element-plus'
import { get } from 'lodash'
import { defineStore } from 'pinia'

export interface UploadConfig {
  id: number
  name: string
  url: string
  jsonUrl?: string
  postName?: string
}

export interface MyUploadFile {
  id: number
  name: string
  url: string
  size: number
  type: string
}

const defaultConfig: UploadConfig = {
  id: 0,
  name: '默认配置',
  url: 'https://file.cs08.cn/file/uploadUtil',
  jsonUrl: 'data.url',
  postName: 'file'
}

export const useUploadFile = defineStore({
  id: 'uploadFile',
  state: () => ({
    configs: [] as UploadConfig[],
    activeConfig: {} as UploadConfig,
    list: [] as MyUploadFile[],
    linkFormat: 'url'
  }),
  actions: {
    init() {
      if (this.configs.length === 0) {
        this.configs = [defaultConfig]
        this.activeConfig = this.configs[0]
      }
    },
    addConfig(config: UploadConfig) {
      if (this.configs.find((item) => item.name === config.name)) {
        ElMessage.error('配置名称重复')
      } else {
        const { name, url, jsonUrl, postName } = config
        this.configs.push({
          id: this.configs[this.configs.length - 1].id + 1,
          name,
          url,
          jsonUrl: jsonUrl || 'data.url',
          postName: postName || 'file'
        })
      }
    },
    updateConfig(config: UploadConfig) {
      const index = this.configs.findIndex((item) => item.id === config.id)
      if (index !== -1) {
        this.configs[index] = config
      }
    },
    removeConfig(config: UploadConfig) {
      if (this.configs.length === 1) {
        ElMessage.error('至少保留一个配置')
        return
      }
      if (this.activeConfig.id === config.id) {
        ElMessage.error('请先切换到其他配置')
        return
      }
      this.configs = this.configs.filter((item) => item.id !== config.id)
    },
    setActiveConfig(config: UploadConfig) {
      this.activeConfig = config
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addFile(response: any, file: UploadFile) {
      console.log(response, file)

      const url = get(response, this.activeConfig.jsonUrl as string)
      this.list.push({
        id: file.uid,
        name: file.name,
        url,
        size: file.size as number,
        type: file.raw?.type as string
      })
      const formatUrl = this.formatLink(url)
      navigator.clipboard.writeText(formatUrl).then(() => {
        ElMessage.success(`上传成功，链接已复制到剪切板`)
      })
    },
    copyFile(file: MyUploadFile) {
      const { url } = file
      navigator.clipboard.writeText(url).then(() => {
        ElMessage.success(`已复制 ${url} 的链接`)
      })
    },
    removeFile(file: MyUploadFile) {
      this.list = this.list.filter((item) => item.id !== file.id)
    },
    switchLinkFormat(format: string) {
      this.linkFormat = format
    },
    formatLink(url: string) {
      if (this.linkFormat === 'html') {
        return `<img src="${url}" />`
      } else if (this.linkFormat === 'markdown') {
        return `![${url}](${url})`
      } else {
        return url
      }
    }
  },
  persist: true
})
