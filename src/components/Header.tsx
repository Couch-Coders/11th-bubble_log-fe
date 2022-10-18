import useOutsideClick from '@hooks/useOutsideClick';
import { useSelector } from '@stores/index';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

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

const Header: React.FC = () => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const { data } = useSelector((state) => state.user);

  const ref = useRef<HTMLDivElement | null>(null);

  useOutsideClick(ref, () => setProfileModalOpen(false));

  const handleAvatarClick = (): void => {
    setProfileModalOpen((prev) => !prev);
  };

  return (
    <Base>
      <HeaderLogo />
      <div className="flex" ref={ref}>
        <Avatar
          src={data.profileImage}
          alt="profile image"
          onClick={handleAvatarClick}
          clickable
        />
        <ProfileModal
          data={data}
          open={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
        />
      </div>
    </Base>
  );
};

export default Header;
