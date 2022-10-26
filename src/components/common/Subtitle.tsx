import { gray } from '@lib/styles/palette';
import React from 'react';
import styled from 'styled-components';

const Container = styled.h2`
  color: ${gray[500]};
  font-weight: 600;
`;

interface Props {
  children: React.ReactNode;
}

const Subtitle: React.FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default React.memo(Subtitle);
