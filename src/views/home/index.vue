<template>
  <main>
    <HomeTime />
    <HomeSearch />
    <HomeWeather />
    <HomePicture />
    <HomeTask />
    <HomePlan />
  </main>
</template>

<script setup lang="ts">
import HomeTime from './components/HomeTime.vue'
import HomeSearch from './components/HomeSearch.vue'
import HomeWeather from './components/HomeWeather.vue'
import HomePicture from './components/HomePicture.vue'
import HomeTask from './components/HomeTask.vue'
import HomePlan from './components/HomePlan.vue'
</script>

<style scoped>
@media screen and (min-width: 1500px) {
  main {
    display: grid;
    padding: 20px 18px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    grid-template-columns: 1fr 1fr 400px;
    grid-template-rows: 40px 130px 320px minmax(340px, 100%);
    grid-gap: 20px 18px;
    background-color: var(--main-bg);
    transition: all 0.4s;
  }
  .time-box {
    grid-column: 1 / span 2;
    grid-row: 1 / span 2;
  }
  .picture-box {
    grid-column: 1 / span 3;
  }
  .finish {
    grid-column: 1 / span 1;
    grid-row: 4 / span 1;
  }
  .task-box {
    grid-column: 2 / span 2;
  }
}

@media screen and (max-width: 1500px) {
  main {
    display: grid;
    padding: 20px 18px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 190px 320px minmax(340px, 100%);
    grid-gap: 20px 18px;
    background-color: var(--main-bg);
    transition: all 0.4s;
  }
  .time-box {
    grid-column: 1 / span 2;
  }
  .picture-box {
    grid-column: 1 / span 2;
  }
}
main > section {
  box-sizing: border-box;
  background-color: var(--main-child-bg);
  border-radius: 30px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
  transition: all 0.4s;
}
</style>
