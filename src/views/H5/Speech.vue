<template>
  <main>
    <div class="box">
      <el-input v-model="input" placeholder="请输入文字" @change="getUserInput" />
      <div class="lable">
        <span>语速选择</span>
        <el-slider v-model="value1" :min="0.1" :max="10" :step="0.1" show-stops @change="speakSpeedChoose" />
      </div>
      <div class="lable">
        <span>音量选择</span>
        <el-slider v-model="value2" :min="0" :max="1" :step="0.1" @change="voiceChoose" />
      </div>
      <div class="lable">
        <span>语调选择</span>
        <el-slider v-model="value3" :min="0" :max="2" :step="0.1" @change="intonationChoose" />
      </div>
      <div class="lable">
        <span>声音选择</span>
        <el-select v-model="value4" class="m-2" placeholder="声音选择" size="large">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="lable button">
        <el-button type="success" round @click="playVoice">播放语音</el-button>
        <el-button type="success" round @click="stopVoice">暂停语音</el-button>
      </div>
    </div>
  </main>
</template>

<script setup lang='ts'>
// 输入框的值
const input = ref('')
// 语速选择 0.1-10
const value1 = ref(1)
// 音量选择 0-1
const value2 = ref(0.5)
const value3 = ref(1)
const value4 = ref('')
// 声音的状态 true就是播放，false就是暂停
const voiedStatus = ref(false)

// 得到用户输入的值并赋值
const getUserInput = (val: any) => {
  input.value = val
}
// 语速选择
const speakSpeedChoose = (val: any) => {
  value1.value = val
}
// 音量选择
const voiceChoose = (val: any) => {
  value2.value = val
}
const intonationChoose = (val: any) => {
  value3.value = val
}
const synth = window.speechSynthesis;
console.log(synth)
// 获取语言列表
const voices = synth.getVoices();
console.log(voices)
const options = voices.map((voice: any) => ({
  label: `${voice.name} (${voice.lang})`,
  value: voice.name,
}))
console.log(options)
// 播放方法
const play = (status: any) => {
  // 判空
  if (!input.value) return
  // 创建实例，并传入输入的文字
  let readTxt = new SpeechSynthesisUtterance(input.value)
  readTxt.volume = value2.value // 音量
  readTxt.rate = value1.value // 语速
  readTxt.pitch = value3.value  // 语调
  readTxt.lang = 'zh-CN' // 语言
  readTxt.voice = voices.find((voice: any) => voice.name === value4.value) || null // 声音
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
</script>

<style scoped lang='scss'>
main {
  .box {
    width: 600px;
    margin: 100px auto;
    padding: 20px;
    border-radius: 10px;
    background-color: #a0cfff;
    .label {
      padding: 10px 0;
    }
    .button {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>