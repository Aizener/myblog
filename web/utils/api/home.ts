import axios from '../request';

export const getTotal = () => {
  return axios.get('/common/total')
}