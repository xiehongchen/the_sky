<template>
  <el-menu
    :unique-opened="true"
    :default-active="route.path"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
  >
    <template v-for="item in routes" :key="item.path">
      <!-- 没有子路由 -->
      <template
        v-if="
          !item.children &&
          (userInfo.permissions.includes(item.meta?.permissions) ||
            userInfo.permissions.includes('sky.*')) &&
          !item.meta?.isHide
        "
      >
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
      <template
        v-else-if="
          item.children &&
          (userInfo.permissions.includes(item.meta?.permissions) ||
            userInfo.permissions.includes('sky.*')) &&
          !item.meta?.isHide
        "
      >
        <el-sub-menu :index="item.path">
          <template #title>
            <el-icon>
              <component :is="item.meta?.icon"></component>
            </el-icon>
            <span>{{ item.meta?.title }}</span>
          </template>
          <template v-for="child in item.children" :key="child.path">
            <el-menu-item
              v-if="
                (userInfo.permissions.includes(child.meta?.permissions) ||
                  userInfo.permissions.includes('sky.*')) &&
                !child.meta?.isHide
              "
              :index="child.path"
              @click="goRoute(child.path)"
            >
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
// console.log('router >>> ', router.options.routes)
// 路由
const routes =
  router.options.routes.find((item) => item.path === '/')?.children || []

// console.log('路由 >>> ', routes)

const userInfo = JSON.parse(localStorage.getItem('userInfo') || '')
console.log(userInfo)

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
