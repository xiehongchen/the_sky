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
