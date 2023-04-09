<script setup lang="ts">
import CardLayout from '@renderer/components/CardLayout.vue'
import { Download, DeleteFilled } from '@element-plus/icons-vue'
import { useQrCodeStore } from '@renderer/store/useQrCodeStore'
const store = useQrCodeStore()
</script>

<template>
  <el-empty v-if="store.list.length === 0" />
  <CardLayout v-else :list="store.list" title-key="value" title-position="top">
    <template #icon="{ item, index }">
      <div>
        <el-button
          type="text"
          :icon="Download"
          style="color: #1890ff"
          @click="store.downloadQrCode(item)"
        >
          下载
        </el-button>
        <el-button
          type="text"
          :icon="DeleteFilled"
          style="margin-left: 10px; color: #1890ff"
          @click="store.removeQrCode(index)"
        >
          删除
        </el-button>
      </div>
      <div style="width: 100%; height: 150px" class="flex-center">
        <el-image :src="item.image" :preview="true" width="100%" height="150px" />
      </div>
    </template>
  </CardLayout>
</template>
