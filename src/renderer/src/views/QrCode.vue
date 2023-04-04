<script setup lang="ts">
import { ElMessage, UploadFile } from 'element-plus'
import QRCodeStyling from 'qrcode-vue3/src/core/QRCodeStyling'
import { ref, watchEffect } from 'vue'

const getBase64 = (file): Promise<string> => {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader()
    let imgResult = ''
    reader.readAsDataURL(file)
    reader.onload = function (): void {
      imgResult = reader.result as string
    }
    reader.onerror = function (error): void {
      reject(error)
    }
    reader.onloadend = function (): void {
      resolve(imgResult)
    }
  })
}

const qrCodeValue = ref('ceshi')
// const image = ref('https://file.cs08.cn/file/group1/M00/07/37/rBABQGQbDXOAOZNHAABNHljaGqg693.png')
const image = ref('')

const backgroundColor = ref('#ffffff')

const imgUrl = ref('')
watchEffect(async () => {
  const qrCode = new QRCodeStyling({
    data: qrCodeValue.value,
    width: 200,
    height: 200,
    image:
      image.value ||
      'data:image/png;base64,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',
    qrOptions: { typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' },
    imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 0 },
    dotsOptions: {
      type: 'square',
      color: '#000000'
      // gradient: {
      //   type: 'linear',
      //   rotation: 0,
      //   colorStops: [
      //     { offset: 0, color: '#26249a' },
      //     { offset: 1, color: '#26249a' }
      //   ]
      // }
    },
    backgroundOptions: { color: backgroundColor.value },
    cornersSquareOptions: { type: 'square', color: '#000000' },
    cornersDotOptions: { type: undefined, color: '#000000' }
  })
  imgUrl.value = await qrCode.getImageUrl('png')
})

const beforeAvatarUpload = async (file: UploadFile): Promise<void> => {
  if (file.raw?.type !== 'image/jpeg' && file.raw?.type !== 'image/png') {
    ElMessage.error('不是图片!')
  }
  image.value = await getBase64(file.raw)
}
</script>

<template>
  <el-input v-model="qrCodeValue" type="textarea" rows="5" placeholder="请输入内容"></el-input>
  <div style="display: flex; margin-top: 10px">
    <div>
      <el-upload
        class="avatar-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
        :auto-upload="false"
        :on-change="beforeAvatarUpload"
      >
        <img v-if="image" :src="image" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </div>
    <div style="display: flex; align-items: center">
      <div style="width: 200px; height: 200px; margin-left: 10px">
        <img :src="imgUrl" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 200px;
  height: 200px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 200px;
  text-align: center;
}
</style>
