interface ListItem {
  id: number
  title: string
  component: string
  disabled: boolean
}
//  ABCDEFGHIJKLMNOPQRSTUVWXYZ
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
  {
    id: 5,
    title: '转盘抽奖',
    component: 'CSS_E',
    disabled: false,
  },
  {
    id: 6,
    title: '日夜切换',
    component: 'CSS_F',
    disabled: false,
  },
  {
    id: 7,
    title: '九宫格抽奖',
    component: 'CSS_G',
    disabled: false,
  },
  {
    id: 8,
    title: '加载效果',
    component: 'CSS_H',
    disabled: false,
  },
  {
    id: 9,
    title: '状态检测动画',
    component: 'CSS_I',
    disabled: true,
  },
])
