<template>
  <div class="example-box">
    <div class="box">
      <div class="text">合并</div>
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
    <div class="box">
      <div class="text">合并</div>
      <div class="img-container1">
        <div class="img-item1"></div>
        <div class="img-item1"></div>
        <div class="img-item1"></div>
        <div class="img-item1"></div>
        <div class="img-item1"></div>
        <div class="img-item1"></div>
        <div class="img-item1"></div>
        <div class="img-item1"></div>
        <div class="img-item1"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.example-box {
  height: 100%;
  width: 100%;
  padding: 5px;
  border-radius: 20px;
  display: flex;
  // align-items: center;
  // justify-content: center;
  .box {
    .text {
      text-align: center;
      font-weight: 700;
      font-size: 20px;
    }
  }
}
.img-container {
  margin: 50px;
  width: 300px;
  height: 300px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  // 合并
  .img-item {
    box-shadow: inset 0 0 0 1px #fff;
    transition: 0.5s;
    background-size: 300px 300px;
    background-image: url('../../../assets/白天.png');
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
.img-container1 {
  margin: 50px;
  width: 300px;
  height: 300px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  transition: transform 0.3s ease-in-out;
  // 张开
  .img-item1 {
    transition: 0.5s;
    background-size: 300px 300px;
    background-image: url('../../../assets/白天.png');
    position: relative;
  }
  .img-item1:nth-child(3n + 1) {
    background-position-x: 0;
  }

  .img-item1:nth-child(3n + 2) {
    background-position-x: -100%;
    left: 0;
  }
  .img-item1:nth-child(3n + 3) {
    background-position-x: -200%;
  }
  // 纵向
  .img-item1:nth-child(n + 7) {
    background-position-y: -200%;
  }
  .img-item1:nth-child(-n + 6) {
    background-position-y: -100%;
  }
  .img-item1:nth-child(-n + 3) {
    background-position-y: 0;
  }
  &:hover {
    .img-item1:nth-child(1) {
      transform: translateX(-20px) translateY(-20px);
    }
    .img-item1:nth-child(2) {
      transform: translateY(-20px);
    }
    .img-item1:nth-child(3) {
      transform: translateX(20px) translateY(-20px);
    }
    .img-item1:nth-child(4) {
      transform: translateX(-20px);
    }
    .img-item1:nth-child(6) {
      transform: translateX(20px);
    }
    .img-item1:nth-child(7) {
      transform: translateX(-20px) translateY(20px);
    }
    .img-item1:nth-child(8) {
      transform: translateY(20px);
    }
    .img-item1:nth-child(9) {
      transform: translateX(20px) translateY(20px);
    }
  }
}
</style>
