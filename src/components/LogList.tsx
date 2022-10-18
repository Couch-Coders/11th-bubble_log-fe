import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { useDispatch, useSelector } from '@stores/index';
import { fetchLogs, fetchLogsMore } from '@stores/slices/log';
import React, { useEffect, useRef } from 'react';

import LogListItem from './LogListItem';

const LogList: React.FC = () => {
  const { data, isLoading, error, query } = useSelector((state) => state.log);

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

  const handleIntersect = (): void => {
    if (data === null || error !== null || isLoading) return;
    void dispatch(fetchLogsMore(query));
  };

  useInfiniteScroll(observerRef.current, handleIntersect);

  useEffect(() => {
    void dispatch(fetchLogs(query));
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
      {data?.map((data, index) => (
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
