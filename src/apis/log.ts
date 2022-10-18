import {
  CreateLogImagesBody,
  CreateLogImagesResponse,
  CreateLogResponse,
  GetLogDetailResponse,
  GetLogsQuery,
  GetLogsResponse,
  LogBody,
  ToggleLogFavoriteRepsonse,
  UpdateLogResponse,
} from 'types/log';

import { axios } from '@apis/index';
import { filterQueryObject } from '@utils/filterQueryObject';

const BASE_URL_LOGS = '/logs';

export const createLogAPI = async (body: LogBody): Promise<any> => {
  const response = await axios.post<CreateLogResponse>(
    `${BASE_URL_LOGS}`,
    body,
  );
  return response.data;
};

export const updateLogAPI = async (
  body: LogBody,
  logId: string,
): Promise<any> => {
  const response = await axios.put<UpdateLogResponse>(
    `${BASE_URL_LOGS}/${logId}`,
    body,
  );
  return response.data;
};

export const deleteLogAPI = async (logId: string): Promise<any> => {
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

export const getLogDetailAPI = async (logId: string): Promise<any> => {
  const response = await axios.get<GetLogDetailResponse>(
    `${BASE_URL_LOGS}/${logId}`,
  );
  return response.data;
};

export const toggleLogFavoriteAPI = async (logId: string): Promise<any> => {
  const response = await axios.put<ToggleLogFavoriteRepsonse>(
    `${BASE_URL_LOGS}/${logId}/favorite`,
  );
  return response.data;
};

export const createLogImagesAPI = async (
  body: CreateLogImagesBody,
  logId: string,
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
  logId: string,
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
