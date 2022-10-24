import { theme } from '@lib/styles/theme';
import React from 'react';
import styled from 'styled-components';

const Container = styled.h1`
  color: ${theme.primary};
  font-size: 2rem;
  font-weight: 600;
`;

interface Props {
  children: React.ReactNode;
}

const Title: React.FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Title;
