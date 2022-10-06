import { axiosTest } from '@apis/index'

export const getHotCoffees = async (): Promise<any> => {
  const response = await axiosTest.get<GetHotCoffeesResponseType>('/coffee/hot')
  return response.data
}

export const getHotCoffeesWithError = async (): Promise<any> => {
  const response = await axiosTest.get<GetHotCoffeesResponseType>(
    '/coffeeeeeeeeee/hot'
  )
  return response.data
}
