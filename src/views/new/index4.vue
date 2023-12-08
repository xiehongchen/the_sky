<template>
  <div>
    <Table
      :loading="loading"
      :tableData="tableData"
      :columns="columns"
      :stripe="stripe"
      :border="border"
      :selection="selection"
      @handleSelectionChange="handleSelectionChange"
      @filterChange="filterChange"
      @sortChange="sortChange"
    >
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
const stripe = ref(true)
const border = ref(true)
const selection = ref(true)

const handleSelectionChange = (value: any[]) => {
  console.log('value', value)
}
const filterChange = (value: any[]) => {
  console.log('value', value)
}
const sortChange = (obj: any) => {
  console.log('obj', obj)
}
interface Column {
  label: string
  prop: string
  slot?: boolean
  width?: number
  fixed?: string
  sortable?: boolean | string
  filterKey?: string
  filters?: filterType[]
}
interface filterType {
  text: string
  value: string
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
    sortable: true,
    filterKey: 'bFilter',
    filters: [{ text: 'dd', value: '12' }],
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
    id: 1,
    a: 1,
    b: 2,
    c: 3,
    d: 3,
    e: 2,
    f: 4,
    g: 1,
  },
  {
    id: 2,
    a: 4,
    b: 5,
  },
  {
    id: 3,
    a: 'adas',
    b: 200,
  },
])
</script>

<style lang="scss" scoped></style>
