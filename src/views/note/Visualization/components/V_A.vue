<template>
  <div class="chartContainer" ref="chartContainer">
    <div class="chart" ref="radarChart"></div>
    <div class="chart" ref="gaugeChart"></div>
    <el-button @click="add">电量加10</el-button>
    <div class="chart" ref="funnelChart"></div>
    <div class="chart" ref="treeChart"></div>
    <div class="chart1" ref="mapChart"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ElMessage } from 'element-plus'
const radarChart = ref<HTMLElement | null>(null)
let radarChart1: echarts.ECharts | null = null
onMounted(() => {
  if (radarChart.value) {
    radarChart1 = echarts.init(radarChart.value as HTMLElement)
    radarChart1.setOption(radarOption)
  }
})

let radarOption = {
  title: {
    text: 'Radar Chart',
  },
  tooltip: {},
  legend: {
    data: ['Data 1', 'Data 2'],
  },
  radar: {
    indicator: [
      { name: 'Category 1', max: 100 },
      { name: 'Category 2', max: 100 },
      { name: 'Category 3', max: 100 },
      { name: 'Category 4', max: 100 },
      { name: 'Category 5', max: 100 },
    ],
  },
  series: [
    {
      name: 'Data 1',
      type: 'radar',
      data: [
        {
          value: [90, 80, 70, 60, 50],
          name: 'Data 1',
        },
      ],
    },
    {
      name: 'Data 2',
      type: 'radar',
      data: [
        {
          value: [70, 60, 50, 40, 30],
          name: 'Data 2',
        },
      ],
    },
  ],
}

const gaugeChart = ref<HTMLElement | null>(null)
let gaugeChart1: echarts.ECharts | null = null
onMounted(() => {
  if (gaugeChart.value) {
    gaugeChart1 = echarts.init(gaugeChart.value as HTMLElement)
    gaugeChart1.setOption(gaugeOption)
  }
})

let a = 0
function add() {
  a += 10
  if (a > 100) {
    ElMessage.error('已超过')
    return
  }
  gaugeChart1!.setOption({
    series: [
      {
        data: [
          {
            value: `${a}`,
            name: '电量',
          },
        ],
      },
    ],
  })
}

let gaugeOption = {
  title: {
    text: 'Gauge Chart',
  },
  series: [
    {
      type: 'gauge',
      progress: {
        show: true,
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}%',
      },
      data: [
        {
          value: 0,
          name: '电量',
        },
      ],
    },
  ],
}

// // Funnel Chart
// let funnelChart = echarts.init(document.getElementById('funnelChart'))

const funnelChart = ref<HTMLElement | null>(null)
let funnelChart1: echarts.ECharts | null = null
onMounted(() => {
  if (funnelChart.value) {
    funnelChart1 = echarts.init(funnelChart.value as HTMLElement)
    funnelChart1.setOption(funnelOption)
  }
})

let funnelOption = {
  title: {
    text: 'Funnel Chart',
  },
  series: [
    {
      type: 'funnel',
      data: [
        { value: 60, name: 'Stage 1' },
        { value: 40, name: 'Stage 2' },
        { value: 20, name: 'Stage 3' },
        { value: 10, name: 'Stage 4' },
        { value: 5, name: 'Stage 5' },
      ],
    },
  ],
}

const treeChart = ref<HTMLElement | null>(null)
let treeChart1: echarts.ECharts | null = null
onMounted(() => {
  if (treeChart.value) {
    treeChart1 = echarts.init(treeChart.value as HTMLElement)
    treeChart1.setOption(treeOption)
  }
})
let treeOption = {
  title: {
    text: 'Tree Chart',
  },
  series: [
    {
      type: 'tree',
      data: [
        {
          name: 'Root',
          children: [
            {
              name: 'Node 1',
              children: [{ name: 'Leaf 1' }, { name: 'Leaf 2' }],
            },
            { name: 'Node 2' },
            {
              name: 'Node 3',
              children: [{ name: 'Leaf 3' }, { name: 'Leaf 4' }],
            },
          ],
        },
      ],
    },
  ],
}

const mapChart = ref<HTMLElement | null>(null)
let mapChart1: echarts.ECharts | null = null
onMounted(() => {
  if (mapChart.value) {
    mapChart1 = echarts.init(mapChart.value as HTMLElement)
    mapChart1.setOption(option)
  }
})
const data = [
  [
    [28604, 77, 17096869, 'Australia', 1990],
    [31163, 77.4, 27662440, 'Canada', 1990],
    [1516, 68, 1154605773, 'China', 1990],
    [13670, 74.7, 10582082, 'Cuba', 1990],
    [28599, 75, 4986705, 'Finland', 1990],
    [29476, 77.1, 56943299, 'France', 1990],
    [31476, 75.4, 78958237, 'Germany', 1990],
    [28666, 78.1, 254830, 'Iceland', 1990],
    [1777, 57.7, 870601776, 'India', 1990],
    [29550, 79.1, 122249285, 'Japan', 1990],
    [2076, 67.9, 20194354, 'North Korea', 1990],
    [12087, 72, 42972254, 'South Korea', 1990],
    [24021, 75.4, 3397534, 'New Zealand', 1990],
    [43296, 76.8, 4240375, 'Norway', 1990],
    [10088, 70.8, 38195258, 'Poland', 1990],
    [19349, 69.6, 147568552, 'Russia', 1990],
    [10670, 67.3, 53994605, 'Turkey', 1990],
    [26424, 75.7, 57110117, 'United Kingdom', 1990],
    [37062, 75.4, 252847810, 'United States', 1990],
  ],
  [
    [44056, 81.8, 23968973, 'Australia', 2015],
    [43294, 81.7, 35939927, 'Canada', 2015],
    [13334, 76.9, 1376048943, 'China', 2015],
    [21291, 78.5, 11389562, 'Cuba', 2015],
    [38923, 80.8, 5503457, 'Finland', 2015],
    [37599, 81.9, 64395345, 'France', 2015],
    [44053, 81.1, 80688545, 'Germany', 2015],
    [42182, 82.8, 329425, 'Iceland', 2015],
    [5903, 66.8, 1311050527, 'India', 2015],
    [36162, 83.5, 126573481, 'Japan', 2015],
    [1390, 71.4, 25155317, 'North Korea', 2015],
    [34644, 80.7, 50293439, 'South Korea', 2015],
    [34186, 80.6, 4528526, 'New Zealand', 2015],
    [64304, 81.6, 5210967, 'Norway', 2015],
    [24787, 77.3, 38611794, 'Poland', 2015],
    [23038, 73.13, 143456918, 'Russia', 2015],
    [19360, 76.5, 78665830, 'Turkey', 2015],
    [38225, 81.4, 64715810, 'United Kingdom', 2015],
    [53354, 79.1, 321773631, 'United States', 2015],
  ],
]

let option = {
  backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
    {
      offset: 0,
      color: '#f7f8fa',
    },
    {
      offset: 1,
      color: '#cdd0d5',
    },
  ]),
  title: {
    text: 'Life Expectancy and GDP by Country',
    left: '5%',
    top: '3%',
  },
  legend: {
    right: '10%',
    top: '3%',
    data: ['1990', '2015'],
  },
  grid: {
    left: '8%',
    top: '10%',
  },
  xAxis: {
    splitLine: {
      lineStyle: {
        type: 'dashed',
      },
    },
  },
  yAxis: {
    splitLine: {
      lineStyle: {
        type: 'dashed',
      },
    },
    scale: true,
  },
  series: [
    {
      name: '1990',
      data: data[0],
      type: 'scatter',
      symbolSize: function (data: any) {
        return Math.sqrt(data[2]) / 5e2
      },
      emphasis: {
        focus: 'series',
        label: {
          show: true,
          formatter: function (param: any) {
            return param.data[3]
          },
          position: 'top',
        },
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(120, 36, 50, 0.5)',
        shadowOffsetY: 5,
        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
          {
            offset: 0,
            color: 'rgb(251, 118, 123)',
          },
          {
            offset: 1,
            color: 'rgb(204, 46, 72)',
          },
        ]),
      },
    },
    {
      name: '2015',
      data: data[1],
      type: 'scatter',
      symbolSize: function (data: any) {
        return Math.sqrt(data[2]) / 5e2
      },
      emphasis: {
        focus: 'series',
        label: {
          show: true,
          formatter: function (param: any) {
            return param.data[3]
          },
          position: 'top',
        },
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(25, 100, 150, 0.5)',
        shadowOffsetY: 5,
        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
          {
            offset: 0,
            color: 'rgb(129, 227, 238)',
          },
          {
            offset: 1,
            color: 'rgb(25, 183, 207)',
          },
        ]),
      },
    },
  ],
}

// let mapOption = {
//   title: {
//     text: 'China Map',
//   },
//   tooltip: {},
//   visualMap: {
//     min: 0,
//     max: 2500,
//     left: 'left',
//     top: 'bottom',
//     text: ['High', 'Low'],
//     calculable: true,
//   },
//   series: [
//     {
//       type: 'map',
//       map: 'china',
//       label: {
//         show: true,
//       },
//       data: [
//         { name: '北京', value: 100 },
//         { name: '上海', value: 200 },
//         { name: '广州', value: 300 },
//         { name: '深圳', value: 400 },
//         { name: '成都', value: 500 },
//         { name: '广东', value: 2000 },
//       ],
//     },
//   ],
// }
</script>

<style lang="scss" scoped>
.chartContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 1600px;
  margin: 0 auto;
}

.chart {
  width: 400px;
  height: 400px;
}
.chart1 {
  width: 1400px;
  height: 1400px;
  margin-bottom: 20px;
}
</style>
