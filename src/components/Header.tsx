import useOutsideClick from '@hooks/useOutsideClick';
import { useSelector } from '@stores/index';
import React, { useRef, useState } from 'react';
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
  ref: React.MutableRefObject<HTMLDivElement | null>;
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

  const ref = useRef<HTMLDivElement | null>(null);

  useOutsideClick(ref, onCloseProfileModal);

  return { data, profileModalOpen, onCloseProfileModal, onClickAvatar, ref };
};

const Header: React.FC = () => {
  const { data, profileModalOpen, onCloseProfileModal, onClickAvatar, ref } =
    useHeader();

  return (
    <Base>
      <HeaderLogo />
      <div className="flex" ref={ref}>
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
