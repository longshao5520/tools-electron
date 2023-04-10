<script setup lang="ts">
import { ElMessage } from 'element-plus'

const start = (): void => {
  window.electron.ipcRenderer.invoke('png-to-ico').then((res) => {
    if (res == 'Error: Please give me a square PNG image.') {
      ElMessage.error('图片必须是方形的')
    }

    if (res === true) {
      ElMessage.success('转换成功')
    }
  })
}
</script>

<template>
  <el-button type="primary" @click="start">开始转换</el-button>
</template>
