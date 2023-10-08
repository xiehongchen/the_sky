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
])
