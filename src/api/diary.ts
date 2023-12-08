import request from '@/utils/request'

export const getAllDiary = (params = {}) => {
  return request.post('/diary/list', params)
}

export const addDiary = (params = {}) => {
  return request.post('/diary/add', params)
}
