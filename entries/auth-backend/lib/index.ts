import axios from 'axios';

export const getApi = (baseURL = '') => {
  const instance = axios.create({
    baseURL: `${baseURL}/auth-backend/api`,
  });

  return {
    authGoogle: () => instance.get('/auth/google'),
  };
};
