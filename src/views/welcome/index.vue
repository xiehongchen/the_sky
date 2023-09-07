<template>
  <div>欢迎</div>
  <button v-click-request="'/api/users'">点击发起请求</button>
  <el-button @click="click">点击</el-button>
  <div style="margin-top: 20px"></div>
  {{ editableTabsValue }}
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    class="demo-tabs"
    :closable="false"
    @tab-click="clickTab"
  >
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
      <template #label>
        <span>{{ item.title }}</span>
        <el-icon style="font-size: 16px; margin-left: 15px">
          <Refresh />
        </el-icon>
        <el-icon
          style="font-size: 16px; margin-left: 5px"
          @click.stop="removeTab(item.name)"
        >
          <Close />
        </el-icon>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ElNotification } from 'element-plus'
import api from '@/api'

const editableTabsValue = ref('1')
const editableTabs = ref([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content',
  },
])
const removeTab = (targetName: string) => {
  editableTabsValue.value = '1'
  console.log('editableTabsValue.value', editableTabsValue.value)
  console.log('targetName', targetName)
}

const clickTab = () => {
  console.log('12')
}

const click = () => {
  api.task.getAllTask({ status: 1 }).then((res) => {
    console.log(res.data)
  })
}
onMounted(() => {
  const hours = new Date().getHours()
  let title = ''
  if (hours > 0 && hours < 8) {
    title = '凌晨'
  } else if (hours < 11) {
    title = '早上'
  } else if (hours < 15) {
    title = '中午'
  } else if (hours < 19) {
    title = '下午'
  } else {
    title = '晚上'
  }
  ElNotification({
    title: '欢迎👏🏻',
    message: `${title}好，今天也要努力呀！`,
    type: 'success',
    offset: 80,
  })
  console.log(hours)
})
</script>

<style scoped lang="scss"></style>
