import request from '../request'

export const getCategoryList = (params?: any) => {
  return request.get('/category/list', { params });
}

export const addCategory = (form: any) => {
  return request.post('/category/save', form);
}

export const editCategory = (form: any) => {
  return request.put('/category/save', form);
}

export const removeCategory = (id: number) => {
  return request.delete(`/category/remove/${id}`);
}

export const removeCategoryMulti = (ids: Array<number>) => {
  return request.delete(`/category/remove`, {
    data: {
      ids
    }
  });
}