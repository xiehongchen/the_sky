import request from '@/utils/request'

export const getAllCompletedTask = () => {
  return request.get('/task/completedList')
}
export const getAllIncompletedTask = (params = {}) => {
  return request.get('/task/incompleteList', params)
}

// status: 0: 待办，1：已完成，2：未完成，3：推迟，4：取消
/**
 * 0:待办  create_time
 * 1：已完成  finish_time
 * 2：预期完成  expect_time
 * 3：推迟  delay_time
 * 4：取消  cancel_time
 */
export const getAllTask = (params = {}) => {
  return request.post('/task/list', params)
}

export const addTask = (params = {}) => {
  return request.post('/task/add', params)
}

export const finishTask = (params = {}) => {
  return request.post('/task/finish', params)
}

export const deleteTask = (params = {}) => {
  return request.post('/task/delete', params)
}

export const delayTask = (params = {}) => {
  return request.post('/task/delay', params)
}
