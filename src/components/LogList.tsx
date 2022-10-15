import { useDispatch, useSelector } from '@stores/index';
import { fetchLogs, logActions } from '@stores/slices/log';
import React, { useEffect } from 'react';
import { LogResponse } from 'types/log';

import LogListItem from './LogListItem';

interface ReturnType {
  data: LogResponse[];
  isLoading: boolean;
}

const useLogList = (): ReturnType => {
  const { data, isLoading, query } = useSelector((state) => state.log);

  console.log('@data', data);
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
      {data?.map((data) => (
        <LogListItem key={data.id} data={data} />
      ))}
    </>
  );
};

export default LogList;
