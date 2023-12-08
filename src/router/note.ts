const routes = {
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
      path: '/note/CSS',
      name: 'CSS案例',
      component: () => import('@/views/note/CSS/index.vue'),
      meta: {
        title: 'CSS案例',
        icon: 'Coin',
        permissions: 'sky.note.css',
      },
    },
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
  ],
}

export default routes
