<template>
  <div class="repository-box">
    <el-form :model="searchForm" inline class="form-box">
      <el-form-item label="标题" style="margin-left: 10px">
        <el-input
          v-model="searchForm.title"
          placeholder="请输入标题/网址"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchTitle">搜索</el-button>
      </el-form-item>
      <el-form-item label="文章url" style="margin-left: 10px">
        <el-input
          v-model="url"
          placeholder="请输入文章url"
          style="width: 400px"
        />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="tab"
          class="m-2"
          placeholder="选择类型"
          size="large"
        >
          <el-option
            v-for="item in tabsList"
            :key="item.id"
            :label="item.title"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onAdd">增加文章</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="showAddArticleDialog">
          自定义增加文章
        </el-button>
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
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column
            prop="author"
            label="作者"
            width="120"
          ></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="160">
            <template #default="scope">
              {{ formTime(scope.row.createTime) }}
            </template>
          </el-table-column>
          <el-table-column prop="website" label="源址" width="320">
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
                v-if="scope.row.isEdit"
              ></el-input>
              <span v-else>{{ scope.row.introduction }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="note" label="笔记">
            <template #default="scope">
              <el-input
                v-model="scope.row.note"
                v-if="scope.row.isEdit"
              ></el-input>
              <el-link :href="scope.row.note" target="_blank" v-else>
                {{ scope.row.note }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="70">
            <template #default="scope">
              <el-tag class="ml-2" type="success" v-if="scope.row.status === 2">
                总结
              </el-tag>
              <el-tag class="ml-2" type="warning" v-if="scope.row.status === 1">
                保存
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <div class="operate">
                <span class="item" @click="editArticle(scope.row)">编辑</span>
                <span
                  class="item"
                  @click="complete(scope.row)"
                  v-if="scope.row.isEdit"
                >
                  完成
                </span>
                <span class="item" @click="deleteArticle(scope.row)">删除</span>
              </div>
            </template>
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
  <AddArticleDialog
    v-model="showDialog"
    @close="closeDialog"
    @confirm="confirmDialog"
  />
</template>

<script setup lang="ts">
import { tabsList } from './config.ts'
import api from '@/api'
import { formTime } from '@/utils/useUtils'
import { ElMessage } from 'element-plus'
import AddArticleDialog from './../components/AddArticleDialog.vue'

onMounted(() => {
  getData()
})

// 搜索
const searchForm = reactive<any>({
  title: '',
  page: 1,
  size: 10,
})
const searchTitle = async () => {
  searchForm.page = pagination.currentPage
  searchForm.size = pagination.pageSize
  await api.repository.selectTitleAticle({ ...searchForm }).then((res) => {
    tableData.value = res.data.data
    pagination.total = res.data.total
    tableData.value.forEach((item) => {
      item.isEdit = false
    })
  })
}
// tabs
const activeName = ref<string>('JS')
const searchParams = ref<any>({
  tab: 'js',
  page: 1,
  size: 10,
})
const handleClick = (tab: any) => {
  searchParams.value.tab = tabsList.find(
    (item) => item.title === tab.paneName,
  )?.value
  getData()
}
// 表格
interface Item {
  id: number
  title: string
  author: string
  createTime: Date
  introduction: string
  website: string
  status: number
  note: string
  isEdit: boolean
}
const tableData = ref<Item[]>([])

async function getData() {
  await api.repository.getAllArticle(searchParams.value).then((res) => {
    tableData.value = res.data.data
    pagination.total = res.data.total
    tableData.value.forEach((item) => {
      item.isEdit = false
    })
  })
}
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 10,
})
const handleSizeChange = () => {
  searchParams.value.size = pagination.pageSize
  getData()
}
const handleCurrentChange = () => {
  searchParams.value.page = pagination.currentPage
  // console.log(pagination)
  // console.log(searchParams)
  getData()
}
const url = ref('')
const tab = ref('')
const onAdd = async () => {
  if (!url.value || !tab.value) {
    ElMessage.error('请输入')
    return
  }
  await api.repository
    .addArticleByUrl({ website: url.value, tab: tab.value })
    .then((res) => {
      if (res.data.answer) {
        ElMessage.success('添加文章成功！')
        getData()
      } else {
        ElMessage.error(res.data.message)
        return
      }
      url.value = ''
      tab.value = ''
    })
}
const editArticle = (item: Item) => {
  item.isEdit = true
}
const complete = async (item: Item) => {
  item.isEdit = false
  const { website, introduction, note } = item
  await api.repository
    .editArticle({ website, introduction, note })
    .then((res) => {
      if (res.data.answer) {
        ElMessage.success('更新成功！')
        getData()
      } else {
        ElMessage.error('更新失败')
      }
    })
}
const deleteArticle = async (item: Item) => {
  const { website } = item
  await api.repository.deleteAticle({ website }).then((res) => {
    if (res.data.answer) {
      ElMessage.success('删除成功！')
      getData()
    } else {
      ElMessage.error('删除失败')
    }
  })
}
const confirmDialog = async (item: any) => {
  console.log(item)
  showDialog.value = false
  await api.repository.addArticle({ ...item }).then((res) => {
    if (res.data.answer) {
      ElMessage.success('增加成功！')
      getData()
    } else {
      ElMessage.error(res.data.message)
    }
  })
}
const closeDialog = () => {
  showDialog.value = false
  console.log('父组件关闭')
}
const showAddArticleDialog = () => {
  if (!showDialog.value) showDialog.value = true
  else showDialog.value = false
  console.log(showDialog.value)
}
const showDialog = ref(false)
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
