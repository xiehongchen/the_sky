<template>
  <div class="page">
    <el-button @click="sortItems">排序</el-button>
    <el-button @click="bubbleSort">冒泡排序</el-button>
    <div class="box">
      <transition-group name="item-fade">
        <div
          class="item"
          v-for="item in sortedItems"
          :key="item.id"
          :style="{
            height: item.id * 10 + 'px',
            marginTop: itemOffsets(item.id) + 'px',
          }"
        >
          {{ item.id }}
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
const items = ref([
  {
    id: 4,
  },
  {
    id: 2,
  },
  {
    id: 14,
  },
  {
    id: 16,
  },
  {
    id: 7,
  },
])
const itemOffsets = (index: number) => {
  return 200 - index * 10
}

const sortItems = () => {
  items.value.sort((a, b) => a.id - b.id)
}
const bubbleSort = () => {
  items.value = bubbleSort1(items)
}
function bubbleSort1(arr: any) {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // 直接替换，使用结构赋值和数组的特效
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        // 中间数据
        // const temp = arr[j];
        // arr[j] = arr[j + 1];
        // arr[j + 1] = temp;
      }
    }
  }
  return arr
}
const sortedItems = ref([...items.value])

watch(items.value, () => {
  console.log(items.value)
  sortedItems.value = [...items.value]
  console.log(sortedItems.value)
})
</script>
<style lang="scss" scoped>
.page {
  height: 100%;

  button {
    margin-bottom: 10px;
  }

  .box {
    height: 220px;
    border: 1px solid;
    padding: 10px;
    width: 100%;
    display: flex;

    .item-fade-enter-active,
    .item-fade-leave-active {
      transition: transform 0.5s ease-in-out, width 0.5s ease-in-out;
    }

    .item-fade-enter,
    .item-fade-leave-to {
      transform: translateX(0);
      width: 0;
    }

    .item {
      width: 20px;
      margin: 0 10px;
      border: 1px solid;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
