import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

// 前置守卫
// router.beforeEach((to, from, next) => {
//   // console.log(to, from)
//   next()
// })

// // 后置守卫
// router.afterEach((to, from) => {
//   // console.log(to, from)
// })

export default router
