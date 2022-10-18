import {
  CreateLogBody,
  CreateLogImagesBody,
  CreateLogImagesResponse,
  CreateLogResponse,
  GetLogDetailResponse,
  GetLogsQuery,
  GetLogsResponse,
  ToggleLogFavoriteRepsonse,
  UpdateLogBody,
  UpdateLogResponse,
} from 'types/log';

import { axios } from '@apis/index';
import { filterQueryObject } from '@utils/createQueryString';
// import { createQueryString } from '@utils/createQueryString';

const BASE_URL_LOGS = '/logs';

export const createLogAPI = async (body: CreateLogBody): Promise<any> => {
  const response = await axios.post<CreateLogResponse>(
    `${BASE_URL_LOGS}`,
    body,
  );
  return response.data;
};

export const updateLogAPI = async (
  body: UpdateLogBody,
  logId: number,
): Promise<any> => {
  const response = await axios.put<UpdateLogResponse>(
    `${BASE_URL_LOGS}/${logId}`,
    body,
  );
  return response.data;
};

export const deleteLogAPI = async (logId: number): Promise<any> => {
  const response = await axios.delete(`${BASE_URL_LOGS}/${logId}`);
  return response.data;
};

export const getLogsAPI = async (query: GetLogsQuery): Promise<any> => {
  const filteredQueryObject = filterQueryObject(query);
  const response = await axios.get<GetLogsResponse>(`${BASE_URL_LOGS}`, {
    params: filteredQueryObject,
  });
  return response.data;
};

export const getLogDetailAPI = async (logId: number): Promise<any> => {
  const response = await axios.get<GetLogDetailResponse>(
    `${BASE_URL_LOGS}/${logId}`,
  );
  return response.data;
};

export const toggleLogFavoriteAPI = async (logId: number): Promise<any> => {
  const response = await axios.put<ToggleLogFavoriteRepsonse>(
    `${BASE_URL_LOGS}/${logId}/favorite`,
  );
  return response.data;
};

export const createLogImagesAPI = async (
  body: CreateLogImagesBody,
  logId: number,
): Promise<any> => {
  const response = await axios.post<CreateLogImagesResponse>(
    `${BASE_URL_LOGS}/${logId}/images`,
    body,
  );
  return response.data;
};

export const getLogImageAPI = async (
  logId: number,
  imageName: string,
): Promise<any> => {
  const response = await axios.get(
    `${BASE_URL_LOGS}/${logId}/images/${imageName}`,
  );
  return response.data;
};

export const deleteLogImageAPI = async (
  logId: number,
  imageName: string,
): Promise<any> => {
  const response = await axios.delete(
    `${BASE_URL_LOGS}/${logId}/images/${imageName}`,
  );
  return response.data;
};

export const getDiveTypeAPI = async (): Promise<any> => {
  const response = await axios.get('/diveTypes');
  return response.data;
};

export const getLocationAPI = async (): Promise<any> => {
  const response = await axios.get('/locations');
  return response.data;
};
