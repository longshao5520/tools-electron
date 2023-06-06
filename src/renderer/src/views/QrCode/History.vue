<script setup lang="ts">
import CardLayout from '@renderer/components/CardLayout.vue'
import { Download, DeleteFilled, Edit } from '@element-plus/icons-vue'
import { QrCode, useQrCodeStore } from '@renderer/store/useQrCodeStore'
import router from '@renderer/router'
const store = useQrCodeStore()

const editRow = (item: QrCode): void => {
  store.$state.active = item
  router.push('/qrCode')
}
</script>

<template>
  <el-empty v-if="store.list.length === 0" />
  <CardLayout v-else :list="store.list" title-key="value" title-position="top">
    <template #icon="{ item, index }">
      <div>
        <el-button type="primary" link :icon="Edit" @click="editRow(item)">
          <!-- 编辑 -->
        </el-button>
        <el-button
          type="primary"
          link
          :icon="Download"
          style="margin-left: 10px"
          @click="store.downloadQrCode(item)"
        >
          <!-- 下载 -->
        </el-button>
        <el-button
          type="primary"
          link
          :icon="DeleteFilled"
          style="margin-left: 10px"
          @click="store.removeQrCode(index)"
        >
          <!-- 删除 -->
        </el-button>
      </div>
      <div style="width: 100%; height: 150px" class="flex-center">
        <el-image :src="item.image" :preview="true" width="100%" height="150px" />
      </div>
    </template>
  </CardLayout>
</template>
