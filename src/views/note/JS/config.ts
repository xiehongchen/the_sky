interface ListItem {
  id: number
  title: string
  component: string
  disabled: boolean
}

export const list = ref<ListItem[]>([
  {
    id: 1,
    title: '数组方法-A',
    component: 'JS_A',
    disabled: false,
  },
  {
    id: 2,
    title: '排序算法-B',
    component: 'JS_B',
    disabled: true,
  },
  {
    id: 3,
    title: '函数方法-C',
    component: 'JS_C',
    disabled: false,
  },
  {
    id: 4,
    title: 'promise相关-D',
    component: 'JS_D',
    disabled: false,
  },
  {
    id: 5,
    title: '导入与导出-E',
    component: 'JS_E',
    disabled: false,
  },
  {
    id: 6,
    title: '大文件上传-F',
    component: 'JS_F',
    disabled: true,
  },
  {
    id: 7,
    title: '树形数据-G',
    component: 'JS_G',
    disabled: false,
  },
  {
    id: 8,
    title: '屏幕录制-H',
    component: 'JS_H',
    disabled: false,
  },
  {
    id: 9,
    title: 'JS长任务-I',
    component: 'JS_I',
    disabled: false,
  },
  {
    id: 10,
    title: '文字跳舞-J',
    component: 'JS_J',
    disabled: false,
  },
  {
    id: 11,
    title: 'IntersectionObserver实现懒加载-K',
    component: 'JS_K',
    disabled: false,
  },
  {
    id: 12,
    title: 'IntersectionObserver实现滚动动画-L',
    component: 'JS_L',
    disabled: false,
  },
  {
    id: 13,
    title: 'IntersectionObserver实现无限滚动-M',
    component: 'JS_M',
    disabled: false,
  },
])
// ABCDEFGHIJKLMNOPQRSTUVWXYZ
