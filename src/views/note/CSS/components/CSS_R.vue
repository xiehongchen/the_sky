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

function getMouseNowLocation(event: any) {
  x.value = event.pageX
  y.value = event.pageY
  window.addEventListener('mousemove', updateMouseNewLocation)
}

function updateMouseNewLocation(event: any) {
  newX.value = event.pageX
  newY.value = event.pageY
  if (newX.value - x.value > 100) {
    btnClick('next')
    window.removeEventListener('mousemove', updateMouseNewLocation)
  } else if (x.value - newX.value > 100) {
    btnClick('prev')
    window.removeEventListener('mousemove', updateMouseNewLocation)
  }
}
function removeUpdateLocation() {
  window.removeEventListener('mousemove', updateMouseNewLocation)
}

onMounted(() => {
  window.addEventListener('mousedown', getMouseNowLocation)
  window.addEventListener('mouseup', removeUpdateLocation)
})
// onUnmounted(() => window.removeEventListener('mousemove', update))

let index = ref(4)
const imgs = [
  {
    src: 'https://pic.netbian.com/uploads/allimg/230813/221347-16919360273e05.jpg',
    alt: '动漫美女 鲜花 帽子 唯美 好看 4K壁纸',
    id: 1,
  },
  {
    src: 'https://pic.netbian.com/uploads/allimg/230823/121339-1692764019c984.jpg',
    alt: '狐狸耳朵 红眼睛 动漫女孩',
    id: 2,
  },
  {
    src: 'https://pic.netbian.com/uploads/allimg/230823/121019-16927638197e75.jpg',
    alt: '心形岛屿 蓝色大海 4K风景壁纸',
    id: 3,
  },
  {
    src: 'https://pic.netbian.com/uploads/allimg/230823/120844-16927637247b23.jpg',
    alt: '西藏阿里 纳木那尼雪山4K风景壁纸',
    id: 4,
  },
  {
    src: 'https://pic.netbian.com/uploads/allimg/230805/234830-1691250510d5d5.jpg',
    alt: '七夕节唯美牛郎织女 绘画 厚涂 彼岸图网原创 4K壁纸',
    id: 5,
  },
  {
    src: 'https://pic.netbian.com/uploads/allimg/230817/133011-16922502118cba.jpg',
    alt: '敦煌美女 唯美 彼岸图网原创 4K壁纸',
    id: 6,
  },
  {
    src: 'https://pic.netbian.com/uploads/allimg/230712/004115-1689093675f790.jpg',
    alt: 'AI绘画 赛博修仙',
    id: 7,
  },
  {
    src: 'https://pic.netbian.com/uploads/allimg/230804/004153-1691080913ae6b.jpg',
    alt: '游泳的猫 AI生图 可爱绘画 4K壁纸',
    id: 8,
  },
  {
    src: 'https://pic.netbian.com/uploads/allimg/230818/115709-169233102953f9.jpg',
    alt: '夜晚 雨天 街道 女孩 短发 个性美女 蓝色外套 4K动漫壁纸',
    id: 9,
  },
  {
    src: 'https://pic.netbian.com/uploads/allimg/230818/121018-1692331818032d.jpg',
    alt: '赛博风格 2B 高清游戏美女4K壁纸',
    id: 10,
  },
  {
    src: 'https://pic.netbian.com/uploads/allimg/230821/125905-169259394536ff.jpg',
    alt: '秋天 丰收 粮食 鸟儿 彼岸原创 4K壁纸',
    id: 11,
  },
  {
    src: 'https://pic.netbian.com/uploads/allimg/230821/124435-1692593075af4a.jpg',
    alt: '白鹿 居家 猫 茶艺',
    id: 12,
  },
  {
    src: 'https://pic.netbian.com/uploads/allimg/230805/234044-16912500440749.jpg',
    alt: '七夕浪漫牛郎织女相会唯美 彼岸图网原创 4K壁纸',
    id: 13,
  },
  {
    src: 'https://pic.netbian.com/uploads/allimg/230819/143449-169242688936cb.jpg',
    alt: '彼岸图网原创 蓝色裙子美女 唯美 鲜花',
    id: 14,
  },
  {
    src: 'https://pic.netbian.com/uploads/allimg/230816/114537-16921575377034.jpg',
    alt: '彼岸原创 新娘 红色嫁衣 古风美女 4K高清壁纸',
    id: 15,
  },
  {
    src: 'https://pic.netbian.com/uploads/allimg/230802/193310-1690975990f31a.jpg',
    alt: 'AI 山水 瀑布 国风 动漫风景 彼岸原创 4K壁纸',
    id: 16,
  },
]
const imgRef = ref()
console.log(imgRef)
const l = imgs.length
const OFFSET = ref(200)
const SCALE = ref(0.8)
const ROTATE = ref(45)
const OPACITY = ref(0.6)
const carouselRef = ref<HTMLElement>()
onMounted(() => {
  setStyle(index.value)
})

function setStyle(imgIndex: number) {
  if (!carouselRef.value) return
  carouselRef.value.style.display = 'none'
  for (let i = 0; i < imgRef.value.length; i++) {
    const img = imgRef.value[i]
    const i_imgIndex = i - imgIndex
    const abs = Math.abs(i_imgIndex)
    const sign = -1 * Math.sign(i_imgIndex)
    let translateX = i_imgIndex * OFFSET.value
    if (abs === 1) {
      translateX += sign * 30
    }
    const rotateY = abs === 0 ? 0 : sign * ROTATE.value // -1
    const scale = Math.pow(SCALE.value, abs)
    const opacity = Math.pow(OPACITY.value, abs)
    const zIndex = l - abs
    img.style = `transform: translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale});opacity: ${opacity};z-index: ${zIndex};`
  }
  carouselRef.value.style.display = 'flex'
}

function imgContainerClick(e: any) {
  if (e.currentTarget === e.target) {
    return
  }
  index.value = imgRef.value.indexOf(e.target)
}
function btnClick(type: string) {
  index.value = type === 'next' ? index.value + 1 : index.value - 1
  if (index.value < 0) return (index.value = 0)
  if (index.value > l - 1) return (index.value = l - 1)
}
const needNumber = ref(0)
watch(index, (newV) => {
  console.log('newV', newV)
  if (newV < 5) {
    console.log('123')
    needNumber.value = 4 - newV - needNumber.value
    console.log(needNumber.value)
    sortImg(needNumber.value, 'end')
  }
  if (newV > l - 5) {
    console.log('123')
    needNumber.value = newV + 5 - l - needNumber.value
    console.log(needNumber.value)
    sortImg(needNumber.value, 'head')
  }
  setStyle(index.value)
})
function sortImg(n: number, position: string) {
  if (position === 'head') {
    for (let i = 0; i < n; i++) {
      const img = imgs.shift()!
      imgs.push(img)
    }
  } else {
    for (let i = 0; i < n; i++) {
      const img = imgs.pop()!
      imgs.unshift(img)
      console.log('imgs', imgs)
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100vh;
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
  height: 287;
  transition: 0.2s linear;
  position: absolute;
}
</style>
