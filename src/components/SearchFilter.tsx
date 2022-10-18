import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useDispatch } from '@stores/index';
import { logActions } from '@stores/slices/log';
import React, { useState } from 'react';
import styled from 'styled-components';

import Dropdown from '@components/common/dropdown';
import {
  DIVE_DEPTH,
  DIVE_LOCATION,
  DIVE_TEMPERATURE,
  DIVE_TYPE,
} from '@utils/constants';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const getSearchFilterType = (
  type: SearchFilterType,
): {
  filterAction: ActionCreatorWithPayload<string, string>;
  label: string;
  options: string[];
} => {
  switch (type) {
    case 'diveType': {
      return {
        filterAction: logActions.setQueryType,
        label: '다이브 종류',
        options: DIVE_TYPE,
      };
    }
    case 'location': {
      return {
        filterAction: logActions.setQueryLocation,
        label: '위치',
        options: DIVE_LOCATION,
      };
    }
    case 'temperature': {
      return {
        filterAction: logActions.setQueryTemperature,
        label: '수온',
        options: DIVE_TEMPERATURE,
      };
    }
    case 'depth': {
      return {
        filterAction: logActions.setQueryDepth,
        label: '깊이',
        options: DIVE_DEPTH,
      };
    }
  }
};

type SearchFilterType = 'diveType' | 'location' | 'temperature' | 'depth';

interface Props {
  type: SearchFilterType;
}

const SearchFilter: React.FC<Props> = ({ type }) => {
  const [dropdownValue, setDropdownValue] = useState('전체');

  const { filterAction, label, options } = getSearchFilterType(type);

  const dispatch = useDispatch();

  const onClickMenuItem = (option: string): void => {
    setDropdownValue(option);
    if (option === '전체') {
      dispatch(filterAction(''));
    } else {
      dispatch(filterAction(option));
    }
  };

  return (
    <Container>
      <label>{label}</label>
      <Dropdown.Button label={dropdownValue}>
        <Dropdown.Menu>
          <Dropdown.MenuItem
            label="전체"
            onClick={() => onClickMenuItem('전체')}
          />
          {options.map((option, index) => (
            <Dropdown.MenuItem
              key={index}
              label={option}
              onClick={() => onClickMenuItem(option)}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown.Button>
    </Container>
  );
};

export default SearchFilter;
