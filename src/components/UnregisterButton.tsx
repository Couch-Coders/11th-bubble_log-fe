import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { unregisterAPI } from '@apis/auth';
import { gray } from '@styles/palette';

const Container = styled.button`
  outline: none;
  border: none;
  background-color: white;
  color: ${gray[400]};
  text-decoration: underline;
  cursor: pointer;
`;

interface ReturnType {
  onClick: () => Promise<void>;
}

const useUnregisterButton = (): ReturnType => {
  const navigate = useNavigate();

  const onClick = async (): Promise<void> => {
    try {
      await unregisterAPI();
      navigate('/', {
        replace: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { onClick };
};

const UnregisterButton: React.FC = () => {
  const { onClick } = useUnregisterButton();

  return (
    <Container
      onClick={() => {
        void onClick();
      }}
    >
      탈퇴하기
    </Container>
  );
};

export default UnregisterButton;
