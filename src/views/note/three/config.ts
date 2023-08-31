interface ListItem {
  id: number
  title: string
  component: string
  disabled: boolean
}

export const list = ref<ListItem[]>([
  {
    id: 1,
    title: '入门学习',
    component: 'THREE_A',
    disabled: false,
  },
])
