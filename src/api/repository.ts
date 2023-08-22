import request from '@/utils/request'

export const getAllArticle = (params = {}) => {
  request.get('/list', params)
}
