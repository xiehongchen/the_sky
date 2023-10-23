<template>
  <canvas
    ref="myCanvas"
    width="300"
    height="300"
    style="border: 1px solid #000000; margin: 0 20px"
  ></canvas>
</template>

<script setup lang="ts">
const myCanvas: Ref<HTMLCanvasElement | null> = ref(null)
const r = 150
const rem = 1.5
function init() {
  let canvas = myCanvas.value
  if (!canvas) return
  let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  if (!ctx) return
  draw(ctx)
}

function draw(ctx: CanvasRenderingContext2D) {
  requestAnimationFrame(function step() {
    const now = new Date()
    let s = now.getSeconds()
    let m = now.getMinutes()
    let h = now.getHours()
    drawBackground(ctx)
    drawHour(ctx, h, m)
    drawMinute(ctx, m)
    drawSecond(ctx, s)
    drawDot(ctx)
    ctx.restore()
    requestAnimationFrame(step)
  })
}
// 绘制时钟的盘面、圆点和数字
const drawBackground = (ctx: CanvasRenderingContext2D) => {
  ctx.save()
  ctx.translate(r, r)
  ctx.lineWidth = 10 * rem
  ctx.beginPath()
  ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(0, 0, r - ctx.lineWidth, 0, 2 * Math.PI)
  ctx.fillStyle = '#ffffff'
  ctx.fill()

  const hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2]
  ctx.font = 18 * rem + 'px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  hourNumbers.forEach((num: number, index: number) => {
    const rad = ((2 * Math.PI) / 12) * index
    const x = Math.cos(rad) * (r - 30 * rem)
    const y = Math.sin(rad) * (r - 30 * rem)
    ctx.fillStyle = '#000000'
    ctx.fillText(num.toString(), x, y)
  })

  for (let i = 0; i < 60; i++) {
    const rad = ((2 * Math.PI) / 60) * i
    const x = Math.cos(rad) * (r - 18 * rem)
    const y = Math.sin(rad) * (r - 18 * rem)
    ctx.beginPath()
    if (i % 5 === 0) {
      ctx.fillStyle = '#000'
    } else {
      ctx.fillStyle = '#ccc'
    }
    ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI)
    ctx.fill()
  }
}
// 绘制时钟的时针
const drawHour = (
  ctx: CanvasRenderingContext2D,
  hour: number,
  minute: number,
) => {
  ctx.save()
  ctx.beginPath()
  const rad = ((2 * Math.PI) / 12) * hour
  let minuteRad = ((2 * Math.PI) / 12 / 60) * minute
  ctx.rotate(rad + minuteRad)
  ctx.lineWidth = 6 * rem
  ctx.lineCap = 'round'
  ctx.moveTo(0, 10 * rem)
  ctx.lineTo(0, -r / 2)
  ctx.stroke()
  ctx.restore()
}

// 绘制时钟的分针
const drawMinute = (ctx: CanvasRenderingContext2D, minute: number) => {
  ctx.save()
  const rad = ((2 * Math.PI) / 60) * minute
  ctx.rotate(rad)
  ctx.lineWidth = 3 * rem
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(0, 10 * rem)
  ctx.lineTo(0, -r + 30 * rem)
  ctx.stroke()
  ctx.restore()
}

// 绘制时钟的秒针
const drawSecond = (ctx: CanvasRenderingContext2D, second: number) => {
  ctx.save()
  let rad = ((2 * Math.PI) / 60) * second
  ctx.rotate(rad)
  ctx.fillStyle = '#c14543'
  ctx.beginPath()
  ctx.moveTo(-2 * rem, 20 * rem)
  ctx.lineTo(2 * rem, 20 * rem)
  ctx.lineTo(1, -r + 18 * rem)
  ctx.lineTo(-1, -r + 18 * rem)
  ctx.fill()
  ctx.restore()
}

// 绘制时钟中心的白点
const drawDot = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = '#fff'
  ctx.beginPath()
  ctx.arc(0, 0, 3 * rem, 0, 2 * Math.PI)
  ctx.fill()
}
defineExpose({
  init,
})
</script>

<style lang="scss" scoped></style>
