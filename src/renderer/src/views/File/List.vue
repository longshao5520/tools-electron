<script setup lang="ts">
import CardLayout from '@renderer/components/CardLayout.vue'
import { createFromIconfontCN } from '@ant-design/icons-vue'
import { DocumentCopy, DeleteFilled } from '@element-plus/icons-vue'
import { useUploadFile } from '@renderer/store/useUploadFile'

const store = useUploadFile()

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3916212_20a7pb57iv.js'
})

const findIcon = (type: string): string => {
  if (type.includes('json')) {
    return 'icon-json'
  }
  return 'icon-file'
}
</script>

<template>
  <el-empty v-if="store.list.length === 0" />
  <CardLayout v-else :list="store.list" title-key="name" title-position="top">
    <template #icon="{ item }">
      <div>
        <el-button
          type="text"
          :icon="DocumentCopy"
          style="color: #1890ff"
          @click="store.copyFile(item)"
        >
          复制
        </el-button>
        <el-button
          type="text"
          :icon="DeleteFilled"
          style="margin-left: 10px; color: #1890ff"
          @click="store.removeFile(item)"
        >
          删除
        </el-button>
      </div>
      <div style="width: 100%; height: 150px" class="flex-center">
        <el-image
          v-if="item.type.includes('image')"
          :src="item.url"
          :preview="true"
          width="100%"
          height="150px"
        />
        <icon-font v-else :type="findIcon(item.type)" style="font-size: 5rem" />
      </div>
    </template>
  </CardLayout>
</template>

<style>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
