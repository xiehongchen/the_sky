<template>
  <div ref="imgs">
    <div class="skin_img">
      <img
        class="lazyload"
        data-src="//game.gtimg.cn/images/lol/act/img/skinloading/412017.jpg"
        alt="灵魂莲华 锤石"
      />
    </div>

    <div class="skin_img">
      <img
        class="lazyload"
        data-src="//game.gtimg.cn/images/lol/act/img/skinloading/4013.jpg"
        alt="奥德赛 崔斯特"
      />
    </div>

    <div class="skin_img">
      <img
        class="lazyload"
        data-src="//game.gtimg.cn/images/lol/act/img/skinloading/64031.jpg"
        alt="神龙尊者 圣龙李青"
      />
    </div>

    <div class="skin_img">
      <img
        class="lazyload"
        data-src="//game.gtimg.cn/images/lol/act/img/skinloading/28015.jpg"
        alt="K/DA ALL OUT 伊芙琳"
      />
    </div>

    <div class="skin_img">
      <img
        class="lazyload"
        data-src="//game.gtimg.cn/images/lol/act/img/skinloading/246002.jpg"
        alt="真实伤害 奇亚娜"
      />
    </div>

    <div class="skin_img">
      <img
        class="lazyload"
        data-src="//game.gtimg.cn/images/lol/act/img/skinloading/421009.jpg"
        alt="黯晶巨兽 雷克塞"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const imgs = ref<HTMLDivElement>()
const imgList = ref([]) as any
// node.nodeType === 1 && node.tagName.toLowerCase() === 'img',
nextTick(() => {
  console.log('imgs', imgs.value)
  console.log('imgs', imgs.value?.childNodes)
  imgs.value?.childNodes.forEach((skin) => {
    console.log('skin', skin)
    imgList.value.push(skin.childNodes[0])
  })
  console.log('imgList', imgList.value)
  imgList.value.forEach((img: any) => observer.observe(img))
})

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((item: any) => {
      // isIntersecting是一个Boolean值，判断目标元素当前是否可见
      if (item.isIntersecting) {
        item.target.src = item.target.dataset.src
        // 图片加载后即停止监听该元素
        observer.unobserve(item.target)
      }
    })
  },
  {
    root: document.querySelector('.root'),
  },
)
</script>

<style lang="scss" scoped>
.skin_img {
  margin-bottom: 20px;
  width: 300px;
  height: 500px;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
