import axios from '../request';

export const getArticleList = (params: any) => {
  return axios.get('/article/list', {
    params: params
  });
}

export const getArticleById = (id: number) => {
  return axios.get(`/article/${id}`);
}