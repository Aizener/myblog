import { ArticleType } from '@/config/type';
import request from '../request'

export const getArticleList = (params: any) => {
  return request.get('/article', { params });
}

export const addArticle = (form: any) => {
  return request.post('/article/save', form);
}

export const editArticle = (form: any) => {
  return request.put('/article/save', form);
}
