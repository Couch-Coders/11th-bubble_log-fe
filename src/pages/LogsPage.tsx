import React from 'react';

import Layout from '@components/Layout';
import LogList from '@components/LogList';
import SearchFilter from '@components/SearchFilter';
import SearchInput from '@components/SearchInput';
import WriteLogButton from '@components/WriteLogButton';

const LogsPage: React.FC = () => {
  return (
    <Layout>
      <SearchInput />
      <SearchFilter type="diveType" />
      <SearchFilter type="depth" />
      <SearchFilter type="location" />
      <SearchFilter type="temperature" />
      <LogList />
      <WriteLogButton />
    </Layout>
  );
};

export default LogsPage;
