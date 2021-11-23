import request from '../request'

export const getArticle = (id: number) => {
  return request.get(`/article/${id}`)
}

export const getArticleList = (params: any) => {
  return request.get('/article/list', { params });
}

export const addArticle = (form: any) => {
  return request.post('/article/save', form);
}

export const editArticle = (form: any) => {
  return request.put('/article/save', form);
}

export const removeArticle = (id: number) => {
  return request.delete(`/article/remove/${id}`);
}

export const removeArticleMulti = (ids: Array<number>) => {
  return request.delete(`/article/remove`, {
    data: {
      ids
    }
  });
}