<template>
  <div ref="boxRef" class="box">
    <video
      :muted="true"
      autoPlay
      preload="true"
      loop
      :x5-video-player-fullscreen="true"
      :x5-playsinline="true"
      playsInline
      :webkit-playsinline="true"
      crossOrigin="anonymous"
      ref="videoRef"
    >
      <source src="public/dance.mp4" />
    </video>
    <canvas ref="canvasRef"></canvas>
  </div>
  <el-slider v-model="blurriness" show-stops :min="1" :max="15" />
</template>

<script setup lang="ts">
onMounted(() => {
  init()
  play()
})
const canvasWidth = 324
const canvasHeight = 570
const boxRef = ref<HTMLDivElement>()
const videoRef = ref<HTMLVideoElement>()
const canvasRef = ref<HTMLCanvasElement>()
const ctxRef = ref<CanvasRenderingContext2D | null>(null)
const frameId = ref<number>(0)
const blurriness = ref<number>(6)
const init = () => {
  if (boxRef.value && videoRef.value && canvasRef.value) {
    canvasRef.value.width = canvasWidth
    canvasRef.value.height = canvasHeight
    ctxRef.value = canvasRef.value.getContext('2d', {
      willReadFrequently: true,
    }) as CanvasRenderingContext2D
  }
}
const play = () => {
  if (videoRef.value && ctxRef.value) {
    ctxRef.value.drawImage(videoRef.value, 0, 0, canvasWidth, canvasHeight)
    const imageData = ctxRef.value.getImageData(0, 0, canvasWidth, canvasHeight)
    ctxRef.value.clearRect(0, 0, canvasWidth, canvasHeight)
    const { data, width, height } = imageData
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const startIndex = (y * width + x) * 4
        if (x % blurriness.value === 0 && y % blurriness.value === 0) {
          const avgColor =
            (data[startIndex] + data[startIndex + 1] + data[startIndex + 2]) / 3
          ctxRef.value.fillStyle = `rgb(${avgColor}, ${avgColor}, ${avgColor})`
          ctxRef.value.font = '10px Arial'
          ctxRef.value.fillText('8', x, y)
        }
      }
    }
    frameId.value = window.requestAnimationFrame(play)
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  video {
    position: absolute;
    width: 324px;
    height: 570px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    visibility: hidden;
  }
}
</style>
