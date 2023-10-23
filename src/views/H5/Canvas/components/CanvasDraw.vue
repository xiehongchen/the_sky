<template>
  <canvas
    ref="myCanvas"
    width="1000"
    height="600"
    @mousedown="startDrawing"
    @mousemove="draw"
    @mouseup="stopDrawing"
    style="border: 1px solid #000000; margin: 0 20px"
  ></canvas>
  <div style="display: flex; flex-direction: column; flex: 1; margin: 0 20px">
    <div style="display: flex">
      <div @click="clearCanvas" class="button">清除</div>
      <div @click="saveSignature" class="button">下载</div>
      <div @click="toggleEraserMode" class="button">
        <span v-if="eraserMode">笔画</span>
        <span v-else>橡皮擦</span>
      </div>
    </div>
    <div class="label">笔画:</div>
    <el-slider
      v-model="value"
      @change="changeNumber"
      :min="1"
      :step="1"
      show-stops
      show-input
    />
    <div class="label">
      颜色:
      <el-color-picker v-model="color" @change="changeColor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
const myCanvas: Ref<HTMLCanvasElement | null> = ref(null)
const eraserMode = ref(false)
const drawing = ref(false)
let lastX = 0
let lastY = 0
let context: any
const value = ref(1)
const color = ref('#000')
onMounted(() => {
  if (myCanvas.value) {
    context = myCanvas.value.getContext('2d')
  }
})

function startDrawing(e: any) {
  drawing.value = true
  let canvas = myCanvas.value
  if (!canvas) return
  context = canvas.getContext('2d')
  if (!context) return
  lastX = e.clientX - context.canvas.offsetLeft
  lastY = e.clientY - context.canvas.offsetTop
}
function draw(e: any) {
  if (!drawing.value) return
  if (!context) return
  const newX = e.clientX - context.canvas.offsetLeft
  const newY = e.clientY - context.canvas.offsetTop

  context.beginPath()
  context.moveTo(lastX, lastY)
  context.lineTo(newX, newY)
  context.closePath()
  context.stroke()

  lastX = newX
  lastY = newY
}
function stopDrawing() {
  drawing.value = false
}
function clearCanvas() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
  ElMessage({
    message: '清除成功',
    type: 'success',
  })
}
function saveSignature() {
  const dataUrl = context.canvas.toDataURL()
  // 在这里可以将Data URL发送到服务器保存或执行其他操作
  // window.open(dataUrl)
  const a = document.createElement('a')
  a.download = '11'
  a.href = dataUrl
  a.click()
  ElMessage({
    message: '下载成功',
    type: 'success',
  })
}

const changeNumber = () => {
  context.lineWidth = value.value
}

const changeColor = () => {
  context.strokeStyle = color.value
}

const toggleEraserMode = () => {
  eraserMode.value = !eraserMode.value
  if (eraserMode.value) {
    context.strokeStyle = 'white'
    context.lineWidth = 100
    context.canvas.classList.add('canvas-eraser')
    ElMessage({
      message: '橡皮擦模式',
      type: 'success',
    })
  } else {
    context.canvas.classList.remove('canvas-eraser')
    context.lineWidth = value.value
    context.strokeStyle = color.value
    ElMessage({
      message: '笔画模式',
      type: 'success',
    })
  }
}
</script>

<style lang="scss" scoped>
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
</style>
