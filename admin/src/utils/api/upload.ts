import request  from '../request';

export const getQiniuToken = () => {
  return request.get('/upload/qiniu/token');
}