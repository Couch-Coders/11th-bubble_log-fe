import React from 'react';
import styled, { css } from 'styled-components';

type StackDirection = 'row' | 'column';

const stackDirectionStyle = {
  row: css`
    flex-direction: row;
  `,
  column: css`
    flex-direction: column;
  `,
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

  ${({ direction }) => stackDirectionStyle[direction]};
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

export default React.memo(Stack);
