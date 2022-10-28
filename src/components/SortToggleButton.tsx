import { gray } from '@lib/styles/palette';
import { theme } from '@lib/styles/theme';
import React from 'react';
import styled, { css } from 'styled-components';

const BORDER_RADIUS = '0.5rem';

interface ContainerProps {
  active: boolean;
  position: 'left' | 'right';
}

const Container = styled.button<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  padding: 0.5rem;
  border: none;
  cursor: pointer;
  background-color: ${gray[100]};
  color: ${gray[600]};

  &:hover {
    background-color: ${gray[200]};
    transition: 0.1s;
  }

  ${({ active }) =>
    active &&
    css`
      background-color: ${theme.primary};
      color: white;

      &:hover {
        background-color: ${theme.primary};
      }
    `}

  ${({ position }) =>
    position === 'left' &&
    css`
      border-top-left-radius: ${BORDER_RADIUS};
      border-bottom-left-radius: ${BORDER_RADIUS};
    `}

  ${({ position }) =>
    position === 'right' &&
    css`
      border-top-right-radius: ${BORDER_RADIUS};
      border-bottom-right-radius: ${BORDER_RADIUS};
    `}
`;

interface Props {
  children: React.ReactNode;
  active: boolean;
  position: 'left' | 'right';
  onClick: () => void;
}

const SortToggleButton: React.FC<Props> = ({
  children,
  active,
  position,
  onClick,
}) => {
  return (
    <Container active={active} position={position} onClick={onClick}>
      {children}
    </Container>
  );
};

export default SortToggleButton;
