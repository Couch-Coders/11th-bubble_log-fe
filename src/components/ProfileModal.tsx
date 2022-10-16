import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { User } from 'types/log';

import Avatar from './common/Avatar';
import LogOutButton from './LogOutButton';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  position: absolute;
  top: 4rem;
  right: 1rem;
  width: 16rem;
  height: 24rem;
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px -1px,
    rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;
  z-index: 1;
`;

interface Props {
  data: User;
  open: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<Props> = ({ data, open, onClose }) => {
  return (
    <>
      {open && (
        <Container>
          <Avatar size="6rem" src={data.profileImage} alt="profile-image" />
          <Link to="/mypage" onClick={onClose}>
            마이페이지
          </Link>
          <div onClick={onClose}>
            <LogOutButton />
          </div>
        </Container>
      )}
    </>
  );
};

export default ProfileModal;
