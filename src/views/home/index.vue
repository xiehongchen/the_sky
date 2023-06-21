<template>
  <div class="main-box">
    <HomeTime />
    <!-- <div class="time-box"></div> -->
    <div class="right-box">
      <HomeSearch />
      <HomeWeather />
      <HomeButton />
    </div>
    <HomePicture />
    <HomeTask />
    <HomePlan />
  </div>
</template>

<script setup lang="ts">
import HomeTime from './components/HomeTime.vue'
import HomeSearch from './components/HomeSearch.vue'
import HomeWeather from './components/HomeWeather.vue'
import HomeButton from './components/HomeButton.vue'
import HomePicture from './components/HomePicture.vue'
import HomeTask from './components/HomeTask.vue'
import HomePlan from './components/HomePlan.vue'
</script>

<style scoped>
.main-box {
  height: 100%;
  width: 100%;
  padding: 5px;
  border: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 200px 1fr 1fr;
  gap: 10px 10px;
  grid-auto-flow: row;
  grid-template-areas:
    'time-box time-box time-box right-box'
    'picture-box picture-box picture-box picture-box'
    'task-box task-box plan-box plan-box';
}
.time-box {
  box-sizing: border-box;
  grid-area: time-box;
  border-radius: 10px;
  padding: 5px 10px;
}
.right-box {
  grid-area: right-box;
  background-color: gray;
  border-radius: 10px;
  padding: 5px 10px;
}
.picture-box {
  grid-area: picture-box;
  border-radius: 10px;
  padding: 5px 10px;
  height: 100%;
}
.task-box {
  grid-area: task-box;
  background-color: aqua;
  border-radius: 10px;
  padding: 5px 10px;
}
.plan-box {
  grid-area: plan-box;
  background-color: pink;
  border-radius: 10px;
  padding: 5px 10px;
}
</style>
