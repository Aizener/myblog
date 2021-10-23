import request from '../request'

export const getTagList = () => {
  return request.get('/tag/list');
}

export const addTag = (form: any) => {
  return request.post('/tag/save', form);
}

export const editArticle = (form: any) => {
  return request.put('/article/save', form);
}

export const removeArticle = (id: number) => {
  return request.delete(`/article/remove/${id}`);
}

export const removeArticleMulti = (ids: Array<number>) => {
  return request.delete(`/article/remove/multi`, {
    data: {
      ids
    }
  });
}