<template>
  <div id="test">
    <div class="label">
      <span>防抖函数：</span>
      <input type="text" @input="handleInput1" class="input" />
      <p>Input Value: {{ inputValue1 }}</p>
    </div>
    <div class="label">
      <span>节流函数：</span>
      <input type="text" @input="handleInput2" class="input" />
      <p>Input Value: {{ inputValue2 }}</p>
    </div>
    <div class="label" id="canvas">
      <span style="font-size: 20px; margin-right: 20px">canvas:</span>
      <canvas ref="canvasRef" width="400" height="200"></canvas>
      <button @click="convertToImage">转成img</button>
      <button @click="cropImage1">切割图片成canvas</button>
      <button @click="cropImage2">切割canvas成图片</button>
    </div>
    <div class="label">
      <button @click="handleRequests">promise控制并发请求</button>
      <button @click="promiseAll">promise.all</button>
      <button @click="promiseReace">promise.race</button>
      <div class="text" ref="text">111</div>
    </div>
    <input
      type="file"
      @change="handleFileChange"
      accept=".xls, .xlsx"
      multiple
    />
    <button @click="exportFile">前端导出</button>
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
  </div>
</template>

<script setup lang="ts">
import { debounce, throttle } from '@/utils/useUtils'
import { ref, onMounted } from 'vue'
import {
  drawRectangle,
  drawCircle,
  drawText,
  canvasToImage,
  cropImageToCanvas,
  cropCanvasToImage,
} from '@/utils/useCanvas'
import * as XLSX from 'xlsx'

// 模拟异步请求，这里用 setTimeout 来模拟实际请求的延迟
function simulateAsyncRequest(id: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`请求 ${id} 完成`)
      if (id === 12) {
        reject(`请求 ${id} 失败`)
      } else {
        resolve(`请求 ${id} 结果`)
      }
    }, Math.random() * 1000) // 假设每个请求耗时在 0 到 1000 毫秒之间
  })
}
const text = ref<HTMLElement>()
console.log(text)
async function handleRequests() {
  const numberOfRequests = 100
  const concurrentLimit = 10 // 控制并发数量为 10

  const results = [] // 存储所有请求的结果

  for (let i = 0; i < numberOfRequests; i++) {
    const requestPromise = simulateAsyncRequest(i).catch((err: Error) => err)

    // 在请求达到并发限制后，使用 Promise.all 等待这批请求完成
    if (i !== 0 && i % concurrentLimit === 0) {
      const batchRequests = results.slice(i - concurrentLimit, i)
      console.log(batchRequests)
      if (text.value) {
        text.value.innerText += batchRequests
      }
      await Promise.all(batchRequests)
    }

    const response = await requestPromise
    results.push(response)
  }

  // 处理剩余的请求
  const remainingRequests = results.slice(
    numberOfRequests - (numberOfRequests % concurrentLimit),
  )
  await Promise.all(remainingRequests)

  console.log('所有请求处理完成')
  console.log(results)
}

const promise1 = Promise.resolve(1)
const promise2 = new Promise((resolve) => setTimeout(resolve, 200, 2))
const promise3 = Promise.reject('Error occurred')
const promiseAll = () => {
  const allPromises = [promise1, promise2, promise3]

  Promise.all(allPromises)
    .then((results) => {
      console.log('Promise.all - All promises resolved:', results)
    })
    .catch((error) => {
      console.error('Promise.all - One or more promises rejected:', error)
    })
}
const promiseReace = () => {
  const racePromises = [promise1, promise2, promise3]

  Promise.race(racePromises)
    .then((result) => {
      console.log('Promise.race - One promise resolved:', result)
    })
    .catch((error) => {
      console.error('Promise.race - All promises rejected:', error)
    })
}

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

// canvas
const canvasRef = ref<HTMLCanvasElement | null>(null)
onMounted(() => {
  const canvas = canvasRef.value
  if (canvas) {
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = 'yellow'
      ctx.fillRect(0, 0, 400, 200)
      drawRectangle(ctx, 50, 50, 100, 50, 'blue')
      drawCircle(ctx, 300, 100, 50, 'red')
      drawText(ctx, 'Hello, Canvas!', 50, 150, 'black', '20px Arial')
    }
  }
})

const convertToImage = () => {
  const canvas = canvasRef.value
  if (canvas) {
    const img = canvasToImage(canvas as HTMLCanvasElement)
    // console.log(img)
    document.getElementById('canvas')?.appendChild(img)
  }
}

const cropImage1 = async () => {
  const canvas = canvasRef.value
  if (canvas) {
    const img = canvasToImage(canvas as HTMLCanvasElement)
    try {
      const croppedCanvas = await cropImageToCanvas(img, 50, 50, 100, 50)
      console.log(croppedCanvas)
      document.getElementById('canvas')?.appendChild(croppedCanvas)
    } catch (error) {
      console.log(error)
    }
  }
}
const cropImage2 = () => {
  const canvas = canvasRef.value
  if (canvas) {
    const croppedCanvas = cropCanvasToImage(
      canvas as HTMLCanvasElement,
      250,
      50,
      100,
      100,
    )
    document.getElementById('canvas')?.appendChild(croppedCanvas)
  }
}
// 防抖
const inputValue1 = ref('')
const handleInput1 = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  inputValue1.value = value

  // 调用防抖函数，延迟 500 毫秒执行回调
  debounce(() => {
    console.log('Input value:', value)
  }, 500)
}

// 节流
const inputValue2 = ref('')
const handleInput2 = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  inputValue2.value = value

  // 调用节流函数，每隔 500 毫秒执行回调
  throttle(() => {
    console.log('Input value:', value)
  }, 500)
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
