<template>
  <el-upload
    :file-list="upload.fileList"
    class="upload-demo"
    action="#"
    :auto-upload="false"
    ref="upload"
    :on-change="uploadChange"
  >
    <el-button type="primary">选择文件</el-button>
  </el-upload>
  <div><el-button @click="submitFile">上传</el-button></div>
</template>

<script setup lang="ts">
import request from '@/utils/request'
interface UploadType {
  fileList: Array<string>
  currentFile: {
    raw?: File
    name: string
  }
  name: string
  fileArr: Array<{
    chunk: Blob
    hash: string
  }>
  total: number
}

const upload = reactive<UploadType>({
  fileList: [],
  currentFile: {
    name: '',
  },
  name: '',
  fileArr: [],
  total: 0,
})
const uploadChange = (file: any, files: any) => {
  //防止change事件多次触发
  if (file.status !== 'ready') return
  console.log('file', file)
  console.log('files', files)
  upload.fileList = files
  upload.currentFile = file
  upload.name = file.name
}
const createFileChunk = (file: File, size = 1024 * 20) => {
  //定义一个数组用来存储每一份切片
  const fileChunkList = []
  //存储索引，以cur和cur+size作为开始和结束位置利用slice方法进行切片
  let cur = 0
  while (cur < file.size) {
    fileChunkList.push({ file: file.slice(cur, cur + size) })
    cur += size
  }
  upload.total = fileChunkList.length
  return fileChunkList
}

const submitFile = async () => {
  console.log('upload', upload)
  //文件为空时进行逻辑处理
  if (!upload.fileList.length || !upload.currentFile.raw) return
  const fileChunkList = createFileChunk(upload.currentFile.raw)
  // console.log(fileChunkList)
  // // 对每一份切片进行一个标识，用于后续传输判断是否全部传输完成
  upload.fileArr = fileChunkList.map(({ file }, index) => ({
    chunk: file,
    hash: upload.name + '-' + index, // 文件名  数组下标
  }))
  console.log('文件重新命名', upload.fileArr)
  await uploadChunks()
}
// 上传切片
const uploadChunks = async () => {
  //设置请求头和监听上传的进度
  let configs = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    //设置超时时间
    timeout: 600000,
    //上传进度展示
    onUploadProgress(e: any) {
      //lengthComputable表示该资源是否具有可以计算的长度
      if (e.lengthComputable) {
        //如果有业务需求需要做到进度条的可视化可以依据这个函数里面来操作
        console.log('内置监听上传进度', e.loaded / e.total)
      }
    },
  }
  const requestList = upload.fileArr
    .map(({ chunk, hash }) => {
      const formData = new FormData()
      formData.append('file', chunk)
      formData.append('hash', hash)
      formData.append('filename', upload.currentFile.name)
      formData.append('total', upload.total.toString())
      return { formData }
    })
    .map(({ formData }) => {
      const res = request
        .post('http://localhost:3000/uploads/merge', formData, configs)
        .then(
          (res) => {
            console.log('res', res)
          },
          (err) => {
            console.log('err', err)
          },
        )
      return res
    })
  console.log('requestList', requestList)
}
</script>

<style lang="scss" scoped></style>
