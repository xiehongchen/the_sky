<template>
  <div class="page">
    <div class="title">我的日记</div>
    <div class="box">
      <div class="date-box">
        <div class="month-box">
          <el-button type="primary" class="button" round @click="backToday">
            返回今日
          </el-button>
          <el-icon @click="perMonth"><ArrowLeftBold /></el-icon>
          <el-button type="primary" class="button" round @click="perMonth">
            上个月
          </el-button>
          <div class="years">
            <span>{{ getCurrentDate.year }}年{{ getCurrentDate.month }}月</span>
          </div>
          <el-button type="primary" class="button" round @click="nextMonth">
            下个月
          </el-button>
          <el-icon @click="nextMonth"><ArrowRightBold /></el-icon>
          <el-button
            type="primary"
            class="button"
            round
            @click="router.push('/diary/export')"
          >
            导出日记
          </el-button>
          <el-button
            type="primary"
            class="button"
            round
            @click="router.push('/diary/task')"
          >
            待办事件
          </el-button>
        </div>
        <div class="week-box">
          <span class="week" v-for="item in 7" :key="item">
            {{ weeks[item - 1] }}
          </span>
        </div>
        <div class="day-box">
          <div
            class="day"
            v-for="(item, index) in visitDate"
            :key="index"
            :class="{
              notInMonth: item.notInMonth,
              inMonth: !item.notInMonth,
              isToday: item.isToday,
            }"
            @click="showDialog(index)"
          >
            <div class="one-day">{{ item.day }}</div>
            <div class="title-box">
              <div class="status-box">
                <el-tooltip
                  content="工作"
                  placement="top"
                  v-if="item.isWork === 1"
                >
                  <el-icon><OfficeBuilding /></el-icon>
                </el-tooltip>
                <el-tooltip
                  content="锻炼"
                  placement="top"
                  v-if="item.isExercise === 1"
                >
                  <el-icon><Bicycle /></el-icon>
                </el-tooltip>
                <el-tooltip
                  content="学习"
                  placement="top"
                  v-if="item.isLearn === 1"
                >
                  <el-icon><Notebook /></el-icon>
                </el-tooltip>
                <el-tooltip
                  content="玩乐"
                  placement="top"
                  v-if="item.isPlay === 1"
                >
                  <el-icon><Monitor /></el-icon>
                </el-tooltip>
              </div>
              <el-tooltip content="能量" placement="top" v-if="item.energy">
                <el-progress
                  type="circle"
                  :width="50"
                  :percentage="item.energy"
                />
              </el-tooltip>
              <el-tooltip content="心情" placement="top" v-if="item.mood">
                <el-progress
                  type="circle"
                  :width="50"
                  color="red"
                  :percentage="item.mood"
                  style="margin-left: 5px"
                />
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="isShowDialog"
      title="~今日橘势~"
      width="600px"
      align-center
    >
      <el-form
        label-position="right"
        label-width="100px"
        :model="formDate"
        :inline="true"
      >
        <el-form-item label="上班">
          <el-switch
            v-model="formDate.isWork"
            class="ml-2"
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
            :disabled="!isToday"
          />
        </el-form-item>
        <el-form-item label="锻炼">
          <el-switch
            v-model="formDate.isExercise"
            class="ml-2"
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
            :disabled="!isToday"
          />
        </el-form-item>
        <el-form-item label="学习">
          <el-switch
            v-model="formDate.isLearn"
            class="ml-2"
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
            :disabled="!isToday"
          />
        </el-form-item>
        <el-form-item label="玩乐">
          <el-switch
            v-model="formDate.isPlay"
            class="ml-2"
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
            :disabled="!isToday"
          />
        </el-form-item>
        <el-form-item label="能量">
          <el-slider
            v-model="formDate.energy"
            style="width: 400px; margin-left: 10px"
            :disabled="!isToday"
          />
        </el-form-item>
        <el-form-item label="心情">
          <el-slider
            v-model="formDate.mood"
            style="width: 400px; margin-left: 10px"
            :disabled="!isToday"
          />
        </el-form-item>
        <el-form-item label="总结">
          <el-input
            v-model="formDate.summarize"
            :rows="5"
            style="width: 410px"
            autosize
            type="textarea"
            placeholder="写一下你今天做了什么吧~"
            :disabled="!isToday"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="btn cancle" @click="isShowDialog = false">取消</div>
        <div class="btn confirm" @click="confirm">确认</div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useDate from '@/utils/useDate'
import api from '@/api'
import { ElMessage } from 'element-plus'
const formDate = reactive({
  isWork: false,
  isExercise: false,
  isLearn: false,
  isPlay: false,
  energy: 0,
  mood: 0,
  summarize: '',
})
const date = useDate().date
const formatDate = useDate().formatDate
let getCurrentDate = computed(() => formatDate(date.value))
const perMonth = () => {
  date.value = new Date(date.value.setMonth(date.value.getMonth() - 1))
}
const nextMonth = () => {
  date.value = new Date(date.value.setMonth(date.value.getMonth() + 1))
}
const backToday = () => {
  const today = new Date()
  date.value = new Date(date.value.setFullYear(today.getFullYear()))
  date.value = new Date(date.value.setMonth(today.getMonth()))
  date.value = new Date(date.value.setDate(today.getDate()))
}
const router = useRouter()
const weeks = [
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
]
// 获取当前月份42个
const getVisitDate = computed(() => {
  const arr: Date[] = []
  // 获取当前月份第一天
  const year = date.value.getFullYear()
  const month = date.value.getMonth()
  const firstDay = new Date(year, month, 1)
  // console.log('firstDay', firstDay)
  const firstDayWeek = firstDay.getDay()
  const arrFirstDay = new Date(
    firstDay.getTime() - firstDayWeek * 24 * 60 * 60 * 1000,
  )
  for (let i = 0; i < 42; i++) {
    let day = new Date(arrFirstDay.getTime() + i * 24 * 60 * 60 * 1000)
    arr.push(day)
  }
  return arr
})
// console.log('getVisitDate', getVisitDate)
// 获取当前月份的日期
const data = ref([])
const visitDate = computed(() => {
  let arr = []
  for (let i = 0; i < getVisitDate.value.length; i++) {
    const year = getVisitDate.value[i].getFullYear()
    const month = getVisitDate.value[i].getMonth()
    const day = getVisitDate.value[i].getDate()
    arr.push({
      isWork: 0,
      isLearn: 0,
      isExercise: 0,
      isPlay: 0,
      summarize: '',
      energy: 0,
      mood: 0,
      year,
      month,
      day,
      notInMonth: month === date.value.getMonth() ? false : true,
      isToday:
        day === date.value.getDate() && month === date.value.getMonth()
          ? true
          : false,
    })
  }
  arr = mergeArraysByTime(arr, data.value)
  return arr
})
console.log(visitDate.value)
onMounted(() => {
  getDiary()
})
const getDiary = async () => {
  try {
    await api.diary
      .getAllDiary({
        startTime: '2023-08-01',
        endTime: '2023-09-29',
      })
      .then((res) => {
        data.value = res.data.data
      })
  } catch (error) {
    console.log(error)
  }
}
function mergeArraysByTime(arrayA: any, arrayB: any) {
  const mergedArray = arrayA.map((aItem: any) => {
    const matchingBItem = arrayB.find(
      (bItem: any) =>
        parseInt(bItem.time.split('-')[0]) === aItem.year &&
        convertToInteger(bItem.time.split('-')[1]) === aItem.month + 1 &&
        convertToInteger(bItem.time.split('-')[2].split('T')[0]) + 1 ===
          aItem.day,
    )

    if (matchingBItem) {
      return { ...aItem, ...matchingBItem }
    }

    return aItem
  })

  return mergedArray
}

function convertToInteger(inputStr: any) {
  if (inputStr.startsWith('0')) {
    return parseInt(inputStr[1])
  } else {
    return parseInt(inputStr)
  }
}

const isShowDialog = ref(false)
const isToday = ref(false)
const showDialog = (index: number) => {
  let day = getVisitDate.value[index]
  const form = visitDate.value[index]
  date.value = new Date(date.value.setFullYear(day.getFullYear()))
  date.value = new Date(date.value.setMonth(day.getMonth()))
  date.value = new Date(date.value.setDate(day.getDate()))
  const today = new Date()
  if (
    today.getFullYear() === date.value.getFullYear() &&
    today.getMonth() === date.value.getMonth() &&
    today.getDate() === date.value.getDate()
  ) {
    isToday.value = true
  } else {
    isToday.value = false
  }
  formDate.isWork = form.isWork === 1
  formDate.isExercise = form.isExercise === 1
  formDate.isLearn = form.isLearn === 1
  formDate.isPlay = form.isPlay === 1
  formDate.energy = form.energy
  formDate.mood = form.mood
  formDate.summarize = form.summarize
  if (!form.notInMonth) {
    isShowDialog.value = true
  }
}
const confirm = async () => {
  console.log(formDate)
  try {
    await api.diary.addDiary({ ...formDate }).then((res) => {
      console.log(res)
      ElMessage.success(res.data.message)
      isShowDialog.value = false
      getDiary()
    })
  } catch (err) {
    isShowDialog.value = false
    console.log(err)
  }
}
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;
  .title {
    font-size: 20px;
    text-align: center;
  }
  .box {
    padding: 10px 20px;
    height: 100%;
    .date-box {
      padding: 10px;
      height: 100%;
      width: 100%;
      border-radius: 20px;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
      .month-box {
        display: flex;
        height: 50px;
        width: 100%;
        justify-content: center;
        align-items: center;
        font-size: 28px;
        :deep(.el-icon) {
          cursor: pointer;
        }
        .button {
          margin: 0 20px;
        }
        .years {
          width: 200px;
          height: 40px;
          background-color: var(--el-color-primary);
          border-radius: 20px;
          text-align: center;
          line-height: 40px;
          margin: 0 40px;
        }
      }
      .week-box {
        height: 40px;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        .week {
          text-align: center;
          line-height: 40px;
          // border: 1px solid;
        }
      }
      .day-box {
        height: calc(100% - 90px);
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(6, 1fr);
        .day {
          display: flex;
          align-items: center;
          padding: 5px 10px;
          font-size: 26px;
          // border: 1px solid #000;
          cursor: pointer;
          .one-day {
            width: 30px;
          }
          .title-box {
            margin-left: 10px;
            width: 100%;
            height: 100%;
            .status-box {
              display: flex;
              margin-bottom: 10px;
              .status {
                font-size: 10px;
                width: 30px;
                margin: 0 2px;
                color: blue;
              }
            }
          }
        }
        .notInMonth {
          color: #e0e0e0;
        }
        .inMonth {
          color: #000;
        }
        .isToday {
          background-color: var(--el-color-primary);
        }
      }
    }
  }
  :deep(.el-dialog__header) {
    text-align: center;
  }
  :deep(.el-dialog__footer) {
    padding: 0;
    height: 50px;
    display: flex;
    .btn {
      flex: 1;
      text-align: center;
      line-height: 50px;
      cursor: pointer;
    }
    .cancle {
      background-color: #ff4949;
    }
    .confirm {
      background-color: var(--el-color-primary);
    }
  }
}
</style>
