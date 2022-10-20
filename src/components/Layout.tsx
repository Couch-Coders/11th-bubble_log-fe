import { gray } from '@lib/styles/palette';
import React from 'react';
import styled from 'styled-components';

const Container = styled.main`
  display: flex;
  justify-content: center;
  background-color: ${gray[100]};
  min-height: calc(100vh - 3.5rem);

  .contents {
    background-color: white;
    width: 1024px;
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
