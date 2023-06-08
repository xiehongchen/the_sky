import { defineStore } from 'pinia'
import { GET_TOKEN } from '@/utils/token'

import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
} from '@/api/user/type'
import type { UserState } from './types/type'
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'

export const useUserStore = defineStore('UserStore', {
  state: () => ({
    token: GET_TOKEN(),
    username: '谢红尘',
    avatar:
      'https://img1.baidu.com/it/u=1960110688,1786190632&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
    //存储当前用户是否包含某一个按钮
    buttons: [],
    userInfo: {},
    userMenus: [], //用户菜单，这个菜单是根据用户权限动态生成的，不过现在还没有做
    userRoutes: [], //用户路由，这个路由是根据用户权限动态生成的，不过现在还没有做
    userPermissions: [], //用户权限，这个权限是根据用户权限动态生成的，不过现在还没有做
  }),
  actions: {
    // 用户登录
    async UserLogin(data: loginFormData) {
      // 登录请求
      const result: loginResponseData = await reqLogin(data)
      //登录请求:成功200->token
      //登录请求:失败201->登录失败错误的信息
      if (result.code == 200) {
        //pinia仓库存储一下token
        //由于pinia|vuex存储数据其实利用js对象
        this.token = result.data as string
        //本地存储持久化存储一份
        SET_TOKEN(result.data as string)
        //能保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    //获取用户信息方法
    async userInfo() {
      //获取用户信息进行存储仓库当中[用户头像、名字]
      const result: userInfoReponseData = await reqUserInfo()
      //如果获取用户信息成功，存储一下用户信息
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        this.buttons = result.data.buttons
        //计算当前用户需要展示的异步路由，路由是根据用户权限动态生成的
        // const userAsyncRoute = filterAsyncRoute(
        //   cloneDeep(asnycRoute),
        //   result.data.routes,
        // )
        //菜单需要的数据整理完毕
        // this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]
        //   //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
        //   ;[...userAsyncRoute, anyRoute].forEach((route: any) => {
        //     router.addRoute(route)
        //   })
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //退出登录
    async userLogout() {
      //退出登录请求
      const result: any = await reqLogout()
      if (result.code == 200) {
        //目前没有mock接口:退出登录接口(通知服务器本地用户唯一标识失效)
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
