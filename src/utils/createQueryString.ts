export const filterQueryObject = (query: object): object => {
  const filteredQueryObject = Object.fromEntries(
    Object.entries(query).filter((entry) => entry[1] !== ''),
  );

  return filteredQueryObject;
};
