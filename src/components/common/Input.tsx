import { gray } from '@lib/styles/palette';
import React from 'react';
import styled, { css } from 'styled-components';

interface ContainerProps {
  startIcon: boolean;
  endIcon: boolean;
  width?: string;
  height?: string;
  fullWidth: boolean;
}

const Container = styled.input<ContainerProps>`
  border-radius: 0.25rem;
  height: 3rem;
  font-size: 1rem;
  padding: 0.75rem;
  outline: none;
  border: 1px solid ${gray[400]};
  color: ${gray[600]};

  ::placeholder {
    color: ${gray[300]};
  }

  width: ${({ width }) => width};
  height: ${({ height }) => height};

  ${({ startIcon }) =>
    startIcon &&
    css`
      padding-left: 2.5rem;
    `}

  ${({ endIcon }) =>
    endIcon &&
    css`
      padding-right: 2rem;
    `}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: boolean;
  endIcon?: boolean;
  fullWidth?: boolean;
  width?: string;
  height?: string;
}

const Input: React.FC<Props> = ({
  startIcon = false,
  endIcon = false,
  fullWidth = false,
  width,
  height,
  ...props
}) => {
  return (
    <Container
      startIcon={startIcon}
      endIcon={endIcon}
      width={width}
      height={height}
      fullWidth={fullWidth}
      {...props}
    />
  );
};

export default React.memo(Input);
