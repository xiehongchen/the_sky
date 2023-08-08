<template>
  <div v-if="pageLoad" class="page">
    <div class="box">
      <el-button
        type="primary"
        v-for="item in list"
        :key="item.id"
        class="item"
        @click="showContent(item.component)"
      >
        {{ item.title }}
      </el-button>
    </div>
  </div>
  <div v-else>
    <el-button @click="pageLoad = true" style="margin: 20px">返回</el-button>
    <component :is="currentContent" />
  </div>
</template>

<script setup lang="ts">
const currentContent = shallowRef(null)
const showContent = async (content: string) => {
  pageLoad.value = false
  const module = await import(`./components/${content}.vue`)
  currentContent.value = module.default
}
const pageLoad = ref(true)
const list = ref([
  {
    id: 1,
    title: '九宫格',
    component: 'CSS_A',
  },
  {
    id: 2,
    title: '流光边框',
    component: 'CSS_B',
  },
])
</script>

<style lang="scss" scoped>
.page {
  margin: 10px;
  padding: 10px;
  height: 100%;
  .box {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    .item {
      text-align: center;
      height: 50px;
      line-height: 50px;
      width: 100px;
      margin: 10px;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
    }
  }
}
</style>
