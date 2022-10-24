import { theme } from '@lib/styles/theme';
import React from 'react';
import styled, { css } from 'styled-components';

type fabSize = 'small' | 'medium' | 'large';
type fabShape = 'rounded' | 'boxier';

const fabSizeStyle = {
  small: css`
    width: 2.5rem;
    height: 2.5rem;
  `,
  medium: css`
    width: 3rem;
    height: 3rem;
  `,
  large: css`
    width: 3.5rem;
    height: 3.5rem;
  `,
};

const fabShapeStyle = {
  rounded: css`
    border-radius: 50%;
  `,
  boxier: css`
    border-radius: 1rem;
  `,
};

interface ContainerProps {
  size: fabSize;
  shape: fabShape;
}

const Container = styled.button<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 3.5rem;
  height: 3.5rem;
  background-color: ${theme.primary};
  box-shadow: ${theme.elevation8};
  border-radius: 1rem;
  border: none;
  color: white;
  transition: background-color 0.1s;
  cursor: pointer;

  &:hover {
    background-color: ${theme.primaryVariant};
  }

  ${({ size }) => fabSizeStyle[size]}
  ${({ shape }) => fabShapeStyle[shape]}
`;

interface Props {
  children: React.ReactNode;
  size?: fabSize;
  shape?: fabShape;
  onClick: () => void;
}

const Fab: React.FC<Props> = ({
  children,
  size = 'large',
  shape = 'boxier',
  onClick,
}) => {
  return (
    <Container size={size} shape={shape} onClick={onClick}>
      {children}
    </Container>
  );
};

export default Fab;
