interface ListItem {
  id: number
  title: string
  component: string
  disabled: boolean
}

export const list = ref<ListItem[]>([
  {
    id: 1,
    title: '父子组件数据传递',
    component: 'Vue_A',
    disabled: false,
  },
])
