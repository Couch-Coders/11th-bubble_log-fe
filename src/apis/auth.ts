import { LoginResponse } from 'types/auth';

import { axios } from '@apis/index';

export const loginAPI = async (token: string): Promise<any> => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;

  const response = await axios.post<LoginResponse>('/auth/login');
  return response.data;
};

export const logoutAPI = async (): Promise<any> => {
  const response = await axios.delete('/auth/logout');
  return response.data;
};

export const unregisterAPI = async (): Promise<any> => {
  const response = await axios.delete('/users/me');
  return response.data;
};
