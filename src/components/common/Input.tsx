import { gray } from '@lib/styles/palette';
import { theme } from '@lib/styles/theme';
import React from 'react';
import styled, { css } from 'styled-components';

interface ContainerProps {
  startIcon: boolean;
  endIcon: boolean;
  width?: string;
  height?: string;
  fullWidth: boolean;
  isValid: boolean;
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

  ${({ isValid }) =>
    !isValid &&
    css`
      border: 1px solid ${theme.error};
    `}
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: boolean;
  endIcon?: boolean;
  fullWidth?: boolean;
  width?: string;
  height?: string;
  isValid?: boolean;
}

const Input: React.FC<Props> = ({
  startIcon = false,
  endIcon = false,
  fullWidth = false,
  width,
  height,
  isValid = true,
  ...props
}) => {
  return (
    <Container
      startIcon={startIcon}
      endIcon={endIcon}
      fullWidth={fullWidth}
      width={width}
      height={height}
      isValid={isValid}
      {...props}
    />
  );
};

export default React.memo(Input);
