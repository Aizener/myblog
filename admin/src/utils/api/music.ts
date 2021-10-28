import request from '../request'

export const getMusicList = (params?: any) => {
  return request.get('/music/list', { params });
}

export const addMusic = (form: any) => {
  return request.post('/music/save', form);
}

export const editMusic = (form: any) => {
  return request.put('/music/save', form);
}

export const removeMusic = (id: number) => {
  return request.delete(`/music/remove/${id}`);
}

export const removeMusicMulti = (ids: Array<number>) => {
  return request.delete(`/music/remove`, {
    data: {
      ids
    }
  });
}