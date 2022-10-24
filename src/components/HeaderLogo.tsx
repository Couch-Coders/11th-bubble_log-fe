import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderLogoStyle = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
`;

const HeaderLogo: React.FC = () => {
  return (
    <HeaderLogoStyle>
      <Link to="/">다이빙 버블 로그</Link>
    </HeaderLogoStyle>
  );
};

export default HeaderLogo;
