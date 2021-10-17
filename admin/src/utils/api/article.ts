import { ArticleType } from '@/config/type';
import request from '../request'

export const addArticle = (form: ArticleType) => {
  return request.post('/article/add', form);
}
