<template>
  <div class="page">
    <div class="box">
      <div class="line"></div>
      <div class="form"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #222;
}

.box {
  overflow: hidden;
  position: relative;
  width: 380px;
  height: 420px;
  background: #1c1c1c;
  border-radius: 8px;
}

.form {
  position: absolute;
  inset: 4px;
  background: #222;
  padding: 50px 40px;
  border-radius: 8px;
  z-index: 2;
}

@keyframes animate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.box::before,
.box::after,
.line::before,
.line::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 380px;
  height: 420px;
  background: linear-gradient(
    0deg,
    transparent,
    transparent,
    #45f3ff,
    #45f3ff,
    #45f3ff
  );
  z-index: 1;
  transform-origin: bottom right;
  animation: animate 6s linear infinite;
}

.box::after {
  animation-delay: -3s;
}

.line::before {
  background: linear-gradient(
    0deg,
    transparent,
    transparent,
    #ff2770,
    #ff2770,
    #ff2770
  );
  animation-delay: -1.5s;
}

.line::after {
  background: linear-gradient(
    0deg,
    transparent,
    transparent,
    #ff2770,
    #ff2770,
    #ff2770
  );
  animation-delay: -4.5s;
}
</style>
