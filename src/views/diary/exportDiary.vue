<template>
  <div class="page">
    <div class="change-header">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane
          v-for="(item, index) in tabPanes"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
          {{ item.label }}
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
const activeName = ref('work')
interface tabPane {
  label: string
  name: string
}
const tabPanes = ref<tabPane[]>([
  {
    label: '搬砖',
    name: 'work',
  },
  {
    label: '学习',
    name: 'learn',
  },
  {
    label: '锻炼',
    name: 'exercise',
  },
  {
    label: '玩乐',
    name: 'paly',
  },
])
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  .change-header {
    padding: 10px 30px;
  }
}
</style>
