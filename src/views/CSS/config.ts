interface ListItem {
  id: number
  title: string
  component: string
  disabled: boolean
}

export const list = ref<ListItem[]>([
  {
    id: 1,
    title: '九宫格',
    component: 'CSS_A',
    disabled: false,
  },
  {
    id: 2,
    title: '流光边框',
    component: 'CSS_B',
    disabled: false,
  },
  {
    id: 3,
    title: '大眼跟随效果',
    component: 'CSS_C',
    disabled: true,
  },
  {
    id: 4,
    title: 'echarts',
    component: 'CSS_D',
    disabled: false,
  },
])
