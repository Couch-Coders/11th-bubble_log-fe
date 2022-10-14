import { useDispatch, useSelector } from '@stores/index';
import { fetchLogs, logActions } from '@stores/slices/log';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogWithId } from 'types/log';

interface ReturnType {
  data: LogWithId[];
  isLoading: boolean;
}

const useLogList = (): ReturnType => {
  const { data, isLoading, query } = useSelector((state) => state.log);

  const dispatch = useDispatch();

  useEffect(() => {
    const promise = dispatch(fetchLogs(query));

    return () => {
      promise.abort();
      dispatch(logActions.clearData());
    };
  }, [query]);

  return { data, isLoading };
};

const LogList: React.FC = () => {
  const { data, isLoading } = useLogList();

  console.log('@data', data);

  return (
    <>
      {isLoading && <p>loading...</p>}
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
