import request from '@/utils/request'

export const getAllCompletedTodo = () => {
  return request.get('/todo/completedList')
}
export const getAllIncompletedTodo = (params = {}) => {
  return request.get('/todo/incompleteList', params)
}

export const getAllTodo = (params = {}) => {
  return request.get('/todo/list', params)
}

export const addTodo = (params = {}) => {
  return request.post('/todo/addTodo', params)
}
