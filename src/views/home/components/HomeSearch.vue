<template>
  <section class="search-box">
    <div class="input-box">
      <input
        type="text"
        class="searchKeyword"
        @focus="focusHandle"
        ref="input"
        v-model="keyWord"
      />
      <span class="iconfont icon-sousuotianchong"></span>
    </div>
    <div class="search-result-box" v-show="isSearch">
      <ul class="search-result" ref="searchResult">
        <TransitionGroup>
          <li
            class="search-result-item"
            v-for="list in searchResultList"
            :key="list.id"
          >
            <span>{{ list.date }}</span>
            <span>{{ list.event }}</span>
            <span class="state">{{ list.state }}</span>
          </li>
        </TransitionGroup>
      </ul>
      <BaseScroll
        v-if="isSearch"
        :scrollHeight="scrollHeight"
        :showHeight="showHeight"
        :scrollTop="scrollTop"
        @slide="slide"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseScroll from '@/components/base-scroll/baseScroll.vue'
import { useTodoStore } from '@/store/todo'
import { computed, ref } from 'vue'
import { nextTick, onMounted, watch } from 'vue'
const searchResult = ref()
let scrollHeight = ref<number>(100)
let showHeight = ref<number>(1)
let scrollTop = ref<number>(0)
let isSearch = ref<boolean>(false)

function setScroll() {
  showHeight.value = searchResult.value.offsetHeight
  scrollHeight.value = searchResult.value.scrollHeight
}

onMounted(() => {
  searchResult.value.addEventListener('scroll', (e: Event) => {
    const target: HTMLElement = e.target as HTMLElement
    scrollTop.value = target.scrollTop
  })
})
let input = ref()
// 输入框聚焦事件
function focusHandle(): void {
  isSearch.value = true
  nextTick(() => {
    setScroll()
  })
  // 如果鼠标按下时不在滚动条，隐藏搜索结果
  document.onmousedown = () => {
    let className = (event?.target as HTMLElement)?.className
    let parent = (event?.target as HTMLElement)?.parentElement

    if (
      typeof className.indexOf != 'function' ||
      (className?.indexOf('searchKeyword') == -1 &&
        className?.indexOf('scroll') == -1 &&
        className?.indexOf('search-result') == -1 &&
        className?.indexOf('search-result-item') == -1 &&
        parent?.className.indexOf('search-result-item') == -1)
    ) {
      isSearch.value = false
    }
  }
}
// 清除全局鼠标按下事件
watch(isSearch, (news) => {
  if (news == false) {
    document.onmousedown = null
  }
})

// 滚动组件自定义事件
function slide(Top: number) {
  scrollTop.value = Top
  searchResult.value.scrollTop = Top
}

// 关键词变化
let keyWord = ref('')
let useTodo = useTodoStore()
const searchResultList = computed(() => {
  let arr: { id: string; date: string; event: string; state: string }[] = []
  if (keyWord.value == '') {
    return []
  }
  useTodo.finishTodo.forEach((item) => {
    item.child.forEach((child) => {
      if (child.event.indexOf(keyWord.value) != -1) {
        arr.push({
          id: item.id + child.id,
          date: item.date,
          event: child.event,
          state: '已完成',
        })
      }
    })
  })
  useTodo.todo.forEach((item) => {
    if (item.event.indexOf(keyWord.value) != -1) {
      arr.push({
        id: item.id,
        date: item.date,
        event: item.event,
        state: '待完成',
      })
    }
  })
  return arr
})
watch(searchResultList, () => {
  // 延时到过渡完成后执行
  setTimeout(() => {
    nextTick(() => {
      setScroll()
    })
  }, 400)
})
</script>

<style lang="scss" scoped>
.search-box {
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: center;
  padding: 0 20px;
  box-sizing: border-box;
  transition: all 0.4s;
  .input-box {
    display: flex;
    align-items: center;
    .searchKeyword {
      border: none;
      font-size: 18px;
      width: 100%;
      height: 100%;
      background-color: var(--search-bg);
      color: var(--search-word);
      font-weight: bold;
    }
    .icon-sousuotianchong {
      color: var(--search-word);
      font-size: 20px;
    }
  }
  .search-result-box {
    position: absolute;
    z-index: 20;
    top: 45px;
    left: 0;
    display: flex;
    justify-content: flex-end;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 20px;
    width: 400px;
    height: 160px;
    /* overflow: hidden; */
    background-color: var(--main-child-bg);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
    .search-result {
      width: 100%;
      height: 120px;
      overflow-y: scroll;
      overflow-x: hidden;
      color: var(--search-word);
      .v-enter-from,
      .v-leave-to {
        opacity: 0;
        transform: translateX(30px);
      }
      .v-move,
      .v-enter-active,
      .v-leave-active {
        transition: all 0.4s ease;
      }
      .v-leave-active {
        position: absolute;
      }
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        span:first-child {
          margin-right: 20px;
        }
        span:nth-child(2) {
          flex: 1 1 0;
        }
        span:last-child {
          margin-right: 10px;
        }
      }
    }
    .search-result::-webkit-scrollbar {
      display: none;
    }
  }
}

@media screen and (max-width: 1500px) {
  .search {
    display: none;
  }
}
</style>
