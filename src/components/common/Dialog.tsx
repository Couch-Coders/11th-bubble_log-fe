import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border-radius: 0.5rem;
  background-color: white;
`;

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
}

const Dialog: React.FC<Props> = ({ children, isOpen }) => {
  return <>{isOpen && <Container>{children}</Container>}</>;
};

export default React.memo(Dialog);
