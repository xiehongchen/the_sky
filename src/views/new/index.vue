<template>
  <div></div>
</template>

<script setup lang="ts">
import { throttle } from './index.ts'
const throttledFunction = throttle(a, 300, {
  leading: true,
  trailing: true,
})
function a() {
  console.log('123')
}
// 在需要调用的地方使用节流函数
throttledFunction()
</script>

<style lang="scss" scoped></style>
