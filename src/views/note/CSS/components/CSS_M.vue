<template>
  <div class="box">
    <div class="item" v-for="item in 60" :key="item">
      <img src="../../../../assets/css/scenery1.jpg" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 500px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid red;
  .item {
    width: 100px;
    margin-right: 4px;
    img {
      width: 100%;
      aspect-ratio: 0.866;
      object-fit: cover;
      clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0);
      cursor: pointer;
      filter: grayscale(80%);
      transition: 0.2s linear;
    }
    &:nth-child(n + 16) {
      transform: translateY(-60px);
    }
    &:nth-child(n + 16):nth-child(-n + 30) {
      transform: translateX(52px) translateY(-30px);
    }
  }
}
</style>
