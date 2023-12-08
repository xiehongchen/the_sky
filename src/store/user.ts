import { defineStore } from 'pinia'

interface userInfo {
  name: string
  password: string
  username: string
  permissions: []
}

export const useUserStore = defineStore('user', () => {
  const state = reactive({
    userInfo: {
      username: '',
      name: '',
      password: '',
      permissions: [],
    },
  })

  // 加载数据，尝试从本地存储中恢复数据
  function loadWareHouse() {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      state.userInfo = JSON.parse(userInfo)
    }
  }
  // 在创建 store 时加载数据
  loadWareHouse()

  const userInfo = computed(() => state.userInfo)

  // 数据保存到本地
  function saveUserInfo(form: userInfo) {
    state.userInfo = form
    localStorage.setItem('userInfo', JSON.stringify(form))
  }
  // 本地删除
  function removeUserInfo() {
    localStorage.removeItem('userInfo')
  }
  return {
    userInfo,
    saveUserInfo,
    removeUserInfo,
  }
})
