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
const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(pinia)

// 注册element-plus的图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
