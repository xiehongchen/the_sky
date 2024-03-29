/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const vueComponent: DefineComponent<object, object, any>
  export default vueComponent
}

declare module 'lodash/throttle'
declare module 'element-plus/dist/locale/zh-cn.mjs'
declare module 'three'
declare module 'three/examples/jsm/controls/OrbitControls'
declare module 'three/examples/jsm/loaders/GLTFLoader'
declare module 'socket.io-client'
