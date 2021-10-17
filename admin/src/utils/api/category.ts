import request from '../request'

export const getCategory = () => {
  return request.get('/category');
}
