import { gray } from '@lib/styles/palette';
import React from 'react';
import styled from 'styled-components';

const Container = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  width: 100%;
  border-radius: 0.25rem;
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

export default React.memo(MenuItem);
