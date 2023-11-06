<template>
  <div class="web-socket">
    <el-input v-model="inputText" style="width: 800px"></el-input>
    <button @click="clickHandle">发送</button>
  </div>
</template>

<script setup lang="ts">
import { io } from 'socket.io-client'

const socket = io('http://127.0.0.1:6060')

console.log('socket', socket)

socket.on('chat', (data) => {
  console.log('chat', data)
  const div = document.createElement('div')
  div.innerText = data
  document.body.append(div)
})

// 点击发送按钮，将输入框中的内容发送给服务器
const inputText = ref('')
const clickHandle = () => {
  console.log('发送')
  socket.emit('chat', inputText.value)
  inputText.value = ''
}
</script>

<style lang="scss" scoped>
.web-socket {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin-top: 100px;
}
</style>
