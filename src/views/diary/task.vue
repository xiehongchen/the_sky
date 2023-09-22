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
    <FinishTask :taskList="finishTaskList" />
    <EveryDayTask
      :taskList="everyDayTaskList"
      @add-todo="addTask"
      @delete-todo="deleteTask"
      @finish-todo="finishTask"
      @delete-checked="deleteCheckedTask"
      @finish-checked="finishCheckedTask"
    />
    <FutureTask />
    <DayFinishTask />
  </main>
</template>

<script setup lang="ts">
import FinishTask from './components/FinishTask.vue'
import OtherTask from './components/OtherTask.vue'
import TodayTask from './components/TodayTask.vue'
import EveryDayTask from './components/EveryDayTask.vue'
import FutureTask from './components/FutureTask.vue'
import DayFinishTask from './components/DayFinishTask.vue'
import api from '@/api'
import { isToday } from '@/utils/useTime'
import { ElMessage } from 'element-plus'

onMounted(() => {
  getTodayTask()
  getEveryDayTask()
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
interface everyTaskType {
  id: string
  event: string
  time?: Date
}

const taskList = ref<taskType[]>([])
const otherTaskList = ref<taskType[]>([])
const finishTaskList = ref<taskType[]>([])
const everyDayTaskList = ref<everyTaskType[]>([])
const futerTaskList = ref<everyTaskType[]>([])
const finishDayTaskList = ref<everyTaskType[]>([])

function formDate(item: any, status?: number) {
  if (item.status === 0 || item.status === 2) {
    return isToday(item.expect_time, status)
  } else {
    return isToday(item.delay_time, status)
  }
}
// 今日待办
const getTodayTask = async () => {
  taskList.value = []
  otherTaskList.value = []
  finishTaskList.value = []
  // 今日
  await api.task.getAllTask({ status: [0] }).then((res) => {
    const data = res.data.data
    data.forEach((item: any) => {
      if (formDate(item)) {
        taskList.value.push(item)
      }
    })
  })
  // 其他待办
  await api.task.getAllTask({ status: [0, 2, 3] }).then((res) => {
    const data = res.data.data
    data.forEach((item: any) => {
      if (formDate(item, 2)) {
        otherTaskList.value.push(item)
      }
    })
  })
  // 已完成
  await api.task.getAllTask({ status: [1] }).then((res) => {
    finishTaskList.value = res.data.data
  })
  // console.log('taskList.value', taskList.value)
  // console.log('finishTaskList.value', finishTaskList.value)
}
// 每日计划
const getEveryDayTask = async () => {
  everyDayTaskList.value = []
  futerTaskList.value = []
  finishDayTaskList.value = []
  // 今日
  await api.task.getEveryDayTask().then((res) => {
    const data = res.data.data
    console.log('res', res)
    data.forEach((item: any) => {
      everyDayTaskList.value.push(item)
    })
  })
  console.log('everyDayTaskList.value', everyDayTaskList.value)
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
// 完成选中的
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
// 延期选中的
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
// 增加每日任务
const addTask = async (value: any) => {
  console.log('value', value)
  if (value.task === '') {
    ElMessage.error('请输入每日任务')
    return
  }
  await api.task.addEveryDayTask({ event: value.task }).then((res) => {
    if (res.data.answer) {
      ElMessage.success('添加成功')
      getEveryDayTask()
    } else {
      ElMessage.error('添加失败')
    }
  })
}
// 删除
const deleteTask = async (id: string) => {
  await api.task.deleteEveryDayTask({ id: [id] }).then((res) => {
    if (res.data.answer) {
      ElMessage.success('删除成功')
      getEveryDayTask()
    } else {
      ElMessage.error('删除失败')
    }
  })
}
// 删除选中的
const deleteCheckedTask = async (value: any) => {
  console.log(value)
  if (value.length === 0) {
    ElMessage.error('选择任务')
    return
  }
  await api.task.deleteEveryDayTask({ id: [...value] }).then((res) => {
    if (res.data.answer) {
      ElMessage.success('删除成功')
      getEveryDayTask()
    } else {
      ElMessage.error('删除失败')
    }
  })
}
// 完成
const finishTask = async (id: string) => {
  await api.task.finishEveryDayTask({ id: [id] }).then((res) => {
    if (res.data.answer) {
      ElMessage.success('完成成功')
      getEveryDayTask()
    } else {
      ElMessage.error('完成失败')
    }
  })
}
// 完成选中的
const finishCheckedTask = async (value: any) => {
  if (value.length === 0) {
    ElMessage.error('选择任务')
    return
  }
  await api.task.finishEveryDayTask({ id: [...value] }).then((res) => {
    if (res.data.answer) {
      ElMessage.success('完成成功')
      getEveryDayTask()
    } else {
      ElMessage.error('完成失败')
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
  grid-template-rows: 1fr 1fr;
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
