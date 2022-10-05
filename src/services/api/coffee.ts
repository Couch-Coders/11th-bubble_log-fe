import { axiosTest } from "@services/api/index";

export const getHotCoffees = () =>
  axiosTest.get<GetHotCoffeesResponseType>("/coffee/hot");

export const getHotCoffeesWithError = () =>
  axiosTest.get<GetHotCoffeesResponseType>("/coffeeeeeeeeee/hot");
