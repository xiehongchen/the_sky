<template>
  <el-dialog :model-value="props.dialogFormVisible" title="自定义增加文章">
    <el-form :model="form">
      <el-form-item
        label="标题"
        :label-width="formLabelWidth"
        :rules="{ required: true }"
      >
        <el-input v-model="form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="作者"
        :label-width="formLabelWidth"
        :rules="{ required: true }"
      >
        <el-input v-model="form.author" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="源址"
        :label-width="formLabelWidth"
        :rules="{ required: true }"
      >
        <el-input v-model="form.website" autocomplete="off" />
      </el-form-item>
      <el-form-item label="简介" :label-width="formLabelWidth">
        <el-input v-model="form.introduction" autocomplete="off" />
      </el-form-item>
      <el-form-item label="笔记" :label-width="formLabelWidth">
        <el-input v-model="form.note" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
const props = defineProps({
  dialogFormVisible: Boolean,
})
const emits = defineEmits(['close', 'confirm'])
const formLabelWidth = '140px'

const form = reactive({
  title: '',
  author: '',
  introduction: '',
  website: '',
  note: '',
})
const close = () => {
  emits('close')
}
const confirm = () => {
  if (!form.title || !form.author || !form.website) {
    ElMessage.warning('请填写')
    return
  }
  emits('confirm', form)
  form.author = ''
  form.introduction = ''
  form.note = ''
  form.title = ''
  form.website = ''
}
</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
