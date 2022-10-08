import { axios } from '@apis/index'

export const createLogAPI = async (body: CreateLogBody): Promise<any> => {
  const response = await axios.post<CreateLogResponse>('/logs', body)
  return response.data
}

export const updateLogAPI = async (
  body: UpdateLogBody,
  id: number
): Promise<any> => {
  const response = await axios.patch<UpdateLogResponse>(`/logs/${id}`, body)
  return response.data
}

export const deleteLogAPI = async (id: number): Promise<any> => {
  const response = await axios.delete(`/logs/${id}`)
  return response.data
}

export const getLogsAPI = async (query: GetLogsQuery): Promise<any> => {
  const queryObject = {
    ...query
  }
  const queryString = new URLSearchParams(queryObject).toString()
  const response = await axios.get<GetLogsResponse>(`/logs?${queryString}`)
  return response.data
}

export const getLogDetailAPI = async (id: number): Promise<any> => {
  const response = await axios.get<GetLogDetailResponse>(`/logs/${id}`)
  return response.data
}
