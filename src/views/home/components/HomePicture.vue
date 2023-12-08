<template>
  <section class="picture-box">
    <div class="stat-header">
      <h3 class="title">每日完成统计</h3>
      <BaseDatePicker />
    </div>
    <div class="charts">
      <HomeStatisticsCharts />
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseDatePicker from '@/components/base-date-picker/baseDatePicker.vue'
import HomeStatisticsCharts from './HomeStatisticsCharts.vue'
</script>

<style lang="scss" scoped>
.picture-box {
  height: 100%;
  display: flex;
  flex-flow: column;
  padding: 20px;
  box-sizing: border-box;
  .stat-header {
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 18px;
      color: var(--main-child-title);
    }
  }
  .charts {
    position: relative;
    margin-top: 20px;
    height: 100%;
  }
}
</style>
