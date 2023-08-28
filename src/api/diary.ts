import request from '@/utils/request'

export const getAllDiary = (params = {}) => {
  return request.post('/diary/list', params)
}
