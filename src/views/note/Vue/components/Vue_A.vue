<template>
  <div class="page">
    <div>
      <div>子组件</div>
      <children some-prop="defineProps: 父组件的信息" @some-event="someEvent" />
    </div>
    <div>
      <div>父组件</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import children from './children.vue'

function someEvent(value: any) {
  ElMessage.success(value)
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
