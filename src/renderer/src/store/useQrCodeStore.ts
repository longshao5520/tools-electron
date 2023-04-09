import QRCodeStyling from 'qrcode-vue3/src/core/QRCodeStyling'
import { base64ToBlob } from '@renderer/utils'
import { defineStore } from 'pinia'
import constant from '@renderer/views/QrCode/constant'

export interface QrCode {
  // 二维码内容
  value: string
  // 中心icon
  icon: string
  // 背景色颜色
  backgroundColor: string
  // icon隐藏背景点
  imageOptionsHideBackgroundDots: boolean
  // icon大小
  imageOptionsImageSize: number
  // icon边距
  imageOptionsMargin: number
  // 码点类型
  dotsOptionsType: 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded'
  // 码点颜色
  dotsOptionsColor: string
  // 码眼边框类型
  cornersSquareOptionsType: 'square' | 'dot' | 'extra-rounded'
  // 码眼边框颜色
  cornersSquareOptionsColor: string
  // 码眼圆点类型
  cornersDotOptionsType: 'square' | 'dot' | undefined
  // 码眼圆点颜色
  cornersDotOptionsColor: string
  // 二维码图片
  image: string
}

export const useQrCodeStore = defineStore({
  id: 'qrCode',
  state: () => ({
    list: [] as QrCode[],
    cache: {
      value: 'ceshi',
      icon: constant.defaultIcon,
      backgroundColor: '#ffffff',
      imageOptionsHideBackgroundDots: true,
      imageOptionsImageSize: 0.4,
      imageOptionsMargin: 0,
      dotsOptionsType: 'square',
      dotsOptionsColor: '#000000',
      cornersSquareOptionsType: 'square',
      cornersSquareOptionsColor: '#000000',
      cornersDotOptionsType: undefined,
      cornersDotOptionsColor: '#000000',
      image: ''
    } as QrCode
  }),
  actions: {
    async generateQrCode(qrCode: QrCode) {
      const qrCodeStyling = new QRCodeStyling({
        width: 300,
        height: 300,
        data: qrCode.value,
        image: qrCode.icon,
        dotsOptions: {
          type: qrCode.dotsOptionsType,
          color: qrCode.dotsOptionsColor
          // gradient: {
          //   type: 'linear',
          //   rotation: 10,
          //   colorStops: [
          //     { offset: 0, color: '#26240a' },
          //     { offset: 1, color: '#262490' }
          //     // { offset: 2, color: '#322490' }
          //   ]
          // }
        },
        cornersSquareOptions: {
          type: qrCode.cornersSquareOptionsType,
          color: qrCode.cornersSquareOptionsColor
        },
        cornersDotOptions: {
          type: qrCode.cornersDotOptionsType,
          color: qrCode.cornersDotOptionsColor
        },
        imageOptions: {
          hideBackgroundDots: qrCode.imageOptionsHideBackgroundDots,
          imageSize: qrCode.imageOptionsImageSize,
          margin: qrCode.imageOptionsMargin
        },
        backgroundOptions: {
          color: qrCode.backgroundColor
        }
      })
      qrCode.image = await qrCodeStyling.getImageUrl('png')
      this.cache = qrCode
      return qrCode.image
    },
    addQrCode(qrCode: QrCode) {
      this.list.push(qrCode)
    },
    removeQrCode(index: number) {
      this.list.splice(index, 1)
    },
    updateQrCode(index: number, qrCode: QrCode) {
      this.list[index] = qrCode
    },
    downloadQrCode(item: QrCode) {
      const date = new Date()
      const aLink = document.createElement('a') // 创建一个a标签
      const blob = base64ToBlob(item.image)
      const event = document.createEvent('HTMLEvents')
      event.initEvent('click', true, true)
      aLink.download = date.getTime() + '.' + blob.type.split('/')[1] // 使用时间戳给文件命名
      aLink.href = URL.createObjectURL(blob)
      aLink.click()
    }
  },
  persist: true
})
