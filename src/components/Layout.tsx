import { gray } from '@lib/styles/palette';
import React from 'react';
import styled from 'styled-components';

import { HEADER_HEIGHT } from '@utils/constants';

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${gray[100]};
  min-height: calc(100vh - ${HEADER_HEIGHT});

  .main {
    border-radius: 0.5rem;
    background-color: white;
    width: 480px;
    position: relative;
  }
`;

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <main className="main">{children}</main>
    </Container>
  );
};

export default Layout;
