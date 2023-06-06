<script setup lang="ts">
import { QrCode, useQrCodeStore } from '@renderer/store/useQrCodeStore'
import { ElMessage, UploadFile } from 'element-plus'
import { reactive, watchEffect } from 'vue'

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

const store = useQrCodeStore()

const form = reactive<QrCode>(store.$state.active)

watchEffect(async () => {
  form.image = await store.generateQrCode(form)
})

const beforeAvatarUpload = async (file: UploadFile): Promise<void> => {
  if (file.raw?.type !== 'image/jpeg' && file.raw?.type !== 'image/png') {
    ElMessage.error('不是图片!')
  }
  form.icon = await getBase64(file.raw)
}
</script>

<template>
  <el-input
    v-model="form.value"
    type="textarea"
    resize="none"
    rows="5"
    placeholder="请输入内容"
  ></el-input>
  <div style="display: flex; margin-top: 10px">
    <div class="config" style="height: 300px; overflow-y: scroll">
      <el-form :mode="form">
        <el-form-item prop="icon" label="center icon">
          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="beforeAvatarUpload"
          >
            <img v-if="form.icon" :src="form.icon" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item prop="dotsOptionsType" label="dotsOptionsType">
          <el-select v-model="form.dotsOptionsType">
            <el-option label="square" value="square"></el-option>
            <el-option label="rounded" value="rounded"></el-option>
            <el-option label="dots" value="dots"></el-option>
            <el-option label="classy" value="classy"></el-option>
            <el-option label="classy-rounded" value="classy-rounded"></el-option>
            <el-option label="extra-rounded" value="extra-rounded"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="dotsOptionsColor" label="dotsOptionsColor">
          <el-color-picker v-model="form.dotsOptionsColor" />
        </el-form-item>
        <el-form-item prop="backgroundColor" label="backgroundColor">
          <el-color-picker v-model="form.backgroundColor" />
        </el-form-item>
        <el-form-item prop="imageOptionsHideBackgroundDots" label="imageOptionsHideBackgroundDots">
          <el-switch v-model="form.imageOptionsHideBackgroundDots" />
        </el-form-item>
        <el-form-item prop="imageOptionsImageSize" label="imageOptionsImageSize">
          <el-slider v-model="form.imageOptionsImageSize" :min="0" :max="1" :step="0.01" />
        </el-form-item>
        <el-form-item prop="imageOptionsMargin" label="imageOptionsMargin">
          <el-slider v-model="form.imageOptionsMargin" :min="0" :max="10" :step="1" />
        </el-form-item>
        <el-form-item prop="cornersSquareOptionsType" label="cornersSquareOptionsType">
          <el-select v-model="form.cornersSquareOptionsType">
            <el-option label="square" value="square"></el-option>
            <el-option label="dot" value="dot"></el-option>
            <el-option label="extra-rounded" value="extra-rounded"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="cornersSquareOptionsColor" label="cornersSquareOptionsColor">
          <el-color-picker v-model="form.cornersSquareOptionsColor" />
        </el-form-item>
        <el-form-item prop="cornersDotOptionsType" label="cornersDotOptionsType">
          <el-select v-model="form.cornersDotOptionsType">
            <el-option label="square" value="square"></el-option>
            <el-option label="dot" value="dot"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="cornersDotOptionsColor" label="cornersDotOptionsColor">
          <el-color-picker v-model="form.cornersDotOptionsColor" />
        </el-form-item>
      </el-form>
    </div>
    <div style="display: flex; align-items: center; flex-direction: column">
      <div style="width: 200px; height: 200px; margin-left: 10px">
        <el-image :src="form.image" :preview-src-list="[form.image]"></el-image>
      </div>
      <div>
        <el-button type="primary" @click="store.downloadQrCode(form)">下载</el-button>
        <el-button type="primary" @click="store.addQrCode(form)">保存</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.config {
  padding-right: 5px;
}
.config::-webkit-scrollbar {
  width: 8px;
}

.config::-webkit-scrollbar-track {
  background-color: #e4e4e4;
  border-radius: 100px;
}

.config::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 100px;
}
.avatar-uploader .avatar {
  width: 50px;
  height: 50px;
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
  width: 50px;
  height: 50px;
  text-align: center;
}
</style>
