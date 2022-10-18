import React from 'react';
import styled from 'styled-components';

import Layout from '@components/Layout';
import LogList from '@components/LogList';
import SearchFilterGroup from '@components/SearchFilterGroup';
import SearchInput from '@components/SearchInput';
import WriteLogButton from '@components/WriteLogButton';

const VerticalStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const LogsPage: React.FC = () => {
  return (
    <Layout>
      <VerticalStack>
        <WriteLogButton />
        <SearchInput />
        <SearchFilterGroup />
        <LogList />
      </VerticalStack>
    </Layout>
  );
};

export default LogsPage;
