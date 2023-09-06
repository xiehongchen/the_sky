<template>
  <div>欢迎</div>
  <button v-click-request="'/api/users'">点击发起请求</button>
  <el-button @click="click">点击</el-button>
</template>

<script setup lang="ts">
import { ElNotification } from 'element-plus'
import api from '@/api'
const click = () => {
  api.todo.getAllTodo({ status: 1 }).then((res) => {
    console.log(res.data)
  })
}
onMounted(() => {
  const hours = new Date().getHours()
  let title = ''
  if (hours > 0 && hours < 8) {
    title = '凌晨'
  } else if (hours < 11) {
    title = '早上'
  } else if (hours < 15) {
    title = '中午'
  } else if (hours < 19) {
    title = '下午'
  } else {
    title = '晚上'
  }
  ElNotification({
    title: '欢迎👏🏻',
    message: `${title}好，今天也要努力呀！`,
    type: 'success',
    offset: 80,
  })
  console.log(hours)
})
</script>

<style scoped lang="scss"></style>
