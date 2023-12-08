<template>
  <div class="box"></div>
  <el-button @click="longTask">执行长任务</el-button>
  <el-button @click="timeOutTask">setTimeout执行长任务</el-button>
  <el-button @click="timeOutTask2">setTimeout不递归执行长任务</el-button>
  <el-button @click="callbackTask">requestIdleCallback执行长任务</el-button>
  <el-button @click="workerTask">WebWorker执行长任务</el-button>
</template>

<script setup lang="ts">
function func() {
  const startTime = Date.now()
  while (Date.now() - startTime < 10) {
    /* empty */
  }
}
const longTask = () => {
  console.log('开始长任务')
  const startTime = Date.now()
  for (let i = 0; i < 300; i++) {
    func()
  }
  console.log(`长任务结束,总耗时:${Date.now() - startTime}ms`)
}
// setTimeout方案 递归,循环300次
function timeOutTask(i: number, startTime: number) {
  setTimeout(() => {
    if (!startTime) {
      console.log('开始长任务')
      i = 0
      startTime = Date.now()
    }
    if (i === 300) {
      console.log(`长任务结束,总耗时:${Date.now() - startTime}ms`)
      return
    }
    func()
    timeOutTask(++i, startTime)
  })
}
// setTimeout不递归方案，循环300次
function timeOutTask2() {
  console.log('开始长任务')
  const startTime = Date.now()

  for (let i = 0; i < 300; i++) {
    setTimeout(() => {
      func()
      if (i === 300 - 1) {
        console.log(`长任务结束,总耗时:${Date.now() - startTime}ms`)
      }
    })
  }
}
// requestIdleCallback不递归方案，循环300次
function callbackTask() {
  console.log('开始长任务')
  const startTime = Date.now()

  for (let i = 0; i < 300; i++) {
    requestIdleCallback(() => {
      func()
      if (i === 300 - 1) {
        console.log(`长任务结束,总耗时:${Date.now() - startTime}ms`)
      }
    })
  }
}
function workerTask() {
  console.log('开始长任务')
  const startTime = Date.now()
  const worker = new Worker('src/views/note/JS/common/task.ts')

  worker.addEventListener('message', () => {
    console.log(`长任务结束,总耗时:${Date.now() - startTime}ms`)
  })
}
</script>

<style lang="scss" scoped>
.box {
  width: 100px;
  height: 100px;
  margin: 50px;
  background-color: blue;
  position: relative;
  animation: my-animation 5s linear infinite;
}
@keyframes my-animation {
  from {
    left: 0%;
    rotate: 0deg;
  }
  to {
    left: 100%;
    rotate: 360deg;
  }
}
</style>
