<template>
  <div class="page">
    <div class="a"></div>
  </div>
</template>

<script setup lang="ts">
import { ElNotification } from 'element-plus'
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

<style scoped lang="scss">
.page {
  height: 100%;
  position: relative;
  .a {
    animation: horizontal 2.6s infinite linear alternate,
      vertical 2s infinite linear alternate, colorX 26s infinite steps(10),
      colorY 14s infinite steps(7);
    animation-composition: accumulate;
  }

  @keyframes horizontal {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(100vw - 100%));
    }
  }
  @keyframes vertical {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(calc(100vh - 100%));
    }
  }
  @keyframes colorX {
    to {
      filter: hue-rotate(360deg);
    }
  }
  @keyframes colorY {
    to {
      filter: hue-rotate(360deg);
    }
  }
}
</style>
