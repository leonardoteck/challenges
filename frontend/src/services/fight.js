import axios from './axios';

const list = () => axios.get('/fight/list');

const endFight = id => axios.get(`/fight/end?id=${id}`);

export default {
  list,
  endFight,
};
