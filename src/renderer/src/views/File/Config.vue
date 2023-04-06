<script setup lang="ts">
import { DeleteFilled, Edit } from '@element-plus/icons-vue'
import { UploadConfig, useUploadFile } from '@renderer/store/useUploadFileStore'
import { reactive, ref } from 'vue'

const store = useUploadFile()

const dialogVisible = ref(false)
const dialogTitle = ref('')
const formData = reactive({} as UploadConfig)
const editModel = (item: UploadConfig): void => {
  dialogVisible.value = true
  dialogTitle.value = '编辑'
  formData.name = item.name
  formData.url = item.url
  formData.jsonUrl = item.jsonUrl
  formData.postName = item.postName
}
</script>

<template>
  <el-row :gutter="20">
    <el-col v-for="(item, index) in store.$state.configs" :key="index" :span="12">
      <el-card>
        <div style="height: 80px">
          <div style="display: flex; justify-content: space-between">
            <div style="font-size: 1.25rem; font-weight: bold">{{ item.name }}</div>
            <div>
              <el-button type="text" @click="editModel(item)">
                <template #icon>
                  <el-icon size="1.25rem"><Edit /></el-icon>
                </template>
              </el-button>
              <el-button type="text" @click="store.removeConfig(item)">
                <template #icon>
                  <el-icon size="1.25rem" style="color: var(--el-color-danger)">
                    <DeleteFilled />
                  </el-icon>
                </template>
              </el-button>
            </div>
          </div>
          <div style="font-size: 0.95rem; color: darkgray; margin-top: 10px">
            {{ item.url }}
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
        <div class="create-btn">
          <el-icon size="3rem"><Plus /></el-icon>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-dialog v-model="dialogVisible" title="图床设置" width="60%">
    <el-form :model="formData" label-width="120px">
      <el-form-item label="Name" porp="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="Url" port="url">
        <el-input v-model="formData.url" />
      </el-form-item>
      <el-form-item label="Json Url" prop="jsonUrl">
        <el-input v-model="formData.jsonUrl" />
      </el-form-item>
      <el-form-item label="Post Name" prop="postName">
        <el-input v-model="formData.postName" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.create-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  cursor: pointer;
}
</style>
