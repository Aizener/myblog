import axios from '../request';

export const getArticleList = () => {
  return axios.get('/article/list');
}

export const getArticleById = (id: number) => {
  return axios.get(`/article/${id}`);
}