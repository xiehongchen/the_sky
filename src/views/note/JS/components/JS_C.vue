<template>
  <div>
    <div class="label">
      <span>防抖函数：</span>
      <input type="text" @input="handleInput1" class="input" />
      <p>Input Value: {{ inputValue1 }}</p>
    </div>
    <div class="label" ref="input1"></div>
    <div class="label">
      <span>节流函数：</span>
      <input type="text" @input="handleInput2" class="input" />
      <p>Input Value: {{ inputValue2 }}</p>
    </div>
    <div class="label" ref="input2"></div>
  </div>
</template>

<script setup lang="ts">
import { debounce, throttle } from '@/utils/useUtils'
// 防抖
const inputValue1 = ref('')
const input1 = ref<HTMLElement | null>(null)
const handleInput1 = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  inputValue1.value = value

  // 调用防抖函数，延迟 500 毫秒执行回调
  debounce(() => {
    // if (input1.value) {
    //   input1.value.innerHTML = value
    // }
    console.log('Input value:', value)
  }, 500)
}

// 节流
const inputValue2 = ref('')
const input2 = ref<HTMLElement | null>(null)
const handleInput2 = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  inputValue2.value = value

  // 调用节流函数，每隔 500 毫秒执行回调
  throttle(() => {
    // if (input2.value) {
    //   input2.value.innerText = value
    // }
    console.log('Input value:', value)
  }, 500)
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
