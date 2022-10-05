import React from "react";
import { useDispatch, useSelector } from "@stores/index";
import { fetchHotCoffees, fetchHotCoffeesWithError } from "@stores/coffeeSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.coffee);

  const onClickFetchButton = async () => {
    await dispatch(fetchHotCoffees());
  };

  const onClickFetchButtonWithError = async () => {
    await dispatch(fetchHotCoffeesWithError());
  };

  return (
    <>
      {isLoading && <p>loading...</p>}
      {error && <p>error</p>}
      {data.map((coffee) => (
        <p key={coffee.id}>{coffee.title}</p>
      ))}
      <button onClick={onClickFetchButton}>Fetch</button>
      <button onClick={onClickFetchButtonWithError}>Fetch With Error</button>
    </>
  );
};

export default Home;
