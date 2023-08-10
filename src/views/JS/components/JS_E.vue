<template>
  <input
    type="file"
    ref="fileInput"
    @change="handleFileChange"
    accept=".xls, .xlsx"
    multiple
  />
  <button @click="resetTable">清空</button>
  <button @click="exportFile">前端导出</button>
  <button @click="exportJson">前端导出成JSON格式</button>
  <div class="element-box">
    <el-transfer
      style="flex: 1"
      v-model="value"
      :data="optionLsit"
      :titles="['表头', '选择下载的表头']"
      @change="change"
    />
    <el-table :data="tableData2" style="flex: 1">
      <el-table-column label="原数组元素">
        <template #default="{ row }">{{ row.item }}</template>
      </el-table-column>
      <el-table-column label="输入框">
        <template #default="{ row }">
          <el-input v-model="row.value" />
        </template>
      </el-table-column>
    </el-table>
  </div>
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
import { ElMessage } from 'element-plus'
// 导入和导出
const headers: Ref<string[]> = ref([])
const headerRow: Ref<string[]> = ref([])
const tableData2: Ref<any[]> = ref([])
const rows: Ref<string[][]> = ref([])
const tableData: Ref<string[][]> = ref([])
let jsonData: any[] = []
const fileInput = ref<HTMLInputElement | null>(null)

interface Option {
  key: number
  label: string
}
const generateData = () => {
  const data: Option[] = []
  for (let i = 0; i < headers.value.length; i++) {
    data.push({
      key: i,
      label: headers.value[i],
    })
  }
  return data
}

const optionLsit = ref<Option[]>()
const value = ref([])

const change = (arr: Array<number>) => {
  headerRow.value = []
  for (let i = 0; i < arr.length; i++) {
    headerRow.value[i] = headers.value[arr[i]]
  }

  ;(tableData2.value = headerRow.value.map((item) => ({
    item,
    value: '',
  }))),
    console.log('headerRow.value', headerRow.value)
  console.log('tableData2.value', tableData2.value)
}

const resetTable = () => {
  tableData.value = []
  optionLsit.value = []
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  // console.log(file)
  if (file) {
    const fileReader = new FileReader()
    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer)
      // console.log(data)
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      const jsonDataValue: string[][] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      })
      if (jsonDataValue.length > 0) {
        headers.value = jsonDataValue[0]
        // console.log(headers.value)
        optionLsit.value = generateData()
        rows.value = jsonDataValue
          .slice(1)
          .filter((row) => row.some((cell) => !!cell))
        // 可以多次导入文件
        // tableData.value = [...rows.value, ...tableData.value]
        tableData.value = [...rows.value]
        // console.log(tableData.value)
        jsonData = jsonDataValue
          .slice(1)
          .filter((row) => row.some((cell) => !!cell)) // 将数据存储在jsonData属性中
        jsonData.shift()
      }
    }
    fileReader.readAsArrayBuffer(file)
  }
}
const exportFile = () => {
  if (jsonData.length > 0) {
    // 将jsonData的值转换为非响应式的普通数组
    const dataToExport = jsonData
    // console.log(dataToExport)
    exportExcel(dataToExport) // 调用导出函数并传递jsonData数据
  } else {
    // 提示用户先选择文件或加载数据
    alert('请先选择文件并加载数据！')
  }
}
const exportExcel = (jsonData: any) => {
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
    console.log('jsonData', jsonData)
    // 设置为键值对，数组对象
    const dataToExport = jsonData.map((row) => {
      const dataObj: { [key: string]: any } = {} // 使用类型断言
      headers.value.forEach((header, headerIndex) => {
        dataObj[header] = row[headerIndex]
      })
      for (const key in dataObj) {
        if (dataObj[key] === undefined) {
          dataObj[key] = ''
        }
      }
      return dataObj
    })
    console.log('dataToExport', dataToExport)
    // 只取已选择的数据
    if (headerRow.value.length === 0) {
      headerRow.value = headers.value
    }
    const tempData = dataToExport.map((row) => {
      const extractedObj: { [key: string]: any } = {}
      for (const property of headerRow.value) {
        extractedObj[property] = row[property]
      }
      return extractedObj
    })
    // 修改数据列名
    const list = tableData2.value.map((row: any) => row.value)
    console.log('list', list)
    for (let i = 0; i < list.length; i++) {
      if (list[i] === '') {
        ElMessage.error('请填写完整别名')
        return
      }
    }
    const data = tempData.map((obj) => {
      const newObj: Record<string, string> = {}
      Object.keys(obj).forEach((key, index) => {
        newObj[list[index]] = obj[key]
      })
      return newObj
    })
    console.log('data', data)
    const jsonStr = JSON.stringify(data, null, 2)
    // console.log('jsonStr', jsonStr)

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
.element-box {
  display: flex;
  justify-content: space-between;
}
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
