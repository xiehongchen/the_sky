<template>
  <div class="box">
    <div class="item" v-for="item in list" :key="item.id">
      <img class="img" :src="item.imgUrl" @click="gotoURL(item.url)" />
      <el-link :href="item.url" target="_blank">{{ item.title }}</el-link>
    </div>
  </div>
</template>

<script setup lang="ts">
interface list11 {
  id: number
  title: string
  url: string
  imgUrl: string
}
defineProps({ list: Array as PropType<list11[]> })
const gotoURL = (url: string) => {
  window.open(url)
}
// const handleImageError = (event: Event) => {
//   console.log('event', event)
//   const imgElement = event.target as HTMLImageElement
//   if (imgElement) {
//     imgElement.src = './../../../src/assets/hui.png'
//   }
// }
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-wrap: wrap;
  .item {
    margin: 5px;
    padding: 5px;
    width: 320px;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    border: 1px solid;
    .img {
      height: 40px;
      width: 40px;
      cursor: pointer;
    }
    :deep(.el-link__inner) {
      font-size: 18px;
      font-weight: bold;
      margin-left: 10px;
    }
  }
  .item:hover {
    box-shadow: inset 0 0 0 1px #0431e5;
  }
}
</style>
