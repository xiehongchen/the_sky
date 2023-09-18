import { defineStore } from 'pinia'

interface tabListType {
  title: string
  name: string
  content: string
  query?: object
  lock: boolean
}

export const useTab = defineStore('tab', () => {
  const state = reactive({
    tabList: [] as tabListType[],
    activeTab: '',
  })
  // 从本地存储中加载状态
  function loadStateFromLocalStorage() {
    const savedState = localStorage.getItem('tabList')
    if (savedState) {
      const parsedState = JSON.parse(savedState)
      state.tabList = parsedState.tabList || []
      state.activeTab = parsedState.activeTab || ''
    }
  }
  // 保存状态到本地存储中
  function saveStateToLocalStorage() {
    const currentState = {
      tabList: state.tabList,
      activeTab: state.activeTab,
    }
    localStorage.setItem('tabList', JSON.stringify(currentState))
  }
  function addTab(item: any) {
    if (state.tabList.length === 0) {
      loadStateFromLocalStorage()
    }
    const tmp = {
      title: item.meta.title,
      name: item.name,
      content: item.path,
      lock: false,
      query: {
        ...item.query,
      },
    }
    if (state.tabList.length === 0) {
      state.tabList.push(tmp)
    } else {
      if (state.tabList.length === 8) {
        removeTab(state.tabList[7].name)
      }
      const isNameExists = state.tabList.some((item) => item.name === tmp.name)
      if (!isNameExists) {
        state.tabList.push(tmp)
      }
    }
    state.activeTab = item.name
    saveStateToLocalStorage()
  }
  function removeTab(name: string) {
    state.tabList = state.tabList.filter((item) => item.name !== name)
    if (state.tabList.length === 0) {
      const tmp = {
        title: '欢迎页',
        name: 'welcome',
        content: '/welcome',
        lock: false,
      }
      state.tabList.push(tmp)
      state.activeTab = 'welcome'
    } else {
      state.activeTab = state.tabList[state.tabList.length - 1].name
    }
    saveStateToLocalStorage()
  }
  function lock(name: string) {
    state.tabList.map((item) => {
      if (item.name === name) {
        item.lock = true
      }
    })
    saveStateToLocalStorage()
  }
  function unLock(name: string) {
    state.tabList.map((item) => {
      if (item.name === name) {
        item.lock = false
      }
    })
    saveStateToLocalStorage()
  }

  const tabList = computed(() => state.tabList)
  const activeTab = computed(() => state.activeTab)
  return {
    tabList,
    activeTab,
    loadStateFromLocalStorage,
    saveStateToLocalStorage,
    addTab,
    removeTab,
    lock,
    unLock,
  }
})
