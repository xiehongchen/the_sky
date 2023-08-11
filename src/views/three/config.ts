interface ListItem {
  id: number
  title: string
  component: string
  disabled: boolean
}

export const list = ref<ListItem[]>([
  {
    id: 1,
    title: '粒子效果',
    component: 'THREE_A',
    disabled: true,
  },
])
