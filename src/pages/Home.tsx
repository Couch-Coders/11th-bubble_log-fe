import React from 'react'
import { useDispatch, useSelector } from '@stores/index'
import { fetchHotCoffees, fetchHotCoffeesWithError } from '@stores/coffeeSlice'
import { stringify } from 'querystring'

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const { data, isLoading, error } = useSelector((state) => state.coffee)

  const onClickFetchButton = async (): Promise<void> => {
    await dispatch(fetchHotCoffees())
  }

  const onClickFetchButtonWithError = async (): Promise<void> => {
    await dispatch(fetchHotCoffeesWithError())
  }

  return (
    <>
      {isLoading && <p>loading...</p>}
      {(error != null) && <p>error</p>}
      {data.map((coffee) => (
        <p key={coffee.id}>{coffee.title}</p>
      ))}
      <button onClick={() => { void onClickFetchButton() }}>Fetch</button>
      <button onClick={() => { void onClickFetchButtonWithError() }}>Fetch With Error</button>
    </>
  )
}

export default Home
