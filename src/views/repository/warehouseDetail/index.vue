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
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
      <el-form-item label="文章url" style="margin-left: 10px">
        <el-input
          v-model="url"
          placeholder="请输入文章url"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onAdd">增加文章</el-button>
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in tabsList"
        :label="item.title"
        :name="item.title"
        :key="item.id"
      >
        <el-table :data="tableDataList" stripe border>
          <el-table-column prop="title" label="标题"></el-table-column>
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
          <el-table-column prop="website" label="源址">
            <template #default="scope">
              <el-link :href="scope.row.website" target="_blank">
                {{ scope.row.website }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column prop="introduction" label="简介" width="260">
            <template #default="scope">
              <el-input
                v-model="scope.row.introduction"
                v-if="isEdit"
              ></el-input>
              <span v-else>{{ scope.row.introduction }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="note" label="笔记">
            <template #default="scope">
              <el-input v-model="scope.row.note" v-if="isEdit"></el-input>
              <el-link :href="scope.row.note" target="_blank" v-else>
                {{ scope.row.note }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag class="ml-2" type="success" v-if="scope.row.status === 1">
                总结
              </el-tag>
              <el-tag
                class="ml-2"
                type="warning"
                v-if="scope.row.status === 0"
                @click="changeStatus(scope.row.status)"
              >
                保存
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <div class="operate">
              <span class="item" @click="editArticle">编辑</span>
              <span class="item" @click="complete" v-if="isEdit">完成</span>
              <span class="item">删除</span>
            </div>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-pagination
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 30, 50]"
        :small="false"
        :disabled="false"
        :background="true"
        layout="prev, pager, next, jumper,->, sizes, total"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="margin: 10px 0"
      />
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { tabsList, tableDataList } from './config.ts'
// import api from '@/api'

// onMounted(() => {
//   getData(searchParams.value)
// })

// 搜索
const searchForm = ref<any>({
  title: '',
})
const onSubmit = () => {
  console.log(searchForm.value)
}
// tabs
const activeName = ref<string>('JS')
const searchParams = ref<any>({
  tab: 'js',
  page: 1,
  size: 10,
})
const handleClick = (tab: any) => {
  console.log(tab)
  searchParams.value.tab = tabsList.find(
    (item) => item.title === tab.paneName,
  )?.value
  getData(searchParams.value)
}
// 表格
// const tableData = ref<any[]>([])

function getData(params: any) {
  console.log(params)
  // api.repository.getAllArticle(params)
}
const pagination = reactive({
  currentPage: 5,
  pageSize: 10,
  total: 10,
})
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
const url = ref('')
const onAdd = () => {
  console.log(url.value)
}
const isEdit = ref(false)
const introduction = ref('')
const editArticle = () => {
  isEdit.value = true
}
const complete = () => {
  console.log(introduction.value)
  isEdit.value = false
}
const changeStatus = (status: number) => {
  console.log(status)
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
  .operate {
    display: flex;
    flex-direction: row;
    .item {
      margin: 0 10px;
      font-size: 16px;
      color: #2dd6d7;
      cursor: pointer;
    }
  }
  .tags {
    font-size: 18px;
    margin-right: 5px;
  }
}
</style>
