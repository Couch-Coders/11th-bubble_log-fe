import useAuth from '@hooks/useAuth';
import useOutsideClick from '@hooks/useOutsideClick';
import { theme } from '@lib/styles/theme';
import { useSelector } from '@store/index';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Avatar from '@components/common/Avatar';
import Flexbox from '@components/common/Flexbox';
import HeaderLogo from '@components/HeaderLogo';
import ProfileModal from '@components/ProfileModal';

import Divider from './common/Divider';
import MenuItem from './common/MenuItem';

const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background-color: ${theme.primary};
  height: 3.5rem;
`;

const Header: React.FC = () => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const { logOut } = useAuth();

  const { data } = useSelector((state) => state.user);

  const ref = useRef<HTMLDivElement | null>(null);

  useOutsideClick(ref, () => setProfileModalOpen(false));

  const handleAvatarClick = () => {
    setProfileModalOpen((prev) => !prev);
  };

  const handleLogOutButtonClick = () => {
    void logOut();
    setProfileModalOpen(false);
  };

  return (
    <HeaderStyle>
      <HeaderLogo />
      <div ref={ref}>
        <Flexbox gap="1rem">
          <Avatar
            src={data.profileImage}
            alt="profile image"
            onClick={handleAvatarClick}
            clickable
          />
          <ProfileModal isOpen={profileModalOpen}>
            <Flexbox flex="col" width="100%">
              <Flexbox flex="col" gap="1rem" padding="2rem">
                <Avatar
                  size="6rem"
                  src={data.profileImage}
                  alt="profile-image"
                />
                <p style={{ fontSize: '1.25rem' }}>{data.name}</p>
              </Flexbox>
              <Divider />
              <MenuItem onClick={() => setProfileModalOpen(false)}>
                <Link to="/mypage">마이페이지</Link>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogOutButtonClick}>로그아웃</MenuItem>
              <Divider />
            </Flexbox>
          </ProfileModal>
        </Flexbox>
      </div>
    </HeaderStyle>
  );
};

export default Header;
