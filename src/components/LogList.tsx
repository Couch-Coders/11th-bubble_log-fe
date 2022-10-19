import { useSelector } from '@store/index';
import React from 'react';

import LogListItem from '@components/LogListItem';

const LogList: React.FC = () => {
  const { logList, isLoading } = useSelector((state) => state.log);

  return (
    <>
      {isLoading && <p>loading...</p>}
      {logList.map((data, index) => (
        <LogListItem
          key={index}
          isFavorite={data.isFavorite}
          logId={String(data.id)}
          location={data.location}
          date={data.date}
        />
      ))}
    </>
  );
};

export default LogList;
