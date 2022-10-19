import { axios } from '@lib/apis/index';
import { LoginResponse } from '@lib/types/auth';

const BASE_URL_AUTH = '/auth';
const BASE_URL_USER = '/users';

const logIn = async (token: string) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;

  const response = await axios.post<LoginResponse>(`${BASE_URL_AUTH}/login`);
  return response.data;
};

const logOut = async () => {
  const response = await axios.delete(`${BASE_URL_AUTH}/logout`);
  return response.data;
};

const unregister = async () => {
  const response = await axios.delete(`${BASE_URL_USER}/me`);
  return response.data;
};

export const authAPI = {
  logIn,
  logOut,
  unregister,
};
