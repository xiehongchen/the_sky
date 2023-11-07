const routes = {
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
      // component: () => import('@/views/H5/Canvas.vue'),
      component: () => import('@/views/H5/Canvas/index.vue'),
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
    {
      path: '/H5/websocket',
      name: 'websocket',
      component: () => import('@/views/H5/webSocket/index.vue'),
      meta: {
        title: 'websocket',
        icon: 'Coin',
        permissions: 'sky.h5.websocket',
      },
    },
    {
      path: '/H5/websocket/chat',
      name: 'websocketChat',
      component: () => import('@/views/H5/webSocket/chat.vue'),
      meta: {
        title: 'websocketChat',
        permissions: 'sky.h5.websocketChat',
        isHide: true,
      },
    },
  ],
}

export default routes
