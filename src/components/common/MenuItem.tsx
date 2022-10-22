import { gray } from '@lib/styles/palette';
import React from 'react';
import styled from 'styled-components';

const Container = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: ${gray[100]};
  }
`;

interface Props extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

const MenuItem: React.FC<Props> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default MenuItem;
