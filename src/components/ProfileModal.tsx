import React from 'react';
import styled from 'styled-components';

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
  children: React.ReactNode;
  open: boolean;
}

const ProfileModal: React.FC<Props> = ({ children, open }) => {
  return <>{open && <Container>{children}</Container>}</>;
};

export default ProfileModal;
