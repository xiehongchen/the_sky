import { RouteRecordRaw } from 'vue-router'
import layout from '@/views/layout/index.vue'
import noteRoutes from './note.ts'
import h5Routes from './h5.ts'

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    // 登录
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      icon: '',
    },
  },
  {
    // 首页
    path: '/',
    redirect: { name: 'welcome' },
    component: layout,
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('@/views/welcome/index.vue'),
        meta: {
          title: '欢迎页',
          icon: 'House',
          permissions: 'sky.welcome',
        },
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '主页',
          icon: 'House',
          permissions: 'sky.home',
        },
      },
      {
        path: '/repository',
        name: 'repository',
        // component: () => import('@/views/repository/index.vue'),
        meta: {
          title: '仓库',
          icon: 'Coin',
          permissions: 'sky.repository',
        },
        children: [
          {
            path: '/repository',
            name: 'warehouse',
            component: () => import('@/views/repository/index.vue'),
            meta: {
              title: '仓库类型',
              icon: 'Coin',
              permissions: 'sky.repository.list',
            },
          },
          {
            path: '/repository/warehouseDetail',
            name: 'warehouseDetail',
            component: () =>
              import('@/views/repository/warehouseDetail/index.vue'),
            meta: {
              title: '文章仓库',
              icon: 'Suitcase',
              permissions: 'sky.repository.detail',
            },
          },
        ],
      },
      noteRoutes,
      h5Routes,
      {
        path: '/diary',
        name: 'diary',
        component: () => import('@/views/diary/index.vue'),
        meta: {
          title: '日记',
          icon: 'House',
          permissions: 'sky.diary',
        },
      },
      {
        path: '/diary/export',
        name: 'diaryExport',
        component: () => import('@/views/diary/exportDiary.vue'),
        meta: {
          title: '导出日记',
          icon: 'House',
          permissions: 'sky.diary.export',
          isHide: true,
        },
      },
      {
        path: '/diary/task',
        name: 'diaryTask',
        component: () => import('@/views/diary/task.vue'),
        meta: {
          title: '任务列表',
          icon: 'House',
          permissions: 'sky.diary.task',
          isHide: true,
        },
      },
      {
        path: '/import',
        name: 'import',
        meta: {
          title: '导入Github',
          icon: 'House',
          permissions: 'sky.import',
        },
        children: [
          {
            path: '/import/upload',
            name: 'importUpload',
            component: () => import('@/views/github/index.vue'),
            meta: {
              title: '导入图片',
              icon: 'House',
              permissions: 'sky.import.upload',
            },
          },
          {
            path: '/import/load',
            name: 'importLoad',
            component: () => import('@/views/github/loadFiles.vue'),
            meta: {
              title: '加载图片',
              icon: 'House',
              permissions: 'sky.import.load',
            },
          },
          {
            path: '/import/saveToken',
            name: 'importSaveToken',
            component: () => import('@/views/github/saveToken.vue'),
            meta: {
              title: '仓库地址',
              icon: 'House',
              permissions: 'sky.import.savetoken',
            },
          },
        ],
      },
      {
        path: '/example',
        name: 'example',
        component: () => import('@/views/example/index.vue'),
        meta: {
          title: '示例',
          icon: 'Operation',
          permissions: 'sky.example',
        },
      },
      {
        path: '/new',
        name: 'new',
        component: () => import('@/views/new/index.vue'),
        meta: {
          title: '草稿',
          icon: 'Operation',
          permissions: 'sky.new',
        },
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
  {
    // 404
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      icon: '',
    },
  },
]

export default routes
