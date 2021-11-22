import axios from '../request';

export const getArticleList = (params: any) => {
  return axios.get('/article/list', {
    params: params
  });
}

export const getArticleById = (id: number) => {
  return axios.get(`/article/${id}`);
}

export const addArticleView = (id: number) => {
  return axios.post(`/article/view/${id}`);
}

export const addArticleGood = (id: number) => {
  return axios.post(`/article/good/${id}`);
}