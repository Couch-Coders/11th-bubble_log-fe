import { SerializedError } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from '@stores/index'
import { fetchLogs } from '@stores/slices/log'
import React, { useEffect } from 'react'

interface ReturnType {
  data: LogWithId[]
  isLoading: boolean
  error: SerializedError | null
}

const useLogList = (): ReturnType => {
  const { data, isLoading, error } = useSelector(state => state.log)
  const query = useSelector(state => state.log.query)

  const dispatch = useDispatch()

  useEffect(() => {
    void dispatch(fetchLogs(query))
  }, [query])

  return { data, isLoading, error }
}

const LogList: React.FC = () => {
  const { data, isLoading, error } = useLogList()

  return (
    <>
      {isLoading && <p>loading...</p>}
      {error !== null && <p>error</p>}
      {data.map((log) => (
        <div key={log.id}>
          <p>{log.location}</p>
          <p>{log.date.toString()}</p>
        </div>
      ))}
    </>
  )
}

export default LogList
