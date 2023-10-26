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
import Table from '@/components/table/Table.vue'

const show = (item: any) => {
  console.log(item)
}
const loading = ref(false)

interface Column {
  label: string
  prop: string
  slot?: boolean
  width?: number
  fixed?: string
}
const columns = reactive<Column[]>([
  {
    label: 'A',
    prop: 'a',
    fixed: 'left',
    width: 200,
    slot: true,
  },
  {
    label: 'B',
    width: 800,
    prop: 'b',
  },
  {
    label: 'C',
    width: 800,
    prop: 'c',
  },
  {
    label: 'D',
    prop: 'd',
  },
  {
    label: 'E',
    prop: 'e',
  },
  {
    label: 'F',
    prop: 'f',
  },
  {
    label: 'G',
    prop: 'g',
  },
])
const tableData = reactive([
  {
    a: 1,
    b: 2,
    c: 3,
    d: 3,
    e: 2,
    f: 4,
    g: 1,
  },
  {
    a: 4,
    b: 5,
  },
])
</script>

<style lang="scss" scoped></style>
