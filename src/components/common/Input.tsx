import { gray } from '@lib/styles/palette';
import React from 'react';
import styled, { css } from 'styled-components';

interface ContainerProps {
  startIcon?: boolean;
  endIcon?: boolean;
  fullWidth?: boolean;
}

const Container = styled.input<ContainerProps>`
  border-radius: 0.25rem;
  height: 1.5rem;
  font-size: 1rem;
  padding: 0.5rem;
  outline: none;
  border: 1px solid ${gray[500]};

  ${({ startIcon }) =>
    startIcon === true &&
    css`
      padding-left: 2.5rem;
    `}

  ${({ endIcon }) =>
    endIcon !== true &&
    css`
      padding-right: 2rem;
    `}

  ${({ fullWidth }) =>
    fullWidth === true &&
    css`
      width: 100%;
    `}
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: boolean;
  endIcon?: boolean;
  fullWidth?: boolean;
}

const Input: React.FC<Props> = ({ ...props }) => {
  return <Container {...props} />;
};

export default React.memo(Input);
