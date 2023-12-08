<template>
  <div ref="items">
    <div class="box1 observer-item">content-1</div>
    <div class="box2 observer-item">content-2</div>
    <div class="box1 observer-item">content-3</div>
    <div class="box2 observer-item">content-4</div>
    <div class="box1 observer-item">content-5</div>
    <div class="box2 observer-item">content-6</div>
    <div class="box1 observer-item">content-7</div>
    <div class="box2 observer-item">content-8</div>
    <div class="box1 observer-item">content-9</div>
    <div class="box2 observer-item">content-10</div>
    <div class="box1 observer-item">content-11</div>
    <div class="box2 observer-item">content-12</div>
    <div class="box1 observer-item">content-13</div>
    <div class="box2 observer-item">content-14</div>
    <div class="box1 observer-item">content-15</div>
  </div>
</template>

<script setup lang="ts">
const items = ref<HTMLDivElement>()
const itemList = ref([]) as any
nextTick(() => {
  items.value?.childNodes.forEach((skin) => {
    itemList.value.push(skin)
  })
  itemList.value.forEach((ele: any) => {
    ele.classList.add('opaque')
    observer.observe(ele)
  })
})

const observer = new IntersectionObserver((entries, instance) => {
  console.log(entries, instance)
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const element = entry.target
      element.classList.remove('opaque')
      element.classList.add('come-in')
      instance.unobserve(element)
    }
  })
})
</script>

<style lang="scss" scoped>
div {
  margin-bottom: 50px;
  width: 400px;
  height: 200px;
  color: #fff;
  line-height: 200px;
  text-align: center;
}
.box1 {
  background-color: pink;
}
.box2 {
  background-color: skyblue;
}
.come-in {
  opacity: 1;
  transform: translateY(150px);
  animation: come-in 1s ease forwards;
}
.come-in:nth-child(odd) {
  animation-duration: 1s;
}

@keyframes come-in {
  100% {
    transform: translateY(0);
  }
}
.opaque {
  opacity: 0;
}
</style>
