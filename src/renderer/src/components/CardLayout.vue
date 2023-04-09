<script setup lang="ts">
// import {IconType} from "@ant-design/icons-vue/lib/components/Icon";
import { computed, PropType, StyleValue } from 'vue'

// eslint-disable-next-line vue/no-setup-props-destructure
const { list, iconKey, titleKey, titlePosition } = defineProps({
  list: {
    type: Array as PropType<
      | {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          [key: string]: any

          title: string
          icon: string
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          iconStyle?: Record<string, any>
        }[]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      | any[]
    >,
    default: () => []
  },
  iconKey: {
    type: String,
    default: 'icon'
  },
  iconStyle: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type: Object as PropType<Record<string, any>>,
    default: () => {}
  },
  titlePosition: {
    type: String as PropType<'top' | 'bottom'>,
    default: 'bottom'
  },
  titleKey: {
    type: String,
    default: 'title'
  }
})

const contentStyle = computed<StyleValue>(() =>
  titlePosition === 'bottom'
    ? {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }
    : {
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        justifyContent: 'center'
      }
)

const emit = defineEmits(['itemClick'])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const skip = (item: any): void => {
  emit('itemClick', item)
}
</script>

<template>
  <!--  style="min-width: 648px" -->
  <el-row :gutter="20">
    <el-col v-for="(item, index) in list" :key="index" :xs="12" :sm="8" :md="8" :lg="4">
      <el-card @click="skip(item)">
        <div :style="contentStyle">
          <slot name="icon" :item="item" :index="index">
            <el-icon :style="item.iconStyle">
              <component :is="item[iconKey]" />
            </el-icon>
          </slot>
          <slot name="title" :item="item" :index="index">
            <el-tooltip effect="dark" :content="item[titleKey]" placement="top">
              <div class="title">{{ item[titleKey] }}</div>
            </el-tooltip>
          </slot>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
.title {
  /* font-size: 14px;
  color: #333;
  margin-top: 10px; */
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
