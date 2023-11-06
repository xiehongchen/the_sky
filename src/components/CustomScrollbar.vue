<template>
  <div class="custom-scrollbar">
    <div class="content" :style="{ maxHeight: containerHeight + 'px' }">
      <!-- 长内容区域，高度超过容器时会出现滚动条 -->
      <!-- 你可以在这里放置你的内容 -->
    </div>
    <div
      class="scrollbar"
      :style="{ height: scrollbarHeight + 'px', top: scrollbarTop + 'px' }"
      @mousedown="startDrag"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const containerRef = ref<HTMLElement | null>(null)
const scrollbarRef = ref<HTMLElement | null>(null)

const scrollbarHeight = ref(0)
const scrollbarTop = ref(0)

const containerHeight = ref(0)

const isDragging = ref(false)
const startY = ref(0)
const startTop = ref(0)

const updateScrollbar = () => {
  if (containerRef.value && scrollbarRef.value) {
    const container = containerRef.value
    // const scrollbar = scrollbarRef.value

    const contentHeight = container.scrollHeight
    const containerHeight = container.clientHeight

    scrollbarHeight.value = (containerHeight / contentHeight) * containerHeight
    scrollbarTop.value =
      (container.scrollTop / (contentHeight - containerHeight)) *
      (containerHeight - scrollbarHeight.value)
  }
}

const startDrag = (e: MouseEvent) => {
  if (scrollbarRef.value) {
    isDragging.value = true
    startY.value = e.clientY
    startTop.value = scrollbarTop.value

    document.addEventListener('mousemove', handleDrag)
    document.addEventListener('mouseup', stopDrag)
    document.addEventListener('mouseleave', stopDrag)
  }
}

const handleDrag = (e: MouseEvent) => {
  if (isDragging.value && containerRef.value) {
    const container = containerRef.value
    const contentHeight = container.scrollHeight
    const containerHeight = container.clientHeight

    const deltaY = e.clientY - startY.value
    const maxTop = containerHeight - scrollbarHeight.value

    scrollbarTop.value = Math.min(maxTop, Math.max(0, startTop.value + deltaY))

    container.scrollTop =
      (scrollbarTop.value / maxTop) * (contentHeight - containerHeight)
  }
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('mouseleave', stopDrag)
}

onMounted(() => {
  if (containerRef.value) {
    const container = containerRef.value
    container.addEventListener('scroll', updateScrollbar)
    updateScrollbar()
  }
})

onUnmounted(() => {
  if (containerRef.value) {
    const container = containerRef.value
    container.removeEventListener('scroll', updateScrollbar)
  }
})
</script>

<style scoped>
.custom-scrollbar {
  position: relative;
  width: 300px;
  height: 300px;
  overflow: hidden;
  border: 1px solid #ccc;
}

.content {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.scrollbar {
  position: absolute;
  top: 0;
  right: 0;
  width: 6px;
  background-color: #333;
  opacity: 0.6;
  cursor: pointer;
  border-radius: 3px;
}

.scrollbar:hover {
  opacity: 0.8;
}
</style>
