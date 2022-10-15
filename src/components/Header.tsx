import { useSelector } from '@stores/index';
import React from 'react';
import styled from 'styled-components';
import { User } from 'types/log';

import { theme } from '@styles/theme';

import Avatar from './common/Avatar';
import HeaderLogo from './HeaderLogo';
import LogOutButton from './LogOutButton';

const Base = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background-color: ${theme.primary};
  height: 3.5rem;

  .flex {
    display: flex;
    gap: 1rem;
  }
`;

interface ReturnType {
  data: User;
}

const useHeader = (): ReturnType => {
  const { data } = useSelector((state) => state.user);

  return { data };
};

const Header: React.FC = () => {
  const { data } = useHeader();

  return (
    <Base>
      <HeaderLogo />
      <div className="flex">
        <LogOutButton />
        <Avatar src={data.profileImage} alt="profile image" />
      </div>
    </Base>
  );
};

export default Header;
