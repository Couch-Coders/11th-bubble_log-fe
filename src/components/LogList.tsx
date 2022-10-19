import { useSelector } from '@stores/index';
import React, { useRef } from 'react';

import LogListItem from '@components/LogListItem';

const LogList: React.FC = () => {
  const { logList, isLoading } = useSelector((state) => state.log);

  const observerRef = useRef<HTMLDivElement | null>(null);

  // const handleIntersect = () => {
  //   if (data === null || error !== null || isLoading || data.last) return;
  //   void dispatch(fetchLogs(query));
  // };

  // useInfiniteScroll(observerRef.current, handleIntersect);

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
