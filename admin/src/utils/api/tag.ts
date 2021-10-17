import request from '../request'

export const getTag = () => {
  return request.get('/tag');
}
