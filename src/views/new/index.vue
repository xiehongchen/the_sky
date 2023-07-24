<template>
  <div id="test">
    <div class="label">
      <span>防抖函数：</span>
      <input type="text" @input="handleInput1" class="input" />
      <p>Input Value: {{ inputValue1 }}</p>
    </div>
    <div class="label">
      <span>节流函数：</span>
      <input type="text" @input="handleInput2" class="input" />
      <p>Input Value: {{ inputValue2 }}</p>
    </div>
    <div class="label">
      <span style="font-size: 20px; margin-right: 20px">canvas:</span>
      <canvas ref="canvasRef" width="400" height="200"></canvas>
      <button @click="convertToImage">转成img</button>
      <button @click="cropImage1">切割图片成canvas</button>
      <button @click="cropImage2">切割canvas成图片</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { debounce, throttle } from '@/utils/useUtils'
import { ref, onMounted } from 'vue'
import {
  drawRectangle,
  drawCircle,
  drawText,
  canvasToImage,
  cropImageToCanvas,
  cropCanvasToImage,
} from '@/utils/useCanvas'

// canvas
const canvasRef = ref<HTMLCanvasElement | null>(null)
onMounted(() => {
  const canvas = canvasRef.value
  if (canvas) {
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = 'yellow'
      ctx.fillRect(0, 0, 400, 200)
      drawRectangle(ctx, 50, 50, 100, 50, 'blue')
      drawCircle(ctx, 300, 100, 50, 'red')
      drawText(ctx, 'Hello, Canvas!', 50, 150, 'black', '20px Arial')
    }
  }
})

const convertToImage = () => {
  const canvas = canvasRef.value
  if (canvas) {
    const img = canvasToImage(canvas as HTMLCanvasElement)
    // console.log(img)
    document.getElementById('test')?.appendChild(img)
  }
}

const cropImage1 = async () => {
  const canvas = canvasRef.value
  if (canvas) {
    const img = canvasToImage(canvas as HTMLCanvasElement)
    try {
      const croppedCanvas = await cropImageToCanvas(img, 50, 50, 100, 50)
      console.log(croppedCanvas)
      document.getElementById('test')?.appendChild(croppedCanvas)
    } catch (error) {
      console.log(error)
    }
  }
}
const cropImage2 = () => {
  const canvas = canvasRef.value
  if (canvas) {
    const croppedCanvas = cropCanvasToImage(
      canvas as HTMLCanvasElement,
      250,
      50,
      100,
      100,
    )
    document.getElementById('test')?.appendChild(croppedCanvas)
  }
}
// 防抖
const inputValue1 = ref('')
const handleInput1 = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  inputValue1.value = value

  // 调用防抖函数，延迟 500 毫秒执行回调
  debounce(() => {
    console.log('Input value:', value)
  }, 500)
}

// 节流
const inputValue2 = ref('')
const handleInput2 = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  inputValue2.value = value

  // 调用节流函数，每隔 500 毫秒执行回调
  throttle(() => {
    console.log('Input value:', value)
  }, 500)
}
</script>

<style lang="scss" scoped>
.label {
  display: flex;
  align-items: center;
  margin: 10px 0;

  .input {
    width: 400px;
    margin: 0 20px;
  }
}
button {
  margin: 0 20px;
}
</style>
