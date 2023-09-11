import { RouteRecordRaw } from 'vue-router'
import layout from '@/views/layout/index.vue'

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
      {
        path: '/note',
        name: 'note',
        // component: () => import('@/views/note/index.vue'),
        meta: {
          title: '笔记',
          icon: 'House',
          permissions: 'sky.note',
        },
        children: [
          {
            path: '/note/JS',
            name: 'JS全概',
            component: () => import('@/views/note/JS/index.vue'),
            meta: {
              title: 'JS全概',
              icon: 'Coin',
              permissions: 'sky.note.js',
            },
          },
          {
            path: '/note/Vue',
            name: 'Vue学习',
            component: () => import('@/views/note/Vue/index.vue'),
            meta: {
              title: 'Vue学习',
              icon: 'Coin',
              permissions: 'sky.note.vue',
            },
          },
          {
            path: '/note/THREE',
            name: 'three学习',
            component: () => import('@/views/note/three/index.vue'),
            meta: {
              title: 'three学习',
              icon: 'Coin',
              permissions: 'sky.note.three',
            },
          },
          {
            path: '/note/Visualization',
            name: '数据可视化',
            component: () => import('@/views/note/Visualization/index.vue'),
            meta: {
              title: '数据可视化',
              icon: 'Coin',
              permissions: 'sky.note.visualization',
            },
          },
          {
            path: '/note/CSS',
            name: 'CSS案例',
            component: () => import('@/views/note/CSS/index.vue'),
            meta: {
              title: 'CSS案例',
              icon: 'Coin',
              permissions: 'sky.note.css',
            },
          },
        ],
      },
      {
        path: '/H5',
        name: 'H5新特性',
        // component: () => import('@/views/repository/index.vue'),
        meta: {
          title: 'H5新特性',
          icon: 'Coin',
          permissions: 'sky.h5',
        },
        children: [
          {
            path: '/H5/Speech',
            name: '语音',
            component: () => import('@/views/H5/Speech.vue'),
            meta: {
              title: '语音',
              icon: 'Coin',
              permissions: 'sky.h5.speech',
            },
          },
          {
            path: '/H5/Drag',
            name: '拖拽',
            component: () => import('@/views/H5/Drag.vue'),
            meta: {
              title: '拖拽',
              icon: 'Coin',
              permissions: 'sky.h5.drag',
            },
          },
          {
            path: '/H5/canvas',
            name: 'canvas',
            component: () => import('@/views/H5/Canvas.vue'),
            meta: {
              title: 'canvas',
              icon: 'Coin',
              permissions: 'sky.h5.canvas',
            },
          },
          {
            path: '/H5/video',
            name: '视频',
            component: () => import('@/views/H5/Video.vue'),
            meta: {
              title: '视频',
              icon: 'Coin',
              permissions: 'sky.h5.video',
            },
          },
          {
            path: '/H5/audio',
            name: '音频',
            component: () => import('@/views/H5/Audio.vue'),
            meta: {
              title: '音频',
              icon: 'Coin',
              permissions: 'sky.h5.audio',
            },
          },
        ],
      },
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
          title: '待办时间',
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
