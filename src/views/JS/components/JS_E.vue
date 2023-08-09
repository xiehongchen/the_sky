<template>
  <input type="file" @change="handleFileChange" accept=".xls, .xlsx" multiple />
  <button @click="exportFile">前端导出</button>
  <button @click="exportJson">前端导出成JSON格式</button>
  <div class="label">
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column
        v-for="(item, index) in headers"
        :key="item"
        :prop="index.toString()"
        :label="item"
        width="180"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import * as XLSX from 'xlsx'
// 导入和导出
const dataLoaded: Ref<boolean> = ref(false)
const headers: Ref<string[]> = ref([])
const rows: Ref<string[][]> = ref([])
const tableData: Ref<string[][]> = ref([])
let jsonData: any[] = []
const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  console.log(file)
  if (file) {
    const fileReader = new FileReader()
    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer)
      console.log(data)
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      const jsonDataValue: string[][] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      })
      if (jsonDataValue.length > 0) {
        headers.value = jsonDataValue[0]
        rows.value = jsonDataValue.slice(1)
        tableData.value = [...rows.value, ...tableData.value]
        console.log(tableData.value)
        jsonData = jsonDataValue // 将数据存储在jsonData属性中
        dataLoaded.value = true
      }
    }
    fileReader.readAsArrayBuffer(file)
  }
}
const exportFile = () => {
  if (jsonData.length > 0) {
    // 将jsonData的值转换为非响应式的普通数组
    const dataToExport = jsonData
    console.log(dataToExport)
    exportExcel(dataToExport) // 调用导出函数并传递jsonData数据
  } else {
    // 提示用户先选择文件或加载数据
    alert('请先选择文件并加载数据！')
  }
}
const exportExcel = (jsonData: any) => {
  // const headerRow = [
  //   '1',
  //   '2',
  //   '3',
  //   '4',
  //   '5',
  //   '6',
  //   '7',
  //   '8',
  //   '9',
  //   '10',
  //   '11',
  //   '12',
  //   '13',
  // ]
  // jsonData.unshift(headerRow)
  const worksheet = XLSX.utils.aoa_to_sheet(jsonData as string[][])
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

  // Generate Excel file
  const excelBuffer = XLSX.write(workbook, { type: 'array' })

  // Convert buffer to Blob
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })

  // Create a temporary anchor element
  const anchor = document.createElement('a')
  anchor.href = URL.createObjectURL(blob)
  anchor.download = 'data.xlsx'

  // Trigger the download
  anchor.click()

  // Release the URL object
  URL.revokeObjectURL(anchor.href)
}
const exportJson = () => {
  if (jsonData.length > 0) {
    const dataToExport = jsonData.map((row) => {
      const dataObj: { [key: string]: any } = {} // 使用类型断言
      headers.value.forEach((header, headerIndex) => {
        dataObj[header] = row[headerIndex]
      })
      return dataObj
    })
    console.log('dataToExport', dataToExport)

    const jsonStr = JSON.stringify(dataToExport, null, 2)
    console.log('jsonStr', jsonStr)

    const blob = new Blob([jsonStr], { type: 'application/json' })

    const anchor = document.createElement('a')
    anchor.href = URL.createObjectURL(blob)
    anchor.download = 'data.json'

    anchor.click()

    URL.revokeObjectURL(anchor.href)
  } else {
    alert('请先选择文件并加载数据！')
  }
}
</script>

<style lang="scss" scoped>
.label {
  display: flex;
  align-items: center;
  margin: 10px 0;
  .text {
    height: 20px;
    width: 100%;
  }

  .input {
    width: 400px;
    margin: 0 20px;
  }
}
button {
  margin: 0 20px;
}
</style>
