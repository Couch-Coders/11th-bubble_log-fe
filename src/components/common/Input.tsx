import React from 'react';
import styled from 'styled-components';

const Container = styled.input`
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<Props> = () => {
  return <Container />;
};

export default React.memo(Input);
