import axios from '../request';

export const getMusicList = (page: number, size: number) => {
  return axios.get('/music/list');
}