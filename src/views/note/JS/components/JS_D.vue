<template>
  <div class="label">
    <button @click="handleRequests">promise控制并发请求</button>
    <button @click="promiseAll">promise.all</button>
    <button @click="promiseReace">promise.race</button>
    <div class="text" ref="text">111</div>
  </div>
</template>

<script setup lang="ts">
// 模拟异步请求，这里用 setTimeout 来模拟实际请求的延迟
function simulateAsyncRequest(id: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`请求 ${id} 完成`)
      if (id === 12) {
        reject(`请求 ${id} 失败`)
      } else {
        resolve(`请求 ${id} 结果`)
      }
    }, Math.random() * 1000) // 假设每个请求耗时在 0 到 1000 毫秒之间
  })
}
const text = ref<HTMLElement>()
console.log(text)
async function handleRequests() {
  const numberOfRequests = 30
  const concurrentLimit = 10 // 控制并发数量为 10

  const results = [] // 存储所有请求的结果

  for (let i = 0; i < numberOfRequests; i++) {
    const requestPromise = simulateAsyncRequest(i).catch((err: Error) => err)

    // 在请求达到并发限制后，使用 Promise.all 等待这批请求完成
    if (i !== 0 && i % concurrentLimit === 0) {
      const batchRequests = results.slice(i - concurrentLimit, i)
      console.log('batchRequests', batchRequests)
      if (text.value) {
        text.value.innerText += batchRequests
      }
      await Promise.all(batchRequests)
    }

    const response = await requestPromise
    results.push(response)
  }

  // 处理剩余的请求
  const remainingRequests = results.slice(
    numberOfRequests - (numberOfRequests % concurrentLimit),
  )
  await Promise.all(remainingRequests)

  console.log('所有请求处理完成')
  console.log(results)
}

const promise1 = Promise.resolve(1)
const promise2 = new Promise((resolve) => setTimeout(resolve, 200, 2))
const promise3 = Promise.reject('Error occurred')
const promiseAll = () => {
  const allPromises = [promise1, promise2, promise3]

  Promise.all(allPromises)
    .then((results) => {
      console.log('Promise.all - All promises resolved:', results)
    })
    .catch((error) => {
      console.error('Promise.all - One or more promises rejected:', error)
    })
}
const promiseReace = () => {
  const racePromises = [promise1, promise2, promise3]

  Promise.race(racePromises)
    .then((result) => {
      console.log('Promise.race - One promise resolved:', result)
    })
    .catch((error) => {
      console.error('Promise.race - All promises rejected:', error)
    })
}
</script>

<style lang="scss" scoped>
.label {
  display: flex;
  align-items: center;
  margin: 10px 0;
  .text {
    height: 20px;
    width: 100%;
  }

  .input {
    width: 400px;
    margin: 0 20px;
  }
}
button {
  margin: 0 20px;
}
</style>
