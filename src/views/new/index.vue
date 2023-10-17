<template>
  <div></div>
</template>

<script setup lang="ts">
import { throttle } from './index.ts'

const throttleLog1 = throttle((val) => console.log(val), 1000, {
  leading: true,
  trailing: true,
})

// const throttleLog2 = throttle((val) => console.log(val), 1000, {
//   leading: false,
//   trailing: true,
// })

// const throttleLog3 = throttle((val) => console.log(val), 1000, {
//   leading: true,
//   trailing: false,
// })

// const throttleLog4 = throttle((val) => console.log(val), 1000, {
//   leading: false,
//   trailing: false,
// })
const sleep = (time: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(`${time}ms 后`)
      resolve()
    }, time)
  })

async function init() {
  throttleLog1(1)
  await sleep(900)
  throttleLog1(3)
  throttleLog1(4)
  await sleep(900)
  throttleLog1(2)
  await sleep(500)
  throttleLog1(5)
}
init()
</script>

<style lang="scss" scoped></style>
