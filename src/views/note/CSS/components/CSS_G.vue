<template>
  <div class="box">
    <div class="item-box" ref="box">
      <div class="item active">1</div>
      <div class="item">2</div>
      <div class="item">3</div>
      <div class="item">4</div>
      <div class="item point" @click="clickHandle">5</div>
      <div class="item">6</div>
      <div class="item">7</div>
      <div class="item">8</div>
      <div class="item">9</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const box = ref<HTMLElement | null>(null)
const start = ref(false)

onUnmounted(() => {
  clearInterval(timer)
})
let timer: any
let i = 1
const clickHandle = () => {
  nextTick(() => {
    if (start.value) {
      start.value = false
      clearInterval(timer)
      return
    }
    start.value = true
    if (!box.value) return
    const items = box.value.querySelectorAll('.item')
    const sort = [0, 1, 2, 5, 8, 7, 6, 3]
    timer = setInterval(() => {
      console.log(i)
      if (i > 7) {
        i = 0
        items[sort[7]].classList.remove('active')
      } else {
        items[sort[i - 1]].classList.remove('active')
      }
      items[sort[i]].classList.add('active')
      i++
    }, getRandomInt(10, 100))
  })
}
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
</script>

<style lang="scss" scoped>
.item-box {
  margin-left: 30px;
  height: 400px;
  width: 400px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    border: 1px solid;
  }
  .point {
    cursor: pointer;
  }
  .active {
    background-color: red;
  }
}
</style>
