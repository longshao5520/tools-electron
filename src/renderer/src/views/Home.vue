<script setup lang="ts">
import { QrcodeOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activePath = ref(route.path)
const platform = ref(window.electron.process.platform)
</script>

<template>
  <el-container style="height: 100%">
    <el-aside width="200px" style="height: 100%">
      <div v-if="platform === 'darwin'" style="height: 30px; width: 100%"></div>
      <el-menu router :default-active="activePath" style="height: 100%">
        <el-sub-menu index="/file">
          <template #title>
            <el-icon><upload-filled /></el-icon>文件上传
          </template>
          <el-menu-item index="/file/upload">
            <template #title>
              <el-icon><upload-filled /></el-icon>上传区
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
        <el-menu-item index="/qrCode">
          <template #title>
            <el-icon><QrcodeOutlined /></el-icon>制作二维码
          </template>
        </el-menu-item>
        <el-menu-item index="/setting">
          <template #title>
            <el-icon><setting /></el-icon>设置
          </template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main style="padding-top: 30px">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style></style>
