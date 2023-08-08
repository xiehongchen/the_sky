<template>
  <el-menu
    :unique-opened="true"
    :default-active="route.path"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
  >
    <template v-for="item in routes" :key="item.path">
      <!-- 没有子路由 -->
      <template v-if="!item.children">
        <el-menu-item :index="item.path" @click="goRoute(item.path)">
          <el-icon>
            <component :is="item.meta?.icon"></component>
          </el-icon>
          <template #title>
            <span>{{ item.meta?.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <!-- 有子路由 -->
      <template v-else>
        <el-sub-menu :index="item.path">
          <template #title>
            <el-icon>
              <component :is="item.meta?.icon"></component>
            </el-icon>
            <span>{{ item.meta?.title }}</span>
          </template>
          <template v-for="child in item.children" :key="child.path">
            <el-menu-item :index="child.path" @click="goRoute(child.path)">
              <el-icon>
                <component :is="child.meta?.icon"></component>
              </el-icon>
              <template #title>
                <span>{{ child.meta?.title }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { useLayOutSettingStore } from '@/store/setting.ts'
// 展开收起
let layOutSettingStore = useLayOutSettingStore()
const isCollapse = ref(false)
watch(
  () => layOutSettingStore.fold,
  (val) => {
    isCollapse.value = val
  },
)
const router = useRouter()
const route = useRoute()

// 路由
const routes =
  router.options.routes.find((item) => item.path === '/')?.children || []

// 跳转
const goRoute = (path: string) => {
  router.push(path)
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  height: 100%;
}
</style>
