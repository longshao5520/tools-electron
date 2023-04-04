<script setup lang="ts">
import { UploadConfig, useUploadFile } from '@renderer/store/useUploadFile'
import { ref } from 'vue'

const store = useUploadFile()

store.init()

const activeName = ref(store.activeConfig.name)
const switchActive = (value: string): void => {
  const active = store.list.find((x) => x.name == value)
  store.setActiveConfig(active as UploadConfig)
}
</script>

<template>
  <el-upload
    class="upload-demo"
    :action="store.activeConfig.url"
    :name="store.activeConfig.postName"
    :on-success="store.addFile"
    :show-file-list="false"
    drag
  >
    <div class="upload-section">
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
    </div>
  </el-upload>
  <el-row :gutter="20" style="margin-top: 20px">
    <el-col :span="12" class="flex-column-center">
      <el-select v-model="activeName" @change="switchActive">
        <el-option
          v-for="item in store.configs"
          :key="item.name"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
      <div style="margin-top: 10px">上传配置</div>
    </el-col>
    <el-col :span="12" class="flex-column-center">
      <el-radio-group v-model="store.linkFormat" @change="store.switchLinkFormat">
        <el-radio-button label="url">Url</el-radio-button>
        <el-radio-button label="markdown">Markdown</el-radio-button>
        <el-radio-button label="html">HTML</el-radio-button>
      </el-radio-group>
      <div style="margin-top: 10px">链接格式</div>
    </el-col>
  </el-row>
</template>

<style scoped>
.flex-column-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-section {
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
