<template>
  <div class="radar">
    <div class="scan-line"></div>
  </div>

  <div class="box">
    <div class="logo">
      <div class="line"></div>
      <div class="form">
        <img src="../../../../public/vite.svg" />
      </div>
    </div>
    <div class="schedule">
      <div class="title">当前进度</div>
      <div class="num">{{ schedule }}%</div>
    </div>
    <div class="bottom">
      <div v-if="start === 0" class="btn">开始检测</div>
      <div v-else-if="start === 1" class="btn">暂停检测</div>
      <div v-else-if="start === 2" class="btn">继续检测</div>
      <div v-else class="btn">重新检测</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const schedule = ref(0)
// start  0：未开始，1：正在检测，2：暂停检测，3：检测结束
const start = ref(0)
</script>

<style lang="scss" scoped>
.radar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: red;
  position: relative;
  overflow: hidden;
  .scan-line {
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, transparent, #3498db, transparent);
    position: absolute;
    top: 50%;
    left: 150%;
    transform-origin: left;
    animation: scan 2s linear infinite;
  }
  @keyframes scan {
    0% {
      transform: translate(-100%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-100%, -50%) rotate(360deg);
    }
  }
}

.box {
  height: 600px;
  width: 400px;
  margin: 0 auto;
  background-color: #1f2228;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .logo {
    position: absolute;
    bottom: 240px;
    height: 80px;
    width: 80px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .form {
      position: relative;
      width: 80px;
      height: 80px;
      inset: 4px;
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: #1f2228;
      z-index: 2;
      img {
        height: 20px;
        width: 20px;
      }
    }
    .line {
      position: absolute;
      top: -20px;
      left: -60px;
      width: 100px;
      height: 60px;
      z-index: 1;
      background: linear-gradient(
        to right,
        transparent,
        transparent,
        transparent,
        transparent,
        #45f3ff,
        #45f3ff
      );
      z-index: 1;
      transform-origin: bottom right;
      animation: animate 6s linear infinite;
    }
    @keyframes animate {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  }
  .schedule {
    position: absolute;
    bottom: 20px;
    margin-bottom: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      font-size: 20px;
      font-weight: bold;
      color: #e7e9f0;
    }
    .num {
      margin-top: 10px;
      font-size: 25px;
      color: #2decfd;
    }
  }
  .bottom {
    position: absolute;
    bottom: 20px;
    .btn {
      font-size: 30px;
      color: #2decfd;
    }
  }
}
</style>
