import { axiosTest } from '@services/api/index'

export const getHotCoffees = async (): Promise<any> =>
  await axiosTest.get<GetHotCoffeesResponseType>('/coffee/hot')

export const getHotCoffeesWithError = async (): Promise<any> =>
  await axiosTest.get<GetHotCoffeesResponseType>('/coffeeeeeeeeee/hot')
