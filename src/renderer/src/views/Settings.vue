<script setup lang="ts">
import { useSettingsStore } from '@renderer/store/useSettingsStore'
import { BasicColorSchema, useColorMode } from '@vueuse/core'
import { reactive } from 'vue'

const store = useSettingsStore()
const form = reactive(store.$state)

const mode = useColorMode({
  // 如果模式为auto也需要回显回auto
  emitAuto: true,
  // 默认模式先默认auto,后续通过Electorn拿到当前App主题
  initialValue: 'auto'
})

const switchTheme = (value: BasicColorSchema): void => {
  mode.value = value as BasicColorSchema
  window.electron.ipcRenderer.invoke('dark-mode:change', value === 'auto' ? 'system' : value)
}

const switchLanguage = (value: string): void => {
  console.log(value)
}
</script>

<template>
  <el-form :model="form" label-width="200px">
    <el-form-item prop="Language" label="Language">
      <el-select v-model="form.language" size="small" @change="switchLanguage">
        <el-option label="中文简体" value="zh-cn"></el-option>
        <el-option label="英语" value="en"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="Theme" label="Theme">
      <el-select v-model="form.theme" size="small" @change="switchTheme">
        <el-option label="浅色" value="light"></el-option>
        <el-option label="暗黑" value="dark"></el-option>
        <el-option label="跟随系统" value="auto"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<style></style>
