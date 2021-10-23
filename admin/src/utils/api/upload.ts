import request  from '../request';
// import Axios from 'axios'
import { qiniuUpload } from '@/config';

export const getQiniuToken = () => {
  return request.get('/upload/qiniu/token');
}

// export const uploadQiniuFile = (token: string, file: File) => {
//   const form = new FormData();
//   form.append('file', file);
//   form.append('token', token);
//   return Axios.post(qiniuUpload, form);
// }