import axios from './axios';

let authorized = false;

const signIn = async (data) => {
  const { data: result } = await axios.post('/auth/login', data);
  defineAuthToken(result.accessToken);
  authorized = true;
};

const register = async (data) => {
  await axios.post('/user/register', data);
  await signIn(data);
};

const defineAuthToken = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const isAuthorized = () => authorized;

export default {
  signIn,
  register,
  isAuthorized,
};
