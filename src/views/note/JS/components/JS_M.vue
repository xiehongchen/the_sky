<template>
  <div class="container">
    <div v-for="index in state.list" :key="index" class="content-item">
      {{ index }}
    </div>
    <div v-if="loading" class="loading">loading...</div>
    <div ref="lastContentRef"></div>
  </div>
</template>

<script setup lang="ts">
interface State {
  list: string[]
}

const state: State = {
  list: Array(10)
    .fill(null)
    .map((_, index) => `content-${index}`),
}
const loading = ref(false)
const timer = ref() as any
const lastContentRef = ref<HTMLElement>()

const loadMore = async () => {
  console.log('loadMore')
  if (timer.value) return
  loading.value = true
  await new Promise(
    (resolve) =>
      (timer.value = setTimeout(() => resolve((timer.value = null)), 1500)),
  )
  state.list.push(
    ...Array(10)
      .fill(null)
      .map((_, index) => `content-${state.list.length + index}`),
  )
  loading.value = false
}

onMounted(() => {
  const io = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting && !loading.value) {
      loadMore()
    }
  })
  nextTick(() => {
    if (lastContentRef.value) {
      io.observe(lastContentRef.value)
    }
  })
})
</script>

<style scoped>
.container {
  padding: 20px 50px;
}

.content-item {
  margin-bottom: 20px;
  height: 150px;
  line-height: 150px;
  text-align: center;
  background-color: cyan;
}

.content-item:nth-child(odd) {
  background-color: antiquewhite;
}

.loading {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  line-height: 100vh;
  text-align: center;
  color: #333;
  font-size: 20px;
  font-weight: 600;
  background-color: #0000008d;
  z-index: 2;
}
</style>
