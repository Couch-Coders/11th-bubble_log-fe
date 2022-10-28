import useScrollLock from '@hooks/useScrollLock';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);

  z-index: 3;
`;

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

const Backdrop: React.FC<Props> = ({ children, isOpen, onClose }) => {
  const { lockScroll, unlockScroll } = useScrollLock();

  useEffect(() => {
    if (isOpen) lockScroll();
    if (!isOpen) unlockScroll();
  }, [lockScroll, unlockScroll, isOpen]);

  return <>{isOpen && <Container onClick={onClose}>{children}</Container>}</>;
};

export default React.memo(Backdrop);
