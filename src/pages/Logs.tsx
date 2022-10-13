import React from 'react';

import LogList from '@components/LogList';
import SearchFilter from '@components/SearchFilter';
import SearchInput from '@components/SearchInput';
import WriteLogButton from '@components/WriteLogButton';

const Logs: React.FC = () => {
  return (
    <main>
      <SearchInput />
      <SearchFilter type="diveType" />
      <SearchFilter type="depth" />
      <SearchFilter type="location" />
      <SearchFilter type="temperature" />
      <LogList />
      <WriteLogButton />
    </main>
  );
};

export default Logs;
