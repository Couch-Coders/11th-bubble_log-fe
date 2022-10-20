import { gray } from '@lib/styles/palette';
import React from 'react';
import styled, { css } from 'styled-components';

interface ContainerProps {
  startIcon: boolean;
  endIcon: boolean;
  width?: string;
  fullWidth: boolean;
}

const Container = styled.input<ContainerProps>`
  border-radius: 0.25rem;
  height: 1.5rem;
  font-size: 1rem;
  padding: 1rem;
  outline: none;
  border: 1px solid ${gray[400]};
  color: ${gray[600]};

  ::placeholder {
    color: ${gray[300]};
  }

  width: ${({ width }) => width};

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
}

const Input: React.FC<Props> = ({
  startIcon = false,
  endIcon = false,
  fullWidth = false,
  width,
  ...props
}) => {
  return (
    <Container
      startIcon={startIcon}
      endIcon={endIcon}
      width={width}
      fullWidth={fullWidth}
      {...props}
    />
  );
};

export default React.memo(Input);
