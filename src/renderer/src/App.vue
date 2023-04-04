<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { onBeforeMount } from 'vue'
import { useSettingsStore } from '@renderer/store/useSettingsStore'
const mode = useColorMode({
  // 如果模式为auto也需要回显回auto
  emitAuto: true,
  // 默认模式先默认auto,后续通过Electorn拿到当前App主题
  initialValue: 'auto'
})

onBeforeMount(() => {
  const theme = useSettingsStore().$state.theme
  window.electron.ipcRenderer.invoke('dark-mode').then((type: 'light' | 'dark' | 'system') => {
    const type1 = type == 'system' ? 'auto' : type
    mode.value = type1 == theme ? type1 : theme
  })
})
</script>

<template>
  <router-view></router-view>
</template>

<style lang="less">
// @import './assets/css/styles.less';
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
  width: 100%;
}
</style>
