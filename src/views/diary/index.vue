<template>
  <div class="page">
    <div class="title">我的日记</div>
    <div class="box">
      <div class="date-box">
        <div class="month-box">
          <el-icon><ArrowLeftBold /></el-icon>
          <div class="years">{{ years }}</div>
          <el-icon><ArrowRightBold /></el-icon>
        </div>
        <div class="day-box"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const years = ref('12')
const date = new Date()
console.log(date)
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
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
        .years {
          width: 100px;
          height: 40px;
          background-color: red;
          border-radius: 20px;
          text-align: center;
          line-height: 40px;
          margin: 0 100px;
        }
      }
    }
  }
}
</style>
