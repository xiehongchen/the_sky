import { defineStore } from 'pinia'

interface wareHouseData {
  userName: string
  wareHouseName: string
  token: string
  branchName: string
}

export const useWareHouseStore = defineStore('uploadFile', () => {
  const state = reactive({
    wareHouse: {
      userName: '',
      wareHouseName: '',
      token: '',
      branchName: '',
    },
  })

  // 加载数据，尝试从本地存储中恢复数据
  function loadWareHouse() {
    const savedWareHouse = localStorage.getItem('wareHouseData')
    if (savedWareHouse) {
      state.wareHouse = JSON.parse(savedWareHouse)
    }
  }
  // 在创建 store 时加载数据
  loadWareHouse()

  const wareHouse = computed(() => state.wareHouse)

  // 数据保存到本地
  function saveWareHouse(form: wareHouseData) {
    state.wareHouse = form
    localStorage.setItem('wareHouseData', JSON.stringify(form))
  }
  return {
    wareHouse,
    saveWareHouse,
  }
})
