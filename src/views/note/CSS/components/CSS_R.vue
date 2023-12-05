<template>
  <div class="box">
    <div class="prev" @click="btnClick('prev')">《</div>
    <div class="carousel" ref="carouselRef" @click="imgContainerClick">
      <img
        ref="imgRef"
        v-for="item in imgs"
        :key="item.id"
        :src="item.src"
        :alt="item.alt"
        :draggable="false"
      />
    </div>
    <div class="next" @click="btnClick('next')">》</div>
  </div>
</template>

<script setup lang="ts">
const x = ref(0)
const y = ref(0)
const newX = ref(0)
const newY = ref(0)
const carouselRef = ref<HTMLElement>()

// 鼠标点击事件
function getMouseNowLocation(event: any) {
  x.value = event.pageX
  y.value = event.pageY
  carouselRef.value?.addEventListener('mousemove', updateMouseNewLocation)
}
// 鼠标移动事件
function updateMouseNewLocation(event: any) {
  newX.value = event.pageX
  newY.value = event.pageY
  if (newX.value - x.value > 100) {
    btnClick('prev')
    carouselRef.value?.removeEventListener('mousemove', updateMouseNewLocation)
  } else if (x.value - newX.value > 100) {
    btnClick('next')
    carouselRef.value?.removeEventListener('mousemove', updateMouseNewLocation)
  }
}
function removeUpdateLocation() {
  carouselRef.value?.removeEventListener('mousemove', updateMouseNewLocation)
}

onMounted(() => {
  // 绑定鼠标点击事件
  carouselRef.value?.addEventListener('mousedown', getMouseNowLocation)
  // 鼠标点击松开绑定事件，移除鼠标移动事件
  carouselRef.value?.addEventListener('mouseup', removeUpdateLocation)
  // 鼠标离开绑定事件，开启自动轮播
  carouselRef.value?.addEventListener('mouseleave', autoPlay)
  // 鼠标移入绑定事件，停止轮播
  carouselRef.value?.addEventListener('mouseenter', stopAutoPlay)
  setStyle(index.value)
})

onUnmounted(() => {
  carouselRef.value?.removeEventListener('mouseleave', autoPlay)
  clearInterval(timer.value)
})

let index = ref(4)
function getAssetsImg(name: string) {
  if (!name.includes('.')) {
    return 'src/assets/images/' + name + '.jpg'
  } else {
    return 'src/assets/images/' + name
  }
}
const imgs = [
  {
    src: getAssetsImg('1'),
    alt: '动漫美女 鲜花 帽子 唯美 好看 4K壁纸',
    id: 1,
  },
  {
    src: getAssetsImg('2'),
    alt: '狐狸耳朵 红眼睛 动漫女孩',
    id: 2,
  },
  {
    src: getAssetsImg('3'),
    alt: '心形岛屿 蓝色大海 4K风景壁纸',
    id: 3,
  },
  {
    src: getAssetsImg('4'),
    alt: '西藏阿里 纳木那尼雪山4K风景壁纸',
    id: 4,
  },
  {
    src: getAssetsImg('5'),
    alt: '七夕节唯美牛郎织女 绘画 厚涂 彼岸图网原创 4K壁纸',
    id: 5,
  },
  {
    src: getAssetsImg('6'),
    alt: '敦煌美女 唯美 彼岸图网原创 4K壁纸',
    id: 6,
  },
  {
    src: getAssetsImg('7'),
    alt: 'AI绘画 赛博修仙',
    id: 7,
  },
  {
    src: getAssetsImg('8'),
    alt: '游泳的猫 AI生图 可爱绘画 4K壁纸',
    id: 8,
  },
  {
    src: getAssetsImg('9'),
    alt: '夜晚 雨天 街道 女孩 短发 个性美女 蓝色外套 4K动漫壁纸',
    id: 9,
  },
  {
    src: getAssetsImg('10'),
    alt: '赛博风格 2B 高清游戏美女4K壁纸',
    id: 10,
  },
  {
    src: getAssetsImg('11'),
    alt: '秋天 丰收 粮食 鸟儿 彼岸原创 4K壁纸',
    id: 11,
  },
  {
    src: getAssetsImg('12'),
    alt: '白鹿 居家 猫 茶艺',
    id: 12,
  },
  {
    src: getAssetsImg('13'),
    alt: '七夕浪漫牛郎织女相会唯美 彼岸图网原创 4K壁纸',
    id: 13,
  },
  {
    src: getAssetsImg('14'),
    alt: '彼岸图网原创 蓝色裙子美女 唯美 鲜花',
    id: 14,
  },
  {
    src: getAssetsImg('15'),
    alt: '彼岸原创 新娘 红色嫁衣 古风美女 4K高清壁纸',
    id: 15,
  },
  {
    src: getAssetsImg('16'),
    alt: 'AI 山水 瀑布 国风 动漫风景 彼岸原创 4K壁纸',
    id: 16,
  },
]
const imgRef = ref<HTMLImageElement[]>()
const l = imgs.length
// const OFFSET = ref(200)
// const SCALE = ref(0.8)
// const ROTATE = ref(45)
// const OPACITY = ref(0.6)

// 设置样式
function setStyle(imgIndex: number) {
  if (!carouselRef.value) return
  carouselRef.value.style.display = 'none'
  // for (let i = 0; i < imgRef.value!.length; i++) {
  //   const img = imgRef.value![i]
  //   const i_imgIndex = i - imgIndex
  //   const abs = Math.abs(i_imgIndex)
  //   const sign = -1 * Math.sign(i_imgIndex)
  //   let translateX = i_imgIndex * OFFSET.value
  //   if (abs === 1) {
  //     translateX += sign * 30
  //   }
  //   const rotateY = abs === 0 ? 0 : sign * ROTATE.value
  //   const scale = Math.pow(SCALE.value, abs)
  //   const opacity = Math.pow(OPACITY.value, abs)
  //   const zIndex = l - abs
  //   img.style.transform = `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`
  //   img.style.opacity = opacity.toString()
  //   img.style.zIndex = zIndex.toString()
  // }
  const arr = getImageIndex(imgIndex, 9, imgRef.value!.length)
  console.log('arr', arr)
  for (let i = 0; i < imgRef.value!.length; i++) {
    const img = imgRef.value![i]
    img.className = ''
    img.classList.add('img-item')
  }
  const classList = [
    'img-item-left-4',
    'img-item-left-3',
    'img-item-left-2',
    'img-item-left-1',
    'img-item-center',
    'img-item-right-1',
    'img-item-right-2',
    'img-item-right-3',
    'img-item-right-4',
  ]
  for (let i = 0; i < arr.length; i++) {
    const img = imgRef.value![arr[i]]
    img.classList.remove('img-item')
    img.classList.add(classList[i])
  }
  carouselRef.value.style.display = 'flex'
}

function getImageIndex(index: number, len: number, max: number) {
  // 确保 index 和 len 是有效的数字
  if (
    typeof index !== 'number' ||
    typeof len !== 'number' ||
    index < 0 ||
    len < 1
  ) {
    return []
  }

  // 计算数组的起始位置
  const start = index - Math.floor(len / 2)
  // 生成数组
  const resultArray = Array.from({ length: len }, (_, i) => start + i)
  for (let i = 0; i < resultArray.length; i++) {
    if (resultArray[i] < 0) {
      resultArray[i] += max
    }
    if (resultArray[i] >= max) {
      resultArray[i] -= max
    }
  }

  return resultArray
}
// 点击轮播图当中的图片
function imgContainerClick(e: any) {
  if (e.currentTarget === e.target) {
    return
  }
  index.value = imgRef.value!.indexOf(e.target)
  setStyle(index.value)
}
// 上下一张图
function btnClick(type: string) {
  if (type === 'next') {
    index.value = index.value + 1 < l ? index.value + 1 : index.value + 1 - l
  } else {
    index.value = index.value - 1
  }
  if (index.value < 0) return (index.value = 0)
  if (index.value > l - 1) return (index.value = l - 1)
  setStyle(index.value)
}

// 自动播放
const timer = ref()
function autoPlay() {
  clearInterval(timer.value)
  timer.value = setInterval(() => btnClick('next'), 1000)
}
function stopAutoPlay() {
  clearInterval(timer.value)
}
// 开启自动播放
autoPlay()
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 300px;
  position: relative;
  display: flex;
  align-items: center;
}
.prev,
.next {
  width: 24px;
  padding: 0 50px;
  cursor: pointer;
}
.carousel {
  display: flex;
  width: calc(100% - 248px);
  position: relative;
  height: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  perspective: 1000px;
}
img {
  width: 450px;
  height: 287px;
  transition: 0.2s linear;
  position: absolute;
}
@mixin img-item($translateX, $rotateY, $scale, $opacity, $zIndex) {
  transform: translateX($translateX) rotateY($rotateY) scale($scale);
  opacity: $opacity;
  z-index: $zIndex;
}
.img-item-left-1 {
  @include img-item(-170px, 45deg, 0.8, 0.8, 15);
}
.img-item-left-2 {
  @include img-item(-400px, 45deg, 0.64, 0.5, 14);
}
.img-item-left-3 {
  @include img-item(-600px, 45deg, 0.512, 0.4, 13);
}
.img-item-left-4 {
  @include img-item(-800px, 45deg, 0.4096, 0.2, 12);
}
.img-item-right-1 {
  @include img-item(170px, -45deg, 0.8, 0.8, 15);
}
.img-item-right-2 {
  @include img-item(400px, -45deg, 0.64, 0.5, 14);
}
.img-item-right-3 {
  @include img-item(600px, -45deg, 0.512, 0.4, 13);
}
.img-item-right-4 {
  @include img-item(800px, -45deg, 0.4096, 0.2, 12);
}
.img-item {
  opacity: 0;
}
.img-item-center {
  @include img-item(0, 0, 1, 1, 16);
}
</style>
