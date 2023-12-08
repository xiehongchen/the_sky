<template>
  <div ref="socketRef" class="web-socket">
    <el-button type="primary" @click="router.push('/H5/websocket/chat')">
      聊天室
    </el-button>
    <div class="box-item">
      <span style="margin-right: 20px">输入内容:</span>
      <el-input
        v-model="inputText"
        style="width: 500px; margin-right: 20px"
      ></el-input>
      <el-button type="primary" @click="clickHandle">发送</el-button>
    </div>
    <div class="box-item">
      <span style="margin-right: 20px">创建房间:</span>
      <el-input
        v-model="createRoom"
        style="width: 500px; margin-right: 20px"
      ></el-input>
      <el-button type="primary" @click="createHandle">创建</el-button>
    </div>
    <div class="box-item">
      <span style="margin-right: 20px">加入房间:</span>
      <el-input
        v-model="joinRoom"
        style="width: 500px; margin-right: 20px"
      ></el-input>
      <el-button type="primary" @click="joinHandle">加入</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { io } from 'socket.io-client'
import { useRouter } from 'vue-router'
const router = useRouter()
const socket = io('http://127.0.0.1:6060')

const socketRef = ref<HTMLElement | null>(null)
socket.on('chat', (data: any) => {
  console.log('chat', data)
  if (!socketRef.value) return
  const div = document.createElement('div')
  div.innerText = 'chat ' + data
  socketRef.value.append(div)
})
socket.on('message', (data: any) => {
  console.log('message', data)
  if (!socketRef.value) return
  const div = document.createElement('div')
  div.innerText = 'messgae ' + data
  socketRef.value.append(div)
})

// 点击发送按钮，将输入框中的内容发送给服务器
const inputText = ref('')
const createRoom = ref('')
const joinRoom = ref('')
const clickHandle = () => {
  console.log('发送')
  if (createRoom.value || joinRoom.value) {
    const room = createRoom.value || joinRoom.value
    socket.emit('message', { room, message: inputText.value })
  } else {
    socket.emit('chat', inputText.value)
  }
  inputText.value = ''
  console.log('socket', socket)
}
// 创建房间
const createHandle = () => {
  socket.emit('createRoom', createRoom.value)
}
// 加入房间
const joinHandle = () => {
  socket.emit('joinRoom', joinRoom.value)
}
</script>

<style lang="scss" scoped>
.web-socket {
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin-top: 100px;
  .box-item {
    display: flex;
    align-items: center;
  }
}
</style>
