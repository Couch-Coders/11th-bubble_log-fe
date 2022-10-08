import { axios } from '@apis/index'

export const loginAPI = async (token: string): Promise<any> => {
  const response = await axios.get<LoginResponse>('/auth/login', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const logoutAPI = async (): Promise<any> => {
  const response = await axios.delete('/auth/logout')
  return response.data
}

export const unregisterAPI = async (): Promise<any> => {
  const response = await axios.delete('/users/me')
  return response.data
}
