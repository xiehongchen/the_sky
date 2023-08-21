import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/routers'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/styles/index.scss'
import pinia from './store'
import './assets/iconfont/iconfont.css'
// 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import './mock/index.ts'
import { registerClickRequestDirective } from './directive/click-request-directive' // 导入自定义指令

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})
app.use(router)
app.use(pinia)

// 注册element-plus的图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
registerClickRequestDirective(app)
app.mount('#app')
