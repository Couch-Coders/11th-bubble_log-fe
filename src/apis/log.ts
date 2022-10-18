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

const createLog = async (body: LogBody) => {
  const response = await axios.post<CreateLogResponse>(
    `${BASE_URL_LOGS}`,
    body,
  );
  return response.data;
};

const updateLog = async (body: LogBody, logId: string) => {
  const response = await axios.put<UpdateLogResponse>(
    `${BASE_URL_LOGS}/${logId}`,
    body,
  );
  return response.data;
};

const deleteLog = async (logId: string) => {
  const response = await axios.delete(`${BASE_URL_LOGS}/${logId}`);
  return response.data;
};

const getLogs = async (query: GetLogsQuery) => {
  const filteredQueryObject = filterQueryObject(query);
  const response = await axios.get<GetLogsResponse>(`${BASE_URL_LOGS}`, {
    params: filteredQueryObject,
  });
  return response.data;
};

const getLogDetail = async (logId: string) => {
  const response = await axios.get<GetLogDetailResponse>(
    `${BASE_URL_LOGS}/${logId}`,
  );
  return response.data;
};

const toggleLogFavorite = async (logId: string) => {
  const response = await axios.put<ToggleLogFavoriteRepsonse>(
    `${BASE_URL_LOGS}/${logId}/favorite`,
  );
  return response.data;
};

const createLogImages = async (body: CreateLogImagesBody, logId: string) => {
  const response = await axios.post<CreateLogImagesResponse>(
    `${BASE_URL_LOGS}/${logId}/images`,
    body,
  );
  return response.data;
};

const getLogImage = async (logId: number, imageName: string) => {
  const response = await axios.get(
    `${BASE_URL_LOGS}/${logId}/images/${imageName}`,
  );
  return response.data;
};

const deleteLogImage = async (logId: string, imageName: string) => {
  const response = await axios.delete(
    `${BASE_URL_LOGS}/${logId}/images/${imageName}`,
  );
  return response.data;
};

const getDiveType = async () => {
  const response = await axios.get('/diveTypes');
  return response.data;
};

const getLocation = async () => {
  const response = await axios.get('/locations');
  return response.data;
};

export const logAPI = {
  createLog,
  updateLog,
  deleteLog,
  getLogs,
  getLogDetail,
  toggleLogFavorite,
  createLogImages,
  getLogImage,
  deleteLogImage,
  getDiveType,
  getLocation,
};
