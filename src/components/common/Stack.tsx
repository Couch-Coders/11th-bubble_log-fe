import React from 'react';
import styled, { css } from 'styled-components';

type StackDirection = 'row' | 'column';

const getStackDirection = (direction = 'column'): any => {
  switch (direction) {
    case 'row':
      return css`
        flex-direction: row;
      `;
    case 'column':
      return css`
        flex-direction: column;
      `;
  }
};

interface ContainerProps {
  direction: StackDirection;
  spacing: number;
  p: number;
}

const Container = styled.div<ContainerProps>`
  display: flex;

  gap: ${({ spacing }) => `${spacing * 0.5}rem`};
  padding: ${({ p }) => `${p * 0.5}rem`};

  ${({ direction }) => getStackDirection(direction)};
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  direction?: StackDirection;
  spacing?: number;
  p?: number;
}

const Stack: React.FC<Props> = ({
  children,
  direction = 'column',
  spacing = 0,
  p = 0,
  ...props
}) => {
  return (
    <Container direction={direction} spacing={spacing} p={p} {...props}>
      {children}
    </Container>
  );
};

export default Stack;
