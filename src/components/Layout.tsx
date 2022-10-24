import { gray } from '@lib/styles/palette';
import React from 'react';
import styled from 'styled-components';

const Container = styled.main`
  display: flex;
  justify-content: center;
  background-color: ${gray[100]};
  min-height: calc(100vh - 3.5rem);

  .contents {
    border-radius: 0.5rem;
    background-color: white;
    width: 480px;
    margin: 1rem;
    margin-top: 0;
  }
`;

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <div className="contents">{children}</div>
    </Container>
  );
};

export default Layout;
