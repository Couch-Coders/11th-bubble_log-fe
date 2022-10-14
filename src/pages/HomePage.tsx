import useAuth from '@hooks/useAuth';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@components/common/Button';

const HomePage: React.FC = () => {
  const { isLoggedIn, login } = useAuth();

  const navigate = useNavigate();

  const onClickLoginButton = (): void => {
    void login();
  };

  useEffect(() => {
    if (isLoggedIn) navigate('/logs');
  }, [isLoggedIn]);

  return (
    <main>
      <Button onClick={onClickLoginButton}>로그인</Button>
    </main>
  );
};

export default HomePage;
