<script setup lang="ts">
import { DeleteFilled, Edit } from '@element-plus/icons-vue'
import { UploadConfig, useUploadFile } from '@renderer/store/useUploadFileStore'
import { FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'

const store = useUploadFile()

const dialogVisible = ref(false)
const dialogTitle = ref('')
const formData = reactive({} as UploadConfig)
const editModel = (item: UploadConfig): void => {
  dialogVisible.value = true
  dialogTitle.value = '编辑'
  formData.id = item.id
  formData.name = item.name
  formData.url = item.url
  formData.jsonUrl = item.jsonUrl
  formData.postName = item.postName
}
const createModel = (): void => {
  dialogVisible.value = true
  dialogTitle.value = '创建新配置'
  formData.name = ''
  formData.url = ''
  formData.jsonUrl = ''
  formData.postName = ''
}
const formRef = ref<FormInstance>()
const cancel = (formEl: FormInstance | undefined): void => {
  if (!formEl) return
  formEl.resetFields()
  dialogVisible.value = false
}
const save = (formEl: FormInstance | undefined): void => {
  if (dialogTitle.value === '创建新配置') {
    store.addConfig(formData)
  } else {
    store.updateConfig(formData)
  }
  cancel(formEl)
}
</script>

<template>
  <el-row :gutter="20">
    <el-col
      v-for="(item, index) in store.$state.configs"
      :key="index"
      :span="12"
      style="margin-bottom: 10px"
    >
      <el-card>
        <div class="config-crad">
          <div class="config-header">
            <div class="config-name">{{ item.name }}</div>
            <div class="config-btn">
              <el-icon
                size="1.25rem"
                style="color: var(--el-color-primary)"
                @click="editModel(item)"
              >
                <Edit />
              </el-icon>
              <el-icon
                size="1.25rem"
                style="color: var(--el-color-danger); margin-left: 10px"
                @click="store.removeConfig(item)"
              >
                <DeleteFilled />
              </el-icon>
              <!-- <el-button type="text" @click="editModel(item)">
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
              </el-button> -->
            </div>
          </div>
          <div class="config-url">
            {{ item.url }}
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="12" @click="createModel">
      <el-card>
        <div class="create-btn">
          <el-icon size="3rem"><Plus /></el-icon>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-dialog v-model="dialogVisible" :title="dialogTitle" width="60%">
    <el-form ref="formRef" :model="formData" label-width="120px">
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
        <el-button @click="cancel(formRef)">取消</el-button>
        <el-button type="primary" @click="save(formRef)">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.config-crad {
  height: 80px;
}
.config-crad .config-header {
  display: flex;
  justify-content: space-between;
  justify-content: center;
}
.config-crad .config-header .config-name {
  font-size: 1.25rem;
  font-weight: bold;
  width: calc(100% - 50px);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.config-crad .config-header .config-btn {
  display: flex;
  width: 50px;
  padding-top: 3px;
}

.config-crad .config-header .config-btn .el-icon {
  cursor: pointer;
}

.config-crad .config-url {
  font-size: 0.95rem;
  color: darkgray;
  margin-top: 10px;
  width: 100%;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.create-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  cursor: pointer;
}
.url {
  font-size: 0.95rem;
  color: darkgray;
  margin-top: 10px;
  width: 100%;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
