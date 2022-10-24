import { gray } from '@lib/styles/palette';
import { theme } from '@lib/styles/theme';
import React from 'react';
import styled, { css } from 'styled-components';

const iconButtonDisabledStyle = css`
  color: ${gray[300]};
  cursor: default;

  &:hover {
    background-color: transparent;
  }
`;

const iconButtonVariantStyle = {
  contained: css`
    background-color: ${theme.primary};
    color: white;

    &:hover {
      background-color: ${theme.primaryVariant};
    }
  `,
  outlined: css`
    color: ${theme.primary};
    &:hover {
      background-color: ${theme.primaryLight};
    }
  `,
};

interface ContainerProps {
  disabled: boolean;
  variant: 'outlined' | 'contained';
}

const Container = styled.button<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;
  color: ${gray[500]};
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  transition: 0.1s;
  cursor: pointer;

  &:hover {
    background-color: ${gray[100]};
  }

  ${({ variant }) => iconButtonVariantStyle[variant]};
  ${({ disabled }) => disabled && iconButtonDisabledStyle};
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'outlined' | 'contained';
  disabled?: boolean;
}

const IconButton: React.FC<Props> = ({
  children,
  disabled = false,
  variant = 'outlined',
  ...props
}) => {
  return (
    <Container disabled={disabled} variant={variant} {...props}>
      {children}
    </Container>
  );
};

export default IconButton;
