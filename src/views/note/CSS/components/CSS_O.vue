<template>
  <div class="box"></div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 360px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #000;
  position: relative;
  filter: contrast(10);

  &::before {
    content: '';
    position: absolute;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    margin-top: -65px;
    margin-left: -300px;
    background-color: yellow;
    animation: moveToRight 5s linear infinite;
    filter: blur(5px);
  }

  &::after {
    content: '';
    position: absolute;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    right: 50%;
    top: 50%;
    margin-top: -45px;
    margin-right: -300px;
    background-color: red;
    animation: moveToLeft 5s linear infinite;
    filter: blur(5px);
  }

  @keyframes moveToRight {
    50% {
      margin-left: 0px;
    }
  }
  @keyframes moveToLeft {
    50% {
      margin-right: 0px;
    }
  }
}
</style>
