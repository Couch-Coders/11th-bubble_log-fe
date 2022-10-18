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

const filterType = {
  diveType: {
    filterAction: logActions.setQueryType,
    label: '다이브 종류',
    options: DIVE_TYPE,
  },
  location: {
    filterAction: logActions.setQueryLocation,
    label: '위치',
    options: DIVE_LOCATION,
  },
  temperature: {
    filterAction: logActions.setQueryTemperature,
    label: '수온',
    options: DIVE_TEMPERATURE,
  },
  depth: {
    filterAction: logActions.setQueryDepth,
    label: '깊이',
    options: DIVE_DEPTH,
  },
};

type SearchFilterType = 'diveType' | 'location' | 'temperature' | 'depth';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

interface Props {
  type: SearchFilterType;
}

const SearchFilter: React.FC<Props> = ({ type }) => {
  const [dropdownValue, setDropdownValue] = useState('전체');

  const { filterAction, label, options } = filterType[type];

  const dispatch = useDispatch();

  const resetSearchFilter = () => {
    dispatch(filterAction(''));
  };

  const handleMenuItemClick = (option: string) => {
    setDropdownValue(option);
    dispatch(filterAction(option));
  };

  return (
    <Container>
      <label>{label}</label>
      <Dropdown.Button label={dropdownValue}>
        <Dropdown.Menu>
          <Dropdown.MenuItem label="전체" onClick={resetSearchFilter} />
          {options.map((option, index) => (
            <Dropdown.MenuItem
              key={index}
              label={option}
              onClick={() => handleMenuItemClick(option)}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown.Button>
    </Container>
  );
};

export default SearchFilter;
