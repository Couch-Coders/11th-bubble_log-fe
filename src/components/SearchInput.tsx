import useDebounce from '@hooks/useDebounce';
import { useDispatch } from '@stores/index';
import { logActions } from '@stores/slices/log';
import React, { useEffect, useState } from 'react';
import { MdClose, MdSearch } from 'react-icons/md';
import styled from 'styled-components';

import Input from '@components/common/Input';
import { gray } from '@styles/palette';

const Container = styled.div`
  display: flex;
  position: relative;

  .close-icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  .search-icon {
    position: absolute;
    top: 50%;
    left: 0.5rem;
    transform: translateY(-50%);
    width: 1.5rem;
    height: 1.5rem;
    color: ${gray[400]};
  }
`;

interface ReturnType {
  inputValue: string;
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickButton: () => void;
}

const useSearchInput = (): ReturnType => {
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue);
  const dispatch = useDispatch();

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const onClickButton = (): void => {
    setInputValue('');
  };

  useEffect(() => {
    dispatch(logActions.setQueryKeyword(debouncedInputValue));
  }, [debouncedInputValue]);

  return { inputValue, onChangeInput, onClickButton };
};

const SearchInputClearButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0.5rem;
  cursor: pointer;
`;

const SearchInput: React.FC = () => {
  const { inputValue, onChangeInput, onClickButton } = useSearchInput();

  return (
    <Container>
      <MdSearch className="search-icon" />
      <Input
        startIcon
        endIcon
        fullWidth
        value={inputValue}
        onChange={onChangeInput}
      />
      {inputValue !== '' && (
        <SearchInputClearButton onClick={onClickButton}>
          <MdClose className="close-icon" />
        </SearchInputClearButton>
      )}
    </Container>
  );
};

export default SearchInput;
