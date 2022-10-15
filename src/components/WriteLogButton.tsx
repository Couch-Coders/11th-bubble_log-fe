import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from './common/Button';

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const WriteLogButton: React.FC = () => {
  return (
    <Container>
      <Link to="/write">
        <Button>로그 작성</Button>
      </Link>
    </Container>
  );
};

export default WriteLogButton;
