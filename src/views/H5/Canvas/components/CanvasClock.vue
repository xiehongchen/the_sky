<template>
  <canvas
    ref="myCanvas"
    width="300"
    height="300"
    style="border: 1px solid #000000"
  ></canvas>
</template>

<script setup lang="ts">
const myCanvas: Ref<HTMLCanvasElement | null> = ref(null)
function init() {
  let canvas = myCanvas.value
  if (!canvas) return
  let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  if (!ctx) return
  draw(ctx)
}

function draw(ctx: CanvasRenderingContext2D) {
  requestAnimationFrame(function step() {
    drawDial(ctx) //绘制表盘
    drawAllHands(ctx) //绘制时分秒针
    drawTime(ctx) //绘制时间
    requestAnimationFrame(step)
  })
}
function drawTime(ctx: CanvasRenderingContext2D) {
  const time1 = new Date()

  let s = time1.getSeconds()
  let m = time1.getMinutes()
  let h = time1.getHours()
  const time2 = h + ':' + m + ':' + s
  ctx.font = '20px sans-serif'
  ctx.fillText(time2, 10, 20)
}
/*绘制时分秒针*/
function drawAllHands(ctx: CanvasRenderingContext2D) {
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
function drawHand(
  angle: number,
  len: number,
  width: number,
  color: string,
  ctx: CanvasRenderingContext2D,
) {
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
function drawDial(ctx: CanvasRenderingContext2D) {
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
defineExpose({
  init,
})
</script>

<style lang="scss" scoped></style>
