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
</script>

<style lang="scss" scoped>
.box {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  .item {
    margin: 5px 0;
    width: 320px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    .img {
      height: 40px;
      cursor: pointer;
    }
    :deep(.el-link__inner) {
      font-size: 18px;
      font-weight: bold;
      margin-left: 10px;
    }
  }
}
</style>
