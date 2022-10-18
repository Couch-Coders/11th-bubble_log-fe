import React from 'react';

import Stack from '@components/common/Stack';
import Layout from '@components/Layout';
import LogList from '@components/LogList';
import SearchFilterGroup from '@components/SearchFilterGroup';
import SearchInput from '@components/SearchInput';
import WriteLogButton from '@components/WriteLogButton';

const LogsPage: React.FC = () => {
  return (
    <Layout>
      <Stack spacing={2} p={2}>
        <WriteLogButton />
        <SearchInput />
        <SearchFilterGroup />
        <LogList />
      </Stack>
    </Layout>
  );
};

export default LogsPage;
