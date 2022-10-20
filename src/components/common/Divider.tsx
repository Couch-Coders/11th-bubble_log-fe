import { gray } from '@lib/styles/palette';
import React from 'react';
import styled from 'styled-components';

interface ContainerProps {
  orientation: 'horizontal' | 'vertical';
}

const Container = styled.div<ContainerProps>`
  border-top: 1px solid ${gray[200]};
  width: 100%;
`;

interface Props {
  orientation?: 'horizontal' | 'vertical';
}

const Divider: React.FC<Props> = ({ orientation = 'horizontal' }) => {
  return <Container orientation={orientation} />;
};

export default Divider;
