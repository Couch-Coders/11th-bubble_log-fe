import useDebounce from '@hooks/useDebounce';
import { useDispatch } from '@stores/index';
import { logActions } from '@stores/slices/log';
import React, { useEffect, useState } from 'react';

import Input from '@components/common/Input';

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

const SearchInput: React.FC = () => {
  const { inputValue, onChangeInput, onClickButton } = useSearchInput();

  return (
    <>
      <Input value={inputValue} onChange={onChangeInput} />
      <button onClick={onClickButton}>x</button>
    </>
  );
};

export default SearchInput;
