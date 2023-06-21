<template>
  <section class="time-box">
    <div class="date-box" :class="{ 'date-box-unfold': !fold }">
      <span class="year-month">
        <span
          class="iconfont icon-icon_arrow_left per-month"
          @click="perMonth"
        ></span>
        <span>{{ getCurrentDate.year }}年{{ getCurrentDate.month }}月</span>
        <span
          class="iconfont icon-jiantouyou1 next-month"
          @click="nextMonth"
        ></span>
      </span>
      <div class="date-time">
        <div class="date-select">
          <div class="week-box">
            <span
              v-for="(item, index) in foldVisitDate"
              :key="index"
              :class="{ 'current-week': item.select && fold }"
            >
              <span>{{ weeks[index] }}</span>
              <transition name="include-week-day">
                <span class="include-week-day" v-show="fold">
                  {{ item.day }}
                </span>
              </transition>
            </span>
          </div>
          <div class="month-everyday-box">
            <transition name="month-everyday">
              <div class="month-everyday" v-show="!fold">
                <span
                  v-for="(item, index) in visitDate"
                  :key="index"
                  @click="selectDate(index)"
                >
                  <span
                    class="day"
                    :class="{
                      select: item.select,
                      notInMonth: !item.notInMonth,
                    }"
                  >
                    {{ item.day }}
                  </span>
                </span>
              </div>
            </transition>
          </div>
        </div>
        <div class="time-select">
          <span class="time">
            {{ getCurrentDate.hours }}：{{ getCurrentDate.minutes }}：{{
              getCurrentDate.seconds
            }}
          </span>
          <span class="timezone">GTM+8:00</span>
          <div class="clock" v-show="!fold">
            <div class="part">
              <div class="center-point" ref="centerPoint"></div>
              <div
                class="hour-point"
                ref="hourPointer"
                :style="{ transform: `rotate(${hourPointerAngle}deg)` }"
              ></div>
              <div
                class="minute-point"
                ref="minutePointer"
                :style="{ transform: `rotate(${minutePointerAngle}deg)` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="toggle-btn" @click="foldorUnfold">
        <button></button>
        <Teleport to="body">
          <div class="shade" v-show="!fold" @click="fold = !fold"></div>
        </Teleport>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import throttle from 'lodash/throttle'
import getDate from '@/utils/getDate'
import { getAngle } from '@/utils/getAngle'
const weeks = [
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
]
const date = getDate().date
const formatDate = getDate().formatDate

const fold = ref<boolean>(true)
const getCurrentDate = computed(() => formatDate(date.value))
const perMonth = () => {
  date.value = new Date(date.value.setMonth(date.value.getMonth() - 1))
}
const nextMonth = () => {
  date.value = new Date(date.value.setMonth(date.value.getMonth() + 1))
}
const getVisitDate = computed(() => {
  let arr: Date[] = []
  const { year, month } = formatDate(date.value)
  let firstDay = new Date(year, month - 1, 1)
  let firstWeek = firstDay.getDay()
  const firstVisitDay = new Date(
    firstDay.getTime() - firstWeek * 24 * 60 * 60 * 1000,
  )
  for (let i = 0; i < 42; i++) {
    let day = new Date(firstVisitDay.getTime() + i * 24 * 60 * 60 * 1000)
    arr.push(day)
  }
  return arr
})
const visitDate = computed(() => {
  let arr = []
  for (let i = 0; i < getVisitDate.value.length; i++) {
    const year = getVisitDate.value[i].getFullYear()
    const month = getVisitDate.value[i].getMonth()
    const day = getVisitDate.value[i].getDate()
    arr.push({
      year,
      month,
      day,
      select:
        day === date.value.getDate() && month === date.value.getMonth()
          ? true
          : false,
      notInMonth: month === date.value.getMonth() ? true : false,
    })
  }
  return arr
})
const foldVisitDate = computed(() => {
  for (let i = 0; i < 6; i++) {
    let arr = visitDate.value.slice(i * 7, i * 7 + 7)
    for (let j = 0; j < arr.length; j++) {
      if (arr[j].select) {
        return arr
      }
    }
  }
})
const selectDate = (index: number) => {
  let day = getVisitDate.value[index]
  date.value = new Date(date.value.setFullYear(day.getFullYear()))
  date.value = new Date(date.value.setMonth(day.getMonth()))
  date.value = new Date(date.value.setDate(day.getDate()))
}
const centerPoint = ref()
const hourPointer = ref()
const minutePointer = ref()
const hourPointerAngle = ref(0)
const minutePointerAngle = ref(0)
let flag = 0

onMounted(() => {
  hourPointerAngle.value = (date.value.getHours() * 360) / 12
  minutePointerAngle.value = (date.value.getMinutes() * 360) / 60
  flag = date.value.getHours() > 11 && date.value.getHours() < 24 ? 1 : 0
  hourPointer.value.addEventListener('mousedown', () => {
    const { x, y } = centerPoint.value.getBoundingClientRect()
    document.onselectstart = () => false
    document.onmousemove = throttle((event: MouseEvent) => {
      const { clientX, clientY } = event
      let angle = getAngle(x, y, clientX, clientY)
      if (
        hourPointerAngle.value > 270 &&
        hourPointerAngle.value < 360 &&
        angle >= 0 &&
        angle < 90
      ) {
        flag == 0 ? (flag = 1) : (flag = 0)
      }
      if (
        hourPointerAngle.value >= 0 &&
        hourPointerAngle.value < 90 &&
        angle > 270 &&
        angle < 360
      ) {
        flag == 0 ? (flag = 1) : (flag = 0)
      }
      hourPointerAngle.value = angle

      date.value = new Date(
        date.value.setHours((12 / 360) * (angle + flag * 360)),
      )
      document.onmouseup = () => {
        document.onmousemove = null
        document.onselectstart = null
        document.onmouseup = null
      }
    }, 40)
    document.onmouseup = () => {
      document.onmousemove = null
      document.onselectstart = null
      document.onmouseup = null
    }
  })
  // 分针拖动事件
  minutePointer.value.addEventListener('mousedown', () => {
    const { x, y } = centerPoint.value.getBoundingClientRect()
    document.onselectstart = () => false
    document.onmousemove = throttle((event: MouseEvent) => {
      const { clientX, clientY } = event
      const angle = getAngle(x, y, clientX, clientY)
      minutePointerAngle.value = angle
      date.value = new Date(date.value.setMinutes((60 / 360) * angle))
      document.onmouseup = () => {
        document.onmousemove = null
        document.onselectstart = null
        document.onmouseup = null
      }
    }, 30)
    document.onmouseup = () => {
      document.onmousemove = null
      document.onselectstart = null
      document.onmouseup = null
    }
  })
})
const foldorUnfold = () => {
  fold.value = !fold.value
}
</script>

<style lang="scss" scoped>
section {
  position: relative;
  min-width: 780px;
  color: var(--date-word);
  font-weight: bold;

  // 盒子
  .date-box {
    z-index: 10;
    display: flex;
    flex-flow: column;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: var(--main-child-bg);
    border-radius: 20px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    overflow: hidden;

    // 头部年月
    .year-month {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 300px;
      margin: 18px 0;

      .per-month,
      .next-month {
        cursor: pointer;
      }

      span:nth-child(2) {
        padding: 5px 10px;
        border-radius: 20px;
        background-color: var(--date-month-bg);
      }
    }

    // 日期
    .date-time {
      display: flex;
      width: 100%;

      // 选择的日期
      .date-select {
        width: 100%;
        padding: 0 20px;
        text-align: center;

        // 显示的一周
        .week-box {
          display: grid;
          grid-template-columns: repeat(7, auto);
          justify-content: space-between;

          span {
            display: flex;
            flex-direction: column;
            padding: 10px 10px;
            border-radius: 20px;
            transition: all 0.3s ease;

            .include-week-day {
              margin-top: 18px;
            }

            .include-week-day-enter-from,
            .include-week-day-leave-to {
              opacity: 0;
            }

            .include-week-day-enter-active {
              transition: opacity 0.1s ease;
            }
          }

          .current-week {
            color: var(--date-current-word);
            background-color: var(--date-current-bg);
          }
        }
        // 全部的日期
        .month-everyday-box {
          overflow: hidden;

          .month-everyday {
            display: grid;
            grid-template-columns: repeat(7, 70px);
            grid-template-rows: auto auto auto auto auto auto;
            grid-gap: 10px;
            justify-content: space-between;

            span {
              padding: 5px 0;

              .day {
                width: 30px;
                line-height: 30px;
                display: inline-block;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.4s;
              }

              .select {
                background-color: var(--date-current-bg);
              }

              .notInMonth {
                color: var(--date-not-in-month);
              }
            }
          }

          .month-everyday-enter-from,
          .month-everyday-leave-to {
            transform: translateY(-300px);
          }

          .month-everyday-enter-active,
          .month-everyday-leave-active {
            transition: all 0.3s ease;
          }
        }
      }

      // 右侧时间
      .time-select {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 0 0 200px;
        padding: 0 20px;

        .time {
          padding: 10px 10px;
          margin: 10px 0;
          font-size: 20px;
          border-radius: 20px;
          background-color: var(--date-current-bg);
          color: var(--date-current-word);
        }

        .timezone {
          font-size: 14px;
          font-weight: 600;
        }

        .clock {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
          width: 150px;
          height: 150px;
          box-sizing: border-box;
          border-radius: 50%;
          border: solid 5px var(--date-clock-border);
          background-color: var(--date-clock-bg);

          .part {
            position: relative;
            width: 10px;
            height: 10px;

            .center-point {
              position: absolute;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background-color: var(--date-clock-pointer);
            }

            .hour-point {
              position: absolute;
              transform: rotate(90deg);
              transform-origin: 50% 100%;
              top: -25px;
              border: solid 30px var(--date-clock-pointer);
              border-left: solid 5px transparent;
              border-right: solid 5px transparent;
              border-top: transparent;
            }

            .minute-point {
              position: absolute;
              top: -45px;
              transform: rotate(45deg);
              transform-origin: 50% 100%;
              border: solid 50px var(--date-clock-pointer);
              border-left: solid 5px transparent;
              border-right: solid 5px transparent;
              border-top: transparent;
            }
          }
        }
      }
    }

    // 底部按钮
    .toggle-btn {
      button {
        width: 60px;
        height: 8px;
        margin-bottom: 10px;
        border-radius: 20px;
        background-color: var(--date-current-bg);
      }

      .shade {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }

  .date-box-unfold {
    height: 488px;
  }
}
</style>
