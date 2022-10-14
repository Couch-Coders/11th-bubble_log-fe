import React from 'react';
import styled from 'styled-components';

import { gray } from '@styles/palette';

const Container = styled.main`
  display: flex;
  justify-content: center;
  background-color: ${gray[100]};

  .contents {
    background-color: white;
    max-width: 1024px;
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
