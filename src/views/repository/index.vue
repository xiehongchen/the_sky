<template>
  <div>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabsList" :label="item.name" :name="item.name" :key="item.id"></el-tab-pane>
    </el-tabs>
    <el-table :data="tableData" >
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { tabsList } from './config/common.ts'

onMounted(() => {
  getData(searchParams.value)
})
// tabs
const activeName = ref<string>('JS')
const searchParams = ref<any>({
  tab: 'JS',
  page: 1,
  size: 10
})
const handleClick = (tab: any) => {
  searchParams.value.tab = tab.name
  getData(searchParams.value)
}
// 表格
const tableData = ref<any[]>([])

function getData (params: any) {
  console.log(params)
  tableData.value = [
    {
      date: '2021-09-01',
      name: '张三',
      address: '上海市普陀区金沙江路 1518 弄'
    },
    {
      date: '2021-09-01',
      name: '张三',
      address: '上海市普陀区金沙江路 1518 弄'
    },
    {
      date: '2021-09-01',
      name: '张三',
      address: '上海市普陀区金沙江路 1518 弄'
    }
  ]
}
</script>

<style scoped lang="scss">

</style>
