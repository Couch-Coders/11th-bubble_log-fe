import { SerializedError } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from '@stores/index';
import { fetchLogs } from '@stores/slices/log';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogWithId } from 'types/log';

interface ReturnType {
  data: LogWithId[];
  isLoading: boolean;
  error: SerializedError | null;
}

const useLogList = (): ReturnType => {
  const { data, isLoading, error, query } = useSelector((state) => state.log);

  const dispatch = useDispatch();

  useEffect(() => {
    const promise = dispatch(fetchLogs(query));

    return () => {
      promise.abort();
    };
  }, [query]);

  return { data, isLoading, error };
};

const LogList: React.FC = () => {
  const { data, isLoading, error } = useLogList();

  console.log('@data', data);

  return (
    <>
      {isLoading && <p>loading...</p>}
      {error !== null && <p>error</p>}

      {data?.map((log) => (
        <Link to={`/log/${log.id}`} key={log.id}>
          <p>{log.location}</p>
          <p>{log.date.toString()}</p>
        </Link>
      ))}
    </>
  );
};

export default LogList;
