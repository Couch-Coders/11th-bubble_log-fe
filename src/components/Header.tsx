import React from 'react';
import styled from 'styled-components';

import { blue } from '@styles/palette';

import Avatar from './common/Avatar';
import HeaderLogo from './HeaderLogo';
import LogOutButton from './LogOutButton';

const Base = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background-color: ${blue[100]};
  height: 3.5rem;

  .flex {
    display: flex;
    gap: 1rem;
  }
`;

const Header: React.FC = () => {
  return (
    <Base>
      <HeaderLogo />
      <div className="flex">
        <LogOutButton />
        <Avatar />
      </div>
    </Base>
  );
};

export default Header;
