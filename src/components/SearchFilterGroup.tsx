import React from 'react';
import styled from 'styled-components';

import SearchFilter from '@components/SearchFilter';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SearchFilterGroup: React.FC = () => {
  return (
    <Container>
      <SearchFilter type="diveType" />
      <SearchFilter type="depth" />
      <SearchFilter type="location" />
      <SearchFilter type="temperature" />
    </Container>
  );
};

export default SearchFilterGroup;
