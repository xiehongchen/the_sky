<template>
  <main>
    <div class="example-box">
      <div class="css-box">
        <div v-for="item in CssExampla.list" :key="item.id">
          <div>{{ item.title }}</div>
          <div>{{ item.path }}</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { CssExampla } from './config/common'
</script>

<style scoped lang="scss">
main {
  height: 100%;
  width: 100%;
  padding: 5px;
  border-radius: 20px;
  background-color: red;
  .example-box {
    height: 100%;
    width: 100%;
    padding: 5px;
    border-radius: 20px;
    background-color: blue;
    .css-box {
      height: 100%;
      width: 100%;
      padding: 5px;
      border-radius: 20px;
      background-color: green;
    }
  }
}
</style>
