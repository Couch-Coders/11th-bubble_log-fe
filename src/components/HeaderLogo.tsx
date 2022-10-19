import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderLogoStyle = styled.div`
  color: white;
  font-size: 1rem;
  font-weight: 600;
`;

const HeaderLogo: React.FC = () => {
  return (
    <HeaderLogoStyle>
      <Link to="/">BUBBLE LOG</Link>
    </HeaderLogoStyle>
  );
};

export default HeaderLogo;
