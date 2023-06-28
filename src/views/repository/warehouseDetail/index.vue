<template>
  <div class="detail-box">
    <div class="demo-progress">
      <el-progress type="dashboard" :percentage="percentage" :color="colors" />
      <el-progress type="dashboard" :percentage="percentage2" :color="colors" />
      <div>
        <el-button-group>
          <el-button :icon="Minus" @click="decrease" />
          <el-button :icon="Plus" @click="increase" />
        </el-button-group>
      </div>
    </div>
    <el-transfer v-model="value" :data="data" />
    <div class="slider-demo-block">
      <el-slider v-model="value0" range show-stops :max="10" />
    </div>
    <el-timeline>
      <el-timeline-item timestamp="2018/4/12" placement="top">
        <el-card>
          <h4>Update Github template</h4>
          <p>Tom committed 2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/3" placement="top">
        <el-card>
          <h4>Update Github template</h4>
          <p>Tom committed 2018/4/3 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/2" placement="top">
        <el-card>
          <h4>Update Github template</h4>
          <p>Tom committed 2018/4/2 20:46</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-steps :active="1">
      <el-step title="Step 1" description="Some description" />
      <el-step title="Step 2" description="Some description" />
      <el-step title="Step 3" description="Some description" />
    </el-steps>
    <el-steps :space="200" :active="1" simple>
      <el-step title="Step 1" :icon="Edit" />
      <el-step title="Step 2" :icon="UploadFilled" />
      <el-step title="Step 3" :icon="Picture" />
    </el-steps>

    <el-steps
      :active="1"
      finish-status="success"
      simple
      style="margin-top: 20px"
    >
      <el-step title="Step 1" />
      <el-step title="Step 2" />
      <el-step title="Step 3" />
    </el-steps>
  </div>
  <main class="main">
    <div class="box">
      <el-input
        v-model="input"
        placeholder="请输入文字"
        @change="getUserInput"
      />
      <div>
        <span>语速选择</span>
        <el-slider
          v-model="value1"
          :min="0.1"
          :max="10"
          :step="0.1"
          show-stops
          @change="speakSpeedChoose"
        />
      </div>
      <div>
        <span>音量选择</span>
        <el-slider
          v-model="value2"
          :min="0"
          :max="1"
          :step="0.1"
          @change="voiceChoose"
        />
      </div>
      <div>
        <el-button type="success" round @click="playVoice">播放语音</el-button>
        <el-button type="success" round @click="stopVoice">暂停语音</el-button>
      </div>
    </div>
  </main>
  <div>
    <div
      class="drag-item"
      v-for="item in list"
      :key="item.id"
      :draggable="true"
      @dragstart="dragStart(item, $event)"
      @dragover="dragOver($event)"
      @drop="drop(item, $event)"
      @dragend="dragEnd(item)"
    >
      {{ item.name }}
    </div>
    <el-calendar>
      <template #date-cell="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }}
          {{ data.isSelected ? '✔️' : '' }}
        </p>
      </template>
    </el-calendar>
  </div>
</template>

<script lang="ts" setup>
import { Minus, Plus } from '@element-plus/icons-vue'
import { Edit, Picture, UploadFilled } from '@element-plus/icons-vue'
console.log(window.ActiveXObject)
const value0 = ref([4, 8])
interface Option {
  key: number
  label: string
  disabled: boolean
}
const generateData = () => {
  const data: Option[] = []
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `Option ${i}`,
      disabled: i % 4 === 0,
    })
  }
  return data
}

const data = ref<Option[]>(generateData())
const value = ref([])

const percentage = ref(10)
const percentage2 = ref(0)

const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
]

const increase = () => {
  percentage.value += 10
  if (percentage.value > 100) {
    percentage.value = 100
  }
}
const decrease = () => {
  percentage.value -= 10
  if (percentage.value < 0) {
    percentage.value = 0
  }
}
onMounted(() => {
  setInterval(() => {
    percentage2.value = (percentage2.value % 100) + 10
  }, 500)
})
// 输入框的值
const input = ref('')
// 语速选择 0.1-10
const value1 = ref(1)
// 音量选择 0-1
const value2 = ref(0.5)
// 声音的状态 true就是播放，false就是暂停
const voiedStatus = ref(false)

// 得到用户输入的值并赋值
const getUserInput = (val) => {
  input.value = val
}
// 语速选择
const speakSpeedChoose = (val) => {
  value1.value = val
}
// 音量选择
const voiceChoose = (val) => {
  value2.value = val
}
// 播放方法
const play = (status) => {
  // 判空
  if (!input.value) return
  // 创建实例，并传入输入的文字
  let readTxt = new SpeechSynthesisUtterance(input.value)
  readTxt.volume = value2.value // 音量
  readTxt.rate = value1.value // 语速
  speechSynthesis.speak(readTxt) // 调用说的方法
  if (status) {
    speechSynthesis.resume() // 恢复播放
  } else if (status === false) {
    speechSynthesis.pause() // 暂停播放
  }
  // 语言结束的回调
  readTxt.addEventListener('end', function () {
    window.speechSynthesis.cancel() // 删除队列中全部的语音
  })
}
// 点击播放
const playVoice = () => {
  voiedStatus.value = true
  play(true)
}
// 点击暂停
const stopVoice = () => {
  voiedStatus.value = false
  play(false)
}

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
function dragStart(item, event) {
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
function dragEnd(item) {
  dragItem.value = null
}
</script>
<style scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.demo-progress .el-progress--circle {
  margin-right: 15px;
}
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
* {
  padding: 0;
  margin: 0;
}

html,
body,
.mian {
  width: 100%;
  height: 100%;
}

.box {
  width: 600px;
  height: 160px;
  margin: 100px auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #a0cfff;
}
.drag-item {
  margin: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  cursor: move;
  color: red;
}
.is-selected {
  color: #1989fa;
}
</style>
