import { defineStore } from 'pinia'

export const useTab = defineStore('room', () => {
  const state = reactive({
    roomList: [],
    activeRoom: '',
  })
  // 从本地存储中加载状态
  function loadStateFromLocalStorage() {
    const savedState = localStorage.getItem('roomList')
    if (savedState) {
      const parsedState = JSON.parse(savedState)
      state.roomList = parsedState.roomList || []
      state.activeRoom = parsedState.activeRoom || ''
    }
  }
  // 保存状态到本地存储中
  function saveStateToLocalStorage() {
    const currentState = {
      roomList: state.roomList,
      activeRoom: state.activeRoom,
    }
    localStorage.setItem('roomList', JSON.stringify(currentState))
  }
  const roomList = computed(() => state.roomList)
  const activeRoom = computed(() => state.activeRoom)
  return {
    roomList,
    activeRoom,
    loadStateFromLocalStorage,
    saveStateToLocalStorage,
  }
})
