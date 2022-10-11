import qs from 'qs'

export const createQueryString = (query: object): string => {
  const filteredQueryObject = Object.fromEntries(Object.entries(query).filter((entry) => entry[1] !== ''))

  const queryString = qs.stringify(filteredQueryObject)

  return queryString === '' ? '' : `?${queryString}`
}
