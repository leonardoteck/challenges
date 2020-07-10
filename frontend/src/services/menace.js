import axios from './axios';

const register = data => axios.post('/menace/register', data);

const list = () => axios.get('/menace/list');

const ranks = () => axios.get('/menace/ranks');

export default {
  register,
  list,
  ranks,
};
