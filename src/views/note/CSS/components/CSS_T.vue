<template>
  <div class="container">
    <div class="box" ref="mainRef"></div>
  </div>
</template>

<script setup lang="ts">
const mainRef = ref<HTMLElement>()
const isDragging = ref(false)
const initialX = ref(0) // 初始鼠标X坐标
const initialY = ref(0) // 初始鼠标Y坐标
const currentX = ref(0) // 当前鼠标X坐标
const currentY = ref(0) // 当前鼠标Y坐标
const initialRotationY = ref(0) // 初始旋转角度（Y轴）
const initialRotationX = ref(0) // 初始旋转角度（X轴）

onMounted(() => {
  if (!mainRef.value) return
  mainRef.value.addEventListener('mousedown', mousedown)
  mainRef.value.addEventListener('mousemove', mousemove)
  mainRef.value.addEventListener('mouseup', mouseup)
})
onUnmounted(() => {
  if (!mainRef.value) return
  mainRef.value.removeEventListener('mousedown', mousedown)
  mainRef.value.removeEventListener('mousemove', mousemove)
  mainRef.value.removeEventListener('mouseup', mouseup)
})
function mousedown(e: any) {
  console.log('mousedown')
  initialY.value = e.clientY // 获取初始鼠标Y坐标
  initialX.value = e.clientX
  initialRotationY.value = parseInt(
    getComputedStyle(mainRef.value!)
      .getPropertyValue('transform')
      .replace(/[^0-9-.,]/g, '')
      .split(',')[4],
  ) // 获取初始旋转角度（Y轴）
  initialRotationX.value = parseInt(
    getComputedStyle(mainRef.value!)
      .getPropertyValue('transform')
      .replace(/[^0-9-.,]/g, '')
      .split(',')[5],
  ) // 获取初始旋转角度（X轴）
  console.log('initialRotationY', initialRotationY.value)
  isDragging.value = true // 设置isDragging为true，表示正在拖动
}
function mousemove(e: any) {
  console.log('mousemove')
  if (isDragging.value) {
    // 如果正在拖动
    currentY.value = e.clientY // 获取当前鼠标Y坐标
    let dy = currentY.value - initialY.value // Y轴方向移动的距离
    let newRotationY = initialRotationY.value + dy // 根据移动方向计算新的旋转角度（Y轴）

    currentX.value = e.clientX
    let dx = currentX.value - initialX.value // Y轴方向移动的距离
    let newRotationX = initialRotationX.value + dx * -1
    mainRef.value!.style.transform =
      'rotateX(' + newRotationX + 'deg) rotateY(' + newRotationY + 'deg)' // 设置元素的旋转角度
  }
}
function mouseup() {
  if (!mainRef.value) return
  console.log('mouseup')
  isDragging.value = false
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box {
  width: 300px;
  height: 300px;
  background-color: red;
}
</style>
