import request from '../request'

export const getDiaryList = (params: any) => {
  return request.get('/diary/list', { params });
}

export const addDiary = (form: any) => {
  return request.post('/diary/save', form);
}

export const editDiary = (form: any) => {
  return request.put('/diary/save', form);
}

export const removeDiary = (id: number) => {
  return request.delete(`/diary/remove/${id}`);
}

export const removeDiaryMulti = (ids: Array<number>) => {
  return request.delete(`/diary/remove`, {
    data: {
      ids
    }
  });
}