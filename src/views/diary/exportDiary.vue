<template>
  <div class="page">
    <div class="box">
      <div class="button-header">
        <el-button type="primary" size="large">工作</el-button>
        <el-button type="primary" size="large">锻炼</el-button>
        <el-button type="primary" size="large">学习</el-button>
        <el-button type="primary" size="large">玩乐</el-button>
        <el-button type="primary" size="large">待办</el-button>
        <el-button type="primary" size="large">任务</el-button>
      </div>
      <div class="chart-box">
        <div class="line-chart" ref="lineChart"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'

const lineChart = ref<HTMLElement | null>(null)
let lineChart1: echarts.ECharts | null = null
onMounted(() => {
  if (lineChart.value) {
    lineChart1 = echarts.init(lineChart.value as HTMLElement)
    lineChart1.setOption(lineOption)
  }
})
/**
 * title: 标题
 * tooltip: 顶部显示
 * legend:
 * grid:
 * toolbox:
 * xAxis: x轴
 * yAxis: y轴
 * series: 数据
 */

let lineOption = {
  legend: {},
  tooltip: {},
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  dataset: {
    // 提供一份数据。
    source: [
      ['', '1月', '2月', '3月'],
      ['锻炼', 1, 2, 3],
      ['学习', 2, 5, 9],
      ['玩乐', 8, 3, 6],
      ['工作', 5, 2, 7],
    ],
  },
  // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
  xAxis: { type: 'category' },
  // 声明一个 Y 轴，数值轴。
  yAxis: {},
  // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
}
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  .box {
    padding: 10px 30px;
    .button-header {
      display: flex;
      justify-content: center;
    }
    .chart-box {
      height: 100%;
      .line-chart {
        height: 400px;
        width: 600px;
      }
    }
  }
}
</style>
