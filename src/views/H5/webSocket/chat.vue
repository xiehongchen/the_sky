<template>
  <div class="box">
    <div class="left">
      <div class="left-title">
        <el-input
          v-model="searchName"
          :prefix-icon="Search"
          placeholder="搜索"
          type="text"
          class="left-input"
        />
        <el-icon class="left-icon"><Plus /></el-icon>
      </div>
      <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
        <li
          v-for="i in list"
          :key="i.id"
          class="infinite-list-item"
          @click="select(i)"
        >
          <div class="list-img">
            <img :src="i.pic" />
          </div>
          <div class="list-name">
            <div>{{ i.name }}</div>
            <div>{{ i.message }}</div>
          </div>
          <div class="list-time">
            <div>{{ i.time }}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="right">
      <div class="title">{{ roomName }}</div>
      <div class="main">内容</div>
      <div class="input">
        <div class="input-box">
          <div class="input-header">
            <el-icon size="26" class="icon"><Aim /></el-icon>
            <el-icon size="26" class="icon"><Aim /></el-icon>
          </div>
          <textarea v-model="inputText" class="text-area"></textarea>
        </div>
        <button>发送</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
// import { io } from 'socket.io-client'
import request from '@/utils/request'
// const socket = io('http://127.0.0.1:6060')
// console.log('socket', socket)
interface userList {
  id: number
  name: string
  age: number
  address: string
  pic: string
  message: string
  time: string
}
const state = reactive({
  list: [] as userList[],
})
const searchName = ref('')
const list = computed(() => state.list)
const load = async () => {
  console.log('load')
  await request.get('/users').then((res) => {
    state.list = state.list.concat(res.data.data)
    console.log('list.value', list.value)
  })
}
const roomName = ref('其他')
const select = (item: userList) => {
  roomName.value = item.name
}
const inputText = ref('')
</script>

<style lang="scss" scoped>
.box {
  margin: 25px 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  background-color: #fff;
  border-radius: 10px;
  height: calc(100vh - 110px);
  overflow: hidden;
  display: flex;
  .left {
    width: 300px;
    height: 100%;
    border-right: 1px solid #adadad;
    .left-title {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      .left-input {
        border-radius: 5px;
        width: 200px;
        height: 30px;
      }
      .left-icon {
        border-radius: 5px;
        margin-left: 5px;
        width: 30px;
        height: 30px;
        background-color: #aca8a8;
      }
    }
    .infinite-list {
      height: 100%;
      padding: 0;
      margin: 0;
      list-style: none;
      .infinite-list-item {
        display: flex;
        align-items: center;
        height: 60px;
        background: var(--el-color-primary-light-9);
        margin: 10px;
        padding: 10px;
        .list-img {
          width: 40px;
          height: 40px;
          border-radius: 5px;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        .list-name {
          padding: 0 20px;
          font-size: 15px;
          flex: 1;
        }
        .list-time {
          width: 50px;
          font-size: 12px;
        }
      }
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    .title {
      height: 50px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      border-bottom: 1px solid #adadad;
    }
    .main {
      flex: 1;
    }
    .input {
      border-top: 1px solid #adadad;
      display: flex;
      .input-box {
        width: 100%;
        .text-area {
          padding: 5px 15px;
          border: none;
          width: 100%;
          font-size: 16px;
          height: auto;
          resize: none;
        }
        .input-header {
          padding: 2px 10px;
          .icon {
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>
