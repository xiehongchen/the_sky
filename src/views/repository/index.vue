<template>
  <div class="collapse">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="常用" name="1">
        <ListTools :list="tools"></ListTools>
      </el-collapse-item>
      <el-collapse-item title="文档" name="2">
        <ListTools :list="document"></ListTools>
      </el-collapse-item>
      <el-collapse-item title="Efficiency" name="3">
        <ListTools :list="tools"></ListTools>
      </el-collapse-item>
      <el-collapse-item title="Controllability" name="4">
        <ListTools :list="tools"></ListTools>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { tools, document } from './config.ts'
import ListTools from './components/ListTools.vue'
const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
  console.log(val)
}
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
