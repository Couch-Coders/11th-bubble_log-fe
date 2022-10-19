import { gray } from '@lib/styles/palette';
import React from 'react';
import styled from 'styled-components';

interface ContainerProps {
  height?: string;
}

const Container = styled.textarea<ContainerProps>`
  width: 100%;
  border: none;
  outline: none;
  background-color: ${gray[100]};
  border-radius: 0.25rem;
  padding: 1rem;
  resize: none;

  height: ${({ height }) => height};

  ::placeholder {
    color: ${gray[400]};
  }
`;

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  height?: string;
}

const Textarea: React.FC<Props> = ({ height, ...props }) => {
  return <Container height={height} {...props} />;
};

export default React.memo(Textarea);
