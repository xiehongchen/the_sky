<template>
  <!-- 今日待办，其他，延期，已完成，已取消，未完成 -->
  <!-- 创建时间、预计完成时间、实际完成时间、取消时间、延期时间 -->
  <main>
    <TodayTask
      :taskList="taskList"
      @add-todo="addTodo"
      @delete-todo="deleteTodo"
      @finish-todo="finishTodo"
      @delay-todo="delayTodo"
      @delete-checked="deleteChecked"
      @delay-checked="delayChecked"
      @finish-checked="finishChecked"
    />
    <OtherTask
      :taskList="otherTaskList"
      @add-todo="addTodo"
      @delete-todo="deleteTodo"
      @finish-todo="finishTodo"
      @delete-checked="deleteChecked"
      @finish-checked="finishChecked"
    />
    <FinishTask />
  </main>
</template>

<script setup lang="ts">
import FinishTask from './components/FinishTask.vue'
import OtherTask from './components/OtherTask.vue'
import TodayTask from './components/TodayTask.vue'
import api from '@/api'
import { isToday } from '@/utils/useTime'
import { ElMessage } from 'element-plus'

onMounted(() => {
  getTodayTask()
})
interface taskType {
  id: string
  create_time: Date
  cancel_time?: Date
  delay_time?: Date
  expect_time?: Date
  finish_time: Date
  status: number
  event: string
}
const taskList = ref<taskType[]>([])
const otherTaskList = ref<taskType[]>([])

function formDate(item: any, status?: number) {
  if (item.status === 0 || item.status === 2) {
    return isToday(item.expect_time, status)
  } else {
    return isToday(item.delay_time, status)
  }
}

const getTodayTask = async () => {
  taskList.value = []
  otherTaskList.value = []
  await api.task.getAllTask({ status: [0, 2, 3] }).then((res) => {
    const data = res.data.data
    data.forEach((item: any) => {
      if (formDate(item)) {
        taskList.value.push(item)
      }
      if (formDate(item, 2)) {
        otherTaskList.value.push(item)
      }
    })
  })
  console.log('taskList.value', taskList.value)
  console.log('otherTaskList.value', otherTaskList.value)
}
// 增加
const addTodo = async (value: any) => {
  console.log('value', value)
  if (value.todo === '') {
    ElMessage.error('请输入待办事件')
    return
  } else if (value.date === '') {
    ElMessage.error('选择预期完成时间')
    return
  }
  await api.task
    .addTask({ event: value.todo, expectTtime: value.date })
    .then((res) => {
      if (res.data.answer) {
        ElMessage.success('添加成功')
        getTodayTask()
      } else {
        ElMessage.error('添加失败')
      }
    })
}
// 删除
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
// 删除选中的
const deleteChecked = async (value: any) => {
  console.log(value)
  if (value.length === 0) {
    ElMessage.error('选择任务')
    return
  }
  await api.task.deleteTask({ id: [...value] }).then((res) => {
    if (res.data.answer) {
      ElMessage.success('删除成功')
      getTodayTask()
    } else {
      ElMessage.error('删除失败')
    }
  })
}
// 完成
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
const finishChecked = async (value: any) => {
  if (value.length === 0) {
    ElMessage.error('选择任务')
    return
  }
  await api.task.finishTask({ id: [...value] }).then((res) => {
    if (res.data.answer) {
      ElMessage.success('完成成功')
      getTodayTask()
    } else {
      ElMessage.error('完成失败')
    }
  })
}
// 延期
const delayTodo = async (value: any) => {
  // console.log(setDate.value)
  if (!isToday(value.date, 1)) {
    ElMessage.error('选择正确时间')
    return
  }
  // console.log(id)
  await api.task
    .delayTask({ id: [value.id], delayTime: value.date })
    .then((res) => {
      if (res.data.answer) {
        ElMessage.success('延期成功')
        getTodayTask()
      } else {
        ElMessage.error('延期失败')
      }
    })
}
const delayChecked = async (value: any) => {
  console.log('value', value)
  if (value.check.length === 0) {
    ElMessage.error('选择任务')
    return
  }
  if (!isToday(value.date, 1)) {
    ElMessage.error('选择正确时间')
    return
  }
  await api.task
    .delayTask({ id: [...value.check], delayTime: value.date })
    .then((res) => {
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
main {
  background-color: #f9fbfc;
  width: 100%;
  height: 100%;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 10px;

  section {
    box-sizing: border-box;
    background-color: var(--main-child-bg);
    border-radius: 30px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
    transition: all 0.4s;
  }
}
</style>
