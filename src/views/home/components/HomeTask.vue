<template>
  <section class="task-box">
    <h3 class="title">待办事件列表</h3>
    <div class="add-todo">
      <input
        type="text"
        class="add-todo-input"
        v-model="newTodo"
        @keydown.enter="addTodo"
      />
      <button class="add-todo-button button" @click="addTodo">+</button>
    </div>
    <div class="show-todo-list-container">
      <ul class="all-todo-list-container" ref="allTodo">
        <transition-group name="todoList">
          <li class="todo-item" v-for="todo in useTodo.todo" :key="todo.id">
            <div class="todo-container">
              <div class="todo-checkbox">
                <input
                  :id="`checkbox${todo.id}}`"
                  type="checkbox"
                  :value="todo.id"
                  v-model="checked"
                  class="todo-checkbox-origin"
                  v-show="false"
                />
                <label :for="`checkbox${todo.id}}`"></label>
              </div>
              <div class="todo-date">
                <span class="date">{{ todo.date }}</span>
                <span class="time">{{ todo.time }}</span>
              </div>
              <p class="todo-content">{{ todo.event }}</p>
              <button class="delete button" @click="deleteTodo(todo.id)">
                <svg
                  t="1663664520209"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3276"
                  width="24"
                  height="24"
                >
                  <path
                    d="M512 938.666667c235.637333 0 426.666667-191.029333 426.666667-426.666667S747.637333 85.333333 512 85.333333 85.333333 276.362667 85.333333 512s191.029333 426.666667 426.666667 426.666667zM352 480h320a32 32 0 0 1 0 64H352a32 32 0 0 1 0-64z"
                    p-id="3277"
                    fill="#FF9D9D"
                  ></path>
                </svg>
              </button>
            </div>
            <button class="finish button" @click="finishTodo(todo.id)">
              完成
            </button>
          </li>
        </transition-group>
      </ul>
      <BaseScroll
        :scrollHeight="scrollArguments.scrollHeight"
        :showHeight="scrollArguments.showHeight"
        :scrollTop="scrollArguments.scrollTop"
        @slide="slide"
      />
    </div>
    <div class="bottom-button">
      <button class="delete-checked button" @click="deleteChecked">
        删除选中项
      </button>
      <button class="finish-checked button" @click="finishChecked">
        完成选中项
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseScroll from '@/components/base-scroll/baseScroll.vue'
// 导入滚动条所需参数类型接口
import { ScrollArguments } from '@/components/base-scroll/scrollArgumentsType'
import { useTodoStore } from '@/store/todo'
import useDate from '@/utils/useDate'
import { ElMessage } from 'element-plus'
import { nanoid } from 'nanoid'

const scrollArguments: ScrollArguments = reactive({
  scrollHeight: 100,
  showHeight: 10,
  scrollTop: 0,
})
// 滚动容器ref
const allTodo = ref()
// 设置参数
function setScrollHeight() {
  const { scrollHeight, offsetHeight } = allTodo.value
  scrollArguments.scrollHeight = scrollHeight
  scrollArguments.showHeight = offsetHeight
}
onMounted(() => {
  nextTick(() => {
    setScrollHeight()
    // 添加滚动事件，获取滚动高度
    allTodo.value.addEventListener('scroll', (e: Event) => {
      const target: HTMLElement = e.target as HTMLElement
      scrollArguments.scrollTop = target.scrollTop
    })
  })
})
// 滚动组件自定义事件
function slide(scrollTop: number) {
  scrollArguments.scrollTop = scrollTop
  allTodo.value.scrollTop = scrollTop
}
watch(useTodoStore().todo, () => {
  nextTick(() => {
    setScrollHeight()
  })
})

// ===============新增待办事件=================
const date = useDate().date
const useTodo = useTodoStore()
const newTodo = ref('')
// 视图变化时重新设置滚动参数

function addTodo() {
  if (newTodo.value == '') {
    ElMessage.error('请输入待办事件')
    return
  }
  // 所有待办的时间戳
  const { getTodoTimestamp } = useTodo
  const todoLength = getTodoTimestamp.length
  const { year, month, day, hours, minutes } = useDate().formatDate()
  // 整理数据
  const data = {
    id: nanoid(),
    date: `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`,
    time: `${hours}:${minutes}`,
    event: newTodo.value,
  }
  newTodo.value = ''
  // 时间小于第一个待办时间
  if (+date.value < getTodoTimestamp[0] || todoLength === 0) {
    useTodo.todo.unshift(data)
  } else if (+date.value > getTodoTimestamp[todoLength - 1]) {
    // 时间大于最后一个待办时间
    useTodo.todo.push(data)
  } else {
    for (let i = 1; i < todoLength - 1; i++) {
      if (+date.value < useTodo.getTodoTimestamp[i]) {
        useTodo.todo.splice(i - 1, 0, data)
        break
      }
    }
  }
}

// ==========删除待办，完成待办==========
// 删除一个
function deleteTodo(id: string) {
  useTodo.deleteTodo(id)
  ElMessage({
    type: 'success',
    message: '删除成功',
  })
}
// 完成一个
function finishTodo(id: string) {
  const todo = useTodo.deleteTodo(id)
  if (todo) {
    const timestamp = new Date(todo[0].date + ' ' + todo[0].time).getTime()
    const dateStamp = new Date(todo[0].date).getTime()
    useTodo.addFinishTodo(dateStamp, timestamp, todo[0])
  }
}

const checked = ref([])
// 删除所有选中
function deleteChecked() {
  for (let i = 0; i < checked.value.length; i++) {
    useTodo.deleteTodo(checked.value[i])
  }
  ElMessage({
    type: 'success',
    message: '删除成功',
  })
}
// 完成所有选中
function finishChecked() {
  for (let i = 0; i < checked.value.length; i++) {
    finishTodo(checked.value[i])
  }
}
</script>

<style lang="scss" scoped></style>
