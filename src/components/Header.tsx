import { useSelector } from '@stores/index';
import React, { useState } from 'react';
import styled from 'styled-components';
import { User } from 'types/log';

import Avatar from '@components/common/Avatar';
import HeaderLogo from '@components/HeaderLogo';
import ProfileModal from '@components/ProfileModal';
import { theme } from '@styles/theme';

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
  profileModalOpen: boolean;
  onCloseProfileModal: () => void;
  onClickAvatar: () => void;
}

const useHeader = (): ReturnType => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const { data } = useSelector((state) => state.user);

  const onClickAvatar = (): void => {
    setProfileModalOpen((prev) => !prev);
  };

  const onCloseProfileModal = (): void => {
    setProfileModalOpen(false);
  };

  return { data, profileModalOpen, onCloseProfileModal, onClickAvatar };
};

const Header: React.FC = () => {
  const { data, profileModalOpen, onCloseProfileModal, onClickAvatar } =
    useHeader();

  return (
    <Base>
      <HeaderLogo />
      <div className="flex">
        <Avatar
          src={data.profileImage}
          alt="profile image"
          onClick={onClickAvatar}
          clickable
        />
        <ProfileModal
          data={data}
          open={profileModalOpen}
          onClose={onCloseProfileModal}
        />
      </div>
    </Base>
  );
};

export default Header;
