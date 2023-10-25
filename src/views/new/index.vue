<template>
  <div>
    <Table :loading="loading" :tableData="tableData" :columns="columns">
      <template #a="scope">
        <span @click="show(scope.row)">
          {{ scope.row.a === 1 ? '看看' : 'dad' }}
        </span>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import Table from '@/components/table.vue'

const show = (item: any) => {
  console.log(item)
}
const loading = ref(false)
const tableData = reactive([
  {
    a: 1,
    b: 2,
  },
  {
    a: 4,
    b: 5,
  },
])
interface Column {
  label: string
  prop: string
  slot?: boolean
  width?: number
}
const columns = reactive<Column[]>([
  {
    label: 'A',
    prop: 'a',
    slot: true,
  },
  {
    label: 'B',
    prop: 'b',
  },
])
</script>

<style lang="scss" scoped></style>
