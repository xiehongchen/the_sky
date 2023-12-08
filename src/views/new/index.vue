<template>
  <div class="main" ref="mainRef"></div>
  <el-button @click="downloadFile">下载</el-button>
</template>

<script setup lang="ts">
import * as file from '@/utils/useFile'

const mainRef = ref<HTMLDivElement>()
const image = file
  .urlToImage(
    'https://img1.baidu.com/it/u=4107214055,4091251605&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=705',
  )
  .then((res) => {
    mainRef.value?.appendChild(res as Node)
    console.log(res)
  })
console.log(image)
const downloadFile = () => {
  // file.downloadFile(
  //   'https://img1.baidu.com/it/u=4107214055,4091251605&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=705',
  //   '消息',
  // )
}
</script>

<style lang="scss" scoped></style>
