import { theme } from '@lib/styles/theme';
import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';

interface ContainerProps {
  isOpen: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 1rem;
  right: 50%;
  transform: translateX(50%);
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  background-color: ${theme.primary};
  color: white;
  z-index: 3;

  ${({ isOpen }) =>
    isOpen &&
    css`
      animation: fadein 0.5s;
    `}

  @keyframes fadein {
    from {
      bottom: 0;
      opacity: 0;
    }
    to {
      bottom: 1rem;
      opacity: 1;
    }
  }
`;

interface Props {
  isOpen: boolean;
  autoHideDuration?: number;
  onClose: () => void;
  message: string;
}

const Snackbar: React.FC<Props> = ({
  isOpen,
  autoHideDuration = 6000,
  onClose,
  message,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const timeout = setTimeout(() => {
      onClose();
    }, autoHideDuration);

    if (!isOpen) clearTimeout(timeout);
  }, [autoHideDuration, onClose, isOpen]);

  return <>{isOpen && <Container isOpen={isOpen}>{message}</Container>}</>;
};

export default Snackbar;
