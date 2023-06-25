import axios from 'axios'
// 使用element-plus ElMessage做消息提醒
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'
//1. 创建新的axios实例
const request = axios.create({
  // 公共接口 开发环境还是线上环境也可以用api
  baseURL: '/api',
  // 超时时间 单位是ms，这里设置了5s的超时时间
  timeout: 5000,
})
// 2.请求拦截器
request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.token = userStore.token
    }
    //config配置对象,headers属性请求头,经常给服务器端携带公共参数
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

// 3.响应拦截器
request.interceptors.response.use(
  (response) => {
    //接收到响应数据并成功后的一些共有的处理，关闭loading等

    return response
  },
  (error) => {
    /***** 接收到异常响应的处理开始 *****/
    if (error && error.response) {
      // 1.公共错误处理
      // 2.根据响应码具体处理
      switch (error.response.status) {
        case 400:
          ElMessage.error = '错误请求'
          break
        case 401:
          ElMessage.error = '未授权，请重新登录'
          break
        case 403:
          ElMessage.error = '拒绝访问'
          break
        case 404:
          ElMessage.error = '请求错误,未找到该资源'
          //window.location.href = "/NotFound"
          break
        case 405:
          ElMessage.error = '请求方法未允许'
          break
        case 408:
          ElMessage.error = '请求超时'
          break
        case 500:
          ElMessage.error = '服务器端出错'
          break
        case 501:
          ElMessage.error = '网络未实现'
          break
        case 502:
          ElMessage.error = '网络错误'
          break
        case 503:
          ElMessage.error = '服务不可用'
          break
        case 504:
          ElMessage.error = '网络超时'
          break
        case 505:
          ElMessage.error = 'http版本不支持该请求'
          break
        default:
          ElMessage.error = `连接错误${error.response.status}`
      }
    } else {
      // 超时处理
      if (JSON.stringify(error).includes('timeout')) {
        ElMessage.error('服务器响应超时，请刷新当前页')
      }
      ElMessage.error('连接服务器失败')
    }

    //ElMessage.error(ElMessage.error)
    /***** 处理结束 *****/
    //如果不需要错误处理，以上的处理过程都可省略
    return Promise.resolve(error.response)
  },
)
//4.导出
export default request
