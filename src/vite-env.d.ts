/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const vueComponent: DefineComponent<{}, {}, any>
  export default vueComponent
}

declare module 'lodash/throttle'
declare module 'element-plus/dist/locale/zh-cn.mjs'
declare module 'three'
declare module 'three/examples/jsm/controls/OrbitControls'
