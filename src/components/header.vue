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
      <!-- <span>{{ router.currentRoute.value.meta.title }}</span> -->
      <span>我的技术总站</span>
    </template>
    <!-- 右侧操作，第二行 -->
    <template #extra>
      <div class="right-extra">
        <!-- 搜索 -->
        <el-button
          ref="test"
          type="primary"
          icon="Search"
          circle
          @click="goSearch"
        ></el-button>

        <!-- 输入框 -->
        <el-input
          v-if="isSearch"
          v-model="inputText"
          @blur="blurInput"
          @input="inputEvent"
          @change="changeInput"
          @focus="focusInput"
          placeholder="请输入搜索内容"
          ref="inputRef"
          class="input"
        />

        <el-card v-if="searchResultList.length > 0" class="box-card">
          <ul>
            <li
              v-for="(item, index) in searchResultList"
              :key="index"
              class="text"
            >
              {{ item }}
            </li>
          </ul>
        </el-card>

        <!-- 全屏 -->
        <el-button
          type="primary"
          icon="FullScreen"
          circle
          @click="FullScreen"
        ></el-button>

        <!-- 刷新 -->
        <el-button
          type="primary"
          icon="Refresh"
          circle
          @click="refresh"
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
          src="../assets/images/rep/hui.png"
          style="
            width: 32px;
            height: 32px;
            margin: 0px 10px -10px 10px;
            border-radius: 50%;
          "
        />
        <el-dropdown>
          <span style="line-height: 30px; width: 60px">
            {{ user.userInfo.username }}
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
// import { useUserStore } from '@/store/user'
import { useLayOutSettingStore } from '@/store/setting'
import { REMOVE_TOKEN } from '@/utils/token'
import { useUserStore } from '@/store/user'
const user = useUserStore()

// 展开收起
let layOutSettingStore = useLayOutSettingStore()
const router = useRouter()
const route = useRoute()

const changeIcon = () => {
  layOutSettingStore.fold = !layOutSettingStore.fold
}

// 搜索
const inputRef: Ref<HTMLElement | null> = ref(null)
const isSearch = ref<boolean>(false)
const goSearch = () => {
  isSearch.value = !isSearch.value
  nextTick(() => {
    inputRef.value?.focus()
  })
}
const inputText = ref<string>('')
const blurInput = () => {
  // isSearch.value = !isSearch.value
  searchResult.value = false
  searchResultList.value = []
}
// enter键搜索
const changeInput = () => {
  // 开始搜索
  searchResult.value = true
  getData()
}
// 输入框搜索
const inputEvent = () => {
  // 开始搜索
  searchResult.value = true
  getData()
}
// 聚焦搜索
const focusInput = () => {
  // 开始搜索
  searchResult.value = true
  getData()
}
// 搜索结果
const searchResult = ref<boolean>(false)
const searchResultList = ref<Array<string>>([])

function getData() {
  searchResultList.value = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
  ]
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

// 刷新
const refresh = () => {
  location.reload()
  // 从服务器重新加载页面
  // window.location.reload(true)
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

// 退出登录
const logout = async () => {
  REMOVE_TOKEN()
  user.removeUserInfo()
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

  :deep(.el-page-header__header) {
    height: 30px;
    line-height: 30px;

    .el-page-header__extra {
      display: flex;
      flex-direction: row;
      height: 100%;
    }
  }
}

.right-extra {
  display: flex;
  flex-direction: row;
  position: relative;

  .input {
    width: 300px;
    margin-right: 20px;
    margin-left: 20px;
    border-radius: 20px;
  }

  .box-card {
    position: absolute;
    padding: 0;
    top: 40px;
    right: 250px;
    width: 300px;
    height: 300px;
    overflow: scroll;
    --el-card-padding: 0px;
    z-index: 10;

    .text {
      height: 50px;
      padding: 5px 5px;
      line-height: 50px;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      color: #fff;
      background-color: #409eff;
      border-radius: 4px;
    }
  }
}
</style>
@/store/userStore
