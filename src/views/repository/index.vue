<template>
  <div class="collapse">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="常用" name="1">
        <ListTools :list="use"></ListTools>
      </el-collapse-item>
      <el-collapse-item title="学习文档" name="2">
        <ListTools :list="document"></ListTools>
      </el-collapse-item>
      <el-collapse-item title="工具" name="3">
        <ListTools :list="tools"></ListTools>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { use, document, tools } from './config.ts'
import ListTools from './components/ListTools.vue'
const activeNames = ref(['1', '2', '3'])

import { getCurrentInstance } from 'vue'
const { proxy, appContext } = getCurrentInstance()!
console.log('当前组件实例', proxy)
const global = appContext.config.globalProperties
console.log('全局实例', global)
</script>
<style lang="scss" scoped>
.collapse {
  padding: 20px;
  :deep(.el-collapse) {
    .el-collapse-item__header {
      font-size: 20px;
    }
  }
}
</style>
