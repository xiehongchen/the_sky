import request from '@/utils/request'

export const getAllCompletedTask = () => {
  return request.get('/task/completedList')
}
export const getAllIncompletedTask = (params = {}) => {
  return request.get('/task/incompleteList', params)
}

// status:  0:待办，1：已完成，2：未完成，3：推迟，4：取消
export const getAllTask = (params = { status: 0 }) => {
  return request.get(`/task/list?status=${params.status}`)
}

export const addTask = (params = {}) => {
  return request.post('/task/add', params)
}
