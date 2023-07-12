<template>
  <div style="display: flex; margin: 10px 0">
    <canvas
      ref="myCanvas3"
      width="1000"
      height="600"
      @mousedown="startDrawing"
      @mousemove="draw3"
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
        v-model="value1"
        @change="changeNumber"
        :min="1"
        :step="1"
        show-stops
        show-input
      />
      <div class="label">
        颜色:
        <el-color-picker v-model="color1" @change="changeColor" />
      </div>
    </div>
  </div>
  <div style="display: flex">
    <div
      @click="start1"
      style="border: 1px solid; width: 70px; margin-left: 20px"
    >
      canvas1
    </div>
    <div
      @click="start2"
      style="border: 1px solid; width: 70px; margin-left: 20px"
    >
      canvas2
    </div>
  </div>

  <div style="display: flex; margin: 20px">
    <canvas
      ref="myCanvas"
      width="300"
      height="300"
      style="border: 1px solid #000000"
    ></canvas>
    <canvas
      ref="myCanvas2"
      width="300"
      height="300"
      style="border: 1px solid #000000; margin: 0 20px"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
const myCanvas: Ref<HTMLCanvasElement | null> = ref(null)
const myCanvas2: Ref<HTMLCanvasElement | null> = ref(null)
const myCanvas3: Ref<HTMLCanvasElement | null> = ref(null)
const start1 = () => {
  init()
}
const start2 = () => {
  init2()
}

// canvas1
function init() {
  let canvas = myCanvas.value
  if (!canvas) return
  let ctx = canvas.getContext('2d')
  if (!ctx) return
  draw(ctx)
}

function draw(ctx) {
  requestAnimationFrame(function step() {
    drawDial(ctx) //绘制表盘
    drawAllHands(ctx) //绘制时分秒针
    drawTime(ctx)
    requestAnimationFrame(step)
  })
}
function drawTime(ctx) {
  const time1 = new Date()

  let s = time1.getSeconds()
  let m = time1.getMinutes()
  let h = time1.getHours()
  const time2 = h + ':' + m + ':' + s
  ctx.font = '20px sans-serif'
  ctx.fillText(time2, 10, 20)
}
/*绘制时分秒针*/
function drawAllHands(ctx) {
  let time = new Date()

  let s = time.getSeconds()
  let m = time.getMinutes()
  let h = time.getHours()

  let pi = Math.PI
  let secondAngle = (pi / 180) * 6 * s //计算出来s针的弧度
  let minuteAngle = (pi / 180) * 6 * m + secondAngle / 60 //计算出来分针的弧度
  let hourAngle = (pi / 180) * 30 * h + minuteAngle / 12 //计算出来时针的弧度

  drawHand(hourAngle, 60, 6, 'red', ctx) //绘制时针
  drawHand(minuteAngle, 106, 4, 'green', ctx) //绘制分针
  drawHand(secondAngle, 129, 2, 'blue', ctx) //绘制秒针
}
/*绘制时针、或分针、或秒针
 * 参数1：要绘制的针的角度
 * 参数2：要绘制的针的长度
 * 参数3：要绘制的针的宽度
 * 参数4：要绘制的针的颜色
 * 参数4：ctx
 * */
function drawHand(angle, len, width, color, ctx) {
  ctx.save()
  ctx.translate(150, 150) //把坐标轴的远点平移到原来的中心
  ctx.rotate(-Math.PI / 2 + angle) //旋转坐标轴。 x轴就是针的角度
  ctx.beginPath()
  ctx.moveTo(-4, 0)
  ctx.lineTo(len, 0) // 沿着x轴绘制针
  ctx.lineWidth = width
  ctx.strokeStyle = color
  ctx.lineCap = 'round'
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
}

/*绘制表盘*/
function drawDial(ctx) {
  let pi = Math.PI

  ctx.clearRect(0, 0, 300, 300) //清除所有内容
  ctx.save()

  ctx.translate(150, 150) //一定坐标原点到原来的中心
  ctx.beginPath()
  ctx.arc(0, 0, 148, 0, 2 * pi) //绘制圆周
  ctx.stroke()
  ctx.closePath()

  for (let i = 0; i < 60; i++) {
    //绘制刻度。
    ctx.save()
    ctx.rotate(-pi / 2 + (i * pi) / 30) //旋转坐标轴。坐标轴x的正方形从 向上开始算起
    ctx.beginPath()
    ctx.moveTo(110, 0)
    ctx.lineTo(140, 0)
    ctx.lineWidth = i % 5 ? 2 : 4
    ctx.strokeStyle = i % 5 ? 'blue' : 'red'
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
  }
  ctx.restore()
}

// canvas2
let sun: any = null
let earth: any = null
let moon: any = null
let ctx: any = null
function init2() {
  sun = new Image()
  earth = new Image()
  moon = new Image()
  sun.src = 'src/assets/vue.svg'
  earth.src = 'src/assets/vue.svg'
  moon.src = 'src/assets/vue.svg'

  let canvas = myCanvas2.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  if (!ctx) return

  sun.onload = function () {
    draw2()
  }
}
function draw2() {
  ctx.clearRect(0, 0, 300, 300) //清空所有的内容
  /*绘制 太阳*/
  ctx.drawImage(sun, 0, 0, 300, 300)

  ctx.save()
  ctx.translate(150, 150)

  // //绘制earth轨道
  ctx.beginPath()
  ctx.strokeStyle = 'rgba(255,255,0,0.5)'
  ctx.arc(0, 0, 100, 0, 2 * Math.PI)
  ctx.stroke()

  let time = new Date()
  // //绘制地球
  ctx.rotate(
    ((2 * Math.PI) / 60) * time.getSeconds() +
      ((2 * Math.PI) / 60000) * time.getMilliseconds(),
  )
  ctx.translate(100, 0)
  ctx.drawImage(earth, -12, -12)

  // //绘制月球轨道
  ctx.beginPath()
  ctx.strokeStyle = 'rgba(255,255,255,.3)'
  ctx.arc(0, 0, 40, 0, 2 * Math.PI)
  ctx.stroke()

  // //绘制月球
  ctx.rotate(
    ((2 * Math.PI) / 6) * time.getSeconds() +
      ((2 * Math.PI) / 6000) * time.getMilliseconds(),
  )
  ctx.translate(40, 0)
  ctx.drawImage(moon, -3.5, -3.5)
  ctx.restore()

  requestAnimationFrame(draw2)
}

// canvas3
const eraserMode = ref(false)
const drawing = ref(false)
let lastX = 0
let lastY = 0
let context: any
const value1 = ref(1)
const color1 = ref('#000')

function startDrawing(e: any) {
  drawing.value = true
  let canvas = myCanvas3.value
  if (!canvas) return
  context = canvas.getContext('2d')
  if (!context) return
  lastX = e.clientX - context.canvas.offsetLeft
  lastY = e.clientY - context.canvas.offsetTop
}
function draw3(e: any) {
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
  console.log(value1)
  context.lineWidth = value1.value
}

const changeColor = () => {
  context.strokeStyle = color1.value
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
    context.lineWidth = value1.value
    context.strokeStyle = color1.value
    ElMessage({
      message: '笔画模式',
      type: 'success',
    })
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
