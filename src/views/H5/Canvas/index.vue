<template>
  <div style="display: flex; margin: 10px 0">
    <canvas-draw></canvas-draw>
  </div>
  <div style="display: flex">
    <el-button @click="startClock">时钟</el-button>
    <el-button @click="startClockNew">时钟2</el-button>
    <el-button @click="startPlanet">行星环绕旋转</el-button>
  </div>

  <div style="display: flex; margin: 20px">
    <canvas-clock ref="canvasClockRef"></canvas-clock>
    <canvas-clock-new ref="canvasClockNewRef"></canvas-clock-new>
    <canvas-planet ref="canvasPlanetRef"></canvas-planet>
  </div>
</template>

<script setup lang="ts">
import CanvasDraw from './components/CanvasDraw.vue'
import CanvasClock from './components/CanvasClock.vue'
import CanvasClockNew from './components/CanvasClockNew.vue'
import CanvasPlanet from './components/CanvasPlanet.vue'

interface canvas {
  init: () => void
}
const canvasClockRef: Ref<canvas | null> = ref(null)
const canvasClockNewRef: Ref<canvas | null> = ref(null)
const canvasPlanetRef: Ref<canvas | null> = ref(null)
const startClock = () => {
  if (canvasClockRef.value) {
    canvasClockRef.value.init()
  }
}
const startClockNew = () => {
  if (canvasClockNewRef.value) {
    canvasClockNewRef.value.init()
  }
}
const startPlanet = () => {
  if (canvasPlanetRef.value) {
    canvasPlanetRef.value.init()
  }
}
</script>

<style scoped lang="scss">
.button {
  border: 2px solid red;
  height: 30px;
  width: auto;
  margin: 0 10px;
  text-align: center;
  line-height: 30px;
}

.label {
  color: red;
  margin: 10px;
  font-size: 20px;
  font-weight: 700;
}

.canvas-eraser {
  cursor: url('@/assets/vue.svg'), auto;
}
</style>
