import { gray } from '@lib/styles/palette';
import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
  outline: none;
  border: none;
  background-color: white;
  color: ${gray[400]};
  text-decoration: underline;
  cursor: pointer;
`;

interface Props {
  onClick: () => void;
}

const UnregisterButton: React.FC<Props> = ({ onClick }) => {
  return <Container onClick={onClick}>탈퇴하기</Container>;
};

export default UnregisterButton;
