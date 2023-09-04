<template>
  <div>
    <el-upload
      v-model:file-list="fileList"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :auto-upload="false"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>
    <el-button @click="uploadFiles">上传</el-button>
    <el-button @click="getFiles">获取图片</el-button>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useWareHouseStore } from '@/store/uploadFile'
import type { UploadProps, UploadUserFile } from 'element-plus'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const useWareHouse = useWareHouseStore()
const wareHouse = useWareHouse.wareHouse

const fileList = ref<UploadUserFile[]>([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const accessToken = wareHouse.token
const username = wareHouse.userName
const repo = wareHouse.wareHouseName
const branch = wareHouse.branchName

// 不走代理
const axiosInstance = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 5000,
  headers: {
    Authorization: `token ${accessToken}`,
    'Content-Type': 'application/json',
  },
})
const sha = ref('')

const uploadFiles = async () => {
  if (fileList.value.length === 0) {
    ElMessage.error('请选择上传文件')
    return
  }
  const file = fileList.value[0]
  const fileReader = new FileReader()
  let content
  fileReader.onload = () => {
    content = fileReader.result?.toString().split(',')[1]
  }
  if (!file.raw) return
  fileReader.readAsDataURL(file.raw)
  await axiosInstance
    .get(`/repos/${username}/${repo}/contents/${file.name}`)
    .then((res) => {
      console.log(res)
      sha.value = res.data.sha
    })
    .catch(() => {
      sha.value = ''
    })
  const requestData = {
    message: 'Upload file',
    content: content,
    branch: branch,
    sha: sha.value,
  }
  if (sha.value) {
    ElMessage.error('已经上传，请不要重新上传')
    return
  } else {
    await axiosInstance
      .put(
        `/repos/${username}/${repo}/contents/${file.name}`,
        JSON.stringify(requestData),
      )
      .then((res) => {
        console.log(res)
      })
  }
}

const getFiles = () => {
  axiosInstance.get(`/repos/${username}/${repo}`).then((res) => {
    console.log(res)
  })
}
</script>
