<template>
  <div class="page">
    <div class="header">
      <div class="header-title">简介</div>
      <ol class="box">
        <li class="title" v-for="(item, index) in titleList" :key="index">
          {{ item }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElNotification } from 'element-plus'
onMounted(() => {
  const hours = new Date().getHours()
  let title = ''
  if (hours > 0 && hours < 8) {
    title = '凌晨'
  } else if (hours < 11) {
    title = '早上'
  } else if (hours < 15) {
    title = '中午'
  } else if (hours < 19) {
    title = '下午'
  } else {
    title = '晚上'
  }
  ElNotification({
    title: '欢迎👏🏻',
    message: `${title}好，今天也要努力呀！`,
    type: 'success',
    offset: 80,
  })
})
const titleList = ref([
  '主页部分是复制别人的，找不到了，当时在Github上面拉下来进行学习的，看别人怎么写ts',
  '仓库部分是一些收藏网站或者文章，值得看一下',
  '笔记是看的一些文章视频之类的，然后实现效果',
  'H5部分是关于H5的一些新特性写的',
  '日记就是记录生活，以及计划和目标',
  '导入Github是白嫖Github图库的',
  '个人博客：https://xiehongchen.github.io',
])
// --------------
function add(x: number) {
  return function (y: number) {
    return x + y
  }
}
console.log(add(2)(3))
</script>

<style scoped lang="scss">
.page {
  height: 100%;
  .header {
    height: 100%;
    padding: 20px;
    margin: 20px;
    background-color: #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    .header-title {
      font-size: 30px;
      margin-bottom: 10px;
    }

    .box {
      border: 2px dashed;
      .title {
        font-size: 20px;
        color: #6c2b2b;
        margin: 10px;
      }
    }
  }
}
</style>
