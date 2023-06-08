<template>
  <el-page-header :title="null" :content="null">
    <!-- 面包屑，独占一行，第一行 -->
    <template #breadcrumb>
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="(item, index) in route.matched"
          :key="index"
          v-show="item.meta.title"
          :to="item.path"
        >
          <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <!-- 左侧按钮，第二行 -->
    <template #icon>
      <el-icon style="margin-right: 10px" @click="changeIcon">
        <component
          :is="layOutSettingStore.fold ? 'Fold' : 'Expand'"
        ></component>
      </el-icon>
    </template>
    <!-- 左侧内容，第二行 -->
    <template #title>
      <span @click="router.back()">返回</span>
    </template>
    <template #content>
      <span>{{ router.currentRoute.value.meta.title }}</span>
    </template>
    <!-- 右侧操作，第二行 -->
    <template #extra>
      <div>
        <el-button
          type="primary"
          icon="Search"
          circle
          @click="search"
        ></el-button>
        <el-button
          type="primary"
          icon="FullScreen"
          circle
          @click="FullScreen"
        ></el-button>

        <!-- 主题选择 -->
        <el-popover
          placement="bottom"
          title="主题设置"
          :width="300"
          trigger="hover"
        >
          <!-- 表单元素 -->
          <el-form>
            <el-form-item label="主题颜色">
              <el-color-picker
                @change="setColor"
                v-model="color"
                size="small"
                show-alpha
                :predefine="predefineColors"
              />
            </el-form-item>
            <el-form-item label="暗黑模式">
              <el-switch
                @change="changeDark"
                v-model="dark"
                class="mt-2"
                style="margin-left: 24px"
                inline-prompt
                active-icon="MoonNight"
                inactive-icon="Sunny"
              />
            </el-form-item>
          </el-form>
          <template #reference>
            <el-button type="primary" icon="Setting" circle></el-button>
          </template>
        </el-popover>

        <!-- 用户信息 -->
        <img
          :src="userStore.avatar"
          style="
            width: 32px;
            height: 32px;
            margin: 0px 10px -10px 10px;
            border-radius: 50%;
          "
        />
        <el-dropdown>
          <span style="line-height: 30px">
            {{ userStore.username }}
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>
  </el-page-header>
</template>

<script setup lang="ts">
//获取用户相关的小仓库
import { useUserStore } from '@/store/user'
import { useLayOutSettingStore } from '@/store/setting'
// 展开收起
let layOutSettingStore = useLayOutSettingStore()
const router = useRouter()
console.log(router.currentRoute.value.fullPath)
const route = useRoute()
console.log(route.matched)

const changeIcon = () => {
  layOutSettingStore.fold = !layOutSettingStore.fold
}

// 搜索
const search = () => {
  console.log('搜索')
}

// 全屏
const FullScreen = () => {
  // console.log('全屏')
  let full = document.fullscreenElement
  if (full) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}

// 主题颜色
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff6900',
  '#fcb900',
  '#7bdcb5',
  '#00d084',
  '#8ed1fc',
  '#0693e3',
  '#abb8c3',
  '#eb144c',
  '#f78da7',
  '#9900ef',
])
//主题颜色的设置
const setColor = () => {
  //通知js修改根节点的样式对象的属性与属性值
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}

// 暗黑模式
let dark = ref<boolean>(false)
const changeDark = () => {
  //获取HTML根节点
  let html = document.documentElement
  //判断HTML标签是否有类名dark
  dark.value ? (html.className = 'dark') : (html.className = '')
}

// 用户信息
const userStore = useUserStore()

// 退出登录
const logout = async () => {
  await userStore.userLogout()
  router.push('/login')
}
</script>

<style scoped lang="scss">
.el-page-header {
  height: 100%;

  :deep(.el-page-header__breadcrumb) {
    height: 20px;
    margin-bottom: 0;

    .el-breadcrumb {
      margin-top: 5px;
      height: 100%;
      line-height: 20px;

      .el-breadcrumb__item {
        height: 100%;
        line-height: 20px;

        .el-breadcrumb__inner {
          height: 100%;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
