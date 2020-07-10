import axios from './axios';

const register = data => axios.post('/hero/register', data);

const list = () => axios.get('/hero/list');

const ranks = () => axios.get('/hero/ranks');

const remove = id => axios.delete(`/hero/remove?id=${id}`);

export default {
  register,
  list,
  ranks,
  remove,
};
