<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside width="auto">
          <Menu />
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Menu from '@/components/menu.vue'
import Header from '@/components/header.vue'
</script>

<style scoped lang="scss">
.common-layout {
  height: 100vh;
  width: 100vw;

  .el-container {
    height: 100%;

    .el-main {
      padding: 0;
      border-top: 0;
    }
  }
}
</style>
