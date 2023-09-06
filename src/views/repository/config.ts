interface list {
  id: number
  title: string
  url: string
  imgUrl: string
}
function getAssetsImg(name: string) {
  if (!name.includes('.')) {
    return 'src/assets/images/rep/' + name + '.png'
  } else {
    return 'src/assets/images/rep/' + name
  }
  return ''
}
getAssetsImg('aa')
// favicon  logo  图标
// 常用
export const use: list[] = [
  {
    id: 7,
    title: 'chatgpt',
    url: 'https://chat.openai.com/',
    imgUrl: getAssetsImg('chatgpt'),
  },
  {
    id: 1,
    title: 'GitHub',
    url: 'https://github.com/',
    imgUrl: 'https://github.githubassets.com/favicons/favicon.svg',
  },
  {
    id: 8,
    title: 'Gitee',
    url: 'https://gitee.com/',
    imgUrl: 'https://gitee.com/favicon.ico',
  },
  {
    id: 2,
    title: '兼容性查询  caniuse',
    url: 'https://github.com/',
    imgUrl: 'https://caniuse.com/img/favicon-128.png',
  },
  {
    id: 3,
    title: '稀土掘金',
    url: 'https://juejin.cn/',
    imgUrl:
      'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6c61ae65d1c41ae8221a670fa32d05aa.svg',
  },
  {
    id: 4,
    title: '阮一峰的网络日志',
    url: 'https://www.ruanyifeng.com/blog/',
    imgUrl: getAssetsImg('hui'),
  },
  {
    id: 5,
    title: '阮一峰ES6',
    url: 'https://es6.ruanyifeng.com/',
    imgUrl: 'https://es6.ruanyifeng.com/favicon.ico',
  },
  {
    id: 14,
    title: '阮一峰  网道',
    url: 'https://wangdoc.com/',
    imgUrl: 'https://wangdoc.com/assets/icons/android-icon-192x192.png',
  },
  {
    id: 6,
    title: 'stack overflow',
    url: 'https://stackoverflow.com/',
    imgUrl:
      'https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196',
  },
  {
    id: 9,
    title: 'Discord',
    url: 'https://discord.com/channels/@me',
    imgUrl: 'https://discord.com/assets/ec2c34cadd4b5f4594415127380a85e6.ico',
  },
  {
    id: 10,
    title: '我的笔记',
    url: 'https://xiehongchen.github.io/',
    imgUrl: 'https://xiehongchen.github.io/img/fluid.png',
  },
  {
    id: 11,
    title: '腾讯云',
    url: 'https://cloud.tencent.com/login',
    imgUrl: 'https://cloud.tencent.com/favicon.ico?t=201902181234',
  },
  {
    id: 12,
    title: '宝塔面板',
    url: 'http://159.75.164.22:8888/',
    imgUrl: getAssetsImg('baota.ico'),
  },
  {
    id: 13,
    title: '个人博客',
    url: 'http://www.xiehongchen.top:8090/console/dashboard',
    imgUrl: getAssetsImg('hui'),
  },
]
// 文档
export const document: list[] = [
  {
    id: 1,
    title: 'Vue2',
    url: 'https://v2.cn.vuejs.org/v2/guide/',
    imgUrl: 'https://v2.cn.vuejs.org/images/logo.svg',
  },
  {
    id: 2,
    title: 'Vue3',
    url: 'https://cn.vuejs.org/guide/introduction.html',
    imgUrl: 'https://v2.cn.vuejs.org/images/logo.svg',
  },
  {
    id: 22,
    title: 'React 英文',
    url: 'https://react.dev/learn',
    imgUrl: 'http://www.w3.org/2000/svg',
  },
  {
    id: 23,
    title: 'React 中文',
    url: 'https://zh-hans.react.dev/learn',
    imgUrl: 'http://www.w3.org/2000/svg',
  },
  {
    id: 3,
    title: 'ElementUI',
    url: 'https://element.eleme.cn/#/zh-CN/component/installation',
    imgUrl: 'https://element.eleme.cn/favicon.ico',
  },
  {
    id: 4,
    title: 'ElementPlus',
    url: 'https://element-plus.gitee.io/zh-CN/component/button.html',
    imgUrl: 'https://element-plus.gitee.io/images/element-plus-logo.svg',
  },
  {
    id: 5,
    title: '微信开发文档',
    url: 'https://developers.weixin.qq.com/miniprogram/dev/framework/',
    imgUrl: 'https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico',
  },
  {
    id: 6,
    title: '微信开放社区',
    url: 'https://developers.weixin.qq.com/community/develop/mixflow',
    imgUrl: 'https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico',
  },
  {
    id: 7,
    title: '菜鸟教程',
    url: 'https://www.runoob.com/',
    imgUrl: 'https://static.runoob.com/images/favicon.ico',
  },
  {
    id: 8,
    title: 'uniapp',
    url: 'https://uniapp.dcloud.net.cn/',
    imgUrl: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app.png',
  },
  {
    id: 9,
    title: 'pinia',
    url: 'https://pinia.web3doc.top/introduction.html',
    imgUrl: 'https://pinia.web3doc.top/logo.png',
  },
  {
    id: 10,
    title: 'vant4',
    url: 'http://vant-contrib.gitee.io/vant/#/zh-CN',
    imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
  },
  {
    id: 11,
    title: 'Vue Router',
    url: 'https://router.vuejs.org/zh/guide/',
    imgUrl: 'https://router.vuejs.org/logo.svg',
  },
  {
    id: 12,
    title: 'Vite',
    url: 'https://cn.vitejs.dev/guide/',
    imgUrl: 'https://cn.vitejs.dev/logo.svg',
  },
  {
    id: 13,
    title: 'Vuex',
    url: 'https://vuex.vuejs.org/zh/',
    imgUrl: 'https://vuex.vuejs.org/logo.png',
  },
  {
    id: 14,
    title: 'Swiper',
    url: 'https://swiperjs.com/get-started',
    imgUrl: 'https://swiperjs.com/images/favicon.png',
  },
  {
    id: 15,
    title: 'MDN',
    url: 'https://developer.mozilla.org/zh-CN/',
    imgUrl: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
  },
  {
    id: 16,
    title: 'git',
    url: 'https://git-scm.com/book/zh/v2',
    imgUrl: 'https://git-scm.com/favicon.ico',
  },
  {
    id: 17,
    title: 'echarts',
    url: 'https://echarts.apache.org/handbook/zh/get-started/',
    imgUrl: 'https://echarts.apache.org/zh/images/favicon.png',
  },
  {
    id: 18,
    title: 'lodash',
    url: 'https://www.lodashjs.com/',
    imgUrl: 'https://www.lodashjs.com/img/favicon.ico',
  },
  {
    id: 19,
    title: 'npm',
    url: 'https://www.npmjs.com/',
    imgUrl:
      'https://static-production.npmjs.com/58a19602036db1daee0d7863c94673a4.png',
  },
  {
    id: 20,
    title: 'three',
    url: 'https://threejs.org/',
    imgUrl: 'https://threejs.org/files/favicon.ico',
  },
  {
    id: 21,
    title: 'Next.js',
    url: 'https://nextjs.org/',
    imgUrl: 'https://nextjs.org/favicon.ico',
  },
  {
    id: 22,
    title: 'taro',
    url: 'https://taro-docs.jd.com/docs/',
    imgUrl:
      'https://storage.360buyimg.com/pubfree-bucket/taro-docs/c07c6984de/img/logo-taro.png',
  },
  {
    id: 24,
    title: 'AntV',
    url: 'https://antv.antgroup.com/',
    imgUrl: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
  },
]
// 工具
export const tools: list[] = [
  {
    id: 1,
    title: '图片压缩',
    url: 'https://tinypng.com/',
    imgUrl: 'https://tinypng.com/images/favicon.ico',
  },
  {
    id: 2,
    title: '在线JS对象转JSON',
    url: 'https://uutool.cn/obj2json/',
    imgUrl: 'https://uutool.cn/favicon.ico',
  },
  {
    id: 3,
    title: '韩小韩API接口站',
    url: 'https://api.vvhan.com/',
    imgUrl: 'https://api.vvhan.com/favicon.ico',
  },
  {
    id: 4,
    title: '视觉效果集合',
    url: 'http://hepengwei.cn/#/html/visualDesign',
    imgUrl: 'http://hepengwei.cn/public/favicon.ico',
  },
  {
    id: 5,
    title: '极简插件',
    url: 'https://chrome.zzzmh.cn/#/index',
    imgUrl: 'https://chrome.zzzmh.cn/favicon.ico',
  },
  {
    id: 6,
    title: 'halo',
    url: 'https://docs.halo.run/getting-started/install/docker-compose/',
    imgUrl: 'https://docs.halo.run/img/favicon-96x96.png',
  },
  {
    id: 7,
    title: 'hugging face ai绘画模型',
    url: 'https://huggingface.co/',
    imgUrl: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
  },
  {
    id: 8,
    title: 'civitai ai绘画模型',
    url: 'https://civitai.com/',
    imgUrl: getAssetsImg('civitai'),
  },
  {
    id: 9,
    title: 'coolors 颜色',
    url: 'https://coolors.co/',
    imgUrl: 'https://coolors.co/assets/img/favicon.png',
  },
  {
    id: 10,
    title: 'ray 代码优化图片',
    url: 'https://ray.so/',
    imgUrl: 'https://ray.so/favicon.png',
  },
  {
    id: 11,
    title: 'dribbble UI资源',
    url: 'https://dribbble.com/shots',
    imgUrl:
      'https://cdn.dribbble.com/assets/dribbble-ball-192-23ecbdf987832231e87c642bb25de821af1ba6734a626c8c259a20a0ca51a247.png',
  },
  {
    id: 12,
    title: 'behance UI资源',
    url: 'https://www.behance.net/',
    imgUrl:
      'https://a5.behance.net/52efe92a45956a1cf2594cc52fcc2e227ab24722/img/site/favicon.ico?cb=264615658',
  },
  {
    id: 13,
    title: '正则神器',
    url: 'https://regexgpt.app/',
    imgUrl: 'https://regexgpt.app/logo.png',
  },
  {
    id: 14,
    title: '配色表',
    url: 'http://tools.jb51.net/static/webcolor/index.html',
    imgUrl: getAssetsImg('hui'),
  },
]
