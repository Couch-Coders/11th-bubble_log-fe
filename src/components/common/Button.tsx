import { blue } from '@lib/styles/palette';
import { theme } from '@lib/styles/theme';
import React from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant = 'text' | 'contained' | 'outlined';
type ButtonSize = 'small' | 'medium' | 'large';

const buttonVariantStyle = {
  text: css`
    background: none;
    color: ${theme.primary};

    &:hover {
      background-color: white;
    }
  `,
  contained: css`
    background-color: ${theme.primary};
    color: white;

    &:hover {
      background-color: ${theme.primaryVariant};
    }
  `,
  outlined: css`
    background-color: white;
    border: 1px solid ${theme.primary};
    color: ${theme.primary};

    &:hover {
      background-color: ${blue[50]};
    }
  `,
};

const buttonSizeStyle = {
  small: css`
    height: 2rem;
    padding: 0.5rem 0.8rem;
    font-size: 0.75rem;
  `,
  medium: css`
    height: 2.5rem;
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
  `,
  large: css`
    height: 3rem;
    padding: 0.75rem 1.2rem;
    font-size: 1rem;
  `,
};

interface ContainerProps {
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  width?: string;
  height?: string;
}

const Container = styled.button<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  min-width: 4rem;
  font-weight: 500;
  border-radius: 0.5rem;
  border: none;
  transition: 0.1s;

  cursor: pointer;

  &:hover {
    background-color: ${theme.primaryVariant};
  }

  ${({ startIcon }) =>
    startIcon !== undefined &&
    css`
      padding-left: 1rem;
    `};

  ${({ endIcon }) =>
    endIcon !== undefined &&
    css`
      padding-right: 1rem;
    `};

  ${({ variant }) => buttonVariantStyle[variant]};

  ${({ size }) => buttonSizeStyle[size]};

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.38;
      pointer-events: none;
    `}

  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  width?: string;
  height?: string;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button: React.FC<Props> = ({
  children = '버튼',
  variant = 'contained',
  size = 'medium',
  disabled = false,
  startIcon,
  endIcon,
  width,
  height,
  ...props
}) => {
  return (
    <Container
      variant={variant}
      disabled={disabled}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      width={width}
      height={height}
      {...props}
    >
      {startIcon !== undefined && startIcon}
      {children}
      {endIcon !== undefined && endIcon}
    </Container>
  );
};

export default React.memo(Button);
