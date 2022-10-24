import { theme } from '@lib/styles/theme';
import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  width: 3.5rem;
  height: 3.5rem;
  background-color: ${theme.primary};
  box-shadow: ${theme.elevation8};
  border-radius: 1rem;
  border: none;
  color: white;
  transition: background-color 0.2s;
  cursor: pointer;
`;

const Fab: React.FC = () => {
  return <Container>Fab</Container>;
};

export default Fab;
