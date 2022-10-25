import useAuth from '@hooks/useAuth';
import { gray } from '@lib/styles/palette';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@components/common/Button';
import Flexbox from '@components/common/Flexbox';

const Base = styled.main`
  background-color: ${gray[100]};
`;

const HomePage: React.FC = () => {
  const { isLoggedIn, logIn } = useAuth();

  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    void logIn();
  };

  useEffect(() => {
    if (isLoggedIn) navigate('/logs');
  }, [isLoggedIn, navigate]);

  return (
    <Base>
      <Flexbox height="100vh">
        <Button onClick={handleLoginButtonClick}>구글 계정으로 로그인</Button>
      </Flexbox>
    </Base>
  );
};

export default HomePage;
