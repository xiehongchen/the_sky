import { App, DirectiveBinding } from 'vue'
import axios from 'axios'

// 定义自定义指令
const clickRequestDirective = {
  // 指令绑定时
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // 监听元素的点击事件
    el.addEventListener('click', async () => {
      try {
        // 发起请求
        const response = await axios.get(binding.value)

        // 处理请求成功的响应
        console.log('Response:', response.data)
      } catch (error) {
        // 处理请求失败
        console.error('Error:', error)
      }
    })
  },
}

// 导出自定义指令对象
export default clickRequestDirective

// 在全局注册自定义指令的函数
export function registerClickRequestDirective(app: App) {
  app.directive('click-request', clickRequestDirective)
}
