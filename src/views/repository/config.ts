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
    imgUrl:
      'data:image/png;base64,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',
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
    id: 3,
    title: 'ElementUI',
    url: 'https://element.eleme.cn/#/zh-CN/component/installation',
    imgUrl:
      'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE0NnB4IiBoZWlnaHQ9IjM4cHgiIHZpZXdCb3g9IjAgMCAxNDYgMzgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQwICgzMzc2MikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+U2hhcGUgQ29weTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJ2Mi4yLjAiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLpppbpobUt6buY6K6k5pWI5p6cLWNvcHktMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTcwLjAwMDAwMCwgLTE5LjAwMDAwMCkiIGZpbGw9IiM0MDlFRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNMjEyLjEzNTQ0MSw0NS4xNTc4MDc3IEMyMTIuMTM1NDQxLDQ1LjE1NzgwNzcgMjEyLjQyMDIzNyw0NS4xNTA1MTA1IDIxMi45NjA5MzcsNDUuMTU3ODA3NyBDMjEzLjUwMTYzNyw0NS4xNjUxMDQ5IDIxMy42NDg4NTEsNDUuNTcwODU1NiAyMTMuNjQ4ODUxLDQ1LjU3MDg1NTYgQzIxMy42NDg4NTEsNDUuNTcwODU1NiAyMTQuNzMzODI4LDQ3LjU2NjU2NTcgMjE1LjAyNDY3Nyw0OC4wNDkxNDM0IEMyMTUuMjgzNjA4LDQ4LjQ3ODcxMzMgMjE0Ljk3MzIyMSw0OC40NzA4NjU0IDIxNC45MDE4MTYsNDguNDYzODQzNiBDMjE0LjkwMjUwNCw0OC40NjI4Nzk4IDIxNC44ODcwOTUsNDguNDYyMTkxNCAyMTQuODg3MDk1LDQ4LjQ2MjE5MTQgQzIxNC44ODcwOTUsNDguNDYyMTkxNCAyMTQuODkzMDExLDQ4LjQ2MzAxNzUgMjE0LjkwMTgxNiw0OC40NjM4NDM2IEMyMTQuODk4NjUyLDQ4LjQ2ODI0OTUgMjE0LjU5NDczMSw0OC40NzgzMDAzIDIxMS40NDc1MjgsNDguNDYyMTkxNCBDMjA3LjA1ODY0MSw0Ny44NjY1NzYyIDIwNi45MDczLDQzLjkxODY2MzggMjA2LjkwNzMsNDMuOTE4NjYzOCBMMjA2LjkwNzMsMzYuODk2ODQ4MyBMMjA0LjQzMDgxMiwzNi44OTY4NDgzIEwyMDQuNDMwODEyLDM0LjI4MDg3NzkgQzIwNC40MzA4MTIsMzMuOTI0Mjc5OCAyMDQuODQzNTYsMzMuODY3ODI5OSAyMDQuODQzNTYsMzMuODY3ODI5OSBMMjA2LjkwNzMsMzMuODY3ODI5OSBMMjA2LjkwNzMsMzEuMjUxODU5NCBDMjA2LjkwNzMsMzAuODI1MTgwOSAyMDcuMzIwMDQ4LDMwLjcwMTEyODggMjA3LjMyMDA0OCwzMC43MDExMjg4IEMyMDcuMzIwMDQ4LDMwLjcwMTEyODggMjA4Ljc3MjY0NiwzMC4yODU4Nzc5IDIwOS42MTc4MTYsMzAuMDQ0MTA3MiBDMjA5Ljk2NDY2MiwyOS45NDQ5NzU2IDIxMC4wNzE3MDEsMzAuMTUwMzk4MiAyMTAuMDcxNzAxLDMwLjE1MDM5ODIgQzIxMC4wNzE3MDEsMzAuMTUwMzk4MiAyMTAuMjA5Mjg0LDMwLjA3NzQyNjQgMjEwLjIwOTI4NCwzMC4zOTI3MTk2IEwyMTAuMjA5Mjg0LDM0LjAwNTUxMjUgTDIxMy43ODY0MzMsMzQuMDA1NTEyNSBDMjE0LjEzNDY1NSwzNC4wMDU1MTI1IDIxNC4xOTkxODEsMzQuNDE4NTYwNSAyMTQuMTk5MTgxLDM0LjQxODU2MDUgTDIxNC4xOTkxODEsMzcuMDM0NTMxIEwyMTAuMjA5Mjg0LDM3LjAzNDUzMSBMMjEwLjIwOTI4NCw0My4wOTI1Njc4IEMyMTAuMjA5Mjg0LDQ0Ljg1MzM5MTMgMjEyLjEzNTQ0MSw0NS4xNTc4MDc3IDIxMi4xMzU0NDEsNDUuMTU3ODA3NyBMMjEyLjEzNTQ0MSw0NS4xNTc4MDc3IFogTTIwMS41NDE1NzYsNDguMTg2ODI2MSBMMTk5LjM0MDI1Myw0OC4xODY4MjYxIEMxOTguOTA4MzgxLDQ4LjE4NjgyNjEgMTk4LjkyNzUwNSw0Ny42MzYwOTU1IDE5OC45Mjc1MDUsNDcuNjM2MDk1NSBMMTk4LjkyNzUwNSwzNy40NDc1Nzg5IEMxOTguOTI3NTA1LDM2LjgyODY5NTQgMTk4LjEwMjAwOSwzNi42MjE0ODMgMTk4LjEwMjAwOSwzNi42MjE0ODMgTDE5My41NjE3ODEsMzYuNjIxNDgzIEMxOTIuODg0NDYyLDM2LjYyMTQ4MyAxOTIuODczODY4LDM3LjQ0NzU3ODkgMTkyLjg3Mzg2OCwzNy40NDc1Nzg5IEwxOTIuODczODY4LDQ3Ljc3Mzc3ODEgQzE5Mi44NzM4NjgsNDguMTc4NzAyOCAxOTIuNDYxMTIsNDguMTg2ODI2MSAxOTIuNDYxMTIsNDguMTg2ODI2MSBMMTkwLjI1OTc5Nyw0OC4xODY4MjYxIEMxODkuNzc1NzgyLDQ4LjE4NjgyNjEgMTg5Ljg0NzA0OSw0Ny42MzYwOTU1IDE4OS44NDcwNDksNDcuNjM2MDk1NSBMMTg5Ljg0NzA0OSwzNC44MzE2MDg1IEMxODkuODQ3MDQ5LDMzLjgwMzExOSAxOTEuMDg1MjkzLDMzLjU5MjQ2NDYgMTkxLjA4NTI5MywzMy41OTI0NjQ2IEwyMDAuNzE2MDgsMzMuNTkyNDY0NiBDMjAxLjY3Nzc4MywzMy41OTI0NjQ2IDIwMS45NTQzMjQsMzQuODMxNjA4NSAyMDEuOTU0MzI0LDM0LjgzMTYwODUgTDIwMS45NTQzMjQsNDcuNDk4NDEyOCBDMjAxLjk1NDMyNCw0OC4yMTg2MzA4IDIwMS41NDE1NzYsNDguMTg2ODI2MSAyMDEuNTQxNTc2LDQ4LjE4NjgyNjEgTDIwMS41NDE1NzYsNDguMTg2ODI2MSBaIE0xODUuODU3MTUyLDQyLjQwNDE1NDYgTDE3Ny4zMjcwMjcsNDIuNDA0MTU0NiBMMTc3LjMyNzAyNyw0NC40NjkzOTQ0IEMxNzcuMzI3MDI3LDQ1LjIxMzU2OTEgMTc4LjI5MDEwNiw0NS40MzMxNzMgMTc4LjI5MDEwNiw0NS40MzMxNzMgTDE4NS4xNjkyMzksNDUuNDMzMTczIEMxODUuNjU4NzU4LDQ1LjQzMzE3MyAxODUuOTk0NzM1LDQ1Ljg0NjIyMSAxODUuOTk0NzM1LDQ1Ljg0NjIyMSBDMTg1Ljk5NDczNSw0NS44NDYyMjEgMTg2LjU5NTAwOCw0Ny4wOTUxNDAzIDE4Ni44MjAyMzEsNDcuNjM2MDk1NSBDMTg3LjA0NTQ1NCw0OC4xNzcwNTA2IDE4Ni40MDc0ODMsNDguMTg2ODI2MSAxODYuNDA3NDgzLDQ4LjE4NjgyNjEgTDE3Ni4wODg3ODMsNDguMTg2ODI2MSBDMTc0Ljg0NjEzNiw0OC4xODY4MjYxIDE3NC41NzUzNzQsNDYuNjcyMzE2OSAxNzQuNTc1Mzc0LDQ2LjY3MjMxNjkgTDE3NC41NzUzNzQsMzQuOTY5MjkxMSBDMTc0LjU3NTM3NCwzNC4yOTYyOTgzIDE3NS41Mzg0NTIsMzQuMDA1NTEyNSAxNzUuNTM4NDUyLDM0LjAwNTUxMjUgTDE4NS44NTcxNTIsMzQuMDA1NTEyNSBDMTg2Ljg5NDExMywzNC4wMDU1MTI1IDE4Ny4wOTUzOTYsMzUuMjQ0NjU2NCAxODcuMDk1Mzk2LDM1LjI0NDY1NjQgTDE4Ny4wOTUzOTYsNDEuMTY1MDEwNyBDMTg3LjA5NTM5Niw0Mi4xNjM4OTgzIDE4NS44NTcxNTIsNDIuNDA0MTU0NiAxODUuODU3MTUyLDQyLjQwNDE1NDYgTDE4NS44NTcxNTIsNDIuNDA0MTU0NiBaIE0xODQuMzQzNzQzLDM3LjQ0NzU3ODkgQzE4NC4zNDM3NDMsMzcuNDQ3NTc4OSAxODQuMjU3MDY2LDM2Ljc1OTE2NTcgMTgzLjY1NTgzLDM2Ljc1OTE2NTcgTDE3OC4wMTQ5NCwzNi43NTkxNjU3IEMxNzguMDE0OTQsMzYuNzU5MTY1NyAxNzcuMzI3MDI3LDM2Ljk0Mzc5ODEgMTc3LjMyNzAyNywzNy40NDc1Nzg5IEwxNzcuMzI3MDI3LDM4Ljk2MjA4ODIgQzE3Ny4zMjcwMjcsMzguOTYyMDg4MiAxNzcuMzQ2ODM5LDM5LjY1MDUwMTQgMTc4LjAxNDk0LDM5LjY1MDUwMTQgTDE4My42NTU4MywzOS42NTA1MDE0IEMxODMuNjU1ODMsMzkuNjUwNTAxNCAxODQuMzQzNzQzLDM5LjQ4MDQ2MzQgMTg0LjM0Mzc0MywzOC44MjQ0MDU1IEwxODQuMzQzNzQzLDM3LjQ0NzU3ODkgTDE4NC4zNDM3NDMsMzcuNDQ3NTc4OSBaIE0xNzEuNDEwOTcyLDQ4LjE4NjgyNjEgTDE2OS4yMDk2NSw0OC4xODY4MjYxIEMxNjguOTE5MjEzLDQ4LjE4NjgyNjEgMTY4Ljc5NjkwMiw0Ny43NzM3NzgxIDE2OC43OTY5MDIsNDcuNzczNzc4MSBMMTY4Ljc5NjkwMiwzNy40NDc1Nzg5IEMxNjguNzk2OTAyLDM2LjgwNzIxNjkgMTY3Ljk3MTQwNiwzNi42MjE0ODMgMTY3Ljk3MTQwNiwzNi42MjE0ODMgTDE2NS45MDc2NjYsMzYuNjIxNDgzIEMxNjUuMzMxODgyLDM2LjYyMTQ4MyAxNjUuMjE5NzUyLDM3LjQ0NzU3ODkgMTY1LjIxOTc1MiwzNy40NDc1Nzg5IEwxNjUuMjE5NzUyLDQ3Ljc3Mzc3ODEgQzE2NS4yMTk3NTIsNDguMTE2MzMyNiAxNjQuODA3MDA0LDQ4LjE4NjgyNjEgMTY0LjgwNzAwNCw0OC4xODY4MjYxIEwxNjIuNjA1NjgyLDQ4LjE4NjgyNjEgQzE2Mi4yOTk1Niw0OC4xODY4MjYxIDE2Mi4xOTI5MzQsNDcuNzczNzc4MSAxNjIuMTkyOTM0LDQ3Ljc3Mzc3ODEgTDE2Mi4xOTI5MzQsMzcuNDQ3NTc4OSBDMTYyLjE5MjkzNCwzNi43OTI4OTc5IDE2MS4zNjc0MzgsMzYuNjIxNDgzIDE2MS4zNjc0MzgsMzYuNjIxNDgzIEwxNTkuMzAzNjk4LDM2LjYyMTQ4MyBDMTU4LjY3Mzk4MiwzNi42MjE0ODMgMTU4LjYxNTc4NCwzNy40NDc1Nzg5IDE1OC42MTU3ODQsMzcuNDQ3NTc4OSBMMTU4LjYxNTc4NCw0Ny43NzM3NzgxIEMxNTguNjE1Nzg0LDQ4LjIxNTczOTUgMTU4LjIwMzAzNiw0OC4xODY4MjYxIDE1OC4yMDMwMzYsNDguMTg2ODI2MSBMMTU2LjAwMTcxNCw0OC4xODY4MjYxIEMxNTUuNTg5Mzc4LDQ4LjE4NjgyNjEgMTU1LjU4ODk2Niw0Ny43NzM3NzgxIDE1NS41ODg5NjYsNDcuNzczNzc4MSBMMTU1LjU4ODk2NiwzNC42OTM5MjU4IEMxNTUuNTg4OTY2LDMzLjkzNjI1ODIgMTU2LjY4OTYyNywzMy41OTI0NjQ2IDE1Ni42ODk2MjcsMzMuNTkyNDY0NiBMMTcwLjQ0Nzg5NCwzMy41OTI0NjQ2IEMxNzEuNTUyMjcsMzMuNTkyNDY0NiAxNzEuODIzNzIsMzQuOTY5MjkxMSAxNzEuODIzNzIsMzQuOTY5MjkxMSBMMTcxLjgyMzcyLDQ3Ljc3Mzc3ODEgQzE3MS44MjM3Miw0OC4yNDkzMzQgMTcxLjQxMDk3Miw0OC4xODY4MjYxIDE3MS40MTA5NzIsNDguMTg2ODI2MSBMMTcxLjQxMDk3Miw0OC4xODY4MjYxIFogTTE1MS40NjE0ODYsNDIuNDA0MTU0NiBMMTQyLjkzMTM2LDQyLjQwNDE1NDYgTDE0Mi45MzEzNiw0NC40NjkzOTQ0IEMxNDIuOTMxMzYsNDUuMjEzNTY5MSAxNDMuODk0NDM5LDQ1LjQzMzE3MyAxNDMuODk0NDM5LDQ1LjQzMzE3MyBMMTUwLjc3MzU3Miw0NS40MzMxNzMgQzE1MS4yNjMwOTIsNDUuNDMzMTczIDE1MS41OTkwNjgsNDUuODQ2MjIxIDE1MS41OTkwNjgsNDUuODQ2MjIxIEMxNTEuNTk5MDY4LDQ1Ljg0NjIyMSAxNTIuMTk5MjA0LDQ3LjA5NTE0MDMgMTUyLjQyNDU2NCw0Ny42MzYwOTU1IEMxNTIuNjQ5Nzg3LDQ4LjE3NzA1MDYgMTUyLjAxMTgxNiw0OC4xODY4MjYxIDE1Mi4wMTE4MTYsNDguMTg2ODI2MSBMMTQxLjY5MzExNyw0OC4xODY4MjYxIEMxNDAuNDUwNDcsNDguMTg2ODI2MSAxNDAuMTc5NzA3LDQ2LjY3MjMxNjkgMTQwLjE3OTcwNyw0Ni42NzIzMTY5IEwxNDAuMTc5NzA3LDM0Ljk2OTI5MTEgQzE0MC4xNzk3MDcsMzQuMjk2Mjk4MyAxNDEuMTQyNzg2LDM0LjAwNTUxMjUgMTQxLjE0Mjc4NiwzNC4wMDU1MTI1IEwxNTEuNDYxNDg2LDM0LjAwNTUxMjUgQzE1Mi40OTg0NDYsMzQuMDA1NTEyNSAxNTIuNjk5NzMsMzUuMjQ0NjU2NCAxNTIuNjk5NzMsMzUuMjQ0NjU2NCBMMTUyLjY5OTczLDQxLjE2NTAxMDcgQzE1Mi42OTk3Myw0Mi4xNjM4OTgzIDE1MS40NjE0ODYsNDIuNDA0MTU0NiAxNTEuNDYxNDg2LDQyLjQwNDE1NDYgTDE1MS40NjE0ODYsNDIuNDA0MTU0NiBaIE0xNDkuOTQ4MDc2LDM3LjQ0NzU3ODkgQzE0OS45NDgwNzYsMzcuNDQ3NTc4OSAxNDkuODYxMzk5LDM2Ljc1OTE2NTcgMTQ5LjI2MDE2MywzNi43NTkxNjU3IEwxNDMuNjE5Mjc0LDM2Ljc1OTE2NTcgQzE0My42MTkyNzQsMzYuNzU5MTY1NyAxNDIuOTMxMzYsMzYuOTQzNzk4MSAxNDIuOTMxMzYsMzcuNDQ3NTc4OSBMMTQyLjkzMTM2LDM4Ljk2MjA4ODIgQzE0Mi45MzEzNiwzOC45NjIwODgyIDE0Mi45NTExNzIsMzkuNjUwNTAxNCAxNDMuNjE5Mjc0LDM5LjY1MDUwMTQgTDE0OS4yNjAxNjMsMzkuNjUwNTAxNCBDMTQ5LjI2MDE2MywzOS42NTA1MDE0IDE0OS45NDgwNzYsMzkuNDgwNDYzNCAxNDkuOTQ4MDc2LDM4LjgyNDQwNTUgTDE0OS45NDgwNzYsMzcuNDQ3NTc4OSBMMTQ5Ljk0ODA3NiwzNy40NDc1Nzg5IFogTTEzOC4xMTU5NjcsNDguMTg2ODI2MSBMMTMyLjg4NzgyNiw0OC4xODY4MjYxIEMxMzIuODg3ODI2LDQ4LjE4NjgyNjEgMTI5LjA2MTkyNyw0OC4wMDYxODY1IDEyOC43NjAzNDYsNDQuMTk0MDI5MSBDMTI4Ljc0ODIzOSw0MC4yNzkwMjI4IDEyOC43NjAzNDYsMjguMDg1MTU4MyAxMjguNzYwMzQ2LDI4LjA4NTE1ODMgTDEzMS4yMzY4MzQsMjguMDg1MTU4MyBDMTMxLjIzNjgzNCwyOC4wODUxNTgzIDEzMi4wNjIzMywyOC4wNzAxNTA5IDEzMi4wNjIzMywyOC45MTEyNTQzIEwxMzIuMDYyMzMsNDMuMzY3OTMzMSBDMTMyLjA2MjMzLDQzLjM2NzkzMzEgMTMyLjM1MDAxNSw0NC41NjM4NDQ3IDEzMy45ODg0ODcsNDUuMDIwMTI1IEMxMzUuODM5OCw0NS4wMTA3NjI2IDEzNi4xODk4MSw0NS4wMjAxMjUgMTM2LjE4OTgxLDQ1LjAyMDEyNSBDMTM2LjE4OTgxLDQ1LjAyMDEyNSAxMzYuOTA3MzAzLDQ0Ljc5MDE5NSAxMzcuNDI4MDU0LDQ1LjcwODUzODMgQzEzNy45NDg4MDQsNDYuNjI2ODgxNiAxMzguNTI4NzE1LDQ3LjYzNjA5NTUgMTM4LjUyODcxNSw0Ny42MzYwOTU1IEMxMzguNTI4NzE1LDQ3LjYzNjA5NTUgMTM4LjYxMTU0LDQ4LjE4NjgyNjEgMTM4LjExNTk2Nyw0OC4xODY4MjYxIEwxMzguMTE1OTY3LDQ4LjE4NjgyNjEgWiBNMTExLjU2MjUxMyw0Ny4zNjA3MzAyIEwxMTEuNTYyNTEzLDI5LjE4NjYxOTYgQzExMS41NjI1MTMsMjguMzgwNzYzIDExMi4yNTA0MjYsMjguMjIyODQxIDExMi4yNTA0MjYsMjguMjIyODQxIEwxMjUuMTgzMTk3LDI4LjIyMjg0MSBDMTI1LjkwNjQ2OSwyOC4yMjI4NDEgMTI1LjU5NTk0NSwyOS4wNDg5MzY5IDEyNS41OTU5NDUsMjkuMDQ4OTM2OSBDMTI1LjU5NTk0NSwyOS4wNDg5MzY5IDEyNS4xOTI4MjcsMzAuMTY2MDk0IDEyNC45MDgwMzEsMzAuNzAxMTI4OCBDMTI0LjYyMzIzNSwzMS4yMzYxNjM2IDEyNC4wODI1MzUsMzEuMjUxODU5NCAxMjQuMDgyNTM1LDMxLjI1MTg1OTQgTDExNS42ODk5OTMsMzEuMjUxODU5NCBDMTE0LjkwODUyMywzMS4yNTE4NTk0IDExNC44NjQ0OTcsMzEuOTQwMjcyNyAxMTQuODY0NDk3LDMxLjk0MDI3MjcgTDExNC44NjQ0OTcsMzYuNDgzODAwMyBMMTI0LjM1NzcwMSwzNi40ODM4MDAzIEMxMjQuOTE0NjM1LDM2LjQ4MzgwMDMgMTI0LjYzMjg2NiwzNy4xNzIyMTM2IDEyNC42MzI4NjYsMzcuMTcyMjEzNiBDMTI0LjYzMjg2NiwzNy4xNzIyMTM2IDEyMy45MjE4MzksMzguNjg4OTI1OCAxMjMuNjY5Nzg3LDM5LjA5OTc3MDggQzEyMy40MTc3MzYsMzkuNTEwNjE1OSAxMjIuODQ0MjkxLDM5LjUxMjgxODggMTIyLjg0NDI5MSwzOS41MTI4MTg4IEwxMTQuODY0NDk3LDM5LjUxMjgxODggTDExNC44NjQ0OTcsNDQuMzMxNzExNyBDMTE0Ljg2NDQ5Nyw0NC45ODg0NTggMTE1LjU1MjQxLDQ1LjE1NzgwNzcgMTE1LjU1MjQxLDQ1LjE1NzgwNzcgTDEyNC4zNTc3MDEsNDUuMTU3ODA3NyBDMTI0Ljk5NjIyMiw0NS4xNTc4MDc3IDEyNS4xODMxOTcsNDUuNTcwODU1NiAxMjUuMTgzMTk3LDQ1LjU3MDg1NTYgQzEyNS4xODMxOTcsNDUuNTcwODU1NiAxMjYuMDU1MTk2LDQ2LjkzMjM5OTQgMTI2LjQyMTQ0MSw0Ny40OTg0MTI4IEMxMjYuNzg3ODIzLDQ4LjA2NDQyNjIgMTI2LjI4Mzg1OCw0OC4xODY4MjYxIDEyNi4yODM4NTgsNDguMTg2ODI2MSBMMTEyLjM4ODAwOSw0OC4xODY4MjYxIEMxMTEuODE0MTUxLDQ4LjE4NjgyNjEgMTExLjU2MjUxMyw0Ny4zNjA3MzAyIDExMS41NjI1MTMsNDcuMzYwNzMwMiBaIE0xMDMuNDE2NTAyLDQ2LjIxNzU1MTEgQzEwMy40MDcwMDgsNDcuNzk0NTY4MiAxMDIuNTg3ODQxLDQ4LjE0NjM0NzQgMTAyLjU4Nzg0MSw0OC4xNDYzNDc0IEMxMDIuNTg3ODQxLDQ4LjE0NjM0NzQgODguNDUyMDQ3OCw1Ni4zMTQ1MDg3IDg3LjUzMjk5NTYsNTYuODI2Mjc1MSBDODYuNjIyMzM2LDU3LjIxNzE1NjEgODYuMDEzNjcwMyw1Ni44MjYyNzUxIDg2LjAxMzY3MDMsNTYuODI2Mjc1MSBDODYuMDEzNjcwMyw1Ni44MjYyNzUxIDcxLjIyMjU3MDYsNDguMjQ3OTU3MiA3MC42ODI2OTYyLDQ3Ljg3MDg0NDQgQzcwLjE0MjY4NDMsNDcuNDkzNzMxNiA3MC4xMzAxNjQzLDQ2LjkwNjM3NzQgNzAuMTMwMTY0Myw0Ni45MDYzNzc0IEM3MC4xMzAxNjQzLDQ2LjkwNjM3NzQgNzAuMTQ1MDIzMiwyOS45MTk5MTc0IDcwLjEzMDE2NDMsMjkuMTMzMzM2NCBDNzAuMTE1MzA1MywyOC4zNDY2MTc3IDcxLjA5Njk1NzYsMjcuNzU1NTQ2MSA3MS4wOTY5NTc2LDI3Ljc1NTU0NjEgTDg1Ljg3NTUzNzMsMTkuMjEzNDM4NyBDODYuNzg1MzcxNCwxOC43MzMyMDE2IDg3LjY3MTEyODYsMTkuMjEzNDM4NyA4Ny42NzExMjg2LDE5LjIxMzQzODcgQzg3LjY3MTEyODYsMTkuMjEzNDM4NyAxMDAuNzI2NjIzLDI2LjgwMjA5MzcgMTAyLjE3MzQ0MiwyNy42MTc3MjU3IEMxMDMuNTkxNTA3LDI4LjI5MTk1NzcgMTAzLjQxNjUwMiwyOS42ODQzNDI0IDEwMy40MTY1MDIsMjkuNjg0MzQyNCBDMTAzLjQxNjUwMiwyOS42ODQzNDI0IDEwMy40MjUzMDcsNDQuNzUxOTE5MiAxMDMuNDE2NTAyLDQ2LjIxNzU1MTEgTDEwMy40MTY1MDIsNDYuMjE3NTUxMSBaIE05Ny41MTYwMTA1LDI5LjE2OTEzMzkgQzk0LjQ5MDAxNzMsMjcuNDI3NDQ4MyA4Ny4zNjE1ODQyLDIzLjI5NzEwNjMgODcuMzYxNTg0MiwyMy4yOTcxMDYzIEM4Ny4zNjE1ODQyLDIzLjI5NzEwNjMgODYuNjY2MTAzOSwyMi45MjEyMzI2IDg1Ljk1MTc3NDcsMjMuMjk3MTA2MyBMNzQuMzQ4NzQwNiwyOS45ODIxNSBDNzQuMzQ4NzQwNiwyOS45ODIxNSA3My41NzgwMDI1LDMwLjQ0NDkwMTQgNzMuNTg5Njk3LDMxLjA2MDQ4MDUgQzczLjYwMTM5MTUsMzEuNjc2MDU5NyA3My41ODk2OTcsNDQuOTY5ODcwOCA3My41ODk2OTcsNDQuOTY5ODcwOCBDNzMuNTg5Njk3LDQ0Ljk2OTg3MDggNzMuNTk5NDY1NCw0NS40Mjk1OTMyIDc0LjAyMzQ5NTEsNDUuNzI0NjQ3MiBDNzQuNDQ3Mzg3Myw0Ni4wMTk3MDExIDg2LjA2MDE4OTgsNTIuNzMzMjQ1MSA4Ni4wNjAxODk4LDUyLjczMzI0NTEgQzg2LjA2MDE4OTgsNTIuNzMzMjQ1MSA4Ni41MzgxNTIsNTMuMDM5MTc1OSA4Ny4yNTMwMzE1LDUyLjczMzI0NTEgQzg3Ljk3NDY1MjYsNTIuMzMyNzI2MiA5OS4wNzMwMzM1LDQ1Ljk0MDI1ODIgOTkuMDczMDMzNSw0NS45NDAyNTgyIEM5OS4wNzMwMzM1LDQ1Ljk0MDI1ODIgOTkuNzE2MjMyNSw0NS42NjQ4OTI5IDk5LjcyMzY2MTksNDQuNDMwNzA1NiBDOTkuNzI1NzI1Nyw0NC4wNzQ3OTU5IDk5LjcyNjU1MTIsNDIuNjkzMjg4MSA5OS43MjY2ODg3LDQwLjk1NzUyMjkgTDg2LjY2MDA1MDIsNDguODc1MjM5NCBMODYuNjYwMDUwMiw0NS44NDYyMjEgQzg2LjY2MDA1MDIsNDQuNjAyMTIwNSA4Ny42MjMxMjg5LDQzLjc4MDk4MTEgODcuNjIzMTI4OSw0My43ODA5ODExIEw5OS4xODA3NjA3LDM2LjgxNjU3OTMgQzk5LjYxNjg5NzgsMzYuMzYxMTI1MSA5OS43MDY4NzY4LDM1LjYzMTU0NDcgOTkuNzI1NDUwNSwzNS4zNTU2Mjg3IEM5OS43MjUwMzc4LDM0LjA5MDQ2MjcgOTkuNzI0NDg3NCwzMi45ODUyODQxIDk5LjcyNDA3NDcsMzIuMjg1MTY3OCBMODYuNjYwMDUwMiw0MC4yMDEyMzIxIEw4Ni42NjAwNTAyLDM3LjAzNDUzMSBDODYuNjYwMDUwMiwzNS43OTA0MzA1IDg3LjQ4NTU0NjIsMzUuMjQ0NjU2NCA4Ny40ODU1NDYyLDM1LjI0NDY1NjQgTDk3LjUxNjAxMDUsMjkuMTY5MTMzOSBaIiBpZD0iU2hhcGUtQ29weSI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+',
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
    title: 'hugging face',
    url: 'https://huggingface.co/',
    imgUrl: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
  },
  {
    id: 8,
    title: 'civitai',
    url: 'https://civitai.com/',
    imgUrl: getAssetsImg('civitai'),
  },
]
