<template>
  <div class="drag-item" v-for="item in list" :key="item.id" :draggable="true" @dragstart="dragStart(item, $event)"
    @dragover="dragOver($event)" @drop="drop(item, $event)" @dragend="dragEnd()">
    {{ item.name }}
  </div>
</template>

<script setup lang='ts'>
const list = ref([
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Orange' },
  { id: 4, name: 'Grape' },
  { id: 5, name: 'Mango' },
])
//创建dragItem变量，用于保存正在拖拽的元素
let dragItem = ref(null)

//在拖拽开始时，通过dragStart函数将当前拖拽的元素保存到dragItem变量中，
// 并将拖拽的数据以字符串形式存储在数据传输对象中。
function dragStart(item: any, event: any) {
  dragItem.value = item
  //设置拖拽操作的效果为移动,
  //这里也可以说一下拖拽的几个效果
  // 'none': 不允许拖拽操作。
  // 'copy': 拖拽操作会复制被拖拽的数据。
  // 'move': 拖拽操作会移动被拖拽的数据。
  // 'link': 拖拽操作会创建一个指向被拖拽数据的链接。
  // 在设置 effectAllowed 属性后，可以在 dragstart 和 dragover 事件中使用 dropEffect 属性来指定拖拽操作的效果。
  event.dataTransfer.effectAllowed = 'move'
  //并将拖拽的数据以字符串形式存储在数据传输对象中。
  // 其中，item是一个JavaScript对象，通过JSON.stringify()方法将其转换为字符串。
  event.dataTransfer.setData('text/plain', JSON.stringify(item))
}

//在拖拽过程中，使用dragOver函数监听dragover事件，
// 并调用event.preventDefault()方法，以允许元素被拖拽到新的位置。
function dragOver(event: any) {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
}

//在拖拽完成时，使用drop函数将拖拽的元素替换到目标位置，并更新list数组。
function drop(item: any, event: any) {
  event.preventDefault()
  /**
   * 从数据传输对象中获取之前通过 setData() 方法存储的数据，
   * 通过 JSON.parse() 方法将其转换为对象。
   * 用于获取在拖拽操作中传递的数据。
   */
  const data = JSON.parse(event.dataTransfer.getData('text/plain'))
  console.log('data', data)
  console.log('item', item)
  //通过 findIndex() 方法查找 list 数组中第一个满足条件的元素的索引，这里的条件是该元素的 id 属性等于 item 对象的 id 属性。
  //被替换的元素
  const index1 = list.value.findIndex((i) => i.id === item.id)
  //通过 findIndex() 方法查找 data 对象在 list 数组中的索引
  const index2 = list.value.findIndex((i) => i.id === data.id)
  list.value[index1] = data
  list.value[index2] = item
}
//在拖拽结束时，通过dragEnd函数将dragItem变量重置为null。
function dragEnd() {
  dragItem.value = null
}
</script>

<style scoped lang='scss'>
.drag-item {
  margin: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  cursor: move;
  color: red;
}
</style>