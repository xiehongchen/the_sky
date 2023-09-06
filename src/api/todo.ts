import request from '@/utils/request'

export const getAllCompletedTodo = () => {
  return request.get('/todo/completedList')
}
export const getAllIncompletedTodo = (params = {}) => {
  return request.get('/todo/incompleteList', params)
}

// status:  0:待办，1：已完成，2：未完成，3：推迟，4：取消
export const getAllTodo = (params = { status: 0 }) => {
  return request.get(`/todo/list?status=${params.status}`)
}

export const addTodo = (params = {}) => {
  return request.post('/todo/addTodo', params)
}
