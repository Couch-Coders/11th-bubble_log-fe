import React from 'react';

import Dropdown from '@components/common/dropdown';
import Flexbox from '@components/common/Flexbox';

interface Props {
  name: string;
  label: string;
  onClick: (value: string) => void;
  options: string[];
}

const SearchFilter: React.FC<Props> = ({ name, label, onClick, options }) => {
  return (
    <Flexbox gap="1rem">
      <label>{name}</label>
      <Dropdown.Button label={label}>
        <Dropdown.Menu>
          <Dropdown.MenuItem label="전체" onClick={() => onClick('')} />
          {options.map((option, index) => (
            <Dropdown.MenuItem
              key={index}
              label={option}
              onClick={() => onClick(option)}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown.Button>
    </Flexbox>
  );
};

export default SearchFilter;
