import { gray } from '@lib/styles/palette';
import React from 'react';
import { MdClose, MdSearch } from 'react-icons/md';
import styled from 'styled-components';

import Input from '@components/common/Input';

const Container = styled.div`
  display: flex;
  position: relative;
  width: 12rem;

  .search-icon {
    position: absolute;
    top: 50%;
    left: 0.5rem;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
    color: ${gray[500]};
  }
`;

const SearchInputClearButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0.25rem;
  cursor: pointer;

  .close-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: ${gray[500]};
  }
`;

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearButtonClick: () => void;
}

const SearchInput: React.FC<Props> = ({
  value,
  onChange,
  onClearButtonClick,
}) => {
  return (
    <Container>
      <MdSearch className="search-icon" />
      <Input startIcon endIcon fullWidth value={value} onChange={onChange} />
      {value !== '' && (
        <SearchInputClearButton onClick={onClearButtonClick}>
          <MdClose className="close-icon" />
        </SearchInputClearButton>
      )}
    </Container>
  );
};

export default SearchInput;
