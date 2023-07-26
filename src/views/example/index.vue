<template>
  <main>
    <div class="example-box">
      <div class="img-container">
        <div class="img-item"></div>
        <div class="img-item"></div>
        <div class="img-item"></div>
        <div class="img-item"></div>
        <div class="img-item"></div>
        <div class="img-item"></div>
        <div class="img-item"></div>
        <div class="img-item"></div>
        <div class="img-item"></div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
// import { CssExampla } from './config/common'
</script>

<style scoped lang="scss">
main {
  height: 100%;
  width: 100%;
  padding: 5px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.img-container {
  width: 300px;
  height: 300px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  .img-item {
    box-shadow: inset 0 0 0 1px #fff;
    transition: 0.5s;
    background-size: 300px 300px;
    background-image: url('../../assets/白天.png');
    position: relative;
  }
  // 横向
  .img-item:nth-child(3n + 1) {
    background-position-x: 0;
    left: -20px;
  }
  .img-item:nth-child(3n + 2) {
    background-position-x: -100%;
    left: 0;
  }
  .img-item:nth-child(3n + 3) {
    background-position-x: -200%;
    left: 20px;
  }
  // 纵向
  .img-item:nth-child(n + 7) {
    background-position-y: -200%;
    top: 20px;
  }
  .img-item:nth-child(-n + 6) {
    background-position-y: -100%;
    top: 0;
  }
  .img-item:nth-child(-n + 3) {
    background-position-y: 0;
    top: -20px;
  }
  &:hover {
    .img-item {
      left: 0;
      top: 0;
      box-shadow: inset 0 0 0 0 #fff;
    }
  }
}
</style>
