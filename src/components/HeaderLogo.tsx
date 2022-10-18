import React from 'react';
import styled from 'styled-components';

const HeaderLogoStyle = styled.div`
  color: white;
  font-size: 1rem;
  font-weight: 600;
`;

const HeaderLogo: React.FC = () => {
  return <HeaderLogoStyle>BUBBLE LOG</HeaderLogoStyle>;
};

export default HeaderLogo;
