<template>
  <children some-prop="defineProps: 父组件的信息" @some-event="someEvent" />
</template>

<script setup lang="ts">
import children from './children.vue'

function someEvent(value: any) {
  console.log(value)
}
</script>

<style lang="scss" scoped></style>
