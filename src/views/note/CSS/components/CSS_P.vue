<template>
  <div class="container">
    <div class="left">
      <img src="../../../../assets/日出.png" alt="" />
    </div>
    <div class="right">
      <img src="../../../../assets/日出.png" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to right, #04182c, #000c17, #04182c);

  @mixin base {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    img {
      width: 260px;
      height: 260px;
      margin-top: 10px;
    }
  }

  .left {
    @include base;
    &:hover {
      filter: brightness(1.1) contrast(110%);
    }
  }

  .right {
    @include base;
    margin-left: 40px;
    &:hover {
      filter: grayscale(100%);
    }
  }
}
</style>
