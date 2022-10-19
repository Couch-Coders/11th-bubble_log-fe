import { gray } from '@lib/styles/palette';
import React from 'react';
import styled from 'styled-components';

const Container = styled.li`
  display: flex;
  justify-content: flex-start;

  padding: 0.75rem;

  background-color: white;
  &:hover {
    background-color: ${gray[100]};
  }
`;

interface Props extends React.LiHTMLAttributes<HTMLLIElement> {
  label: string;
}

const DropdownMenuItem: React.FC<Props> = ({ label, ...props }) => {
  return <Container {...props}>{label}</Container>;
};

export default DropdownMenuItem;
