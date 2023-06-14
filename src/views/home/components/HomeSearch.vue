<template>
  <div class="search-box">
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearch"
      clearable
      placeholder="请输入"
      @select="handleSelect"
    />
    <el-button type="primary" class="button-box" @click="clickSearch">
      搜索
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
interface RestaurantItem {
  value: string
  link: string
}
const state = ref<string>('')
const restaurants = ref<RestaurantItem[]>([])
const querySearch = (queryString: string, cb: any) => {
  console.log('querySearch', queryString)
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  cb(results)
}
const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}
const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' },
  ]
}
const handleSelect = (item: RestaurantItem) => {
  console.log(item)
}

const clickSearch = () => {
  console.log(state.value)
}

onMounted(() => {
  restaurants.value = loadAll()
})
</script>

<style lang="scss" scoped>
.search-box {
  width: 100%;
  height: 60px;
  text-align: center;
  background-color: beige;
  display: flex;
  justify-content: space-between;
  align-items: center;

  :deep(.el-autocomplete) {
    width: 70%;
    height: 30px;
  }
  .button-box {
    width: 20%;
    height: 30px;
    margin: 15px 0;
  }
}
</style>
