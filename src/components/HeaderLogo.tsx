import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  color: white;
  font-size: 1rem;
  font-weight: 600;
`;

const HeaderLogo: React.FC = () => {
  return (
    <Container>
      <Link to="/logs">BUBBLE LOG</Link>
    </Container>
  );
};

export default HeaderLogo;
