// mock.ts
import Mock from 'mockjs'

// 使用 Mock.mock() 创建模拟数据
Mock.mock('/api/users', 'get', {
  'data|10': [
    {
      'id|+1': 1,
      name: '@cname',
      age: '@integer(20, 40)',
      address: '@city',
    },
  ],
})

const users = [
  { name: '123', password: '123', username: '谢红尘' },
  { name: 'admin', password: 'admin', username: '管理员' },
]

Mock.mock('/api/login', 'post', (options) => {
  const { name, password } = JSON.parse(options.body)
  console.log(name)
  console.log(password)
  const user = users.find(
    (u) => name._value === u.name && password._value === u.password,
  )
  console.log('user', user)
  if (user) {
    return {
      message: '登录成功',
      data: user,
    }
  }
})
