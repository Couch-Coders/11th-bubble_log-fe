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
import { createQueryString } from '@utils/createQueryString';

export const createLogAPI = async (body: CreateLogBody): Promise<any> => {
  const response = await axios.post<CreateLogResponse>('/logs', body);
  return response.data;
};

export const updateLogAPI = async (
  body: UpdateLogBody,
  logId: number,
): Promise<any> => {
  const response = await axios.patch<UpdateLogResponse>(`/logs/${logId}`, body);
  return response.data;
};

export const deleteLogAPI = async (logId: number): Promise<any> => {
  const response = await axios.delete(`/logs/${logId}`);
  return response.data;
};

export const getLogsAPI = async (query: GetLogsQuery): Promise<any> => {
  const queryString = createQueryString(query);
  const response = await axios.get<GetLogsResponse>(`/logs${queryString}`);
  return response.data;
};

export const getLogDetailAPI = async (logId: number): Promise<any> => {
  const response = await axios.get<GetLogDetailResponse>(`/logs/${logId}`);
  return response.data;
};

export const toggleLogFavoriteAPI = async (logId: number): Promise<any> => {
  const response = await axios.put<ToggleLogFavoriteRepsonse>(
    `/logs/${logId}/favorite`,
  );
  return response.data;
};

export const createLogImagesAPI = async (
  body: CreateLogImagesBody,
  logId: number,
): Promise<any> => {
  const response = await axios.post<CreateLogImagesResponse>(
    `/logs/${logId}/images`,
    body,
  );
  return response.data;
};

export const getLogImageAPI = async (
  logId: number,
  imageName: string,
): Promise<any> => {
  const response = await axios.get(`/logs/${logId}/images/${imageName}`);
  return response.data;
};

export const deleteLogImageAPI = async (
  logId: number,
  imageName: string,
): Promise<any> => {
  const response = await axios.delete(`/logs/${logId}/images/${imageName}`);
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
