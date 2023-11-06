import request from '@/utils/request'

export const getAllArticle = (params = {}) => {
  return request.post('/article/list', params)
}

export const addArticleByUrl = (params = {}) => {
  return request.post('/article/addByUrl', params)
}
export const addArticle = (params = {}) => {
  return request.post('/article/add', params)
}

export const editArticle = (params = {}) => {
  return request.post('/article/edit', params)
}

export const deleteAticle = (params = {}) => {
  return request.post('/article/delete', params)
}

export const selectTitleAticle = (params = {}) => {
  return request.post('/article/select', params)
}
