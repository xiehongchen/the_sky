import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { GET_TOKEN } from '@/utils/token'
import { ElMessage } from 'element-plus'

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
router.beforeEach((to, from, next) => {
  console.log(to, from)
  const token = GET_TOKEN()
  if (to.name === 'login' && token) {
    // 如果用户已经登录，但又访问登录页面，直接重定向到其他页面
    next({ name: 'welcome' })
  } else if (to.name !== 'login' && !token) {
    // 如果用户未登录，但访问需要登录的页面，重定向到登录页面
    ElMessage.error('token失效，请重新登陆')
    next({ name: 'login' })
  } else {
    next() // 其他情况继续导航
  }
})

// // 后置守卫
// router.afterEach((to, from) => {
//   // console.log(to, from)
// })

export default router
