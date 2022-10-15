import React from 'react';

import Layout from '@components/Layout';
import LogList from '@components/LogList';
import SearchFilterGroup from '@components/SearchFilterGroup';
import SearchInput from '@components/SearchInput';
import WriteLogButton from '@components/WriteLogButton';

const LogsPage: React.FC = () => {
  return (
    <Layout>
      <SearchInput />
      <SearchFilterGroup />
      <LogList />
      <WriteLogButton />
    </Layout>
  );
};

export default LogsPage;
