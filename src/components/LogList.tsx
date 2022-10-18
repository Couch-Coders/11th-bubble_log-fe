import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { useDispatch, useSelector } from '@stores/index';
import { fetchLogs, fetchLogsMore, logActions } from '@stores/slices/log';
import React, { useEffect, useRef } from 'react';

import LogListItem from '@components/LogListItem';

const LogList: React.FC = () => {
  const { data, logList, isLoading, error, query } = useSelector(
    (state) => state.log,
  );

  const {
    startDate,
    endDate,
    diveType,
    minDepth,
    maxDepth,
    location,
    minTemperature,
    maxTemperature,
    keyword,
    orderBy,
  } = query;

  const dispatch = useDispatch();

  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleIntersect = () => {
    if (data === null || error !== null || isLoading || data.last) return;
    void dispatch(fetchLogsMore(query));
  };

  useInfiniteScroll(observerRef.current, handleIntersect);

  useEffect(() => {
    void dispatch(fetchLogs(query));

    return () => {
      dispatch(logActions.clearData());
    };
  }, [
    startDate,
    endDate,
    diveType,
    minDepth,
    maxDepth,
    location,
    minTemperature,
    maxTemperature,
    keyword,
    orderBy,
  ]);

  return (
    <>
      {isLoading && <p>loading...</p>}
      {logList.map((data, index) => (
        <LogListItem key={index} data={data} />
      ))}
      <div
        style={{ height: '2rem', border: '1px solid red' }}
        ref={observerRef}
      >
        옵저버
      </div>
    </>
  );
};

export default LogList;
