<script setup lang="ts">
import { useSettingsStore } from '@renderer/store/useSettingsStore'
import { BasicColorSchema, useColorMode } from '@vueuse/core'
import { onBeforeMount, reactive } from 'vue'
// import { useRouter } from 'vue-router'

const form = reactive({
  Theme: 'auto',
  Language: 'zh-cn'
})

// const settings = reactive([
//   {
//     name: 'Language',
//     value: 'zh-cn',
//     data: [
//       { name: 'Chinese', value: 'zh-cn' },
//       { name: 'English', value: 'en' }
//     ],
//     type: 'select'
//   },
//   {
//     name: 'Theme',
//     value: 'Light',
//     data: [
//       { name: 'Light', value: 'light' },
//       { name: 'Dark', value: 'dark' },
//       { name: 'System', value: 'auto' }
//     ],
//     type: 'radio'
//   }
//   // {
//   //   name: 'Launch On Boot',
//   //   value: true,
//   //   data: [],
//   //   type: 'switch'
//   // }
// ])

// const router = useRouter()

// const back = (): void => {
//   router.push('/')
// }

onBeforeMount(() => {
  form.Theme = useSettingsStore().$state.theme
})

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

// const selectChange = (value: BasicColorSchema | string, type: string): void => {
//   if (type === 'Theme') {
//     useSettingsStore().setTheme(value as BasicColorSchema)
//     mode.value = value as BasicColorSchema
//     window.electron.ipcRenderer.invoke('dark-mode:change', value === 'auto' ? 'system' : value)
//   }
// }
</script>

<template>
  <!-- <el-page-header title="首页" @back="back"> -->
  <el-form :model="form" label-width="200px">
    <el-form-item prop="Language" label="Language">
      <el-select v-model="form.Language" size="small" @change="switchTheme">
        <el-option label="中文简体" value="zh-cn"></el-option>
        <el-option label="英语" value="en"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="Theme" label="Theme">
      <!-- <el-radio-group v-model="form.Theme" size="small" @change="switchTheme">
          <el-radio-button label="light">浅色</el-radio-button>
          <el-radio-button label="dark">暗黑</el-radio-button>
          <el-radio-button label="auto">跟随系统</el-radio-button>
        </el-radio-group> -->
      <el-select v-model="form.Theme" size="small" @change="switchTheme">
        <el-option label="浅色" value="light"></el-option>
        <el-option label="暗黑" value="dark"></el-option>
        <el-option label="跟随系统" value="auto"></el-option>
      </el-select>
    </el-form-item>
    <!-- <el-row
        v-for="(item, index) in settings"
        :key="index"
        :gutter="20"
        style="margin-bottom: 20px"
      >
        <el-col :span="6" style="text-align: right">
          {{ item.name }}
        </el-col>
        <el-col :span="18">
          <template v-if="item.type === 'select'">
            <el-select v-model:value="form[item.name]" @change="selectChange">
              <el-option v-for="option in item.data" :key="option.value" :value="option.value">
                {{ option.name }} {{ option.value }}
              </el-option>
            </el-select>
          </template>
          <template v-if="item.type === 'radio'">
            <el-radio-group
              v-model="form[item.name]"
              size="small"
              @change="selectChange($event, item.name)"
            >
              <el-radio-button label="light">浅色</el-radio-button>
              <el-radio-button label="dark">暗黑</el-radio-button>
              <el-radio-button label="auto">跟随系统</el-radio-button>
            </el-radio-group>
          </template>
          <template v-if="item.type === 'switch'">
            <el-switch v-model:checked="form[item.name]" />
          </template>
        </el-col>
      </el-row> -->
  </el-form>
  <!-- </el-page-header> -->
</template>

<style></style>
