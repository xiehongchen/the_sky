<template>
  <div class="page">
    <div ref="element" class="a"></div>
  </div>
  <el-button @click="toggleAnimation">
    {{ isAnimationPaused ? '开始' : '暂停' }}
  </el-button>
</template>

<script setup lang="ts">
const isAnimationPaused = ref(false)
const element = ref<HTMLElement | null>(null)

const toggleAnimation = () => {
  console.log('q2e')
  isAnimationPaused.value = !isAnimationPaused.value
  if (element.value) {
    if (isAnimationPaused.value) {
      element.value.style.animationPlayState = 'paused'
    } else {
      element.value.style.animationPlayState = 'running'
    }
    // 添加一个 CSS 类
    element.value.classList.add('animation-reset')

    // 在下一次微任务中移除该类，触发动画重新计算
    nextTick(() => {
      element.value?.classList.remove('animation-reset')
    })
  }
}
</script>

<style scoped lang="scss">
.page {
  height: 500px;
  width: 800px;
  border: 1px solid;
  position: relative;
  .a {
    width: 100px;
    height: 100px;
    background: linear-gradient(#f00, #f00),
      url(https://s1.ax1x.com/2023/08/15/pPQm9oT.jpg);
    background-blend-mode: lighten;
    background-size: contain;
    animation: horizontal 2.6s infinite linear alternate,
      vertical 3s infinite linear alternate, colorX 26s infinite steps(10),
      colorY 14s infinite steps(7);
    animation-composition: accumulate;
  }

  @keyframes horizontal {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(700px);
    }
  }
  @keyframes vertical {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(400px);
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
