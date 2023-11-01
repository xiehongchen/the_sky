<script lang="ts" setup>
import { ref } from 'vue'

const wrapper = ref<HTMLDivElement>()
const videoEl = ref<HTMLVideoElement>()

async function openCamera() {
  const navigator = window.navigator.mediaDevices
  // 获取设备
  const devices = await navigator.enumerateDevices()
  if (devices) {
    const stream = await navigator.getUserMedia({
      audio: false,
      video: {
        width: 300,
        height: 300,
        // facingMode: { exact: "environment" }, //强制后置摄像头
        facingMode: 'user', //前置摄像头
      },
    })
    if (!videoEl.value) return

    videoEl.value.srcObject = stream
    videoEl.value.play()
  }
}

function closeCamera() {
  if (!videoEl.value) return
  videoEl.value.pause()
}

function shoot() {
  if (!videoEl.value || !wrapper.value) return
  const canvas = document.createElement('canvas')
  canvas.width = videoEl.value.videoWidth
  canvas.height = videoEl.value.videoHeight
  //拿到 canvas 上下文对象
  const ctx = canvas.getContext('2d')
  ctx?.drawImage(videoEl.value, 0, 0, canvas.width, canvas.height)
  wrapper.value.appendChild(canvas)
}
</script>
<template>
  <div style="display: flex">
    <el-button type="primary" @click="openCamera">打开摄像头</el-button>
    <el-button type="primary" @click="closeCamera">关闭摄像头</el-button>
    <video ref="videoEl" />
    <el-button type="primary" @click="shoot">拍摄</el-button>
    <div ref="wrapper"></div>
  </div>
</template>
