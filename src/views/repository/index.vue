<template>
  <div class="repository-box">
    <el-form :model="searchForm" inline class="form-box">
      <el-form-item label="标题" style="margin-left: 10px">
        <el-input
          v-model="searchForm.title"
          placeholder="请输入标题"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchForm.state" placeholder="请选择状态">
          <el-option label="成功" value="成功" />
          <el-option label="失败" value="失败" />
        </el-select>
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="searchForm.label" placeholder="请选择标签">
          <el-option label="成功" value="成功" />
          <el-option label="失败" value="失败" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in tabsList"
        :label="item.title"
        :name="item.title"
        :key="item.id"
      >
        <el-table :data="tableData" stripe border>
          <el-table-column
            prop="title"
            label="标题"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="author"
            label="作者"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="introduction"
            label="简介"
            width="180"
          ></el-table-column>
          <el-table-column prop="address" label="状态" width="180">
            <template #default="scope">
              <el-tag
                :type="scope.row.stateType === 'Home' ? '' : 'success'"
                disable-transitions
              >
                {{ scope.row.state }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="标签">
            <template #default="scope">
              <el-tag
                :type="scope.row.tagType === 'Home' ? '' : 'success'"
                disable-transitions
              >
                {{ scope.row.tag }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { tabsList, tableDataList } from './config/common.ts'

onMounted(() => {
  getData(searchParams.value)
})

// 搜索
const searchForm = ref<any>({
  title: '',
  state: '',
  label: '',
})
const onSubmit = () => {
  console.log(searchForm.value)
}
// tabs
const activeName = ref<string>('JS')
const searchParams = ref<any>({
  tab: 'JS',
  page: 1,
  size: 10,
})
const handleClick = (tab: any) => {
  console.log(tab.paneName)
  searchParams.value.tab = tab.paneName
  getData(searchParams.value)
}
// 表格
const tableData = ref<any[]>([])

function getData(params: any) {
  console.log(params)
  console.log(tableDataList)
  if (params.tab === 'JS') {
    tableData.value = tableDataList.slice(0, 1)
  } else if (params.tab === 'CSS') {
    tableData.value = tableDataList.slice(1, 2)
  } else if (params.tab === 'HTML') {
    tableData.value = tableDataList.slice(2, 5)
  } else if (params.tab === 'Vue') {
    tableData.value = tableDataList.slice(5, 7)
  } else if (params.tab === 'React') {
    tableData.value = tableDataList.slice(7, 8)
  } else if (params.tab === 'Nodejs') {
    tableData.value = tableDataList.slice(8, 10)
  }
  console.log(tableData.value)
}
</script>

<style scoped lang="scss">
.repository-box {
  height: 100%;
  width: 100%;
  border-top: 0;

  .form-box {
    margin-top: 10px;
    border-top: 0;
  }
}
</style>
