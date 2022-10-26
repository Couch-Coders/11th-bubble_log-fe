import React from 'react';
import styled from 'styled-components';

interface ContainerProps {
  margin?: string;
}

const Container = styled.div<ContainerProps>`
  border-radius: 0.5rem;
  background-color: white;

  margin: ${({ margin }) => margin};
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  margin?: string;
  children: React.ReactNode;
}
const Card: React.FC<Props> = ({ children, margin, ...props }) => {
  return (
    <Container margin={margin} {...props}>
      {children}
    </Container>
  );
};

export default React.memo(Card);
