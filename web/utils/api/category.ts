import axios from '../request';

export const getActivityCategory = () => {
  return axios.get('/category/list/activity');
}