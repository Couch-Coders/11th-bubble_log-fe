import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@components/common/Button';
import Stack from '@components/common/Stack';
import Layout from '@components/Layout';
import LogList from '@components/LogList';
import SearchFilter from '@components/SearchFilter';
import SearchInput from '@components/SearchInput';

const LogsPage: React.FC = () => {
  return (
    <Layout>
      <Stack spacing={2} p={2}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link to="/write">
            <Button>로그 작성</Button>
          </Link>
        </div>
        <SearchInput />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <SearchFilter type="diveType" />
          <SearchFilter type="depth" />
          <SearchFilter type="location" />
          <SearchFilter type="temperature" />
        </div>
        <LogList />
      </Stack>
    </Layout>
  );
};

export default LogsPage;
