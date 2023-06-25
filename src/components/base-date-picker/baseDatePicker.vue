<template>
  <div class="scope-date-box">
    <i class="iconfont icon-rill icon"></i>
    <div class="scope-date button" @click="unfold = !unfold">
      <span class="start-date">{{ startDate || '开始日期' }}</span>
      <span class="isolate">至</span>
      <span class="end-date">{{ endDate || '结束日期' }}</span>
    </div>
    <transition>
      <div class="select-area" v-show="unfold">
        <div class="select-start">
          <baseDateSelect
            @select="getStartDate"
            :activeDate="startDate"
          ></baseDateSelect>
        </div>
        <div class="select-end">
          <baseDateSelect
            @select="getEndDate"
            :activeDate="endDate"
          ></baseDateSelect>
        </div>
      </div>
    </transition>
    <Teleport to="body">
      <div class="shade" v-show="unfold" @click="unfold = !unfold"></div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import baseDateSelect from '@/components/base-date-picker/baseDateSelect.vue'
import { ElMessage } from 'element-plus'
import useDate from '../../utils/useDate'
const unfold = ref(false)
const startDate = useDate().startDate
const endDate = useDate().endDate

const getStartDate = (date: {
  day: string
  date: Date
  formatDate: string
}) => {
  if (startDate.value && startDate.value == date.formatDate) {
    startDate.value = ''
    return
  }
  if (scopeInclude(endDate.value, date.date, 15, 3)) {
    ElMessage.error('请选择日期范围为3~15天')
    return
  }
  startDate.value = date.formatDate
}

const getEndDate = (date: { day: string; date: Date; formatDate: string }) => {
  if (endDate.value && endDate.value == date.formatDate) {
    endDate.value = ''
    return
  }
  if (scopeInclude(startDate.value, date.date, 15, 3)) {
    ElMessage.error('请选择日期范围为3~15天')
    return
  }
  endDate.value = date.formatDate
}
function scopeInclude(
  origin: string,
  newDate: Date,
  maxScope: number,
  minScope: number,
) {
  if (origin) {
    let endDateStamp = new Date(origin).getTime()
    let newDateStamp = newDate.getTime()
    let maxSelectScope = maxScope * 24 * 60 * 60 * 1000
    let minSelectScope = (minScope - 1) * 24 * 60 * 60 * 1000
    let diff = Math.abs(endDateStamp - newDateStamp)
    if (diff >= maxSelectScope || diff < minSelectScope) {
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.scope-date-box {
  user-select: none;
  position: relative;
  z-index: 9;
  display: flex;
  align-items: center;
  padding: 5px 20px;
  width: 400px;
  border-radius: 20px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.07);
  background-color: var(--scope-date-bg);
  .icon {
    margin-right: 20px;
    color: #ddd;
  }
  .scope-date {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex: auto;
    font-weight: bold;
    color: var(--scope-date-word);
    .isolate {
      color: var(--scope-date-isolate-word);
    }
  }
  .select-area {
    position: absolute;
    top: 36px;
    right: 0;
    z-index: 1;
    display: flex;
    width: 540px;
    height: 280px;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
    background-color: #fff;
    .select-start {
      flex: 1 1 0;
    }
    .select-end {
      flex: 1 1 0;
    }
  }
  .v-enter-from,
  .v-leave-to {
    height: 0;
  }
  .v-enter-active,
  .v-leave-active {
    transition: all 0.3s;
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
</style>
