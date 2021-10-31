import axios from '../request'

export const getActivityTags = () => {
  return axios.get('/tag/list/activity');
}