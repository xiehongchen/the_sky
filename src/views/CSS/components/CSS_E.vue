<template>
  <a href="https://juejin.cn/post/7180310211654058039">掘金地址</a>
  <div class="container">
    <div class="list" ref="list1" :style="bgColor">
      <div
        class="item"
        v-for="(item, index) in list"
        :key="item.name"
        :style="styleList(index)"
      >
        <img :src="item.pic" alt="" />
        <p>{{ item.name }}</p>
      </div>
    </div>
    <div class="btn" @click="start"></div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

const isRunning = ref(false)
const baseRunAngle = ref(360 * 5)
const prizeId = ref(0)
const list = ref([
  {
    name: '手机',
    pic: 'https://bkimg.cdn.bcebos.com/pic/3801213fb80e7bec54e7d237ad7eae389b504ec23d9e',
  },
  {
    name: '手表',
    pic: 'https://img1.baidu.com/it/u=2631716577,1296460670&fm=253&fmt=auto&app=120&f=JPEG',
  },
  {
    name: '苹果',
    pic: 'https://img2.baidu.com/it/u=2611478896,137965957&fm=253&fmt=auto&app=138&f=JPEG',
  },
  {
    name: '棒棒糖',
    pic: 'https://img2.baidu.com/it/u=576980037,1655121105&fm=253&fmt=auto&app=138&f=PNG',
  },
  {
    name: '娃娃',
    pic: 'https://img2.baidu.com/it/u=4075390137,3967712457&fm=253&fmt=auto&app=138&f=PNG',
  },
  {
    name: '木马',
    pic: 'https://img1.baidu.com/it/u=2434318933,2727681086&fm=253&fmt=auto&app=120&f=JPEG',
  },
  {
    name: '德芙',
    pic: 'https://img0.baidu.com/it/u=1378564582,2397555841&fm=253&fmt=auto&app=120&f=JPEG',
  },
  {
    name: '玫瑰',
    pic: 'https://img1.baidu.com/it/u=1125656938,422247900&fm=253&fmt=auto&app=120&f=JPEG',
  },
])
const rotateAngle = computed(() => {
  const _degree = 360 / list.value.length
  return _degree
})
const bgColor = computed(() => {
  const _len = list.value.length
  const colorList = ['#5352b3', '#363589']
  let colorVal = ''
  for (let i = 0; i < _len; i++) {
    colorVal += `${colorList[i % 2]} ${rotateAngle.value * i}deg ${
      rotateAngle.value * (i + 1)
    }deg,`
  }
  return `background: conic-gradient(${colorVal.slice(0, -1)});`
})
const styleList = computed(() => {
  const _degree = rotateAngle.value
  return (i: any) => {
    return `width: ${
      2 * 270 * Math.sin(((_degree / 2) * Math.PI) / 180)
    }px;height: 270px;transform: rotate(${
      _degree * i + _degree / 2
    }deg);transform-origin: 50% 100%;`
  }
})
const list1 = ref<HTMLElement | null>()
onMounted(() => {
  if (list1.value) {
    list1.value.style.cssText = `${bgColor.value} transform: rotate(-${
      rotateAngle.value / 2
    }deg)`
  }
})
const getRandomNum = () => {
  const num = Math.floor(Math.random() * list.value.length)
  return num
}
const start = () => {
  if (!isRunning.value) {
    isRunning.value = true
    const id = getRandomNum()
    prizeId.value = id
    startRun()
  }
}
const totalRunAngle = computed(() => {
  return (
    baseRunAngle.value +
    360 -
    prizeId.value * rotateAngle.value -
    rotateAngle.value / 2
  )
})
const startRun = () => {
  if (!list1.value) {
    return
  }
  // 设置动效
  list1.value.style.cssText = `
            ${bgColor.value}
            transform: rotate(${totalRunAngle.value}deg);
            transition: all 4s ease;
          `
  // 监听transition动效停止事件
  list1.value.addEventListener('transitionend', stopRun)
}
const stopRun = () => {
  if (!list1.value) {
    return
  }
  isRunning.value = false
  list1.value.style.cssText = `
            ${bgColor.value}
            transform: rotate(${totalRunAngle.value - baseRunAngle.value}deg);
          `
  console.log('中奖ID>>>', list.value[prizeId.value].name)
  ElMessage.success(`恭喜你，中了${list.value[prizeId.value].name}`)
}
</script>

<style lang="scss" scoped>
.container {
  width: 540px;
  height: 540px;
  margin: 0 auto;
  position: relative;
  .list {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 10px solid #98d3fc;
    overflow: hidden;
    .item {
      position: absolute;
      left: 0;
      right: 0;
      top: -10px;
      margin: auto;
      img {
        width: 30%;
        height: 20%;
        margin: 40px auto 10px;
        display: block;
      }
      p {
        color: #fff;
        font-size: 12px;
        text-align: center;
        line-height: 20px;
      }
    }
  }
  .btn {
    width: 160px;
    height: 160px;
    background: url('../../../assets/images/btn_lottery.png') no-repeat center /
      100% 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    cursor: pointer;
    &::before {
      content: '';
      width: 41px;
      height: 39px;
      background: url('../../../assets/images/icon_point.png') no-repeat center /
        100% 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: -33px;
      margin: auto;
    }
  }
}
</style>
