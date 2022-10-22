import React from 'react';
import { GiBubbles } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderLogoStyle = styled.div`
  color: white;
  transform: scale(1);
  transition: 0.2s;

  &:hover {
    transform: scale(1.2);
  }
`;

const HeaderLogo: React.FC = () => {
  return (
    <HeaderLogoStyle>
      <Link to="/">
        <GiBubbles size="2rem" />
      </Link>
    </HeaderLogoStyle>
  );
};

export default HeaderLogo;
