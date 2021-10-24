import request from '../request'

export const getTagList = (params?: any) => {
  return request.get('/tag/list', { params });
}

export const addTag = (form: any) => {
  return request.post('/tag/save', form);
}

export const editTag = (form: any) => {
  return request.put('/tag/save', form);
}

export const removeTag = (id: number) => {
  return request.delete(`/tag/remove/${id}`);
}

export const removeTagMulti = (ids: Array<number>) => {
  return request.delete(`/tag/remove`, {
    data: {
      ids
    }
  });
}