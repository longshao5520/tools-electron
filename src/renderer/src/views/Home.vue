<script setup lang="ts">
import { QrcodeOutlined, HistoryOutlined } from '@ant-design/icons-vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activePath = computed(() => route.path)
const platform = ref(window.electron.process.platform)
</script>

<template>
  <div v-if="platform === 'darwin'" style="height: 30px; width: 100%"></div>
  <el-container :style="{ height: platform === 'darwin' ? 'calc(100% - 30px)' : '100%' }">
    <el-aside width="200px" style="height: 100%" class="aside">
      <el-menu router :default-active="activePath" style="height: 100%">
        <el-sub-menu index="/file">
          <template #title>
            <el-icon><upload-filled /></el-icon>文件上传
          </template>
          <el-menu-item index="/file/upload">
            <template #title>
              <el-icon><upload-filled /></el-icon>上传区
              <!-- <el-icon><upload-filled /></el-icon>文件上传 -->
            </template>
          </el-menu-item>
          <el-menu-item index="/file/list">
            <template #title>
              <el-icon><Grid /></el-icon>文件列表
            </template>
          </el-menu-item>
          <el-menu-item index="/file/config">
            <template #title>
              <el-icon><Tools /></el-icon>图床配置
            </template>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/qrCode">
          <template #title>
            <el-icon><QrcodeOutlined /></el-icon>二维码
          </template>
          <el-menu-item index="/qrCode">
            <template #title>
              <!-- <el-icon><QrcodeOutlined /></el-icon>制作二维码 -->
              <el-icon><QrcodeOutlined /></el-icon>二维码生成
            </template>
          </el-menu-item>
          <el-menu-item index="/qrCode/history">
            <template #title>
              <el-icon><HistoryOutlined /></el-icon>生成历史
            </template>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/pngToIco">
          <template #title>
            <el-icon><HistoryOutlined /></el-icon>png-to-ico
          </template>
        </el-menu-item>
        <el-menu-item index="/setting">
          <template #title>
            <el-icon><setting /></el-icon>设置
          </template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style scoped>
.aside::-webkit-scrollbar,
.main::-webkit-scrollbar {
  width: 8px;
}

.aside::-webkit-scrollbar-track,
.main::-webkit-scrollbar-track {
  background-color: #e4e4e4;
  border-radius: 100px;
}

.aside::-webkit-scrollbar-thumb,
.main::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 100px;
}
</style>
