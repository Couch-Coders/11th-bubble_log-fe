import useAuth from '@hooks/useAuth';
import { gray } from '@lib/styles/palette';
import { theme } from '@lib/styles/theme';
import { useSelector } from '@store/index';
import React, { useState } from 'react';
import { MdLogout, MdPermIdentity } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Avatar from '@components/common/Avatar';
import Divider from '@components/common/Divider';
import Flexbox from '@components/common/Flexbox';
import MenuItem from '@components/common/MenuItem';
import Modal from '@components/common/Modal';
import HeaderLogo from '@components/HeaderLogo';
import { HEADER_HEIGHT } from '@utils/constants';

const HeaderLayout = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${gray[100]};
`;

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background-color: ${theme.primary};
  height: ${HEADER_HEIGHT};
  width: 480px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  position: relative;
`;

const Header: React.FC = () => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const { logOut } = useAuth();

  const navigate = useNavigate();

  const { data } = useSelector((state) => state.user);

  const handleAvatarClick = () => {
    setProfileModalOpen((prev) => !prev);
  };

  const handleLogOutButtonClick = () => {
    void logOut();
    setProfileModalOpen(false);
  };

  return (
    <HeaderLayout>
      <Container>
        <HeaderLogo />
        <Flexbox gap="1rem">
          <Avatar
            src={data.profileImage}
            alt="profile image"
            onClick={handleAvatarClick}
            clickable
          />
          <Modal
            width="16rem"
            isOpen={profileModalOpen}
            onClose={() => setProfileModalOpen(false)}
          >
            <Flexbox flex="col" width="100%" padding="1rem" gap="1rem">
              <Flexbox flex="col" gap="1rem">
                <Avatar
                  size="6rem"
                  src={data.profileImage}
                  alt="profile-image"
                />
                <p style={{ fontSize: '1.25rem' }}>{data.name}</p>
              </Flexbox>
              <Divider />
              <Flexbox flex="col" width="100%">
                <MenuItem
                  onClick={() => {
                    setProfileModalOpen(false);
                    navigate('/mypage');
                  }}
                >
                  <Flexbox gap="0.25rem">
                    <MdPermIdentity size="1.5rem" />
                    마이페이지
                  </Flexbox>
                </MenuItem>
                <MenuItem onClick={handleLogOutButtonClick}>
                  <Flexbox gap="0.25rem">
                    <MdLogout size="1.5rem" />
                    로그아웃
                  </Flexbox>
                </MenuItem>
              </Flexbox>
            </Flexbox>
          </Modal>
        </Flexbox>
      </Container>
    </HeaderLayout>
  );
};

export default Header;
