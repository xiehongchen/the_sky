<template>
  <div class="body">
    <div class="loading">
      <div class="dot" v-for="item in 100" :key="item"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.body {
  height: 400px;
  width: 400px;
  background: #66c7f4;
  margin: 50px auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
$ballSize: 10px; // 小球尺寸
$containerSize: 300px; // 容器尺寸
$n: 100; // 小球的数量
$pdeg: calc(360deg / $n); // 小球的间隔角度
$ani-duration: 2000ms; // 动画时间
.loading {
  width: $containerSize;
  height: $containerSize;
  position: relative;
  border-radius: 50%;
  .dot {
    position: absolute;
    left: 50%;
    top: 50%;
    width: $ballSize;
    height: $ballSize;
    margin-left: calc(-1 * $ballSize / 2);
    margin-top: calc(-1 * $ballSize / 2);
    perspective: 70px;
    transform-style: preserve-3d;
    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    &::before {
      background: #000;
      top: -100%;
      animation: moveBlack 2s infinite;
    }
    &::after {
      background: #fff;
      top: 100%;
      animation: moveWhite 2s infinite;
    }
  }
}

@keyframes moveBlack {
  0% {
    animation-timing-function: ease-in;
  }
  25% {
    transform: translate3d(0, 100%, $ballSize);
    animation-timing-function: ease-out;
  }
  50% {
    transform: translate3d(0, 200%, 0);
    animation-timing-function: ease-in;
  }
  75% {
    transform: translate3d(0, 100%, -$ballSize);
    animation-timing-function: ease-out;
  }
}

@keyframes moveWhite {
  0% {
    animation-timing-function: ease-in;
  }
  25% {
    transform: translate3d(0, -100%, -$ballSize);
    animation-timing-function: ease-out;
  }
  50% {
    transform: translate3d(0, -200%, 0);
    animation-timing-function: ease-in;
  }
  75% {
    transform: translate3d(0, -100%, $ballSize);
    animation-timing-function: ease-out;
  }
}

@for $i from 1 through $n {
  .dot:nth-child(#{$i}) {
    transform: rotate(#{$i * $pdeg}) translateY(calc(-1 * $containerSize / 2));
    &::before,
    &::after {
      animation-delay: calc(-1 * $ani-duration / $n) * 6 * $i;
    }
  }
}
</style>
