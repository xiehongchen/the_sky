<template>
  <section class="task-box">
    <h3 class="title">今日待办事件列表</h3>
    <div class="add-todo">
      <input
        type="text"
        class="add-todo-input"
        v-model="newTodo"
        @keydown.enter="addTodo"
      />
      <TimeSelect @get-time="getFinishTime" class="add-todo-time" />
      <button class="add-todo-button button" @click="addTodo">+</button>
    </div>
    <div class="show-todo-list-container">
      <ul class="all-todo-list-container" ref="allTodo">
        <transition-group name="todoList">
          <li class="todo-item" v-for="task in taskList" :key="task.id">
            <div class="todo-container">
              <div class="todo-checkbox">
                <input
                  :id="`checkbox${task.id}}`"
                  type="checkbox"
                  :value="task.id"
                  v-model="checked"
                  class="todo-checkbox-origin"
                  v-show="false"
                />
                <label :for="`checkbox${task.id}}`"></label>
              </div>
              <div class="todo-center">
                <div class="todo-date">
                  <span class="date">{{ formDate(task.create_time) }}</span>
                  <span class="time">{{ formTime(task.create_time) }}</span>
                  <span style="margin: 0 10px">至</span>
                  <span class="date">{{ formDate(task.expect_time) }}</span>
                </div>
                <p class="todo-content">{{ task.event }}</p>
              </div>
              <button class="delete button" @click="deleteTodo(task.id)">
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
            <button class="finish button" @click="finishTodo(task.id)">
              完成
            </button>
            <button class="expect button" @click="delayTodo(task.id)">
              延期
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
      <button class="delete-checked button" @click="selectAll">全选</button>
      <button class="finish-checked button" @click="finishChecked">
        完成选中项
      </button>
      <button class="delete-checked button" @click="deleteChecked">
        删除选中项
      </button>
      <button class="finish-checked button" @click="delayChecked">
        延期选中项
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import TimeSelect from './TimeSelect.vue'
import BaseScroll from '@/components/base-scroll/baseScroll.vue'
// 导入滚动条所需参数类型接口
import { ScrollArguments } from '@/components/base-scroll/scrollArgumentsType'
import { useTodoStore } from '@/store/todo'
// import useDate from '@/utils/useDate'
import { ElMessage } from 'element-plus'
// import { nanoid } from 'nanoid'
import api from '@/api'
import { isToday, formDate, formTime } from '@/utils/useTime'

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
  getTodayTask()
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
interface taskType {
  id: string
  create_time: Date
  cancel_time?: Date
  delay_time?: Date
  expect_time: Date
  finish_time?: Date
  date: string
  event: string
}
const taskList = ref<taskType[]>([])
function getTodayTask() {
  taskList.value = []
  api.task.getAllTask({ status: 0 }).then((res) => {
    console.log(res.data)
    const data = res.data.data
    // console.log(data)
    // console.log(isToday(data[2].create_time))
    data.forEach((item: any) => {
      if (isToday(item.expect_time)) {
        // console.log(item)
        taskList.value.push(item)
      }
    })
    console.log('taskList.value', taskList.value)
  })
}

// const date = useDate().date
const newTodo = ref('')
const expectTtime = ref('')
// 视图变化时重新设置滚动参数
const getFinishTime = (time: string) => {
  // console.log('time', time)
  if (time) {
    expectTtime.value = time
  }
}
const addTodo = async () => {
  if (newTodo.value === '') {
    ElMessage.error('请输入待办事件')
    return
  } else if (expectTtime.value === '') {
    ElMessage.error('选择预期完成时间')
    return
  }
  await api.task
    .addTask({ event: newTodo.value, expectTtime: expectTtime.value })
    .then((res) => {
      if (res.data.answer) {
        newTodo.value = ''
        ElMessage.success('添加成功')
        getTodayTask()
      } else {
        ElMessage.error('添加失败')
      }
    })
}

// ==========删除待办，完成待办==========
// 删除一个
const deleteTodo = async (id: string) => {
  await api.task.deleteTask({ id: [id] }).then((res) => {
    if (res.data.answer) {
      ElMessage.success('删除成功')
      getTodayTask()
    } else {
      ElMessage.error('删除失败')
    }
  })
}
// 完成一个
const finishTodo = async (id: string) => {
  await api.task.finishTask({ id: [id] }).then((res) => {
    if (res.data.answer) {
      ElMessage.success('完成成功')
      getTodayTask()
    } else {
      ElMessage.error('完成失败')
    }
  })
}

const delayTodo = async (id: string) => {
  await api.task.delayTask({ id: [id] }).then((res) => {
    if (res.data.answer) {
      ElMessage.success('延期成功')
      getTodayTask()
    } else {
      ElMessage.error('延期失败')
    }
  })
}

const checked = ref<string[]>([])
const select = ref(false)
const selectAll = () => {
  if (!select.value) {
    checked.value = taskList.value.map((item) => item.id)
    select.value = true
  } else {
    checked.value = []
    select.value = false
  }
}
// 删除所有选中
const deleteChecked = async () => {
  if (checked.value.length === 0) {
    ElMessage.error('选择任务')
    return
  }
  await api.task.deleteTask({ id: [...checked.value] }).then((res) => {
    if (res.data.answer) {
      ElMessage.success('删除成功')
      getTodayTask()
    } else {
      ElMessage.error('删除失败')
    }
  })
}
// 完成所有选中
const finishChecked = async () => {
  if (checked.value.length === 0) {
    ElMessage.error('选择任务')
    return
  }
  await api.task.finishTask({ id: [...checked.value] }).then((res) => {
    if (res.data.answer) {
      ElMessage.success('完成成功')
      getTodayTask()
    } else {
      ElMessage.error('完成失败')
    }
  })
}
const delayChecked = async () => {
  if (checked.value.length === 0) {
    ElMessage.error('选择任务')
    return
  }
  await api.task.delayTask({ id: [...checked.value] }).then((res) => {
    if (res.data.answer) {
      ElMessage.success('延期成功')
      getTodayTask()
    } else {
      ElMessage.error('延期失败')
    }
  })
}
</script>

<style lang="scss" scoped>
.task-box {
  display: flex;
  flex-flow: column;
  padding: 20px;
  .title {
    color: var(--main-child-title);
    font-size: 18px;
  }
  .add-todo {
    display: flex;
    align-items: center;
    padding-right: 10px;
    height: 50px;
    margin: 10px 0;
    .add-todo-input {
      flex: 1;
      height: 30px;
      padding: 0 20px;
      font-size: 16px;
      font-weight: bold;
      color: var(--todo-add-word);
      border-radius: 15px;
      border: solid 2px var(--todo-add-border);
      background-color: var(--todo-add-bg);
    }
    .add-todo-time {
      flex: 1;
      margin-left: 10px;
    }
    .add-todo-button {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 0 55px;
      height: 40px;
      margin-left: 30px;
      font-size: 40px;
      font-family: Arial, Helvetica, sans-serif;
      color: var(--todo-button-word);
      border-radius: 10px;
      border: solid 2px var(--todo-button-border);
      background-color: var(--todo-button-bg);
    }
  }
  .show-todo-list-container {
    position: relative;
    display: flex;
    justify-content: flex-end;
    flex: 1 1 0;
    .all-todo-list-container {
      position: absolute;
      top: 0;
      left: 0;
      padding-right: 10px;
      box-sizing: border-box;
      height: 100%;
      width: 100%;
      overflow: auto;
      overflow-y: scroll;
      .todo-item {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        .todo-container {
          display: flex;
          align-items: center;
          padding: 0 10px;
          width: 100%;
          height: 45px;
          font-weight: bold;
          border-radius: 20px;
          color: var(--todo-child-word);
          background-color: var(--todo-child-bg);
          .todo-checkbox {
            position: relative;
            margin-right: 10px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: solid 2px var(--todo-button-border);
            background-color: var(--todo-child-checkbox-bg);
            label {
              display: block;
              width: 100%;
              height: 100%;
            }
            .todo-checkbox-origin + label::after {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              width: 0;
              height: 0;
              transition: all 0.2s;
            }
            .todo-checkbox-origin:checked + label::after {
              content: '';
              position: absolute;
              top: calc(50% - 4px);
              left: calc(50% - 4px);
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background-color: var(--todo-child-checkbox-checked);
            }
          }
          .todo-center {
            flex: 1;
            .todo-date {
              margin-right: 20px;
              .date {
                margin-right: 10px;
              }
            }
            .todo-content {
              margin-top: 5px;
              flex: 1 1 0;
            }
          }
          .delete {
            background: none;
          }
        }
        .finish {
          flex: 0 0 55px;
          margin-left: 10px;
          padding: 10px 0;
          border: solid 2px var(--todo-button-border);
          border-radius: 10px;
          color: var(--todo-button-word);
          background-color: var(--todo-button-bg);
        }
        .expect {
          flex: 0 0 55px;
          margin-left: 5px;
          padding: 10px 0;
          border: solid 2px var(--todo-button-border);
          border-radius: 10px;
          color: var(--todo-button-word);
          background-color: var(--todo-button-bg);
        }
      }
      .todoList-move,
      .todoList-enter-active,
      .todoList-leave-active {
        transition: all 0.4s ease;
      }

      .todoList-enter-from,
      .todoList-leave-to {
        opacity: 0;
      }

      .todoList-leave-active {
        position: absolute;
        width: calc(100% - 10px);
      }
    }
    .all-todo-list-container::-webkit-scrollbar {
      display: none;
    }
  }
  .bottom-button {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    .delete-checked,
    .finish-checked {
      margin: 0 10px;
      padding: 5px 10px;
      border-radius: 20px;
      color: var(--todo-button-word);
    }
    .delete-checked {
      flex: 1;
      background-color: var(--todo-delete-button-bg);
    }
    .finish-checked {
      flex: 1;
      background-color: var(--todo-button-bg);
    }
  }
}
</style>
