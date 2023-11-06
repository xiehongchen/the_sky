<template>
  <div class="box">
    <div
      class="item"
      v-for="(item, index) in list"
      :key="item.id"
      :style="{ backgroundColor: item.color }"
    >
      {{ item.id }} {{ index }}
    </div>
  </div>
  <div class="btn">
    <div class="title">索引是从0开始的</div>
    <div class="title">
      数组操作
      <button class="button" @click="reset">重置</button>
    </div>
    <div class="label">
      <div class="label-title">增:</div>
      <button class="button" @click="psuhHandle">
        push方法>>在末尾增加【返回数组的新的长度】
      </button>
      <button class="button" @click="unshiftHandle">
        unshift方法>>在头部增加【返回数组的新的长度】
      </button>
      <button class="button" @click="spliceHandle">
        splice方法>>在索引1后加【返回一个空数组】
      </button>
      <button class="button red" @click="concatHandle">
        concat方法>>合并数组，合并的数组放在后面【返回一个新数组】
      </button>
    </div>
    <div class="label">
      <div class="label-title">删:</div>
      <button class="button" @click="popHandle">
        pop方法>>删除最后一个【返回删除的元素】
      </button>
      <button class="button" @click="shiftHandle">
        shift方法>>删除第一个【返回删除的元素】
      </button>
      <button class="button" @click="spliceHandle1">
        splice方法>>在索引1后删除1个【返回一个新的数组】
      </button>
      <button class="button red" @click="sliceHandle">
        slice方法>>截取索引0到索引2的元素(这个不包含索引2的元素)【返回一个新的数组】
      </button>
    </div>
    <div class="label">
      <div class="label-title">改:</div>
      <button class="button" @click="spliceHandle2">
        splice方法>>在索引1后修改1个元素【返回被修改的元素】
      </button>
    </div>
    <div class="label">
      <div class="label-title">查:</div>
      <button class="button" @click="indexOfHandle">
        indexOf>>是否存在，存在返回索引，不存在返回-1
      </button>
      <button class="button" @click="includesHandle">
        includes>>是否包含，返回Boolean
      </button>
      <button class="button" @click="findHandle">
        find>>是否包含，返回Boolean
      </button>
    </div>
    <div class="label">
      <div class="label-title">排序:</div>
      <button class="button" @click="sortHandle">sort方法>>id从大到小</button>
      <button class="button" @click="reverseHandle">reverse方法>>翻转</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const data = ref([
  {
    id: '1',
    color: 'red',
  },
  {
    id: '2',
    color: 'green',
  },
  {
    id: '3',
    color: 'pink',
  },
])
const list = ref([
  {
    id: '1',
    color: 'red',
  },
  {
    id: '2',
    color: 'green',
  },
  {
    id: '3',
    color: 'pink',
  },
])
const reset = () => {
  list.value = []
  data.value.forEach((item) => {
    list.value.push(item)
  })
}
// 数组，增
const psuhHandle = () => {
  list.value.push({
    id: '4',
    color: 'blue',
  })
}
const unshiftHandle = () => {
  list.value.unshift({
    id: '4',
    color: 'blue',
  })
}
const spliceHandle = () => {
  list.value.splice(2, 0, {
    id: '4',
    color: 'blue',
  })
}
const concatHandle = () => {
  const list1 = [
    {
      id: '4',
      color: 'yellow',
    },
    {
      id: '5',
      color: 'pink',
    },
  ]
  list.value = list.value.concat(list1)
}
// 数组，删
const popHandle = () => {
  list.value.pop()
}
const shiftHandle = () => {
  list.value.shift()
}
const spliceHandle1 = () => {
  list.value.splice(2, 1)
}
const sliceHandle = () => {
  const i = list.value.slice(0, 2)
  list.value = []
  i.forEach((item) => {
    list.value.push(item)
  })
}
// 数组，改
const spliceHandle2 = () => {
  const a = list.value.splice(1, 1, { id: '4', color: 'gray' })
  console.log(a)
}
// 数组，查
const indexOfHandle = () => {
  const result = list.value.indexOf({
    id: '2',
    color: 'green',
  })
  ElMessage.success(result.toString())
}
const includesHandle = () => {
  const result = list.value.includes({
    id: '2',
    color: 'green',
  })
  ElMessage.success(result.toString())
}
const findHandle = () => {
  const result = list.value.find((item) => item.id === '1') || ''
  if (result) {
    ElMessage.success(result.color)
  }
}
// 数组，排序
const sortHandle = () => {
  list.value.sort((a, b) => Number(b.id) - Number(a.id))
}
const reverseHandle = () => {
  list.value.reverse()
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: flex-start;
  .item {
    margin: 0 20px;
    height: 100px;
    width: 100px;
    text-align: center;
    line-height: 100px;
    font-size: 100px;
    font-weight: 900;
  }
  .text {
    margin-left: 20px;
  }
}
.btn {
  .title {
    font-size: 20px;
    margin: 10px 20px;
  }
  .label {
    display: flex;
    padding: 10px 20px;
    align-items: center;
  }
}
.button {
  margin: 0 0 0 20px;
  border: 1px solid;
  line-height: 30px;
}
.red {
  background-color: red;
}
</style>
