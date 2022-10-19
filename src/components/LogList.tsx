import { useSelector } from '@stores/index';
import React from 'react';

import LogListItem from '@components/LogListItem';

const LogList: React.FC = () => {
  const { logList, isLoading } = useSelector((state) => state.log);

  return (
    <>
      {isLoading && <p>loading...</p>}
      {logList.map((data, index) => (
        <LogListItem key={index} data={data} />
      ))}
    </>
  );
};

export default LogList;
