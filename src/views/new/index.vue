<template>
  <div class="main">
    <div class="box">
      <div class="item">
        <div class="button">1</div>
      </div>
      <div class="item">2</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(135deg, #224141, #162a2a);
  padding: 5px;
  .box {
    border-spacing: border-box;
    display: grid;
    grid-template-columns: repeat(auto-fill, 15%);
    grid-template-rows: auto;
    .item {
      background-color: rgba(0, 12, 23, 0.867);
      border: 3px solid rgba(53, 162, 253, 0.267);
      border-radius: 10px;
      display: flex;
      height: 220px;
      justify-content: center;
      overflow: hidden;
    }
  }
}
</style>
