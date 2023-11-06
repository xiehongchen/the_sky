<template>
  <div class="page">
    <div class="form">
      <el-form :model="form" label-width="100">
        <el-form-item label="用户名" required>
          <el-input v-model="form.userName" />
        </el-form-item>
        <el-form-item label="仓库名" required>
          <el-input v-model="form.wareHouseName" />
        </el-form-item>
        <el-form-item label="token" required>
          <el-input v-model="form.token" />
        </el-form-item>
        <el-form-item label="分支" required>
          <el-input v-model="form.branchName" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveForm">保存</el-button>
          <el-button @click="cancelForm">清除</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWareHouseStore } from '@/store/uploadFile'
const useWareHouse = useWareHouseStore()
onMounted(() => {
  form = useWareHouse.wareHouse
  console.log('form', form)
  console.log('useWareHouse.wareHouse', useWareHouse.wareHouse)
})
let form = reactive({
  userName: '',
  wareHouseName: '',
  token: '',
  branchName: '',
})
const saveForm = () => {
  useWareHouse.saveWareHouse(form)
  console.log('useWareHouse.wareHouse', useWareHouse.wareHouse)
}
const cancelForm = () => {
  form.branchName = ''
  form.token = ''
  form.userName = ''
  form.wareHouseName = ''
}
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  .form {
    height: 100%;
    margin-top: 40px;
    display: flex;
    justify-content: center;
  }
}
</style>
