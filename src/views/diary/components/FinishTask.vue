<template>
  <section class="finish">
    <h3 class="title">已完成事件</h3>
    <div class="show-event-container">
      <div class="all-event-container" ref="eventContainer">
        <TransitionGroup name="finishList">
          <div
            class="day-event-container"
            v-for="day in taskList"
            :key="day.id"
          >
            <div class="date-box">
              <span class="start-date">{{ day.date }}</span>
              <!-- <span class="line"></span> -->
            </div>
            <ul class="event-list">
              <TransitionGroup name="finishList">
                <li v-for="event in day.children" :key="event.id">
                  <span class="time">{{ event.time }}</span>
                  <p class="event">{{ event.event }}</p>
                </li>
              </TransitionGroup>
            </ul>
          </div>
        </TransitionGroup>
      </div>
      <BaseScroll
        :scrollHeight="scrollArguments.scrollHeight"
        :showHeight="scrollArguments.showHeight"
        :scrollTop="scrollArguments.scrollTop"
        @slide="slide"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseScroll from '@/components/base-scroll/baseScroll.vue'
interface taskType {
  id: string
  create_time: Date
  cancel_time?: Date
  delay_time?: Date
  expect_time?: Date
  finish_time: Date
  status: number
  event: string
}

const props = defineProps({
  taskList: {
    type: Array as PropType<taskType[]>,
  },
})
interface finishChildTaskType {
  id: string
  date: string
  time: string
  event: string
}
interface finishTaskType {
  id: number
  date: string
  children: finishChildTaskType[]
}
const taskList = computed(() => {
  const data = props.taskList
  const arr: finishTaskType[] = []

  data?.forEach((item) => {
    const date = new Date(item.create_time)
      .toLocaleDateString()
      .replaceAll('/', '-')
    const time = new Date(item.create_time).toLocaleTimeString()
    console.log(date)
    console.log(time)
    const isHas = arr.some((i) => i.date.includes(date))
    if (isHas) {
      const a = {
        id: item.id,
        date: date,
        time: time,
        event: item.event,
      }
      console.log(a)
    } else {
      let i = 0
      const b = {
        id: i,
        date: date,
        children: [
          {
            id: item.id,
            date: date,
            time: time,
            event: item.event,
          },
        ],
      }
      arr.push(b)
      i++
    }
  })
  console.log('arr', arr)
  const newArr = arr.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()

    // 升序排序
    return dateB - dateA
  })
  return newArr
})
/**************获取滚动条组件所需参数**************/
// 获取event容器dom
const eventContainer = ref()
// scrollArguments的类型接口
interface ScrollArguments {
  scrollHeight: number
  showHeight: number
  scrollTop: number
}
// base-scroll组件的参数
let scrollArguments: ScrollArguments = reactive({
  scrollHeight: 100,
  showHeight: 10,
  scrollTop: 0,
})

function setScrollHeight() {
  const { scrollHeight, offsetHeight } = eventContainer.value
  scrollArguments.scrollHeight = scrollHeight
  scrollArguments.showHeight = offsetHeight
}

onMounted(() => {
  nextTick(() => {
    setScrollHeight()
    // 添加滚动事件，获取滚动高度
    eventContainer.value.addEventListener('scroll', (e: Event) => {
      const target: HTMLElement = e.target as HTMLElement
      scrollArguments.scrollTop = target.scrollTop
    })
  })
})

watch(taskList, () => {
  nextTick(() => {
    setScrollHeight()
  })
})

// 滚动组件自定义事件
function slide(scrollTop: number) {
  scrollArguments.scrollTop = scrollTop
  eventContainer.value.scrollTop = scrollTop
}
</script>

<style lang="scss" scoped>
.finish {
  padding: 20px;
  display: flex;
  flex-flow: column;
  .title {
    margin-bottom: 20px;
    font-size: 18px;
    color: var(--main-child-title);
  }
  .show-event-container {
    position: relative;
    display: flex;
    justify-content: flex-end;
    overflow: hidden;
    height: 100%;
    .all-event-container {
      position: absolute;
      padding-right: 20px;
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      .finishList-move, /* 对移动中的元素应用的过渡 */
.finishList-enter-active,
.finishList-leave-active {
        transition: all 0.4s ease;
      }

      .finishList-enter-from,
      .finishList-leave-to {
        opacity: 0;
      }
      .day-event-container {
        .date-box {
          display: flex;
          align-items: center;
          font-weight: bold;
          color: var(--finish-word);
          .line {
            flex: 1 1 0;
            margin-left: 10px;
            height: 0;
            box-sizing: border-box;
            border-bottom: dashed 4px var(--finish-word);
          }
        }
        .event-list {
          margin: 10px 0;
          border-left: solid 4px var(--finish-word);
          li {
            .time {
              margin-top: 14px;
              margin-left: 20px;
              color: var(--finish-time-word);
            }
            .event {
              width: 100%;
              margin: 0 0 10px 10px;
              padding: 10px 20px;
              border-radius: 20px;
              line-height: 1.5rem;
              color: var(--finish-child-word);
              background-color: var(--finish-child-bg);
            }
          }
        }
        &:last-of-type > .event-list {
          margin-bottom: 0;
        }
      }
    }
    .all-event-container::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
