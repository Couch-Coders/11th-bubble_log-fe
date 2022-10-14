import useAuth from '@hooks/useAuth';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
      <button type="button" onClick={onClickLoginButton}>
        로그인
      </button>
    </main>
  );
};

export default HomePage;
