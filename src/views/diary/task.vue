<template>
  <!-- 今日待办，其他，延期，已完成，已取消，未完成 -->
  <!-- 创建时间、预计完成时间、实际完成时间、取消时间、延期时间 -->
  <main>
    <HomeTask />
    <HomeTask />
    <HomePlan />
  </main>
</template>

<script setup lang="ts">
import HomeTask from './../home/components/HomeTask.vue'
import HomePlan from './../home/components/HomePlan.vue'
</script>

<style lang="scss" scoped>
main {
  background-color: #f9fbfc;
  width: 100%;
  height: 100%;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 10px;

  section {
    box-sizing: border-box;
    background-color: var(--main-child-bg);
    border-radius: 30px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
    transition: all 0.4s;
  }
}
</style>
