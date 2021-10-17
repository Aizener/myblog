import { ArticleType } from '@/config/type';
import request from '../request'

export const getArticleList = (params: any) => {
  return request.get('/article', { params });
}

export const addArticle = (form: any) => {
  return request.post('/article/add', form);
}
