import React from 'react';
import styled from 'styled-components';

interface ContainerProps {
  spacing: number;
}

const Container = styled.div<ContainerProps>`
  height: ${({ spacing }) => spacing * 0.5}rem;
`;

interface Props {
  spacing?: number;
}

const Spacer: React.FC<Props> = ({ spacing = 2 }) => {
  return <Container spacing={spacing} />;
};

export default Spacer;
