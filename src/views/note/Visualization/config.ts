interface ListItem {
  id: number
  title: string
  component: string
  disabled: boolean
}

export const list = ref<ListItem[]>([
  {
    id: 1,
    title: 'echarts',
    component: 'V_A',
    disabled: false,
  },
])
