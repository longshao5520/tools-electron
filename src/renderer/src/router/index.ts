import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/file/upload',
    component: () => import('@renderer/views/Home.vue'),
    children: [
      {
        path: '/file/upload',
        name: 'FileUpload',
        component: () => import('@renderer/views/File/Upload.vue')
      },
      {
        path: '/file/list',
        name: 'FileList',
        component: () => import('@renderer/views/File/List.vue')
      },
      {
        path: '/file/config',
        name: 'UploadConfig',
        component: () => import('@renderer/views/File/Config.vue')
      },
      {
        path: '/qrCode',
        name: 'QrCode',
        component: () => import('@renderer/views/QrCode/Index.vue')
      },
      {
        path: '/qrCode/history',
        name: 'QrCodeHistory',
        component: () => import('@renderer/views/QrCode/History.vue')
      },
      {
        path: '/setting',
        name: 'Settings',
        component: () => import('@renderer/views/Settings.vue')
      }
    ]
    // },
    // {
    //   path: '/file',
    //   component: () => import('@renderer/views/File/Index.vue'),
    //   children: [
    //     {
    //       path: '/file/upload',
    //       name: 'FileUpload',
    //       component: () => import('@renderer/views/File/Upload.vue')
    //     },
    //     {
    //       path: '/file/list',
    //       name: 'FileList',
    //       component: () => import('@renderer/views/File/List.vue')
    //     },
    //     {
    //       path: '/file/config',
    //       name: 'UploadConfig',
    //       component: () => import('@renderer/views/File/Config.vue')
    //     }
    //   ]
    // },
    // {
    //   path: '/setting',
    //   name: 'Settings',
    //   component: () => import('@renderer/views/Settings.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
