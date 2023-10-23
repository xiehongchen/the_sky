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
let sun: any = null
let earth: any = null
let moon: any = null
let ctx: any = null
function init() {
  sun = new Image()
  earth = new Image()
  moon = new Image()
  sun.src = 'src/assets/vue.svg'
  earth.src = 'src/assets/vue.svg'
  moon.src = 'src/assets/vue.svg'

  let canvas = myCanvas.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  if (!ctx) return

  sun.onload = function () {
    draw()
  }
}
function draw() {
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

  requestAnimationFrame(draw)
}
defineExpose({
  init,
})
</script>

<style lang="scss" scoped></style>
