<template>
  <div class="date-page">
    <input
      v-model="selectedDate"
      type="text"
      id="datePicker"
      class="date-picker"
      readonly
      @click="openDatePicker"
    />
    <div
      v-if="showDatePicker"
      id="datePickerContainer"
      class="date-picker-container"
    >
      <select
        v-model="selectedYear"
        @change="updateCalendar"
        id="yearSelect"
        class="year-select"
      >
        <option v-for="year in years" :value="year" :key="year">
          {{ year }}
        </option>
      </select>
      <select
        v-model="selectedMonth"
        @change="updateCalendar"
        id="monthSelect"
        class="month-select"
      >
        <option v-for="(month, index) in months" :value="index" :key="index">
          {{ month }}
        </option>
      </select>
      <table id="calendar" class="table">
        <tr>
          <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
        </tr>
        <tr v-for="(week, index) in calendar" :key="index">
          <td
            v-for="(day, index) in week"
            @click="selectDate(day)"
            :key="index"
          >
            {{ day || '' }}
          </td>
        </tr>
      </table>
      <button class="button close" @click="closeDatePicker">关闭</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, computed } from 'vue'

const selectedDate = ref<string>(
  new Date().toLocaleDateString().replaceAll('/', '-'),
)
const emits = defineEmits(['getTime'])
const showDatePicker = ref<boolean>(false)
const selectedYear = ref<number>(new Date().getFullYear())
const selectedMonth = ref<number>(new Date().getMonth())
const daysOfWeek = ['日', '一', '二', '三', '四', '五', '六']
const months = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月',
]

// 计算年份选项
const years = computed(() => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    years.push(i)
  }
  return years
})

// 计算日历
const calendar = computed(() => {
  const firstDayOfMonth = new Date(selectedYear.value, selectedMonth.value, 1)
  const lastDayOfMonth = new Date(
    selectedYear.value,
    selectedMonth.value + 1,
    0,
  )
  const daysInMonth = lastDayOfMonth.getDate()
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const calendar = []

  let day = 1
  for (let i = 0; i < 6; i++) {
    const week = []
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayOfWeek) {
        week.push(null)
      } else if (day <= daysInMonth) {
        week.push(day++)
      } else {
        week.push(null)
      }
    }
    calendar.push(week)
  }

  return calendar
})

// 打开日期选择器
const openDatePicker = () => {
  showDatePicker.value = true
}

// 关闭日期选择器
const closeDatePicker = () => {
  showDatePicker.value = false
}

// 更新日历
const updateCalendar = () => {
  // 根据选择的年份和月份更新日历
}

// 选择日期
const selectDate: (day: number | null) => void = (day) => {
  // console.log('day', day)
  if (day !== null) {
    const newDate = new Date(selectedYear.value, selectedMonth.value, day)
    const today = new Date()
    // console.log('newDate', newDate)
    // console.log('today', new Date(today.setHours(0, 0, 0, 0)))
    if (newDate >= new Date(today.setHours(0, 0, 0, 0))) {
      selectedDate.value = newDate.toLocaleDateString().replaceAll('/', '-')
      showDatePicker.value = false
      emits('getTime', selectedDate.value)
    } else {
      ElMessage.error('请选择正确时间')
      showDatePicker.value = false
    }
  }
}
onMounted(() => {
  selectDate(new Date().getDate())
})
</script>

<style lang="scss" scoped>
.date-page {
  position: relative;
  height: 30px;
  .date-picker {
    height: 100%;
    text-align: center;
    color: var(--todo-add-word);
    border-radius: 15px;
    border: solid 2px var(--todo-add-border);
    background-color: var(--todo-add-bg);
  }
  .date-picker-container {
    width: 100%;
    border-radius: 20px;
    padding: 10px;
    background-color: var(--todo-add-border);
    position: absolute;
    text-align: center;
    z-index: 10;
    .year-select {
      background-color: var(--todo-add-border);
      width: 50%;
      text-align: center;
    }
    .month-select {
      background-color: var(--todo-add-border);
      width: 50%;
      text-align: center;
    }
    .table {
      margin: 10px 0;
      width: 100%;
      td {
        cursor: pointer;
      }
    }
    .close {
      border: solid 2px var(--todo-add-bg);
      background-color: var(--todo-add-border);
      color: #fff;
    }
  }
}
</style>
