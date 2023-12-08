<template>
  <div class="center">
    <div>{{ someProp }}</div>
    <div @click="onClick">defineEmits：子组件的信息</div>
  </div>
</template>

<script setup lang="ts">
// defineProps
defineProps({
  someProp: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['someEvent'])
function onClick() {
  emit('someEvent', '子组件的信息')
}
</script>

<style lang="scss" scoped>
.center {
  display: flex;
  flex-direction: column;
}
</style>
