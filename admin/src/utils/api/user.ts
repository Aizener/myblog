import request from '../request'

export const login = (params?: any) => {
  return request.post('/login', params)
}

export const getUserInfo = (params?: any) => {
  return request.post('/getUserInfo', params)
}

export const getUserList = (params?: any) => {
  return request.get('/user/list', { params });
}

export const addUser = (form: any) => {
  return request.post('/user/save', form);
}

export const editUser = (form: any) => {
  return request.put('/user/save', form);
}

export const removeUser = (id: number) => {
  return request.delete(`/user/remove/${id}`);
}

export const removeUserMulti = (ids: Array<number>) => {
  return request.delete(`/user/remove`, {
    data: {
      ids
    }
  });
}