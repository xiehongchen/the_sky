interface ListItem {
  id: number
  title: string
  component: string
  disabled: boolean
}
export const list = ref<ListItem[]>([
  {
    id: 1,
    title: '九宫格-A',
    component: 'CSS_A',
    disabled: false,
  },
  {
    id: 2,
    title: '流光边框-B',
    component: 'CSS_B',
    disabled: false,
  },
  {
    id: 3,
    title: '大眼跟随效果-C',
    component: 'CSS_C',
    disabled: true,
  },
  {
    id: 4,
    title: 'echarts-D',
    component: 'CSS_D',
    disabled: false,
  },
  {
    id: 5,
    title: '转盘抽奖-E',
    component: 'CSS_E',
    disabled: false,
  },
  {
    id: 6,
    title: '日夜切换-F',
    component: 'CSS_F',
    disabled: false,
  },
  {
    id: 7,
    title: '九宫格抽奖-G',
    component: 'CSS_G',
    disabled: false,
  },
  {
    id: 8,
    title: '加载效果-H',
    component: 'CSS_H',
    disabled: false,
  },
  {
    id: 9,
    title: '状态检测动画-I',
    component: 'CSS_I',
    disabled: true,
  },
  {
    id: 10,
    title: '碰撞检测变色-J',
    component: 'CSS_J',
    disabled: false,
  },
  {
    id: 11,
    title: '圆形均分显示图片形状-K',
    component: 'CSS_K',
    disabled: false,
  },
  {
    id: 12,
    title: '六边形蜂巢图片形状-L',
    component: 'CSS_L',
    disabled: false,
  },
  {
    id: 13,
    title: '全局六边形蜂巢图片形状-M',
    component: 'CSS_M',
    disabled: true,
  },
  {
    id: 14,
    title: '全局六边形蜂巢图片形状-N',
    component: 'CSS_N',
    disabled: false,
  },
  {
    id: 15,
    title: '移动融合分出-O',
    component: 'CSS_O',
    disabled: false,
  },
  {
    id: 16,
    title: 'filter变亮变暗-P',
    component: 'CSS_P',
    disabled: false,
  },
  {
    id: 17,
    title: '渐变-Q',
    component: 'CSS_Q',
    disabled: false,
  },
  {
    id: 18,
    title: '3D轮播图效果-R',
    component: 'CSS_R',
    disabled: false,
  },
  {
    id: 19,
    title: '3D圆环旋转动画-S',
    component: 'CSS_S',
    disabled: false,
  },
  {
    id: 20,
    title: '3D旋转动画-T',
    component: 'CSS_T',
    disabled: true,
  },
  {
    id: 21,
    title: '按钮特效-U',
    component: 'CSS_U',
    disabled: false,
  },
  {
    id: 21,
    title: '无限滚动动画-V',
    component: 'CSS_V',
    disabled: false,
  },
])
// ABCDEFGHIJKLMNOPQRSTUVWXYZ
