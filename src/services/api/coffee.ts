import { axiosTest } from ".";

export const getHotCoffees = () =>
  axiosTest.get<GetHotCoffeesResponseType>("/coffee/hot");

export const getHotCoffeesWithError = () =>
  axiosTest.get<GetHotCoffeesResponseType>("/coffeeeeeeeeee/hot");
