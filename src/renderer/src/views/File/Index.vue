<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const back = (): void => {
  router.push('/')
}

const activeName = ref(route.path)

const handleChange = ({ paneName }): void => {
  router.push(paneName)
}
</script>

<template>
  <el-page-header style="margin: 20px" @back="back">
    <template #content>
      <div style="display: flex">
        <el-tabs v-model="activeName" type="card" @tab-click="handleChange">
          <el-tab-pane label="上传区" name="/file/upload"></el-tab-pane>
          <el-tab-pane label="文件列表" name="/file/list"></el-tab-pane>
          <el-tab-pane label="图床配置" name="/file/config"></el-tab-pane>
        </el-tabs>
      </div>
    </template>
    <router-view></router-view>
  </el-page-header>
</template>

<style></style>
