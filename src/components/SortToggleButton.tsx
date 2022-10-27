import { theme } from '@lib/styles/theme';
import React from 'react';
import styled, { css } from 'styled-components';

interface ContainerProps {
  active: boolean;
}

const Container = styled.button<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  background-color: white;

  &:hover {
    background-color: ${theme.primaryLight};
    transition: 0.1s;
  }

  ${({ active }) =>
    active &&
    css`
      background-color: ${theme.primaryLight};

      &:hover {
        background-color: ${theme.primaryLight};
      }
    `}
`;

interface Props {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const SortToggleButton: React.FC<Props> = ({ children, active, onClick }) => {
  return (
    <Container active={active} onClick={onClick}>
      {children}
    </Container>
  );
};

export default SortToggleButton;
