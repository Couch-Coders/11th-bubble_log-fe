import axiosInstance from 'axios';

import { BASE_URL } from '@utils/constants';

export const axios = axiosInstance.create({
  baseURL: BASE_URL,
});
