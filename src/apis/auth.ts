import { LoginResponse } from 'types/auth';

import { axios } from '@apis/index';

const BASE_URL_AUTH = '/auth';
const BASE_URL_USER = '/users';

export const loginAPI = async (token: string): Promise<any> => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;

  const response = await axios.post<LoginResponse>(`${BASE_URL_AUTH}/login`);
  return response.data;
};

export const logoutAPI = async (): Promise<any> => {
  const response = await axios.delete(`${BASE_URL_AUTH}/logout`);
  return response.data;
};

export const unregisterAPI = async (): Promise<any> => {
  const response = await axios.delete(`${BASE_URL_USER}/me`);
  return response.data;
};
